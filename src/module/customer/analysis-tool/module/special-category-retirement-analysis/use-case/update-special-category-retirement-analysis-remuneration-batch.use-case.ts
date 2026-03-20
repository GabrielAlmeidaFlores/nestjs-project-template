import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { SpecialCategoryRetirementAnalysisRemunerationCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis-remuneration/command/special-category-retirement-analysis-remuneration.command.repository.gateway';
import { SpecialCategoryRetirementAnalysisRemunerationQueryRepositoryGateway } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis-remuneration/query/special-category-retirement-analysis-remuneration.query.repository.gateway';
import { SpecialCategoryRetirementAnalysisId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis/value-object/special-category-retirement-analysis-id/special-category-retirement-analysis-id.value-object';
import { CreateSpecialCategoryRetirementAnalysisRemunerationBatchRequestDto } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/dto/request/create-special-category-retirement-analysis-remuneration-batch.request.dto';
import { UpdateSpecialCategoryRetirementAnalysisRemunerationBatchRequestDto } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/dto/request/update-special-category-retirement-analysis-remuneration-batch.request.dto';
import { UpdateSpecialCategoryRetirementAnalysisRemunerationBatchResponseDto } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/dto/response/update-special-category-retirement-analysis-remuneration-batch.response.dto';
import { CreateSpecialCategoryRetirementAnalysisRemunerationBatchUseCase } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/use-case/create-special-category-retirement-analysis-remuneration-batch.use-case';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';

@Injectable()
export class UpdateSpecialCategoryRetirementAnalysisRemunerationBatchUseCase {
  protected readonly _type =
    UpdateSpecialCategoryRetirementAnalysisRemunerationBatchUseCase.name;

  public constructor(
    @Inject(SpecialCategoryRetirementAnalysisRemunerationQueryRepositoryGateway)
    private readonly remunerationQueryRepositoryGateway: SpecialCategoryRetirementAnalysisRemunerationQueryRepositoryGateway,
    @Inject(
      SpecialCategoryRetirementAnalysisRemunerationCommandRepositoryGateway,
    )
    private readonly remunerationCommandRepositoryGateway: SpecialCategoryRetirementAnalysisRemunerationCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(CreateSpecialCategoryRetirementAnalysisRemunerationBatchUseCase)
    private readonly createRemunerationBatchUseCase: CreateSpecialCategoryRetirementAnalysisRemunerationBatchUseCase,
  ) {}

  public async execute(
    organizationSessionData: OrganizationSessionDataModel,
    analysisId: SpecialCategoryRetirementAnalysisId,
    dto: UpdateSpecialCategoryRetirementAnalysisRemunerationBatchRequestDto,
  ): Promise<UpdateSpecialCategoryRetirementAnalysisRemunerationBatchResponseDto> {
    await this.deleteExistingRemunerations(analysisId);

    const createDto =
      CreateSpecialCategoryRetirementAnalysisRemunerationBatchRequestDto.build({
        items: dto.items,
      });

    const created = await this.createRemunerationBatchUseCase.execute(
      organizationSessionData,
      analysisId,
      createDto,
    );

    return UpdateSpecialCategoryRetirementAnalysisRemunerationBatchResponseDto.build(
      { data: created.data },
    );
  }

  private async deleteExistingRemunerations(
    analysisId: SpecialCategoryRetirementAnalysisId,
  ): Promise<void> {
    const existingRemunerations =
      await this.remunerationQueryRepositoryGateway.listByAnalysisId(
        analysisId,
      );

    if (existingRemunerations.length === 0) {
      return;
    }

    const deleteTransactions: TransactionType[] = existingRemunerations.map(
      (remuneration) =>
        this.remunerationCommandRepositoryGateway.deleteSpecialCategoryRetirementAnalysisRemuneration(
          remuneration.specialCategoryRetirementAnalysisRemunerationId,
        ),
    );

    const transaction =
      await this.baseTransactionRepositoryGateway.execute(deleteTransactions);

    await transaction.commit();
  }
}
