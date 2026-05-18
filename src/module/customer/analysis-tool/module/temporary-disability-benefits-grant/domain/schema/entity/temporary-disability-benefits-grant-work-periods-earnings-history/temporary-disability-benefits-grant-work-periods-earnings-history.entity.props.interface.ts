import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { TemporaryDisabilityBenefitsGrantWorkPeriodsId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-work-periods/value-object/temporary-disability-benefits-grant-work-periods-id.value-object';
import type { TemporaryDisabilityBenefitsGrantWorkPeriodsEarningsHistoryId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-work-periods-earnings-history/value-object/temporary-disability-benefits-grant-work-periods-earnings-history-id.value-object';

export interface TemporaryDisabilityBenefitsGrantWorkPeriodsEarningsHistoryEntityPropsInterface extends BaseEntityPropsInterface<TemporaryDisabilityBenefitsGrantWorkPeriodsEarningsHistoryId> {
  competence?: Date | null;
  remuneration?: string | null;
  indicators?: string | null;
  paymentDate?: Date | null;
  contribution?: string | null;
  contributionSalary?: string | null;
  competenceBelowTheMinimum?: boolean | null;
  temporaryDisabilityBenefitsGrantWorkPeriodsId: TemporaryDisabilityBenefitsGrantWorkPeriodsId;
}
