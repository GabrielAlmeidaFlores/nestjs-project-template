import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { DeathBenefitGrantId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant/value-object/death-benefit-grant-id.value-object';
import type { DeathBenefitGrantInssBenefitId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-inss-benefit/value-object/death-benefit-grant-inss-benefit-id.value-object';

export interface DeathBenefitGrantInssBenefitEntityPropsInterface extends BaseEntityPropsInterface<DeathBenefitGrantInssBenefitId> {
  inssBenefit: string;
  deathBenefitGrantId: DeathBenefitGrantId;
}
