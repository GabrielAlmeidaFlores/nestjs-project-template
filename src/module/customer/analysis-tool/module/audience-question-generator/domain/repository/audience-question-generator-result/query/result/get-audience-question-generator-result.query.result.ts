import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { AudienceQuestionGeneratorResultId } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator-result/value-object/audience-question-generator-result-id/audience-question-generator-result-id.value-object';

export class GetAudienceQuestionGeneratorResultQueryResult extends BaseBuildableObject {
  public readonly id: AudienceQuestionGeneratorResultId;
  public readonly audienceQuestionGeneratorCompleteAnalysis: string | null;
  public readonly audienceQuestionGeneratorSimplifiedAnalysis: string | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetAudienceQuestionGeneratorResultQueryResult.name;
}
