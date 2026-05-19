import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { RetirementPermanentDisabilityRejectionIncapacityId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-incapacity/value-object/retirement-permanent-disability-rejection-incapacity-id/retirement-permanent-disability-rejection-incapacity-id.value-object';

import type { RetirementPermanentDisabilityRejectionSeriousDiseaseEnum } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-incapacity/enum/retirement-permanent-disability-rejection-serious-disease.enum';
import type { RetirementPermanentDisabilityRejectionIncapacityEntityPropsInterface } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-incapacity/retirement-permanent-disability-rejection-incapacity.entity.props.interface';

export class RetirementPermanentDisabilityRejectionIncapacityEntity extends BaseEntity<RetirementPermanentDisabilityRejectionIncapacityId> {
  public readonly incapacityStartDate: Date | null;
  public readonly diseaseDescription: string | null;
  public readonly isIncapacityFromAccident: boolean;
  public readonly incapacitatingEventDescription: string | null;
  public readonly isIncapacityFromSeriousDisease: boolean;
  public readonly seriousDiseaseType: RetirementPermanentDisabilityRejectionSeriousDiseaseEnum | null;
  public readonly seriousDiseaseOtherDescription: string | null;
  public readonly seriousDiseaseStartDate: Date | null;
  public readonly needsPermanentAssistance: boolean;
  public readonly hasPreviousIncapacityBenefit: boolean;

  protected readonly _type =
    RetirementPermanentDisabilityRejectionIncapacityEntity.name;

  public constructor(
    props: RetirementPermanentDisabilityRejectionIncapacityEntityPropsInterface,
  ) {
    super(RetirementPermanentDisabilityRejectionIncapacityId, props);
    this.incapacityStartDate = props.incapacityStartDate ?? null;
    this.diseaseDescription = props.diseaseDescription ?? null;
    this.isIncapacityFromAccident = props.isIncapacityFromAccident;
    this.incapacitatingEventDescription =
      props.incapacitatingEventDescription ?? null;
    this.isIncapacityFromSeriousDisease = props.isIncapacityFromSeriousDisease;
    this.seriousDiseaseType = props.seriousDiseaseType ?? null;
    this.seriousDiseaseOtherDescription =
      props.seriousDiseaseOtherDescription ?? null;
    this.seriousDiseaseStartDate = props.seriousDiseaseStartDate ?? null;
    this.needsPermanentAssistance = props.needsPermanentAssistance;
    this.hasPreviousIncapacityBenefit = props.hasPreviousIncapacityBenefit;
  }
}
