import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { SpeechGeneratorDocumentTypeEnum } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator-document/enum/speech-generator-document-type.enum';
import type { SpeechGeneratorDocumentId } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator-document/value-object/speech-generator-document-id/speech-generator-document-id.value-object';

export class GetSpeechGeneratorDocumentQueryResult extends BaseBuildableObject {
  public readonly id: SpeechGeneratorDocumentId;
  public readonly document: string;
  public readonly type: SpeechGeneratorDocumentTypeEnum;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetSpeechGeneratorDocumentQueryResult.name;
}
