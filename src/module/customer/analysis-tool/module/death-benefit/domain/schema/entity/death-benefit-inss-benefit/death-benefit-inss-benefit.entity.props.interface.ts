import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { DeathBenefitId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit/value-object/death-benefit-id.value-object';
import type { DeathBenefitInssBenefitId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-inss-benefit/value-object/death-benefit-inss-benefit-id.value-object';

export interface DeathBenefitInssBenefitEntityPropsInterface
  extends BaseEntityPropsInterface<DeathBenefitInssBenefitId> {
  inssBenefit: string;
  deathBenefitId: DeathBenefitId;
}
