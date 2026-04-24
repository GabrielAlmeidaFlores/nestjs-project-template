import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { AccidentAssistanceTerminatedPeriodReasonPendencyEnum } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-period/enum/accident-assistance-terminated-period-reason-pendency.enum';
import type { AccidentAssistanceTerminatedPeriodId } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-period/value-object/accident-assistance-terminated-period-id/accident-assistance-terminated-period-id.value-object';

export interface AccidentAssistanceTerminatedPeriodEntityPropsInterface
  extends BaseEntityPropsInterface<AccidentAssistanceTerminatedPeriodId> {
  sequencial?: number | null;
  periodName?: string | null;
  periodStart?: Date | null;
  periodEnd?: Date | null;
  category?: string | null;
  isPendency?: boolean | null;
  competenceBelowTheMinimum?: boolean | null;
  contributionAverage?: DecimalValue | null;
  typeOfContribution?: string | null;
  status?: boolean | null;
  reasonPendency?: AccidentAssistanceTerminatedPeriodReasonPendencyEnum | null;
}
