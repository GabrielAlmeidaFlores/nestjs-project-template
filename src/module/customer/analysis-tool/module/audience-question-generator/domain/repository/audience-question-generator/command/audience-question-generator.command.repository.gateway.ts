import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import type { AudienceQuestionGeneratorEntity } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator/audience-question-generator.entity';
import type { AudienceQuestionGeneratorId } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator/value-object/audience-question-generator-id/audience-question-generator-id.value-object';

export abstract class AudienceQuestionGeneratorCommandRepositoryGateway {
  public abstract createAudienceQuestionGenerator(
    props: AudienceQuestionGeneratorEntity,
  ): TransactionType;

  public abstract updateAudienceQuestionGenerator(
    id: AudienceQuestionGeneratorId,
    props: AudienceQuestionGeneratorEntity,
  ): TransactionType;

  public abstract deleteAudienceQuestionGenerator(
    id: AudienceQuestionGeneratorId,
    updatedBy: OrganizationMemberId,
  ): TransactionType;
}
