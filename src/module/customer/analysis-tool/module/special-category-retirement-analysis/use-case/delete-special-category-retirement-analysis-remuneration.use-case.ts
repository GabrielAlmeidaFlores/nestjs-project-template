import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { SpecialCategoryRetirementAnalysisRemunerationCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis-remuneration/command/special-category-retirement-analysis-remuneration.command.repository.gateway';
import { SpecialCategoryRetirementAnalysisRemunerationQueryRepositoryGateway } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis-remuneration/query/special-category-retirement-analysis-remuneration.query.repository.gateway';
import { SpecialCategoryRetirementAnalysisRemunerationId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-remuneration/value-object/special-category-retirement-analysis-remuneration-id/special-category-retirement-analysis-remuneration-id.value-object';
import { DeleteSpecialCategoryRetirementAnalysisRemunerationResponseDto } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/dto/response/delete-special-category-retirement-analysis-remuneration.response.dto';
import { SpecialCategoryRetirementAnalysisRemunerationNotFoundError } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/error/special-category-retirement-analysis-remuneration-not-found.error';

@Injectable()
export class DeleteSpecialCategoryRetirementAnalysisRemunerationUseCase {
  protected readonly _type =
    DeleteSpecialCategoryRetirementAnalysisRemunerationUseCase.name;

  public constructor(
    @Inject(SpecialCategoryRetirementAnalysisRemunerationQueryRepositoryGateway)
    private readonly remunerationQueryRepositoryGateway: SpecialCategoryRetirementAnalysisRemunerationQueryRepositoryGateway,
    @Inject(
      SpecialCategoryRetirementAnalysisRemunerationCommandRepositoryGateway,
    )
    private readonly remunerationCommandRepositoryGateway: SpecialCategoryRetirementAnalysisRemunerationCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    remunerationId: SpecialCategoryRetirementAnalysisRemunerationId,
  ): Promise<DeleteSpecialCategoryRetirementAnalysisRemunerationResponseDto> {
    await this.remunerationQueryRepositoryGateway.findOneByIdOrFail(
      remunerationId,
      SpecialCategoryRetirementAnalysisRemunerationNotFoundError,
    );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      this.remunerationCommandRepositoryGateway.deleteSpecialCategoryRetirementAnalysisRemuneration(
        remunerationId,
      ),
    ]);

    await transaction.commit();

    return DeleteSpecialCategoryRetirementAnalysisRemunerationResponseDto.build(
      {
        specialCategoryRetirementAnalysisRemunerationId: remunerationId,
      },
    );
  }
}
