import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { DeathBenefitRejectionId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection/value-object/death-benefit-rejection-id.value-object';
import type { DeathBenefitRejectionInssBenefitId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-inss-benefit/value-object/death-benefit-rejection-inss-benefit-id.value-object';

export interface DeathBenefitRejectionInssBenefitEntityPropsInterface extends BaseEntityPropsInterface<DeathBenefitRejectionInssBenefitId> {
  inssBenefit: string;
  deathBenefitRejectionId: DeathBenefitRejectionId;
}
