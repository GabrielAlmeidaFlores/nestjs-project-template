import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { AccidentAssistanceTerminatedPeriodDocumentId } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-period-document/value-object/accident-assistance-terminated-period-document-id/accident-assistance-terminated-period-document-id.value-object';

import type { AccidentAssistanceTerminatedPeriodId } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-period/value-object/accident-assistance-terminated-period-id/accident-assistance-terminated-period-id.value-object';
import type { AccidentAssistanceTerminatedPeriodDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-period-document/accident-assistance-terminated-period-document.entity.props.interface';

export class AccidentAssistanceTerminatedPeriodDocumentEntity extends BaseEntity<AccidentAssistanceTerminatedPeriodDocumentId> {
  public readonly document: string | null;
  public readonly accidentAssistanceTerminatedPeriodId: AccidentAssistanceTerminatedPeriodId | null;

  protected readonly _type =
    AccidentAssistanceTerminatedPeriodDocumentEntity.name;

  public constructor(
    props: AccidentAssistanceTerminatedPeriodDocumentEntityPropsInterface,
  ) {
    super(AccidentAssistanceTerminatedPeriodDocumentId, props);
    this.document = props.document ?? null;
    this.accidentAssistanceTerminatedPeriodId =
      props.accidentAssistanceTerminatedPeriodId ?? null;
  }
}
