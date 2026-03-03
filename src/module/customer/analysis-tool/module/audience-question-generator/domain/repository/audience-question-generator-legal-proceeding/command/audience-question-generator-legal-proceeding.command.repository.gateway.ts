import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { AudienceQuestionGeneratorLegalProceedingEntity } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator-legal-proceeding/audience-question-generator-legal-proceeding.entity';
import type { AudienceQuestionGeneratorLegalProceedingId } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator-legal-proceeding/value-object/audience-question-generator-legal-proceeding-id/audience-question-generator-legal-proceeding-id.value-object';

export abstract class AudienceQuestionGeneratorLegalProceedingCommandRepositoryGateway {
  public abstract createAudienceQuestionGeneratorLegalProceeding(
    props: AudienceQuestionGeneratorLegalProceedingEntity,
  ): TransactionType;

  public abstract deleteAudienceQuestionGeneratorLegalProceeding(
    id: AudienceQuestionGeneratorLegalProceedingId,
  ): TransactionType;
}
