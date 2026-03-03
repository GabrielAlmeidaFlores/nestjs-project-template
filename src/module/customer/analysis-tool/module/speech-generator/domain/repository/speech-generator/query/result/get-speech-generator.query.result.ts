import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { SpeechGeneratorDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/speech-generator-document.typeorm.entity';
import type { SpeechGeneratorResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/speech-generator-result.typeorm.entity';
import type { SpeechGeneratorId } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator/value-object/speech-generator-id/speech-generator-id.value-object';

export class GetSpeechGeneratorQueryResult extends BaseBuildableObject {
  public readonly id: SpeechGeneratorId;
  public readonly speechGeneratorDocument: SpeechGeneratorDocumentTypeormEntity[];
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;
  public readonly speechGeneratorResult: SpeechGeneratorResultTypeormEntity | null;

  protected override readonly _type = GetSpeechGeneratorQueryResult.name;
}
