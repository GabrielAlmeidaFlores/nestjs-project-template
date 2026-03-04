import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { SpecialCategoryRetirementAnalysisPeriodDocumentQueryRepositoryGateway } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis-period-document/query/special-category-retirement-analysis-period-document.query.repository.gateway';
import { SpecialCategoryRetirementAnalysisPeriodDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis-period-document/command/special-category-retirement-analysis-period-document.command.repository.gateway';
import { SpecialCategoryRetirementAnalysisPeriodDocumentId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-period-document/value-object/special-category-retirement-analysis-period-document-id/special-category-retirement-analysis-period-document-id.value-object';
import { DeleteSpecialCategoryRetirementAnalysisPeriodDocumentResponseDto } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/dto/response/delete-special-category-retirement-analysis-period-document.response.dto';
import { SpecialCategoryRetirementAnalysisPeriodDocumentNotFoundError } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/error/special-category-retirement-analysis-period-document-not-found.error';

@Injectable()
export class DeleteSpecialCategoryRetirementAnalysisPeriodDocumentUseCase {
  protected readonly _type = DeleteSpecialCategoryRetirementAnalysisPeriodDocumentUseCase.name;

  public constructor(
    @Inject(SpecialCategoryRetirementAnalysisPeriodDocumentQueryRepositoryGateway)
    private readonly periodDocumentQueryRepositoryGateway: SpecialCategoryRetirementAnalysisPeriodDocumentQueryRepositoryGateway,
    @Inject(SpecialCategoryRetirementAnalysisPeriodDocumentCommandRepositoryGateway)
    private readonly periodDocumentCommandRepositoryGateway: SpecialCategoryRetirementAnalysisPeriodDocumentCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    periodDocumentId: SpecialCategoryRetirementAnalysisPeriodDocumentId,
  ): Promise<DeleteSpecialCategoryRetirementAnalysisPeriodDocumentResponseDto> {
    await this.periodDocumentQueryRepositoryGateway.findOneByIdOrFail(
      periodDocumentId,
      SpecialCategoryRetirementAnalysisPeriodDocumentNotFoundError,
    );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      this.periodDocumentCommandRepositoryGateway.deleteSpecialCategoryRetirementAnalysisPeriodDocument(
        periodDocumentId,
      ),
    ]);

    await transaction.commit();

    return DeleteSpecialCategoryRetirementAnalysisPeriodDocumentResponseDto.build({
      specialCategoryRetirementAnalysisPeriodDocumentId: periodDocumentId,
    });
  }
}
