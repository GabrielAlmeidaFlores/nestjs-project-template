import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { CnisAnalyzerGateway } from '@lib/cnis-analyzer/cnis-analyzer-gateway';
import { TetoInssData } from '@lib/cnis-analyzer/data/teto.inss';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { SpecialRetirementGrantEarningsHistoryCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/repository/special-retirement-grant-earnings-history/command/special-retirement-grant-earnings-history.command.repository.gateway';
import { SpecialRetirementGrantPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/repository/special-retirement-grant-period/command/special-retirement-grant-period.command.repository.gateway';
import { SpecialRetirementGrantPeriodQueryRepositoryGateway } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/repository/special-retirement-grant-period/query/special-retirement-grant-period.query.repository.gateway';
import { SpecialRetirementGrantPeriodOverdueContributionCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/repository/special-retirement-grant-period-overdue-contribution/command/special-retirement-grant-period-overdue-contribution.command.repository.gateway';
import { SpecialRetirementGrantPeriodPendingExitDateCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/repository/special-retirement-grant-period-pending-exit-date/command/special-retirement-grant-period-pending-exit-date.command.repository.gateway';
import { SpecialRetirementGrantPeriodUnderMinimumCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/repository/special-retirement-grant-period-under-minimum/command/special-retirement-grant-period-under-minimum.command.repository.gateway';
import { SpecialRetirementGrantEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant/special-retirement-grant.entity';
import { SpecialRetirementGrantId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant/value-object/special-retirement-grant-id/special-retirement-grant-id.value-object';
import { SpecialRetirementGrantEarningsHistoryEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-earnings-history/special-retirement-grant-earnings-history.entity';
import { SpecialRetirementGrantPeriodStatusEnum } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period/enum/special-retirement-grant-period-status.enum';
import { SpecialRetirementGrantPeriodEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period/special-retirement-grant-period.entity';
import { SpecialRetirementGrantPeriodOverdueContributionEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period-overdue-contribution/special-retirement-grant-period-overdue-contribution.entity';
import { SpecialRetirementGrantPeriodPendingExitDateEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period-pending-exit-date/special-retirement-grant-period-pending-exit-date.entity';
import { SpecialRetirementGrantPeriodUnderMinimumEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period-under-minimum/special-retirement-grant-period-under-minimum.entity';
import { CreateSpecialRetirementGrantCnisResponseDto } from '@module/customer/analysis-tool/module/special-retirement-grant/dto/response/create-special-retirement-grant-cnis.response.dto';
import { SpecialRetirementGrantNotFoundError } from '@module/customer/analysis-tool/module/special-retirement-grant/error/special-retirement-grant-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateSpecialRetirementGrantCnisUseCase {
  protected readonly _type = CreateSpecialRetirementGrantCnisUseCase.name;

  public constructor(
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(AnalysisProcessorGateway)
    private readonly analysisProcessorGateway: AnalysisProcessorGateway,
    @Inject(CnisAnalyzerGateway)
    private readonly cnisAnalyzerGateway: CnisAnalyzerGateway,
    @Inject(SpecialRetirementGrantPeriodQueryRepositoryGateway)
    private readonly specialRetirementGrantPeriodQueryRepositoryGateway: SpecialRetirementGrantPeriodQueryRepositoryGateway,
    @Inject(SpecialRetirementGrantPeriodCommandRepositoryGateway)
    private readonly specialRetirementGrantPeriodCommandRepositoryGateway: SpecialRetirementGrantPeriodCommandRepositoryGateway,
    @Inject(SpecialRetirementGrantEarningsHistoryCommandRepositoryGateway)
    private readonly specialRetirementGrantEarningsHistoryCommandRepositoryGateway: SpecialRetirementGrantEarningsHistoryCommandRepositoryGateway,
    @Inject(SpecialRetirementGrantPeriodUnderMinimumCommandRepositoryGateway)
    private readonly specialRetirementGrantPeriodUnderMinimumCommandRepositoryGateway: SpecialRetirementGrantPeriodUnderMinimumCommandRepositoryGateway,
    @Inject(SpecialRetirementGrantPeriodPendingExitDateCommandRepositoryGateway)
    private readonly specialRetirementGrantPeriodPendingExitDateCommandRepositoryGateway: SpecialRetirementGrantPeriodPendingExitDateCommandRepositoryGateway,
    @Inject(
      SpecialRetirementGrantPeriodOverdueContributionCommandRepositoryGateway,
    )
    private readonly specialRetirementGrantPeriodOverdueContributionCommandRepositoryGateway: SpecialRetirementGrantPeriodOverdueContributionCommandRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    specialRetirementGrantId: SpecialRetirementGrantId,
  ): Promise<CreateSpecialRetirementGrantCnisResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const analysisToolRecord =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsBySpecialRetirementGrantIdAndOrganizationIdAndAuthIdentityIdOrFail(
        specialRetirementGrantId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        SpecialRetirementGrantNotFoundError,
      );

    const specialRetirementGrantQueryResult =
      analysisToolRecord.specialRetirementGrant;
    if (specialRetirementGrantQueryResult === null) {
      throw new SpecialRetirementGrantNotFoundError();
    }

    const specialRetirementGrant = new SpecialRetirementGrantEntity({
      ...specialRetirementGrantQueryResult,
      specialRetirementGrantResult: null,
      specialRetirementGrantBenefit: null,
      specialRetirementGrantLegalProceeding: null,
      specialRetirementGrantDocument: null,
      createdBy: analysisToolRecord.createdBy.id,
      updatedBy: organizationMember.id,
    });

    const cnisBuffer = await this.fileProcessorGateway.getFileBuffer(
      specialRetirementGrant.cnisDocument,
    );

    const cnisData =
      await this.analysisProcessorGateway.parseCnisDocument(cnisBuffer);

    const analysisToolClient = new AnalysisToolClientEntity({
      ...analysisToolRecord.analysisToolClient,
      createdBy: analysisToolRecord.analysisToolClient.createdBy.id,
      updatedBy: analysisToolRecord.analysisToolClient.updatedBy.id,
    });

    const cnisAnalysis = await this.cnisAnalyzerGateway.analyzeCnisDocument(
      cnisData,
      analysisToolClient,
    );

    const existingPeriodIds =
      await this.specialRetirementGrantPeriodQueryRepositoryGateway.listIdsBySpecialRetirementGrantId(
        specialRetirementGrantId,
      );

    if (existingPeriodIds.length > 0) {
      const deleteTransactions = existingPeriodIds.map((id) =>
        this.specialRetirementGrantPeriodCommandRepositoryGateway.deleteSpecialRetirementGrantPeriod(
          id,
        ),
      );
      const t =
        await this.baseTransactionRepositoryGateway.execute(deleteTransactions);
      await t.commit();
    }

    const indicadorPendencia = ['PEXT'];

    const contributionPeriods = cnisAnalysis.tempoDeContribuicao.filter(
      (p) => p.dados?.data?.dataInicio !== null,
    );

    const batchSize = 10;
    for (let i = 0; i < contributionPeriods.length; i += batchSize) {
      const batch = contributionPeriods.slice(i, i + batchSize);
      const ops = [];

      for (const contributionPeriod of batch) {
        const relation =
          cnisData.socialSecurityRelations?.find(
            (r) =>
              r.socialSecurityAffiliationInfo.origemDoVinculo ===
                contributionPeriod.origemDoVinculo &&
              contributionPeriod.dados?.data?.dataInicio !== undefined &&
              r.socialSecurityAffiliationInfo.dataInicio ===
                contributionPeriod.dados.data?.dataInicio,
          ) ?? null;

        const willHavePendingExitDates =
          relation?.socialSecurityAffiliationInfo !== undefined &&
          relation.socialSecurityAffiliationInfo.dataFim === undefined;

        const delayPayment =
          relation?.socialSecurityAffiliationEarningsHistory.some((earning) => {
            if (!earning.indicadores) {
              return false;
            }
            return indicadorPendencia.includes(earning.indicadores);
          }) ?? false;

        const earningsForAverage =
          relation?.socialSecurityAffiliationEarningsHistory.filter(
            (e) => e.remuneracao !== undefined,
          ) ?? [];

        let averageContributionAmount: DecimalValue | null = null;
        if (earningsForAverage.length > 0) {
          const total = earningsForAverage.reduce((sum, e) => {
            const raw = e.remuneracao ?? '0';
            return sum + Number(raw.replace(/\./g, '').replace(',', '.'));
          }, 0);
          averageContributionAmount = new DecimalValue(
            total / earningsForAverage.length,
          );
        }

        const periodEntity = new SpecialRetirementGrantPeriodEntity({
          sequencial: contributionPeriod.seq ?? null,
          employmentRelationshipSource:
            contributionPeriod.origemDoVinculo ?? null,
          startDate: contributionPeriod.dados?.data?.dataInicio ?? null,
          endDate: contributionPeriod.dados?.data?.dataFim ?? null,
          category: contributionPeriod.tipoDoVinculo ?? null,
          status:
            willHavePendingExitDates || delayPayment
              ? SpecialRetirementGrantPeriodStatusEnum.PENDING
              : SpecialRetirementGrantPeriodStatusEnum.VALID,
          averageContributionAmount,
          shouldConsiderPeriod: true,
          shouldConsiderLastRemunerationAsExitDate: false,
          cnisDocument: specialRetirementGrant.cnisDocument,
          specialRetirementGrant,
        });

        ops.push(
          this.specialRetirementGrantPeriodCommandRepositoryGateway.createSpecialRetirementGrantPeriod(
            periodEntity,
          ),
        );

        const earningHistory =
          relation?.socialSecurityAffiliationEarningsHistory ?? [];

        for (const earning of earningHistory) {
          if (earning.competencia === undefined) {
            continue;
          }

          const year = earning.competencia.getFullYear();
          const tetoData = TetoInssData.find((t) => t.ano === year);
          const salarioMinimo = tetoData?.salarioMinimo ?? 0;
          const amount = earning.remuneracao
            ? Number(earning.remuneracao.replace(/\./g, '').replace(',', '.'))
            : NaN;

          const belowMinimum =
            salarioMinimo > 0 &&
            Number.isFinite(amount) &&
            amount < salarioMinimo;

          const earningsEntity =
            new SpecialRetirementGrantEarningsHistoryEntity({
              competence: earning.competencia ?? null,
              remuneration: earning.remuneracao ?? null,
              indicators: earning.indicadores ?? null,
              paymentDate: earning.dataPgto ?? null,
              competenceBelowTheMinimum: belowMinimum,
              specialRetirementGrant,
              specialRetirementGrantPeriod: periodEntity,
            });

          ops.push(
            this.specialRetirementGrantEarningsHistoryCommandRepositoryGateway.createSpecialRetirementGrantEarningsHistory(
              earningsEntity,
            ),
          );

          if (belowMinimum) {
            ops.push(
              this.specialRetirementGrantPeriodUnderMinimumCommandRepositoryGateway.createSpecialRetirementGrantPeriodUnderMinimum(
                new SpecialRetirementGrantPeriodUnderMinimumEntity({
                  contributionDate: earning.competencia,
                  contributionAmount: new DecimalValue(amount),
                  specialRetirementGrantPeriod: periodEntity,
                }),
              ),
            );
          }

          if (
            earning.indicadores !== undefined &&
            indicadorPendencia.includes(earning.indicadores)
          ) {
            ops.push(
              this.specialRetirementGrantPeriodOverdueContributionCommandRepositoryGateway.createSpecialRetirementGrantPeriodOverdueContribution(
                new SpecialRetirementGrantPeriodOverdueContributionEntity({
                  overdueDate: earning.competencia,
                  paymentDate: earning.dataPgto ?? null,
                  specialRetirementGrantPeriod: periodEntity,
                }),
              ),
            );
          }
        }

        if (willHavePendingExitDates) {
          if (earningHistory.length > 0) {
            for (const earning of earningHistory) {
              if (earning.competencia === undefined) {
                continue;
              }
              const amount = earning.remuneracao
                ? Number(
                    earning.remuneracao.replace(/\./g, '').replace(',', '.'),
                  )
                : 0;
              ops.push(
                this.specialRetirementGrantPeriodPendingExitDateCommandRepositoryGateway.createSpecialRetirementGrantPeriodPendingExitDate(
                  new SpecialRetirementGrantPeriodPendingExitDateEntity({
                    pendingDate: earning.competencia,
                    pendingAmount: new DecimalValue(amount),
                    specialRetirementGrantPeriod: periodEntity,
                  }),
                ),
              );
            }
          } else {
            ops.push(
              this.specialRetirementGrantPeriodPendingExitDateCommandRepositoryGateway.createSpecialRetirementGrantPeriodPendingExitDate(
                new SpecialRetirementGrantPeriodPendingExitDateEntity({
                  pendingDate:
                    relation?.socialSecurityAffiliationInfo.dataInicio ??
                    new Date(),
                  pendingAmount: new DecimalValue(0),
                  specialRetirementGrantPeriod: periodEntity,
                }),
              ),
            );
          }
        }
      }

      const t = await this.baseTransactionRepositoryGateway.execute(ops);
      await t.commit();
    }

    return CreateSpecialRetirementGrantCnisResponseDto.build({
      specialRetirementGrantId: specialRetirementGrant.id,
    });
  }
}
