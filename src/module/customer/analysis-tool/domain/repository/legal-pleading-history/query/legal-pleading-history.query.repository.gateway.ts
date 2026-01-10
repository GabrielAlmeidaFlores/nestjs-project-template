import type { GetLegalPleadingHistoryQueryResult } from '@module/customer/analysis-tool/domain/repository/legal-pleading-history/query/result/get-legal-pleading-history.query.result';
import type { LegalPleadingId } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/value-object/legal-pleading-id/legal-pleading-id.value-object';
import type { LegalPleadingHistoryId } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading-history/value-object/legal-pleading-history-id/legal-pleading-history-id.value-object';

export abstract class LegalPleadingHistoryQueryRepositoryGateway {
  public abstract findOneLegalPleadingHistoryById(
    id: LegalPleadingHistoryId,
  ): Promise<GetLegalPleadingHistoryQueryResult | null>;

  public abstract findManyLegalPleadingHistoryByLegalPleadingId(
    legalPleadingId: LegalPleadingId,
  ): Promise<GetLegalPleadingHistoryQueryResult[]>;
}
