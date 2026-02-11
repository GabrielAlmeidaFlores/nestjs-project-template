import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { SpeechGeneratorLegalProceedingId } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator-legal-proceeding/value-object/speech-generator-legal-proceeding-id/speech-generator-legal-proceeding-id.value-object';

export class GetSpeechGeneratorLegalProceedingQueryResult extends BaseBuildableObject {
  public readonly id: SpeechGeneratorLegalProceedingId;
  public readonly legalProceedingNumber: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetSpeechGeneratorLegalProceedingQueryResult.name;
}
