import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { DeathBenefitGrantPeriodId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-period/value-object/death-benefit-grant-period-id.value-object';
import type { DeathBenefitGrantPeriodDocumentId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-period-document/value-object/death-benefit-grant-period-document-id.value-object';

export interface DeathBenefitGrantPeriodDocumentEntityPropsInterface extends BaseEntityPropsInterface<DeathBenefitGrantPeriodDocumentId> {
  document: string;
  deathBenefitGrantPeriodId: DeathBenefitGrantPeriodId;
}
