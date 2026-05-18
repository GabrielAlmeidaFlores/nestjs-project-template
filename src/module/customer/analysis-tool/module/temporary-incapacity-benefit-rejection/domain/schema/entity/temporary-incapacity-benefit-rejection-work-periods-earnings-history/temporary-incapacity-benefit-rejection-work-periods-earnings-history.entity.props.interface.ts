import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { TemporaryIncapacityBenefitRejectionWorkPeriodsId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-work-periods/value-object/temporary-incapacity-benefit-rejection-work-periods-id.value-object';
import type { TemporaryIncapacityBenefitRejectionWorkPeriodsEarningsHistoryId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-work-periods-earnings-history/value-object/temporary-incapacity-benefit-rejection-work-periods-earnings-history-id.value-object';

export interface TemporaryIncapacityBenefitRejectionWorkPeriodsEarningsHistoryEntityPropsInterface extends BaseEntityPropsInterface<TemporaryIncapacityBenefitRejectionWorkPeriodsEarningsHistoryId> {
  competence?: Date | null;
  remuneration?: string | null;
  indicators?: string | null;
  paymentDate?: Date | null;
  contribution?: string | null;
  contributionSalary?: string | null;
  competenceBelowTheMinimum?: boolean | null;
  temporaryIncapacityBenefitRejectionWorkPeriodsId: TemporaryIncapacityBenefitRejectionWorkPeriodsId;
}
