import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { AccidentAssistanceTerminatedPeriodReasonPendencyEnum } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-period/enum/accident-assistance-terminated-period-reason-pendency.enum';
import { AccidentAssistanceTerminatedPeriodEntityPropsInterface } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-period/accident-assistance-terminated-period.entity.props.interface';
import { AccidentAssistanceTerminatedPeriodId } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-period/value-object/accident-assistance-terminated-period-id/accident-assistance-terminated-period-id.value-object';

export class AccidentAssistanceTerminatedPeriodEntity extends BaseEntity<AccidentAssistanceTerminatedPeriodId> {
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

  protected readonly _type = AccidentAssistanceTerminatedPeriodEntity.name;

  public constructor(props: AccidentAssistanceTerminatedPeriodEntityPropsInterface) {
    super(AccidentAssistanceTerminatedPeriodId, props);
    this.sequencial = props.sequencial ?? null;
    this.periodName = props.periodName ?? null;
    this.periodStart = props.periodStart ?? null;
    this.periodEnd = props.periodEnd ?? null;
    this.category = props.category ?? null;
    this.isPendency = props.isPendency ?? null;
    this.competenceBelowTheMinimum = props.competenceBelowTheMinimum ?? null;
    this.contributionAverage = props.contributionAverage ?? null;
    this.typeOfContribution = props.typeOfContribution ?? null;
    this.status = props.status ?? null;
    this.reasonPendency = props.reasonPendency ?? null;
  }
}
