import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { AudienceQuestionGeneratorId } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator/value-object/audience-question-generator-id/audience-question-generator-id.value-object';

export class GetAudienceQuestionGeneratorQueryResult extends BaseBuildableObject {
  public readonly id: AudienceQuestionGeneratorId;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetAudienceQuestionGeneratorQueryResult.name;
}
