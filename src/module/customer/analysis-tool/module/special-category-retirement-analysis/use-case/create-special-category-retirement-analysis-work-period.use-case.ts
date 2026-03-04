import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { SpecialCategoryRetirementAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis/query/special-category-retirement-analysis.query.repository.gateway';
import { SpecialCategoryRetirementAnalysisWorkPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis-work-period/command/special-category-retirement-analysis-work-period.command.repository.gateway';
import { SpecialCategoryRetirementAnalysisWorkPeriodEntity } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-work-period/special-category-retirement-analysis-work-period.entity';
import { CreateSpecialCategoryRetirementAnalysisWorkPeriodRequestDto } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/dto/request/create-special-category-retirement-analysis-work-period.request.dto';
import { CreateSpecialCategoryRetirementAnalysisWorkPeriodResponseDto } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/dto/response/create-special-category-retirement-analysis-work-period.response.dto';
import { SpecialCategoryRetirementAnalysisNotFoundError } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/error/special-category-retirement-analysis-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';

@Injectable()
export class CreateSpecialCategoryRetirementAnalysisWorkPeriodUseCase {
  protected readonly _type =
    CreateSpecialCategoryRetirementAnalysisWorkPeriodUseCase.name;

  public constructor(
    @Inject(SpecialCategoryRetirementAnalysisQueryRepositoryGateway)
    private readonly specialCategoryRetirementAnalysisQueryRepositoryGateway: SpecialCategoryRetirementAnalysisQueryRepositoryGateway,
    @Inject(SpecialCategoryRetirementAnalysisWorkPeriodCommandRepositoryGateway)
    private readonly workPeriodCommandRepositoryGateway: SpecialCategoryRetirementAnalysisWorkPeriodCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    organizationSessionData: OrganizationSessionDataModel,
    dto: CreateSpecialCategoryRetirementAnalysisWorkPeriodRequestDto,
  ): Promise<CreateSpecialCategoryRetirementAnalysisWorkPeriodResponseDto> {
    await this.specialCategoryRetirementAnalysisQueryRepositoryGateway.findOneByIdAndOrganizationIdWithRelationsOrFail(
      dto.specialCategoryRetirementAnalysisId,
      organizationSessionData.organizationId,
      SpecialCategoryRetirementAnalysisNotFoundError,
    );

    const workPeriod = new SpecialCategoryRetirementAnalysisWorkPeriodEntity({
      specialCategoryRetirementAnalysisId:
        dto.specialCategoryRetirementAnalysisId,
      publicServiceAdmissionDate: dto.publicServiceAdmissionDate ?? null,
      publicServiceCareerStartDate: dto.publicServiceCareerStartDate ?? null,
      workPeriodStartDate: dto.workPeriodStartDate,
      workPeriodEndDate: dto.workPeriodEndDate,
      jobPositionTitle: dto.jobPositionTitle ?? null,
      careerPathName: dto.careerPathName ?? null,
      publicServiceTypeCategory: dto.publicServiceTypeCategory ?? null,
      specialTimeRegistrationType: dto.specialTimeRegistrationType,
      effectiveSpecialWorkStartDate: dto.effectiveSpecialWorkStartDate ?? null,
      effectiveSpecialWorkEndDate: dto.effectiveSpecialWorkEndDate ?? null,
    });

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      this.workPeriodCommandRepositoryGateway.createSpecialCategoryRetirementAnalysisWorkPeriod(
        workPeriod,
      ),
    ]);

    await transaction.commit();

    return CreateSpecialCategoryRetirementAnalysisWorkPeriodResponseDto.build({
      specialCategoryRetirementAnalysisWorkPeriodId: workPeriod.id,
    });
  }
}
