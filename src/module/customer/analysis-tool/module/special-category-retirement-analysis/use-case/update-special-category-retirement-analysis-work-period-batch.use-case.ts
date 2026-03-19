import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { SpecialCategoryRetirementAnalysisPeriodDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis-period-document/command/special-category-retirement-analysis-period-document.command.repository.gateway';
import { SpecialCategoryRetirementAnalysisWorkPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis-work-period/command/special-category-retirement-analysis-work-period.command.repository.gateway';
import { SpecialCategoryRetirementAnalysisWorkPeriodQueryRepositoryGateway } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis-work-period/query/special-category-retirement-analysis-work-period.query.repository.gateway';
import { SpecialCategoryRetirementAnalysisId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis/value-object/special-category-retirement-analysis-id/special-category-retirement-analysis-id.value-object';
import { CreateSpecialCategoryRetirementAnalysisWorkPeriodBatchRequestDto } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/dto/request/create-special-category-retirement-analysis-work-period-batch.request.dto';
import { UpdateSpecialCategoryRetirementAnalysisWorkPeriodBatchRequestDto } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/dto/request/update-special-category-retirement-analysis-work-period-batch.request.dto';
import { UpdateSpecialCategoryRetirementAnalysisWorkPeriodBatchResponseDto } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/dto/response/update-special-category-retirement-analysis-work-period-batch.response.dto';
import { CreateSpecialCategoryRetirementAnalysisWorkPeriodBatchUseCase } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/use-case/create-special-category-retirement-analysis-work-period-batch.use-case';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';

@Injectable()
export class UpdateSpecialCategoryRetirementAnalysisWorkPeriodBatchUseCase {
  protected readonly _type =
    UpdateSpecialCategoryRetirementAnalysisWorkPeriodBatchUseCase.name;

  public constructor(
    @Inject(SpecialCategoryRetirementAnalysisWorkPeriodQueryRepositoryGateway)
    private readonly workPeriodQueryRepositoryGateway: SpecialCategoryRetirementAnalysisWorkPeriodQueryRepositoryGateway,
    @Inject(SpecialCategoryRetirementAnalysisWorkPeriodCommandRepositoryGateway)
    private readonly workPeriodCommandRepositoryGateway: SpecialCategoryRetirementAnalysisWorkPeriodCommandRepositoryGateway,
    @Inject(
      SpecialCategoryRetirementAnalysisPeriodDocumentCommandRepositoryGateway,
    )
    private readonly periodDocumentCommandRepositoryGateway: SpecialCategoryRetirementAnalysisPeriodDocumentCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(CreateSpecialCategoryRetirementAnalysisWorkPeriodBatchUseCase)
    private readonly createWorkPeriodBatchUseCase: CreateSpecialCategoryRetirementAnalysisWorkPeriodBatchUseCase,
  ) {}

  public async execute(
    organizationSessionData: OrganizationSessionDataModel,
    analysisId: SpecialCategoryRetirementAnalysisId,
    dto: UpdateSpecialCategoryRetirementAnalysisWorkPeriodBatchRequestDto,
  ): Promise<UpdateSpecialCategoryRetirementAnalysisWorkPeriodBatchResponseDto> {
    await this.deleteExistingWorkPeriods(analysisId);

    const createDto =
      CreateSpecialCategoryRetirementAnalysisWorkPeriodBatchRequestDto.build({
        items: dto.items,
      });

    const created = await this.createWorkPeriodBatchUseCase.execute(
      organizationSessionData,
      analysisId,
      createDto,
    );

    return UpdateSpecialCategoryRetirementAnalysisWorkPeriodBatchResponseDto.build(
      { data: created.data },
    );
  }

  private async deleteExistingWorkPeriods(
    analysisId: SpecialCategoryRetirementAnalysisId,
  ): Promise<void> {
    const existingPeriods =
      await this.workPeriodQueryRepositoryGateway.listByAnalysisId(analysisId);

    if (existingPeriods.length === 0) {
      return;
    }

    const deleteTransactions: TransactionType[] = existingPeriods.flatMap(
      (period) => [
        this.periodDocumentCommandRepositoryGateway.deleteAllByWorkPeriodId(
          period.specialCategoryRetirementAnalysisWorkPeriodId,
        ),
        this.workPeriodCommandRepositoryGateway.deleteSpecialCategoryRetirementAnalysisWorkPeriod(
          period.specialCategoryRetirementAnalysisWorkPeriodId,
        ),
      ],
    );

    const transaction =
      await this.baseTransactionRepositoryGateway.execute(deleteTransactions);

    await transaction.commit();
  }
}
