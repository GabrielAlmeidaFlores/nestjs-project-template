import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { AudienceQuestionGeneratorResultEntity } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator-result/audience-question-generator-result.entity';
import type { AudienceQuestionGeneratorResultId } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator-result/value-object/audience-question-generator-result-id/audience-question-generator-result-id.value-object';

export abstract class AudienceQuestionGeneratorResultCommandRepositoryGateway {
  public abstract createAudienceQuestionGeneratorResult(
    props: AudienceQuestionGeneratorResultEntity,
  ): TransactionType;

  public abstract updateAudienceQuestionGeneratorResult(
    id: AudienceQuestionGeneratorResultId,
    props: AudienceQuestionGeneratorResultEntity,
  ): TransactionType;
}
