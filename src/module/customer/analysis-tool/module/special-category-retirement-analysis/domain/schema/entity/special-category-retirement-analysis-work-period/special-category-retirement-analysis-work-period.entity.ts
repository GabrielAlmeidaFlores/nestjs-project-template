import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { SpecialCategoryRetirementAnalysisWorkPeriodId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-work-period/value-object/special-category-retirement-analysis-work-period-id/special-category-retirement-analysis-work-period-id.value-object';

import type { SpecialCategoryRetirementAnalysisId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis/value-object/special-category-retirement-analysis-id/special-category-retirement-analysis-id.value-object';
import type { PublicServiceTypeCategoryEnum } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-work-period/enum/public-service-type-category.enum';
import type { SpecialTimeRegistrationTypeEnum } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-work-period/enum/special-time-registration-type.enum';
import type { SpecialCategoryRetirementAnalysisWorkPeriodEntityPropsInterface } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-work-period/special-category-retirement-analysis-work-period.entity.props.interface';

export class SpecialCategoryRetirementAnalysisWorkPeriodEntity extends BaseEntity<SpecialCategoryRetirementAnalysisWorkPeriodId> {
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

  protected readonly _type =
    SpecialCategoryRetirementAnalysisWorkPeriodEntity.name;

  public constructor(
    props: SpecialCategoryRetirementAnalysisWorkPeriodEntityPropsInterface,
  ) {
    super(SpecialCategoryRetirementAnalysisWorkPeriodId, props);
    this.specialCategoryRetirementAnalysisId =
      props.specialCategoryRetirementAnalysisId;
    this.publicServiceAdmissionDate = props.publicServiceAdmissionDate ?? null;
    this.publicServiceCareerStartDate =
      props.publicServiceCareerStartDate ?? null;
    this.workPeriodStartDate = props.workPeriodStartDate;
    this.workPeriodEndDate = props.workPeriodEndDate;
    this.jobPositionTitle = props.jobPositionTitle ?? null;
    this.careerPathName = props.careerPathName ?? null;
    this.publicServiceTypeCategory = props.publicServiceTypeCategory ?? null;
    this.specialTimeRegistrationType = props.specialTimeRegistrationType;
    this.effectiveSpecialWorkStartDate =
      props.effectiveSpecialWorkStartDate ?? null;
    this.effectiveSpecialWorkEndDate =
      props.effectiveSpecialWorkEndDate ?? null;
  }
}
