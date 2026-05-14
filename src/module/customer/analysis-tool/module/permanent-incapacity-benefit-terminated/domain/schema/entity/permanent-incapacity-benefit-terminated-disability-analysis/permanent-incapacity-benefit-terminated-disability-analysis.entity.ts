import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { PermanentIncapacityBenefitTerminatedDisabilityAnalysisId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-disability-analysis/value-object/permanent-incapacity-benefit-terminated-disability-analysis-id.value-object';

import type { PermanentIncapacityBenefitTerminatedId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated/value-object/permanent-incapacity-benefit-terminated-id.value-object';
import type { PermanentIncapacityBenefitTerminatedSevereDiseaseEnum } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-disability-analysis/enum/permanent-incapacity-benefit-terminated-severe-disease.enum';
import type { PermanentIncapacityBenefitTerminatedDisabilityAnalysisEntityPropsInterface } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-disability-analysis/permanent-incapacity-benefit-terminated-disability-analysis.entity.props.interface';

export class PermanentIncapacityBenefitTerminatedDisabilityAnalysisEntity extends BaseEntity<PermanentIncapacityBenefitTerminatedDisabilityAnalysisId> {
  public readonly estimatedDisabilityStartDate: Date;
  public readonly shortDisabilityDescription: string | null;
  public readonly disabilityFromAccident: boolean;
  public readonly disablingConditionDescription: string | null;
  public readonly disabilityFromSevereDisease: boolean;
  public readonly severeDisease: PermanentIncapacityBenefitTerminatedSevereDiseaseEnum | null;
  public readonly diseaseCustomName: string | null;
  public readonly diseaseStartDate: Date | null;
  public readonly needsConstantAssistanceFromAnotherPerson: boolean;
  public readonly previousDisabilityBenefit: boolean;
  public readonly previousBenefitNumber: string | null;
  public readonly permanentIncapacityBenefitTerminatedId: PermanentIncapacityBenefitTerminatedId;

  protected readonly _type =
    PermanentIncapacityBenefitTerminatedDisabilityAnalysisEntity.name;

  public constructor(
    props: PermanentIncapacityBenefitTerminatedDisabilityAnalysisEntityPropsInterface,
  ) {
    super(PermanentIncapacityBenefitTerminatedDisabilityAnalysisId, props);
    this.estimatedDisabilityStartDate = props.estimatedDisabilityStartDate;
    this.shortDisabilityDescription = props.shortDisabilityDescription ?? null;
    this.disabilityFromAccident = props.disabilityFromAccident;
    this.disablingConditionDescription =
      props.disablingConditionDescription ?? null;
    this.disabilityFromSevereDisease = props.disabilityFromSevereDisease;
    this.severeDisease = props.severeDisease ?? null;
    this.diseaseCustomName = props.diseaseCustomName ?? null;
    this.diseaseStartDate = props.diseaseStartDate ?? null;
    this.needsConstantAssistanceFromAnotherPerson =
      props.needsConstantAssistanceFromAnotherPerson;
    this.previousDisabilityBenefit = props.previousDisabilityBenefit;
    this.previousBenefitNumber = props.previousBenefitNumber ?? null;
    this.permanentIncapacityBenefitTerminatedId =
      props.permanentIncapacityBenefitTerminatedId;
  }
}
