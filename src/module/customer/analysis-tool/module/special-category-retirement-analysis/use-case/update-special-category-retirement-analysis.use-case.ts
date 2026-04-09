import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { SpecialCategoryRetirementAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis/command/special-category-retirement-analysis.command.repository.gateway';
import { SpecialCategoryRetirementAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis/query/special-category-retirement-analysis.query.repository.gateway';
import { SpecialCategoryRetirementAnalysisEntity } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis/special-category-retirement-analysis.entity';
import { SpecialCategoryRetirementAnalysisId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis/value-object/special-category-retirement-analysis-id/special-category-retirement-analysis-id.value-object';
import { UpdateSpecialCategoryRetirementAnalysisRequestDto } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/dto/request/update-special-category-retirement-analysis.request.dto';
import { UpdateSpecialCategoryRetirementAnalysisResponseDto } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/dto/response/update-special-category-retirement-analysis.response.dto';
import { SpecialCategoryRetirementAnalysisNotFoundError } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/error/special-category-retirement-analysis-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';

@Injectable()
export class UpdateSpecialCategoryRetirementAnalysisUseCase {
  protected readonly _type =
    UpdateSpecialCategoryRetirementAnalysisUseCase.name;

  public constructor(
    @Inject(SpecialCategoryRetirementAnalysisQueryRepositoryGateway)
    private readonly specialCategoryRetirementAnalysisQueryRepositoryGateway: SpecialCategoryRetirementAnalysisQueryRepositoryGateway,
    @Inject(SpecialCategoryRetirementAnalysisCommandRepositoryGateway)
    private readonly specialCategoryRetirementAnalysisCommandRepositoryGateway: SpecialCategoryRetirementAnalysisCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    organizationSessionData: OrganizationSessionDataModel,
    id: SpecialCategoryRetirementAnalysisId,
    dto: UpdateSpecialCategoryRetirementAnalysisRequestDto,
  ): Promise<UpdateSpecialCategoryRetirementAnalysisResponseDto> {
    const queryResult =
      await this.specialCategoryRetirementAnalysisQueryRepositoryGateway.findOneByIdAndOrganizationIdWithRelationsOrFail(
        id,
        organizationSessionData.organizationId,
        SpecialCategoryRetirementAnalysisNotFoundError,
      );

    if (!queryResult.analysisToolClientId) {
      throw new SpecialCategoryRetirementAnalysisNotFoundError();
    }

    const updatedEntity = new SpecialCategoryRetirementAnalysisEntity({
      id,
      analysisToolClientId: queryResult.analysisToolClientId,
      analysisCustomName:
        dto.analysisCustomName ?? queryResult.analysisCustomName,
      retirementAnalysisObjectiveType:
        dto.retirementAnalysisObjectiveType ??
        queryResult.retirementAnalysisObjectiveType,
      publicServiceFederativeEntityName:
        dto.publicServiceFederativeEntityName ??
        queryResult.publicServiceFederativeEntityName,
      publicServiceStateAbbreviation:
        dto.publicServiceStateAbbreviation ??
        queryResult.publicServiceStateAbbreviation,
      hasConfirmedExposureToHarmfulAgents:
        dto.hasConfirmedExposureToHarmfulAgents ??
        queryResult.hasConfirmedExposureToHarmfulAgents,
      createdAt: queryResult.createdAt,
      updatedAt: new Date(),
    });

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      this.specialCategoryRetirementAnalysisCommandRepositoryGateway.updateSpecialCategoryRetirementAnalysis(
        id,
        updatedEntity,
      ),
    ]);

    await transaction.commit();

    return UpdateSpecialCategoryRetirementAnalysisResponseDto.build({
      specialCategoryRetirementAnalysisId: id,
    });
  }
}
