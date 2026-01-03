import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { RetirementPlanningRgpsCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rgps/command/retirement-planning-rgps.repository.gateway';
import { RetirementPlanningRgpsQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rgps/query/retirement-planning-rgps.query.repository.gateway';
import { RetirementPlanningRgpsPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rgps-period/command/retirement-planning-rgps-period.repository.gateway';
import { RetirementPlanningRgpsEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps/retirement-planning-rgps.entity';
import { RetirementPlanningRgpsId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps/value-object/retirement-planning-rgps-id.value-object';
import { RetirementPlanningRgpsPeriodEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-period/retirement-planning-rgps-period.entity';
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
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
  ) {}

  public async execute(
    dto: CreateRetirementPlanningRgpsCnisRequestDto,
  ): Promise<CreateRetirementPlanningRgpsCnisResponseDto> {
    const retirementPlanningRgps =
      await this.retirementPlanningRgpsQueryRepositoryGateway.findOneByRetirementPlanningRgpsIdOrFail(
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

      const updatedRetirementPlanningRgps = new RetirementPlanningRgpsEntity({
        ...retirementPlanningRgps,
        cnisDocument,
      });

      const cnis = await this.analysisProcessorGateway.parseCnisDocument(
        dto.cnisDocument.buffer,
      );

      const periods =
        cnis?.socialSecurityRelations !== undefined
          ? cnis?.socialSecurityRelations.map((relation) => {
              return new RetirementPlanningRgpsPeriodEntity({
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
                isPendency: true,
                competenceBelowTheMinimum: true,
                contributionAverage: 0,
                typeOfContribution: 'Urbano',
                retirementPlanningRgps: updatedRetirementPlanningRgps,
              });
            })
          : [];

      await this.createOnDatabase(
        retirementPlanningRgps.id,
        updatedRetirementPlanningRgps,
        periods,
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

    const transactions = await this.baseTransactionRepositoryGateway.execute([
      ...retirementPlanningRgpsPeriodTransaction,
      retirementPlanningRgpsTransaction,
    ]);

    await transactions.commit();
  }
}
