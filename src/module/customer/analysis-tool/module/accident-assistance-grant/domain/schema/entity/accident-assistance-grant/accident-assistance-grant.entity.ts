import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { AccidentAssistanceGrantId } from '@module/customer/analysis-tool/module/accident-assistance-grant/domain/schema/entity/accident-assistance-grant/value-object/accident-assistance-grant-id.value-object';

import type { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import type { AccidentAssistanceGrantEntityPropsInterface } from '@module/customer/analysis-tool/module/accident-assistance-grant/domain/schema/entity/accident-assistance-grant/accident-assistance-grant.entity.props.interface';
import type { AccidentAssistanceGrantCategoryEnum } from '@module/customer/analysis-tool/module/accident-assistance-grant/domain/schema/entity/accident-assistance-grant/enum/accident-assistance-grant-category.enum';
import type { AccidentAssistanceGrantResultId } from '@module/customer/analysis-tool/module/accident-assistance-grant/domain/schema/entity/accident-assistance-grant-result/value-object/accident-assistance-grant-result-id.value-object';

export class AccidentAssistanceGrantEntity extends BaseEntity<AccidentAssistanceGrantId> {
  public readonly analysisToolClientId: AnalysisToolClientId;
  public readonly analysisName: string | null;
  public readonly category: AccidentAssistanceGrantCategoryEnum | null;
  public readonly accidentDate: Date | null;
  public readonly hadPreviousTemporaryDisabilityAssistance: boolean | null;
  public readonly sequelDescription: string | null;
  public readonly associatedCidId: string | null;
  public readonly accidentAssistanceGrantResultId: AccidentAssistanceGrantResultId | null;

  protected readonly _type = AccidentAssistanceGrantEntity.name;

  public constructor(props: AccidentAssistanceGrantEntityPropsInterface) {
    super(AccidentAssistanceGrantId, props);
    this.analysisToolClientId = props.analysisToolClientId;
    this.analysisName = props.analysisName ?? null;
    this.category = props.category ?? null;
    this.accidentDate = props.accidentDate ?? null;
    this.hadPreviousTemporaryDisabilityAssistance =
      props.hadPreviousTemporaryDisabilityAssistance ?? null;
    this.sequelDescription = props.sequelDescription ?? null;
    this.associatedCidId = props.associatedCidId ?? null;
    this.accidentAssistanceGrantResultId =
      props.accidentAssistanceGrantResultId ?? null;
  }
}
