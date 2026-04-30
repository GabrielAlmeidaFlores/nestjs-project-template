import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { TemporaryIncapacityBenefitTerminationWorkPeriodsId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-work-periods/value-object/temporary-incapacity-benefit-termination-work-periods-id.value-object';
import type { TemporaryIncapacityBenefitTerminationWorkPeriodsEarningsHistoryId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-work-periods-earnings-history/value-object/temporary-incapacity-benefit-termination-work-periods-earnings-history-id.value-object';

export interface TemporaryIncapacityBenefitTerminationWorkPeriodsEarningsHistoryEntityPropsInterface extends BaseEntityPropsInterface<TemporaryIncapacityBenefitTerminationWorkPeriodsEarningsHistoryId> {
  competence?: Date | null;
  remuneration?: string | null;
  indicators?: string | null;
  paymentDate?: Date | null;
  contribution?: string | null;
  contributionSalary?: string | null;
  competenceBelowTheMinimum?: boolean | null;
  temporaryIncapacityBenefitTerminationWorkPeriodsId: TemporaryIncapacityBenefitTerminationWorkPeriodsId;
}
