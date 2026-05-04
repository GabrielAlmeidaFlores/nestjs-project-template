import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { TemporaryDisabilityBenefitsTerminatedWorkPeriodsId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-work-periods/value-object/temporary-disability-benefits-terminated-work-periods-id.value-object';
import type { TemporaryDisabilityBenefitsTerminatedWorkPeriodsEarningsHistoryId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-work-periods-earnings-history/value-object/temporary-disability-benefits-terminated-work-periods-earnings-history-id.value-object';

export interface TemporaryDisabilityBenefitsTerminatedWorkPeriodsEarningsHistoryEntityPropsInterface extends BaseEntityPropsInterface<TemporaryDisabilityBenefitsTerminatedWorkPeriodsEarningsHistoryId> {
  competence?: Date | null;
  remuneration?: string | null;
  indicators?: string | null;
  paymentDate?: Date | null;
  contribution?: string | null;
  contributionSalary?: string | null;
  competenceBelowTheMinimum?: boolean | null;
  temporaryDisabilityBenefitsTerminatedWorkPeriodsId: TemporaryDisabilityBenefitsTerminatedWorkPeriodsId;
}
