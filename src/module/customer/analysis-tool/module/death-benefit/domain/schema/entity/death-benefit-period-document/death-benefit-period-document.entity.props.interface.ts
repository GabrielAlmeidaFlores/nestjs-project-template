import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { DeathBenefitPeriodId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-period/value-object/death-benefit-period-id.value-object';
import type { DeathBenefitPeriodDocumentId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-period-document/value-object/death-benefit-period-document-id.value-object';

export interface DeathBenefitPeriodDocumentEntityPropsInterface
  extends BaseEntityPropsInterface<DeathBenefitPeriodDocumentId> {
  document: string;
  deathBenefitPeriodId: DeathBenefitPeriodId;
}
