import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { SpeechGeneratorBenefitId } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator-benefit/value-object/speech-generator-benefit-id/speech-generator-benefit-id.value-object';

export class GetSpeechGeneratorBenefitQueryResult extends BaseBuildableObject {
  public readonly id: SpeechGeneratorBenefitId;
  public readonly inssBenefitNumber: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetSpeechGeneratorBenefitQueryResult.name;
}
