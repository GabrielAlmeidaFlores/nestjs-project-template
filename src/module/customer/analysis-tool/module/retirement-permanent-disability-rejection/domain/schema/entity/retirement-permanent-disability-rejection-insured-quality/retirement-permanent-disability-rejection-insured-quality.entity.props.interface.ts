import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { RetirementPermanentDisabilityRejectionInsuredQualityId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-insured-quality/value-object/retirement-permanent-disability-rejection-insured-quality-id/retirement-permanent-disability-rejection-insured-quality-id.value-object';

export interface RetirementPermanentDisabilityRejectionInsuredQualityEntityPropsInterface extends BaseEntityPropsInterface<RetirementPermanentDisabilityRejectionInsuredQualityId> {
  isInvoluntaryUnemployed: boolean;
  intendsToProveInvoluntaryUnemployment?: boolean | null;
  isRuralInsuredAtGeneratingFact: boolean;
  ruralInsuredStartDate?: Date | null;
  ruralInsuredEndDate?: Date | null;
  ruralInsuredDescription?: string | null;
}
