import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { TemporaryIncapacityBenefitTerminationDisabilityAnalysisId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-disability-analysis/value-object/temporary-incapacity-benefit-termination-disability-analysis-id.value-object';

import type { TemporaryIncapacityBenefitTerminationId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination/value-object/temporary-incapacity-benefit-termination-id.value-object';
import type { TemporaryIncapacityBenefitTerminationSevereDiseaseEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-disability-analysis/enum/temporary-incapacity-benefit-termination-severe-disease.enum';
import type { TemporaryIncapacityBenefitTerminationDisabilityAnalysisEntityPropsInterface } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-disability-analysis/temporary-incapacity-benefit-termination-disability-analysis.entity.props.interface';

export class TemporaryIncapacityBenefitTerminationDisabilityAnalysisEntity extends BaseEntity<TemporaryIncapacityBenefitTerminationDisabilityAnalysisId> {
  public readonly estimatedDisabilityStartDate: Date;
  public readonly shortDisabilityDescription: string | null;
  public readonly disabilityFromAccident: boolean;
  public readonly disablingConditionDescription: string | null;
  public readonly disabilityFromSevereDisease: boolean;
  public readonly severeDisease: TemporaryIncapacityBenefitTerminationSevereDiseaseEnum | null;
  public readonly diseaseCustomName: string | null;
  public readonly diseaseStartDate: Date | null;
  public readonly needsConstantAssistanceFromAnotherPerson: boolean;
  public readonly previousDisabilityBenefit: boolean;
  public readonly previousBenefitNumber: string | null;
  public readonly temporaryIncapacityBenefitTerminationId: TemporaryIncapacityBenefitTerminationId;

  protected readonly _type =
    TemporaryIncapacityBenefitTerminationDisabilityAnalysisEntity.name;

  public constructor(
    props: TemporaryIncapacityBenefitTerminationDisabilityAnalysisEntityPropsInterface,
  ) {
    super(TemporaryIncapacityBenefitTerminationDisabilityAnalysisId, props);
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
    this.temporaryIncapacityBenefitTerminationId =
      props.temporaryIncapacityBenefitTerminationId;
  }
}
