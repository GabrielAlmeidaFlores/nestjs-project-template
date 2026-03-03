import type { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import type { ListLegalPleadingHistoryQueryParam } from '@module/customer/analysis-tool/module/legal-pleading/domain/repository/legal-pleading-history/query/param/list-legal-pleading-history.query.param';
import type { GetLegalPleadingHistoryQueryResult } from '@module/customer/analysis-tool/module/legal-pleading/domain/repository/legal-pleading-history/query/result/get-legal-pleading-history.query.result';
import type { LegalPleadingId } from '@module/customer/analysis-tool/module/legal-pleading/domain/schema/entity/legal-pleading/value-object/legal-pleading-id/legal-pleading-id.value-object';
import type { LegalPleadingHistoryId } from '@module/customer/analysis-tool/module/legal-pleading/domain/schema/entity/legal-pleading-history/value-object/legal-pleading-history-id/legal-pleading-history-id.value-object';

export abstract class LegalPleadingHistoryQueryRepositoryGateway {
  public abstract findOneLegalPleadingHistoryById(
    id: LegalPleadingHistoryId,
  ): Promise<GetLegalPleadingHistoryQueryResult | null>;

  public abstract listByLegalPleadingId(
    legalPleadingId: LegalPleadingId,
    listData: ListLegalPleadingHistoryQueryParam,
  ): Promise<ListDataOutputModel<GetLegalPleadingHistoryQueryResult>>;
}
