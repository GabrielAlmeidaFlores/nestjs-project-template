import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { DeathBenefitRejectionPeriodId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-period/value-object/death-benefit-rejection-period-id.value-object';
import type { DeathBenefitRejectionPeriodDocumentId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-period-document/value-object/death-benefit-rejection-period-document-id.value-object';

export interface DeathBenefitRejectionPeriodDocumentEntityPropsInterface extends BaseEntityPropsInterface<DeathBenefitRejectionPeriodDocumentId> {
  document: string;
  deathBenefitRejectionPeriodId: DeathBenefitRejectionPeriodId;
}
