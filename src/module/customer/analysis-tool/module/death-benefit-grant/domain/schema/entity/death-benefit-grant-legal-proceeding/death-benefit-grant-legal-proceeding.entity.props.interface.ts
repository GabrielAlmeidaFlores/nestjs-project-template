import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { DeathBenefitGrantId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant/value-object/death-benefit-grant-id.value-object';
import type { DeathBenefitGrantLegalProceedingId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-legal-proceeding/value-object/death-benefit-grant-legal-proceeding-id.value-object';

export interface DeathBenefitGrantLegalProceedingEntityPropsInterface extends BaseEntityPropsInterface<DeathBenefitGrantLegalProceedingId> {
  legalProceedingNumber: string;
  deathBenefitGrantId: DeathBenefitGrantId;
}
