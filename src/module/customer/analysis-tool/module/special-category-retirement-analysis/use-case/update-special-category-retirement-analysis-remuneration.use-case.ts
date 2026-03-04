import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { SpecialCategoryRetirementAnalysisRemunerationCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis-remuneration/command/special-category-retirement-analysis-remuneration.command.repository.gateway';
import { SpecialCategoryRetirementAnalysisRemunerationQueryRepositoryGateway } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis-remuneration/query/special-category-retirement-analysis-remuneration.query.repository.gateway';
import { SpecialCategoryRetirementAnalysisRemunerationEntity } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-remuneration/special-category-retirement-analysis-remuneration.entity';
import { SpecialCategoryRetirementAnalysisRemunerationId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-remuneration/value-object/special-category-retirement-analysis-remuneration-id/special-category-retirement-analysis-remuneration-id.value-object';
import { UpdateSpecialCategoryRetirementAnalysisRemunerationRequestDto } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/dto/request/update-special-category-retirement-analysis-remuneration.request.dto';
import { UpdateSpecialCategoryRetirementAnalysisRemunerationResponseDto } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/dto/response/update-special-category-retirement-analysis-remuneration.response.dto';
import { SpecialCategoryRetirementAnalysisRemunerationNotFoundError } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/error/special-category-retirement-analysis-remuneration-not-found.error';

@Injectable()
export class UpdateSpecialCategoryRetirementAnalysisRemunerationUseCase {
  protected readonly _type =
    UpdateSpecialCategoryRetirementAnalysisRemunerationUseCase.name;

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
    dto: UpdateSpecialCategoryRetirementAnalysisRemunerationRequestDto,
  ): Promise<UpdateSpecialCategoryRetirementAnalysisRemunerationResponseDto> {
    const queryResult =
      await this.remunerationQueryRepositoryGateway.findOneByIdOrFail(
        remunerationId,
        SpecialCategoryRetirementAnalysisRemunerationNotFoundError,
      );

    const updatedRemuneration =
      new SpecialCategoryRetirementAnalysisRemunerationEntity({
        id: remunerationId,
        specialCategoryRetirementAnalysisId:
          queryResult.specialCategoryRetirementAnalysisId,
        remunerationReferenceMonthYear:
          queryResult.remunerationReferenceMonthYear,
        remunerationGrossAmount: dto.remunerationGrossAmount,
        createdAt: queryResult.createdAt,
        updatedAt: new Date(),
      });

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      this.remunerationCommandRepositoryGateway.updateSpecialCategoryRetirementAnalysisRemuneration(
        remunerationId,
        updatedRemuneration,
      ),
    ]);

    await transaction.commit();

    return UpdateSpecialCategoryRetirementAnalysisRemunerationResponseDto.build(
      {
        specialCategoryRetirementAnalysisRemunerationId: remunerationId,
      },
    );
  }
}
