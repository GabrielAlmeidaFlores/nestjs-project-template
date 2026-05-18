import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { DeathBenefitRejectionId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection/value-object/death-benefit-rejection-id.value-object';
import type { DeathBenefitRejectionLegalProceedingId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-legal-proceeding/value-object/death-benefit-rejection-legal-proceeding-id.value-object';

export interface DeathBenefitRejectionLegalProceedingEntityPropsInterface extends BaseEntityPropsInterface<DeathBenefitRejectionLegalProceedingId> {
  legalProceedingNumber: string;
  deathBenefitRejectionId: DeathBenefitRejectionId;
}
