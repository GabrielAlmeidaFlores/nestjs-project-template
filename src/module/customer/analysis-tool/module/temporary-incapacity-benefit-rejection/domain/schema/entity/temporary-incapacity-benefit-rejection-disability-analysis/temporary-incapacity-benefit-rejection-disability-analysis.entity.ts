import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { TemporaryIncapacityBenefitRejectionDisabilityAnalysisId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-disability-analysis/value-object/temporary-incapacity-benefit-rejection-disability-analysis-id.value-object';

import type { TemporaryIncapacityBenefitRejectionId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection/value-object/temporary-incapacity-benefit-rejection-id.value-object';
import type { TemporaryIncapacityBenefitRejectionSevereDiseaseEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-disability-analysis/enum/temporary-incapacity-benefit-rejection-severe-disease.enum';
import type { TemporaryIncapacityBenefitRejectionDisabilityAnalysisEntityPropsInterface } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-disability-analysis/temporary-incapacity-benefit-rejection-disability-analysis.entity.props.interface';

export class TemporaryIncapacityBenefitRejectionDisabilityAnalysisEntity extends BaseEntity<TemporaryIncapacityBenefitRejectionDisabilityAnalysisId> {
  public readonly estimatedDisabilityStartDate: Date;
  public readonly shortDisabilityDescription: string | null;
  public readonly disabilityFromAccident: boolean;
  public readonly disablingConditionDescription: string | null;
  public readonly disabilityFromSevereDisease: boolean;
  public readonly severeDisease: TemporaryIncapacityBenefitRejectionSevereDiseaseEnum | null;
  public readonly diseaseCustomName: string | null;
  public readonly diseaseStartDate: Date | null;
  public readonly needsConstantAssistanceFromAnotherPerson: boolean;
  public readonly previousDisabilityBenefit: boolean;
  public readonly previousBenefitNumber: string | null;
  public readonly temporaryIncapacityBenefitRejectionId: TemporaryIncapacityBenefitRejectionId;

  protected readonly _type =
    TemporaryIncapacityBenefitRejectionDisabilityAnalysisEntity.name;

  public constructor(
    props: TemporaryIncapacityBenefitRejectionDisabilityAnalysisEntityPropsInterface,
  ) {
    super(TemporaryIncapacityBenefitRejectionDisabilityAnalysisId, props);
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
    this.temporaryIncapacityBenefitRejectionId =
      props.temporaryIncapacityBenefitRejectionId;
  }
}
