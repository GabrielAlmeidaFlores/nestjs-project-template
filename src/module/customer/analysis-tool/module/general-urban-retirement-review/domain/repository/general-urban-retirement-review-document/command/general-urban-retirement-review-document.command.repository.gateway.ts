import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { GeneralUrbanRetirementReviewId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review/value-object/general-urban-retirement-review-id.value-object';
import type { GeneralUrbanRetirementReviewDocumentEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-document/general-urban-retirement-review-document.entity';

export abstract class GeneralUrbanRetirementReviewDocumentCommandRepositoryGateway {
  public abstract createGeneralUrbanRetirementReviewDocument(
    props: GeneralUrbanRetirementReviewDocumentEntity,
  ): TransactionType;

  public abstract deleteAllByGeneralUrbanRetirementReviewId(
    generalUrbanRetirementReviewId: GeneralUrbanRetirementReviewId,
  ): TransactionType;
}
