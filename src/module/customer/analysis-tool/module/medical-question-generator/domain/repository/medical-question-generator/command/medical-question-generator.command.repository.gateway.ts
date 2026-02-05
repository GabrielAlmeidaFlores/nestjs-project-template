import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import type { MedicalQuestionGeneratorEntity } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator/medical-question-generator.entity';
import type { MedicalQuestionGeneratorId } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator/value-object/medical-question-generator-id/medical-question-generator-id.value-object';

export abstract class MedicalQuestionGeneratorCommandRepositoryGateway {
  public abstract createMedicalQuestionGenerator(
    props: MedicalQuestionGeneratorEntity,
  ): TransactionType;

  public abstract updateMedicalQuestionGenerator(
    id: MedicalQuestionGeneratorId,
    props: MedicalQuestionGeneratorEntity,
  ): TransactionType;

  public abstract deleteMedicalQuestionGenerator(
    id: MedicalQuestionGeneratorId,
    updatedBy: OrganizationMemberId,
  ): TransactionType;
}
