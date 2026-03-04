import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { SpecialCategoryRetirementAnalysisPeriodDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis-period-document/command/special-category-retirement-analysis-period-document.command.repository.gateway';
import { SpecialCategoryRetirementAnalysisWorkPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis-work-period/command/special-category-retirement-analysis-work-period.command.repository.gateway';
import { SpecialCategoryRetirementAnalysisWorkPeriodQueryRepositoryGateway } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis-work-period/query/special-category-retirement-analysis-work-period.query.repository.gateway';
import { SpecialCategoryRetirementAnalysisWorkPeriodId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-work-period/value-object/special-category-retirement-analysis-work-period-id/special-category-retirement-analysis-work-period-id.value-object';
import { DeleteSpecialCategoryRetirementAnalysisWorkPeriodResponseDto } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/dto/response/delete-special-category-retirement-analysis-work-period.response.dto';
import { SpecialCategoryRetirementAnalysisWorkPeriodNotFoundError } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/error/special-category-retirement-analysis-work-period-not-found.error';

@Injectable()
export class DeleteSpecialCategoryRetirementAnalysisWorkPeriodUseCase {
  protected readonly _type =
    DeleteSpecialCategoryRetirementAnalysisWorkPeriodUseCase.name;

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
  ) {}

  public async execute(
    workPeriodId: SpecialCategoryRetirementAnalysisWorkPeriodId,
  ): Promise<DeleteSpecialCategoryRetirementAnalysisWorkPeriodResponseDto> {
    await this.workPeriodQueryRepositoryGateway.findOneByIdOrFail(
      workPeriodId,
      SpecialCategoryRetirementAnalysisWorkPeriodNotFoundError,
    );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      this.periodDocumentCommandRepositoryGateway.deleteAllByWorkPeriodId(
        workPeriodId,
      ),
      this.workPeriodCommandRepositoryGateway.deleteSpecialCategoryRetirementAnalysisWorkPeriod(
        workPeriodId,
      ),
    ]);

    await transaction.commit();

    return DeleteSpecialCategoryRetirementAnalysisWorkPeriodResponseDto.build({
      specialCategoryRetirementAnalysisWorkPeriodId: workPeriodId,
    });
  }
}
