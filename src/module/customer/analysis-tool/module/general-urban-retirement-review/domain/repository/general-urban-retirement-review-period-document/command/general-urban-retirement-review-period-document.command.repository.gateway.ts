import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { GeneralUrbanRetirementReviewPeriodDocumentEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-period-document/general-urban-retirement-review-period-document.entity';
import type { GeneralUrbanRetirementReviewPeriodDocumentId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-period-document/value-object/general-urban-retirement-review-period-document-id.value-object';

export abstract class GeneralUrbanRetirementReviewPeriodDocumentCommandRepositoryGateway {
  public abstract createGeneralUrbanRetirementReviewPeriodDocument(
    props: GeneralUrbanRetirementReviewPeriodDocumentEntity,
  ): TransactionType;

  public abstract updateGeneralUrbanRetirementReviewPeriodDocument(
    id: GeneralUrbanRetirementReviewPeriodDocumentId,
    props: GeneralUrbanRetirementReviewPeriodDocumentEntity,
  ): TransactionType;
}
