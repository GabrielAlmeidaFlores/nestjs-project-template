import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { AudienceQuestionGeneratorBenefitId } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator-benefit/value-object/audience-question-generator-benefit-id/audience-question-generator-benefit-id.value-object';

export class GetAudienceQuestionGeneratorBenefitQueryResult extends BaseBuildableObject {
  public readonly id: AudienceQuestionGeneratorBenefitId;
  public readonly inssBenefitNumber: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetAudienceQuestionGeneratorBenefitQueryResult.name;
}
