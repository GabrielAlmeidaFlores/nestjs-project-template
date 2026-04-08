import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { DeathBenefitId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit/value-object/death-benefit-id.value-object';
import type { DeathBenefitLegalProceedingId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-legal-proceeding/value-object/death-benefit-legal-proceeding-id.value-object';

export interface DeathBenefitLegalProceedingEntityPropsInterface
  extends BaseEntityPropsInterface<DeathBenefitLegalProceedingId> {
  legalProceedingNumber: string;
  deathBenefitId: DeathBenefitId;
}
