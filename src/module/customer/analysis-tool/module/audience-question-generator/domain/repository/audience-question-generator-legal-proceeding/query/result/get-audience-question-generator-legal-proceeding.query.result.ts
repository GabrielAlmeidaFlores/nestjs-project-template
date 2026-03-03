import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { AudienceQuestionGeneratorLegalProceedingId } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator-legal-proceeding/value-object/audience-question-generator-legal-proceeding-id/audience-question-generator-legal-proceeding-id.value-object';

export class GetAudienceQuestionGeneratorLegalProceedingQueryResult extends BaseBuildableObject {
  public readonly id: AudienceQuestionGeneratorLegalProceedingId;
  public readonly legalProceedingNumber: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetAudienceQuestionGeneratorLegalProceedingQueryResult.name;
}
