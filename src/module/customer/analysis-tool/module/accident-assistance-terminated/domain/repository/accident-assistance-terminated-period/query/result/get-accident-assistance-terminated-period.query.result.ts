import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { AccidentAssistanceTerminatedPeriodReasonPendencyEnum } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-period/enum/accident-assistance-terminated-period-reason-pendency.enum';
import type { AccidentAssistanceTerminatedPeriodId } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-period/value-object/accident-assistance-terminated-period-id/accident-assistance-terminated-period-id.value-object';

export class GetAccidentAssistanceTerminatedPeriodQueryResult extends BaseBuildableObject {
  public readonly id: AccidentAssistanceTerminatedPeriodId;
  public readonly sequencial: number | null;
  public readonly periodName: string | null;
  public readonly periodStart: Date | null;
  public readonly periodEnd: Date | null;
  public readonly category: string | null;
  public readonly isPendency: boolean | null;
  public readonly competenceBelowTheMinimum: boolean | null;
  public readonly contributionAverage: DecimalValue | null;
  public readonly typeOfContribution: string | null;
  public readonly status: boolean | null;
  public readonly reasonPendency: AccidentAssistanceTerminatedPeriodReasonPendencyEnum | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetAccidentAssistanceTerminatedPeriodQueryResult.name;
}
