import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { RetirementPermanentDisabilityRejectionInsuredQualityId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-insured-quality/value-object/retirement-permanent-disability-rejection-insured-quality-id/retirement-permanent-disability-rejection-insured-quality-id.value-object';

import type { RetirementPermanentDisabilityRejectionInsuredQualityEntityPropsInterface } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-insured-quality/retirement-permanent-disability-rejection-insured-quality.entity.props.interface';

export class RetirementPermanentDisabilityRejectionInsuredQualityEntity extends BaseEntity<RetirementPermanentDisabilityRejectionInsuredQualityId> {
  public readonly isInvoluntaryUnemployed: boolean;
  public readonly intendsToProveInvoluntaryUnemployment: boolean | null;
  public readonly isRuralInsuredAtGeneratingFact: boolean;
  public readonly ruralInsuredStartDate: Date | null;
  public readonly ruralInsuredEndDate: Date | null;
  public readonly ruralInsuredDescription: string | null;

  protected readonly _type =
    RetirementPermanentDisabilityRejectionInsuredQualityEntity.name;

  public constructor(
    props: RetirementPermanentDisabilityRejectionInsuredQualityEntityPropsInterface,
  ) {
    super(RetirementPermanentDisabilityRejectionInsuredQualityId, props);
    this.isInvoluntaryUnemployed = props.isInvoluntaryUnemployed;
    this.intendsToProveInvoluntaryUnemployment =
      props.intendsToProveInvoluntaryUnemployment ?? null;
    this.isRuralInsuredAtGeneratingFact = props.isRuralInsuredAtGeneratingFact;
    this.ruralInsuredStartDate = props.ruralInsuredStartDate ?? null;
    this.ruralInsuredEndDate = props.ruralInsuredEndDate ?? null;
    this.ruralInsuredDescription = props.ruralInsuredDescription ?? null;
  }
}
