import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { AccidentAssistanceTerminatedResultId } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-result/value-object/accident-assistance-terminated-result-id/accident-assistance-terminated-result-id.value-object';

export class GetAccidentAssistanceTerminatedResultQueryResult extends BaseBuildableObject {
  public readonly id: AccidentAssistanceTerminatedResultId;
  public readonly clientName: string | null;
  public readonly accidentAssistanceTerminatedCompleteAnalysis: string | null;
  public readonly accidentAssistanceTerminatedSimplifiedAnalysis: string | null;
  public readonly decisionDetails: string | null;
  public readonly firstAnalysis: string | null;
  public readonly completeAnalysisDownload: string | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  protected override readonly _type =
    GetAccidentAssistanceTerminatedResultQueryResult.name;
}
