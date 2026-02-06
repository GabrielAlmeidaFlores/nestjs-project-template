import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { AudienceQuestionGeneratorDocumentEntity } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator-document/audience-question-generator-document.entity';
import type { AudienceQuestionGeneratorDocumentId } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator-document/value-object/audience-question-generator-document-id/audience-question-generator-document-id.value-object';

export abstract class AudienceQuestionGeneratorDocumentCommandRepositoryGateway {
  public abstract createAudienceQuestionGeneratorDocument(
    props: AudienceQuestionGeneratorDocumentEntity,
  ): TransactionType;

  public abstract deleteAudienceQuestionGeneratorDocument(
    id: AudienceQuestionGeneratorDocumentId,
  ): TransactionType;
}
