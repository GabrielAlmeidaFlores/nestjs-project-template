import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import type { AccidentAssistanceGrantCategoryEnum } from '@module/customer/analysis-tool/module/accident-assistance-grant/domain/schema/entity/accident-assistance-grant/enum/accident-assistance-grant-category.enum';
import type { AccidentAssistanceGrantId } from '@module/customer/analysis-tool/module/accident-assistance-grant/domain/schema/entity/accident-assistance-grant/value-object/accident-assistance-grant-id.value-object';
import type { AccidentAssistanceGrantDocumentEntity } from '@module/customer/analysis-tool/module/accident-assistance-grant/domain/schema/entity/accident-assistance-grant-document/accident-assistance-grant-document.entity';
import type { AccidentAssistanceGrantResultEntity } from '@module/customer/analysis-tool/module/accident-assistance-grant/domain/schema/entity/accident-assistance-grant-result/accident-assistance-grant-result.entity';

export class GetAccidentAssistanceGrantWithRelationsQueryResult extends BaseBuildableObject {
  public readonly accidentAssistanceGrantId: AccidentAssistanceGrantId;
  public readonly analysisToolClientId: AnalysisToolClientId;
  public readonly analysisName: string | null;
  public readonly category: AccidentAssistanceGrantCategoryEnum | null;
  public readonly accidentDate: Date | null;
  public readonly hadPreviousTemporaryDisabilityAssistance: boolean | null;
  public readonly sequelDescription: string | null;
  public readonly associatedCidId: string | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  public readonly accidentAssistanceGrantResult: AccidentAssistanceGrantResultEntity | null;
  public readonly accidentAssistanceGrantDocument:
    | AccidentAssistanceGrantDocumentEntity[]
    | null;

  protected override readonly _type =
    GetAccidentAssistanceGrantWithRelationsQueryResult.name;
}
