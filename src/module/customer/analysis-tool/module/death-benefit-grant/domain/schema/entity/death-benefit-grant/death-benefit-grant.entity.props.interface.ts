import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { DeathBenefitGrantId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant/value-object/death-benefit-grant-id.value-object';
import type { DeathBenefitGrantResultId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-result/value-object/death-benefit-grant-result-id.value-object';

export interface DeathBenefitGrantEntityPropsInterface extends BaseEntityPropsInterface<DeathBenefitGrantId> {
  analysisName?: string | null;
  deathBenefitGrantResultId?: DeathBenefitGrantResultId | null;
}
