import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { GetSpeechGeneratorBenefitQueryResult } from '@module/customer/analysis-tool/module/speech-generator/domain/repository/speech-generator/query/result/get-speech-generator-benefit.query.result';
import type { GetSpeechGeneratorDocumentQueryResult } from '@module/customer/analysis-tool/module/speech-generator/domain/repository/speech-generator/query/result/get-speech-generator-document.query.result';
import type { GetSpeechGeneratorLegalProceedingQueryResult } from '@module/customer/analysis-tool/module/speech-generator/domain/repository/speech-generator/query/result/get-speech-generator-legal-proceeding.query.result';
import type { GetSpeechGeneratorResultQueryResult } from '@module/customer/analysis-tool/module/speech-generator/domain/repository/speech-generator-result/query/result/get-speech-generator-result.query.result';
import type { SpeechGeneratorId } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator/value-object/speech-generator-id/speech-generator-id.value-object';

export class GetSpeechGeneratorWithRelationsQueryResult extends BaseBuildableObject {
  public readonly id: SpeechGeneratorId;
  public readonly speechGeneratorDocument: GetSpeechGeneratorDocumentQueryResult[];
  public readonly speechGeneratorBenefit: GetSpeechGeneratorBenefitQueryResult[];
  public readonly speechGeneratorLegalProceeding: GetSpeechGeneratorLegalProceedingQueryResult[];
  public readonly speechGeneratorResult: GetSpeechGeneratorResultQueryResult | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetSpeechGeneratorWithRelationsQueryResult.name;
}
