import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { PermanentIncapacityBenefitTerminatedWorkPeriodsId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-work-periods/value-object/permanent-incapacity-benefit-terminated-work-periods-id.value-object';
import type { PermanentIncapacityBenefitTerminatedWorkPeriodsEarningsHistoryId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-work-periods-earnings-history/value-object/permanent-incapacity-benefit-terminated-work-periods-earnings-history-id.value-object';

export interface PermanentIncapacityBenefitTerminatedWorkPeriodsEarningsHistoryEntityPropsInterface extends BaseEntityPropsInterface<PermanentIncapacityBenefitTerminatedWorkPeriodsEarningsHistoryId> {
  competence?: Date | null;
  remuneration?: string | null;
  indicators?: string | null;
  paymentDate?: Date | null;
  contribution?: string | null;
  contributionSalary?: string | null;
  competenceBelowTheMinimum?: boolean | null;
  permanentIncapacityBenefitTerminatedWorkPeriodsId: PermanentIncapacityBenefitTerminatedWorkPeriodsId;
}
