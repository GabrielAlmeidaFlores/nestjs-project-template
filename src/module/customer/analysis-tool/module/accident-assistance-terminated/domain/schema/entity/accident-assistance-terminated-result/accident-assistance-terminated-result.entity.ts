import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { AccidentAssistanceTerminatedResultId } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-result/value-object/accident-assistance-terminated-result-id/accident-assistance-terminated-result-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { AccidentAssistanceTerminatedResultEntityPropsInterface } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-result/accident-assistance-terminated-result.entity.props.interface';

export class AccidentAssistanceTerminatedResultEntity extends BaseEntity<AccidentAssistanceTerminatedResultId> {
  @Description('Análise completa de auxílio-acidente cessado.')
  public readonly accidentAssistanceTerminatedCompleteAnalysis: string | null;

  @Description('Análise simplificada de auxílio-acidente cessado.')
  public readonly accidentAssistanceTerminatedSimplifiedAnalysis: string | null;

  @Description('Detalhes da decisão do benefício.')
  public readonly decisionDetails: string | null;

  protected readonly _type = AccidentAssistanceTerminatedResultEntity.name;

  public constructor(
    props: AccidentAssistanceTerminatedResultEntityPropsInterface,
  ) {
    super(AccidentAssistanceTerminatedResultId, props);

    this.accidentAssistanceTerminatedCompleteAnalysis =
      props.accidentAssistanceTerminatedCompleteAnalysis ?? null;
    this.accidentAssistanceTerminatedSimplifiedAnalysis =
      props.accidentAssistanceTerminatedSimplifiedAnalysis ?? null;
    this.decisionDetails = props.decisionDetails ?? null;
  }
}
