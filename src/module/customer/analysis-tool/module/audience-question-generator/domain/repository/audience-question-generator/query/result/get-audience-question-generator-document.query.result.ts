import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { AudienceQuestionGeneratorDocumentId } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator-document/value-object/audience-question-generator-document-id/audience-question-generator-document-id.value-object';

export class GetAudienceQuestionGeneratorDocumentQueryResult extends BaseBuildableObject {
  public readonly id: AudienceQuestionGeneratorDocumentId;
  public readonly document: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetAudienceQuestionGeneratorDocumentQueryResult.name;
}
