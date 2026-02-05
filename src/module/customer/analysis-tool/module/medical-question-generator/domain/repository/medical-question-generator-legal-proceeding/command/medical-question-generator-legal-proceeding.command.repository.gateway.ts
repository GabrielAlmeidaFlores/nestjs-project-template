import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { MedicalQuestionGeneratorLegalProceedingEntity } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator-legal-proceeding/medical-question-generator-legal-proceeding.entity';
import type { MedicalQuestionGeneratorLegalProceedingId } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator-legal-proceeding/value-object/medical-question-generator-legal-proceeding-id/medical-question-generator-legal-proceeding-id.value-object';

export abstract class MedicalQuestionGeneratorLegalProceedingCommandRepositoryGateway {
  public abstract createMedicalQuestionGeneratorLegalProceeding(
    props: MedicalQuestionGeneratorLegalProceedingEntity,
  ): TransactionType;

  public abstract deleteMedicalQuestionGeneratorLegalProceeding(
    id: MedicalQuestionGeneratorLegalProceedingId,
  ): TransactionType;
}
