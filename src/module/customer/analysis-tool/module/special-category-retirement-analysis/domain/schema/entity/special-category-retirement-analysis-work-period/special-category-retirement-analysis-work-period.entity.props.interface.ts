import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { SpecialCategoryRetirementAnalysisId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis/value-object/special-category-retirement-analysis-id/special-category-retirement-analysis-id.value-object';
import type { PublicServiceTypeCategoryEnum } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-work-period/enum/public-service-type-category.enum';
import type { SpecialTimeRegistrationTypeEnum } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-work-period/enum/special-time-registration-type.enum';
import type { SpecialCategoryRetirementAnalysisWorkPeriodId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-work-period/value-object/special-category-retirement-analysis-work-period-id/special-category-retirement-analysis-work-period-id.value-object';

export interface SpecialCategoryRetirementAnalysisWorkPeriodEntityPropsInterface extends BaseEntityPropsInterface<SpecialCategoryRetirementAnalysisWorkPeriodId> {
  specialCategoryRetirementAnalysisId: SpecialCategoryRetirementAnalysisId;
  publicServiceAdmissionDate?: Date | null;
  publicServiceCareerStartDate?: Date | null;
  workPeriodStartDate: Date;
  workPeriodEndDate: Date;
  jobPositionTitle?: string | null;
  careerPathName?: string | null;
  publicServiceTypeCategory?: PublicServiceTypeCategoryEnum | null;
  specialTimeRegistrationType: SpecialTimeRegistrationTypeEnum;
  effectiveSpecialWorkStartDate?: Date | null;
  effectiveSpecialWorkEndDate?: Date | null;
}
