import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { AudienceQuestionGeneratorBenefitEntity } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator-benefit/audience-question-generator-benefit.entity';
import type { AudienceQuestionGeneratorBenefitId } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator-benefit/value-object/audience-question-generator-benefit-id/audience-question-generator-benefit-id.value-object';

export abstract class AudienceQuestionGeneratorBenefitCommandRepositoryGateway {
  public abstract createAudienceQuestionGeneratorBenefit(
    props: AudienceQuestionGeneratorBenefitEntity,
  ): TransactionType;

  public abstract deleteAudienceQuestionGeneratorBenefit(
    id: AudienceQuestionGeneratorBenefitId,
  ): TransactionType;
}
