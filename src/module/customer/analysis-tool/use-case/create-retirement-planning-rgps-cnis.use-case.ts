import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TetoInssData } from '@lib/cnis-analyzer/data/teto.inss';
import { RetirementPlanningRgpsEarningsHistoryCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rgps-earnings-history/command/retirement-planning-rgps-earnings-history.command.repository.gateway';
import { RetirementPlanningRgpsPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rgps-period/command/retirement-planning-rgps-period.repository.gateway';
import { RetirementPlanningRgpsCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rgps/command/retirement-planning-rgps.repository.gateway';
import { RetirementPlanningRgpsQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rgps/query/retirement-planning-rgps.query.repository.gateway';
import { RetirementPlanningRgpsEarningsHistoryEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-earnings-history/retirement-planning-rgps-earnings-history.entity';
import { RetirementPlanningRgpsPeriodEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-period/retirement-planning-rgps-period.entity';
import { RetirementPlanningRgpsResultEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-result/retirement-planning-rgps-result.entity';
import { RetirementPlanningRgpsEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps/retirement-planning-rgps.entity';
import { RetirementPlanningRgpsId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps/value-object/retirement-planning-rgps-id.value-object';
import { CreateRetirementPlanningRgpsCnisRequestDto } from '@module/customer/analysis-tool/dto/request/create-retirement-planning-rgps-cnis.request.dto';
import { CreateRetirementPlanningRgpsCnisResponseDto } from '@module/customer/analysis-tool/dto/response/create-retirement-planning-rgps-cnis.response.dto';
import { CnisDocumentIsNotValidError } from '@module/customer/analysis-tool/error/cnis-document-is-not-valid.error';
import { RetirementPlanningRgpsNotFoundError } from '@module/customer/analysis-tool/error/retirement-planning-rgps-not-found.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';

@Injectable()
export class CreateRetirementPlanningRgpsCnisUseCase {
  protected readonly _type = CreateRetirementPlanningRgpsCnisUseCase.name;

  public constructor(
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(RetirementPlanningRgpsQueryRepositoryGateway)
    private readonly retirementPlanningRgpsQueryRepositoryGateway: RetirementPlanningRgpsQueryRepositoryGateway,
    @Inject(AnalysisProcessorGateway)
    private readonly analysisProcessorGateway: AnalysisProcessorGateway,
    @Inject(RetirementPlanningRgpsCommandRepositoryGateway)
    private readonly retirementPlanningRgpsCommandRepositoryGateway: RetirementPlanningRgpsCommandRepositoryGateway,
    @Inject(RetirementPlanningRgpsPeriodCommandRepositoryGateway)
    private readonly retirementPlanningRgpsPeriodCommandRepositoryGateway: RetirementPlanningRgpsPeriodCommandRepositoryGateway,
    @Inject(RetirementPlanningRgpsEarningsHistoryCommandRepositoryGateway)
    private readonly retirementPlanningRgpsEarningsHistoryCommandRepositoryGateway: RetirementPlanningRgpsEarningsHistoryCommandRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
  ) {}

  public async execute(
    dto: CreateRetirementPlanningRgpsCnisRequestDto,
  ): Promise<CreateRetirementPlanningRgpsCnisResponseDto> {
    const retirementPlanningRgps =
      await this.retirementPlanningRgpsQueryRepositoryGateway.findOneByRetirementPlanningRgpsIdOrFailWithRelations(
        dto.json.retirementPlanningRgpsId,
        RetirementPlanningRgpsNotFoundError,
      );

    if (dto.cnisDocument) {
      const validateCnisDocument =
        await this.analysisProcessorGateway.validateCnisDocument(
          dto.cnisDocument.buffer,
        );

      if (validateCnisDocument === false) {
        throw new CnisDocumentIsNotValidError();
      }

      const cnisDocument =
        dto.cnisDocument !== undefined
          ? await this.fileProcessorGateway.uploadFile(dto.cnisDocument)
          : null;

      const retirementPlanningRgpsResult =
        new RetirementPlanningRgpsResultEntity({
          ...retirementPlanningRgps.retirementPlanningRgpsResult,
        });

      const updatedRetirementPlanningRgps = new RetirementPlanningRgpsEntity({
        ...retirementPlanningRgps,
        retirementPlanningRgpsResult,
        cnisDocument,
      });

      const cnis = await this.analysisProcessorGateway.parseCnisDocument(
        dto.cnisDocument.buffer,
      );

      const earningHistories: RetirementPlanningRgpsEarningsHistoryEntity[] =
        [];

      const periods =
        cnis?.socialSecurityRelations !== undefined
          ? cnis?.socialSecurityRelations.map((relation) => {
              const typeOfContribution =
                relation.socialSecurityAffiliationInfo.origemDoVinculo ===
                  'PERÍODO DE ATIVIDADE DE SEGURADO ESPECIAL' ||
                relation.socialSecurityAffiliationInfo.origemDoVinculo ===
                  'SEGURADO ESPECIAL'
                  ? 'Rural'
                  : 'Urbano';

              const contributionTotal =
                relation.socialSecurityAffiliationEarningsHistory
                  .map((earning) => {
                    const remuneration = earning.remuneracao;
                    if (!remuneration) {
                      return 0;
                    }
                    const remunerationNumber = Number(
                      remuneration.replace(',', '.'),
                    );
                    if (isNaN(remunerationNumber)) {
                      return 0;
                    }
                    return remunerationNumber;
                  })
                  .reduce((acc, curr) => acc + curr, 0);

              const contributionAverage =
                relation.socialSecurityAffiliationEarningsHistory.length > 0
                  ? contributionTotal /
                    relation.socialSecurityAffiliationEarningsHistory.length
                  : 0;

              const competenceBelowTheMinimum =
                relation.socialSecurityAffiliationEarningsHistory.some(
                  (earning) => {
                    return TetoInssData.some((teto) => {
                      const competencia = earning.competencia;
                      if (!competencia) {
                        return false;
                      }
                      const competenciaYear = competencia.getFullYear();
                      if (teto.ano !== competenciaYear) {
                        return false;
                      }
                      const remuneration = earning.remuneracao;
                      if (!remuneration) {
                        return false;
                      }
                      const remunerationNumber = Number(
                        remuneration.replace(',', '.'),
                      );
                      if (isNaN(remunerationNumber)) {
                        return false;
                      }
                      return remunerationNumber < teto.salarioMinimo;
                    });
                  },
                );

              const reasonPendency =
                relation.socialSecurityAffiliationInfo.dataFim === null
                  ? 'Periodo sem Data de Saída'
                  : competenceBelowTheMinimum
                    ? 'Contribuições Abaixo do Mínimo'
                    : '';

              const period = new RetirementPlanningRgpsPeriodEntity({
                periodName:
                  relation.socialSecurityAffiliationInfo.origemDoVinculo ??
                  null,
                periodStart:
                  relation.socialSecurityAffiliationInfo.dataInicio ?? null,
                periodEnd:
                  relation.socialSecurityAffiliationInfo.dataFim ?? null,
                category:
                  relation.socialSecurityAffiliationInfo.tipoFiliadoNoVinculo ??
                  null,
                isPendency: reasonPendency !== '',
                competenceBelowTheMinimum,
                contributionAverage,
                typeOfContribution,
                retirementPlanningRgps: updatedRetirementPlanningRgps,
                reasonPendency,
                status: reasonPendency === '',
              });

              const earnings =
                relation.socialSecurityAffiliationEarningsHistory ?? [];

              if (earnings.length > 0) {
                earnings.map((e) => {
                  const competenceBelowTheMinimumSalary =
                    relation.socialSecurityAffiliationEarningsHistory.some(
                      (earning) => {
                        if (!e.competencia) {
                          return false;
                        }

                        const year = e.competencia.getFullYear();

                        const findSalary = TetoInssData.find((teto) => {
                          return teto.ano === year;
                        });

                        if (!findSalary) {
                          return false;
                        }
                        const salarioMinimo = findSalary.salarioMinimo;
                        const remuneration = earning.remuneracao;
                        if (!remuneration) {
                          return false;
                        }
                        const salario = Number(
                          remuneration.replace(/\./g, '').replace(',', '.'),
                        );
                        if (isNaN(salario)) {
                          return false;
                        }

                        return salario < salarioMinimo;
                      },
                    );

                  const earningEntity =
                    new RetirementPlanningRgpsEarningsHistoryEntity({
                      competence: e.competencia ?? null,
                      remuneration: e.remuneracao ?? null,
                      indicators: e.indicadores ?? null,
                      paymentDate: e.dataPgto ?? null,
                      contribution: e.contribuicao ?? null,
                      contributionSalary: e.salarioContribuicao ?? null,
                      retirementPlanningRgps: updatedRetirementPlanningRgps,
                      retirementPlanningRgpsPeriod: period,
                      competenceBelowTheMinimum:
                        competenceBelowTheMinimumSalary,
                    });
                  earningHistories.push(earningEntity);
                });
              }

              return period;
            })
          : [];

      await this.createOnDatabase(
        retirementPlanningRgps.id,
        updatedRetirementPlanningRgps,
        periods,
        earningHistories,
      );
    }

    return CreateRetirementPlanningRgpsCnisResponseDto.build({
      retirementPlanningRgpsId: retirementPlanningRgps.id,
    });
  }

  private async createOnDatabase(
    id: RetirementPlanningRgpsId,
    retirementPlanningRgps: RetirementPlanningRgpsEntity,
    retirementPlanningRgpsPeriod?: RetirementPlanningRgpsPeriodEntity[],
    earningHistories?: RetirementPlanningRgpsEarningsHistoryEntity[],
  ): Promise<void> {
    const retirementPlanningRgpsPeriodTransaction =
      retirementPlanningRgpsPeriod?.map((value) => {
        return this.retirementPlanningRgpsPeriodCommandRepositoryGateway.createRetirementPlanningRgpsPeriod(
          value,
        );
      }) ?? [];
    const retirementPlanningRgpsTransaction =
      this.retirementPlanningRgpsCommandRepositoryGateway.updateRetirementPlanningRgps(
        id,
        retirementPlanningRgps,
      );

    const earningHistoriesTransaction =
      earningHistories?.map((value) => {
        return this.retirementPlanningRgpsEarningsHistoryCommandRepositoryGateway.createRetirementPlanningRgpsEarningsHistory(
          value,
        );
      }) ?? [];

    const transactions = await this.baseTransactionRepositoryGateway.execute([
      ...retirementPlanningRgpsPeriodTransaction,
      ...earningHistoriesTransaction,
      retirementPlanningRgpsTransaction,
    ]);

    await transactions.commit();
  }
}
