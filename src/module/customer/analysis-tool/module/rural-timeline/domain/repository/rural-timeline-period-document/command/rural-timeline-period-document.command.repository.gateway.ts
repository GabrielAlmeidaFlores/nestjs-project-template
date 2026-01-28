import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { RuralTimelinePeriodDocumentEntity } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-period-document/rural-timeline-period-document.entity';
import type { RuralTimelinePeriodDocumentId } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-period-document/value-object/rural-timeline-period-document-id/rural-timeline-period-document-id.value-object';

export abstract class RuralTimelinePeriodDocumentCommandRepositoryGateway {
  public abstract createRuralTimelinePeriodDocument(
    props: RuralTimelinePeriodDocumentEntity,
  ): TransactionType;

  public abstract deleteRuralTimelinePeriodDocument(
    id: RuralTimelinePeriodDocumentId,
  ): TransactionType;
}
