import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import type { SpeechGeneratorResultId } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator-result/value-object/speech-generator-result-id/speech-generator-result-id.value-object';

export class GetSpeechGeneratorResultQueryResult extends BaseBuildableObject {
  public readonly id: SpeechGeneratorResultId;
  public readonly clientName: string | null;
  public readonly clientFederalDocument: FederalDocument | null;
  public readonly clientBirthDate: Date | null;
  public readonly clientLastAffiliationDate: Date | null;
  public readonly speechGeneratorCompleteContent: string | null;
  public readonly speechGeneratorSimplifiedContent: string | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type = GetSpeechGeneratorResultQueryResult.name;
}
