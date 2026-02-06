import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { AudienceQuestionGeneratorDocumentEntity } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator-document/audience-question-generator-document.entity';

export abstract class AudienceQuestionGeneratorDocumentCommandRepositoryGateway {
  public abstract createAudienceQuestionGeneratorDocument(
    props: AudienceQuestionGeneratorDocumentEntity,
  ): TransactionType;
}
