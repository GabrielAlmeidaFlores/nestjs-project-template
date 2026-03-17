import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { SpecialCategoryRetirementAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis/query/special-category-retirement-analysis.query.repository.gateway';
import { SpecialCategoryRetirementAnalysisRemunerationCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis-remuneration/command/special-category-retirement-analysis-remuneration.command.repository.gateway';
import { SpecialCategoryRetirementAnalysisId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis/value-object/special-category-retirement-analysis-id/special-category-retirement-analysis-id.value-object';
import { SpecialCategoryRetirementAnalysisRemunerationEntity } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-remuneration/special-category-retirement-analysis-remuneration.entity';
import { CreateSpecialCategoryRetirementAnalysisRemunerationRequestDto } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/dto/request/create-special-category-retirement-analysis-remuneration.request.dto';
import { CreateSpecialCategoryRetirementAnalysisRemunerationResponseDto } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/dto/response/create-special-category-retirement-analysis-remuneration.response.dto';
import { SpecialCategoryRetirementAnalysisNotFoundError } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/error/special-category-retirement-analysis-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';

@Injectable()
export class CreateSpecialCategoryRetirementAnalysisRemunerationUseCase {
  protected readonly _type =
    CreateSpecialCategoryRetirementAnalysisRemunerationUseCase.name;

  public constructor(
    @Inject(SpecialCategoryRetirementAnalysisQueryRepositoryGateway)
    private readonly specialCategoryRetirementAnalysisQueryRepositoryGateway: SpecialCategoryRetirementAnalysisQueryRepositoryGateway,
    @Inject(SpecialCategoryRetirementAnalysisRemunerationCommandRepositoryGateway)
    private readonly remunerationCommandRepositoryGateway: SpecialCategoryRetirementAnalysisRemunerationCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    organizationSessionData: OrganizationSessionDataModel,
    analysisId: SpecialCategoryRetirementAnalysisId,
    dto: CreateSpecialCategoryRetirementAnalysisRemunerationRequestDto,
  ): Promise<CreateSpecialCategoryRetirementAnalysisRemunerationResponseDto> {
    await this.specialCategoryRetirementAnalysisQueryRepositoryGateway.findOneByIdAndOrganizationIdWithRelationsOrFail(
      analysisId,
      organizationSessionData.organizationId,
      SpecialCategoryRetirementAnalysisNotFoundError,
    );

    const remuneration = new SpecialCategoryRetirementAnalysisRemunerationEntity(
      {
        specialCategoryRetirementAnalysisId: analysisId,
        remunerationReferenceMonthYear: dto.remunerationReferenceMonthYear,
        remunerationGrossAmount: dto.remunerationGrossAmount ?? null,
      },
    );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      this.remunerationCommandRepositoryGateway.createSpecialCategoryRetirementAnalysisRemuneration(
        remuneration,
      ),
    ]);

    await transaction.commit();

    return CreateSpecialCategoryRetirementAnalysisRemunerationResponseDto.build(
      {
        specialCategoryRetirementAnalysisRemunerationId: remuneration.id,
      },
    );
  }
}
