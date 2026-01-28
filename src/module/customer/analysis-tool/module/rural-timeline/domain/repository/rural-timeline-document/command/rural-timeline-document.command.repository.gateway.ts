import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { RuralTimelineDocumentEntity } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-document/rural-timeline-document.entity';
import type { RuralTimelineDocumentId } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-document/value-object/rural-timeline-document-id/rural-timeline-document-id.value-object';

export abstract class RuralTimelineDocumentCommandRepositoryGateway {
  public abstract createRuralTimelineDocument(
    props: RuralTimelineDocumentEntity,
  ): TransactionType;

  public abstract deleteRuralTimelineDocument(
    id: RuralTimelineDocumentId,
  ): TransactionType;
}
