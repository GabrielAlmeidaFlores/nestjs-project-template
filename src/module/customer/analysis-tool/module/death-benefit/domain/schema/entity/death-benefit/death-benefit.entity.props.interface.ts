import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { DeathBenefitId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit/value-object/death-benefit-id.value-object';
import type { DeathBenefitResultId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-result/value-object/death-benefit-result-id.value-object';

export interface DeathBenefitEntityPropsInterface
  extends BaseEntityPropsInterface<DeathBenefitId> {
  analysisName?: string | null;
  deathBenefitResultId?: DeathBenefitResultId | null;
}
