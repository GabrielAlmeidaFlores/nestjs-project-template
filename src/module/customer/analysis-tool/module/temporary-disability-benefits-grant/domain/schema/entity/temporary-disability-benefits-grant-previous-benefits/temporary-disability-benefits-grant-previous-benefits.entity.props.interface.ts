import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { TemporaryDisabilityBenefitsGrantPeriodId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-period/value-object/temporary-disability-benefits-grant-period-id.value-object';
import type { TemporaryDisabilityBenefitsGrantPreviousBenefitsId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-previous-benefits/value-object/temporary-disability-benefits-grant-previous-benefits-id.value-object';

export interface TemporaryDisabilityBenefitsGrantPreviousBenefitsEntityPropsInterface extends BaseEntityPropsInterface<TemporaryDisabilityBenefitsGrantPreviousBenefitsId> {
  benefitNumber: string;
  temporaryDisabilityBenefitsGrantPeriodId: TemporaryDisabilityBenefitsGrantPeriodId;
}
