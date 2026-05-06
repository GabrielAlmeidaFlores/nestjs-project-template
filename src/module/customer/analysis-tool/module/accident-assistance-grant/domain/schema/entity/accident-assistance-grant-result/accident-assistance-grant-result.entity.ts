import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { AccidentAssistanceGrantResultId } from '@module/customer/analysis-tool/module/accident-assistance-grant/domain/schema/entity/accident-assistance-grant-result/value-object/accident-assistance-grant-result-id.value-object';

import type { AccidentAssistanceGrantResultEntityPropsInterface } from '@module/customer/analysis-tool/module/accident-assistance-grant/domain/schema/entity/accident-assistance-grant-result/accident-assistance-grant-result.entity.props.interface';

export class AccidentAssistanceGrantResultEntity extends BaseEntity<AccidentAssistanceGrantResultId> {
  public readonly firstAnalysis: string | null;
  public readonly simplifiedAnalysis: string | null;
  public readonly completeAnalysis: string | null;

  protected readonly _type = AccidentAssistanceGrantResultEntity.name;

  public constructor(
    props: AccidentAssistanceGrantResultEntityPropsInterface,
  ) {
    super(AccidentAssistanceGrantResultId, props);
    this.firstAnalysis = props.firstAnalysis ?? null;
    this.simplifiedAnalysis = props.simplifiedAnalysis ?? null;
    this.completeAnalysis = props.completeAnalysis ?? null;
  }
}
