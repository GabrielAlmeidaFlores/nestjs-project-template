import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { GetConversationQueryResult } from '@module/ai/domain/repository/conversation/query/result/get-conversation.query.result';
import type { LegalPleadingResultId } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading-result/value-object/legal-pleading-result-id/legal-pleading-result-id.value-object';

export class GetLegalPleadingResultQueryResult extends BaseBuildableObject {
  public readonly id: LegalPleadingResultId;
  public readonly legalPleadingCompleteAnalysis: string | null;
  public readonly legalPleadingSimplifiedAnalysis: string | null;
  public readonly conversation: GetConversationQueryResult | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type = GetLegalPleadingResultQueryResult.name;
}
