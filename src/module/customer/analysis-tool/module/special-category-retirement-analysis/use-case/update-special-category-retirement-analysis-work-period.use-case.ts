import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { SpecialCategoryRetirementAnalysisWorkPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis-work-period/command/special-category-retirement-analysis-work-period.command.repository.gateway';
import { SpecialCategoryRetirementAnalysisWorkPeriodQueryRepositoryGateway } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis-work-period/query/special-category-retirement-analysis-work-period.query.repository.gateway';
import { SpecialCategoryRetirementAnalysisWorkPeriodEntity } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-work-period/special-category-retirement-analysis-work-period.entity';
import { SpecialCategoryRetirementAnalysisWorkPeriodId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-work-period/value-object/special-category-retirement-analysis-work-period-id/special-category-retirement-analysis-work-period-id.value-object';
import { UpdateSpecialCategoryRetirementAnalysisWorkPeriodRequestDto } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/dto/request/update-special-category-retirement-analysis-work-period.request.dto';
import { UpdateSpecialCategoryRetirementAnalysisWorkPeriodResponseDto } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/dto/response/update-special-category-retirement-analysis-work-period.response.dto';
import { SpecialCategoryRetirementAnalysisWorkPeriodNotFoundError } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/error/special-category-retirement-analysis-work-period-not-found.error';

@Injectable()
export class UpdateSpecialCategoryRetirementAnalysisWorkPeriodUseCase {
  protected readonly _type =
    UpdateSpecialCategoryRetirementAnalysisWorkPeriodUseCase.name;

  public constructor(
    @Inject(SpecialCategoryRetirementAnalysisWorkPeriodQueryRepositoryGateway)
    private readonly workPeriodQueryRepositoryGateway: SpecialCategoryRetirementAnalysisWorkPeriodQueryRepositoryGateway,
    @Inject(SpecialCategoryRetirementAnalysisWorkPeriodCommandRepositoryGateway)
    private readonly workPeriodCommandRepositoryGateway: SpecialCategoryRetirementAnalysisWorkPeriodCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    workPeriodId: SpecialCategoryRetirementAnalysisWorkPeriodId,
    dto: UpdateSpecialCategoryRetirementAnalysisWorkPeriodRequestDto,
  ): Promise<UpdateSpecialCategoryRetirementAnalysisWorkPeriodResponseDto> {
    const queryResult =
      await this.workPeriodQueryRepositoryGateway.findOneByIdOrFail(
        workPeriodId,
        SpecialCategoryRetirementAnalysisWorkPeriodNotFoundError,
      );

    const updatedWorkPeriod =
      new SpecialCategoryRetirementAnalysisWorkPeriodEntity({
        id: workPeriodId,
        specialCategoryRetirementAnalysisId:
          queryResult.specialCategoryRetirementAnalysisId,
        publicServiceAdmissionDate:
          dto.publicServiceAdmissionDate ??
          queryResult.publicServiceAdmissionDate,
        publicServiceCareerStartDate:
          dto.publicServiceCareerStartDate ??
          queryResult.publicServiceCareerStartDate,
        workPeriodStartDate:
          dto.workPeriodStartDate ?? queryResult.workPeriodStartDate,
        workPeriodEndDate:
          dto.workPeriodEndDate ?? queryResult.workPeriodEndDate,
        jobPositionTitle: dto.jobPositionTitle ?? queryResult.jobPositionTitle,
        careerPathName: dto.careerPathName ?? queryResult.careerPathName,
        publicServiceTypeCategory:
          dto.publicServiceTypeCategory ??
          queryResult.publicServiceTypeCategory,
        specialTimeRegistrationType:
          dto.specialTimeRegistrationType ??
          queryResult.specialTimeRegistrationType,
        effectiveSpecialWorkStartDate:
          dto.effectiveSpecialWorkStartDate ??
          queryResult.effectiveSpecialWorkStartDate,
        effectiveSpecialWorkEndDate:
          dto.effectiveSpecialWorkEndDate ??
          queryResult.effectiveSpecialWorkEndDate,
        createdAt: queryResult.createdAt,
        updatedAt: new Date(),
      });

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      this.workPeriodCommandRepositoryGateway.updateSpecialCategoryRetirementAnalysisWorkPeriod(
        workPeriodId,
        updatedWorkPeriod,
      ),
    ]);

    await transaction.commit();

    return UpdateSpecialCategoryRetirementAnalysisWorkPeriodResponseDto.build({
      specialCategoryRetirementAnalysisWorkPeriodId: workPeriodId,
    });
  }
}
