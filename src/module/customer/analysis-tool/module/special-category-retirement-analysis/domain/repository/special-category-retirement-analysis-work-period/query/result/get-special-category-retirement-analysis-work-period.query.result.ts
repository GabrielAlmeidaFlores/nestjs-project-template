import type { PublicServiceTypeCategoryEnum } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-work-period/enum/public-service-type-category.enum';
import type { SpecialTimeRegistrationTypeEnum } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-work-period/enum/special-time-registration-type.enum';
import type { SpecialCategoryRetirementAnalysisWorkPeriodId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-work-period/value-object/special-category-retirement-analysis-work-period-id/special-category-retirement-analysis-work-period-id.value-object';
import type { SpecialCategoryRetirementAnalysisId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis/value-object/special-category-retirement-analysis-id/special-category-retirement-analysis-id.value-object';

export class GetSpecialCategoryRetirementAnalysisWorkPeriodQueryResult {
  public readonly specialCategoryRetirementAnalysisWorkPeriodId: SpecialCategoryRetirementAnalysisWorkPeriodId;
  public readonly specialCategoryRetirementAnalysisId: SpecialCategoryRetirementAnalysisId;
  public readonly publicServiceAdmissionDate: Date | null;
  public readonly publicServiceCareerStartDate: Date | null;
  public readonly workPeriodStartDate: Date;
  public readonly workPeriodEndDate: Date;
  public readonly jobPositionTitle: string | null;
  public readonly careerPathName: string | null;
  public readonly publicServiceTypeCategory: PublicServiceTypeCategoryEnum | null;
  public readonly specialTimeRegistrationType: SpecialTimeRegistrationTypeEnum;
  public readonly effectiveSpecialWorkStartDate: Date | null;
  public readonly effectiveSpecialWorkEndDate: Date | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected readonly _type = GetSpecialCategoryRetirementAnalysisWorkPeriodQueryResult.name;
}
