import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { MedicalQuestionGeneratorDocumentEntity } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator-document/medical-question-generator-document.entity';
import type { MedicalQuestionGeneratorDocumentId } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator-document/value-object/medical-question-generator-document-id/medical-question-generator-document-id.value-object';

export abstract class MedicalQuestionGeneratorDocumentCommandRepositoryGateway {
  public abstract createMedicalQuestionGeneratorDocument(
    props: MedicalQuestionGeneratorDocumentEntity,
  ): TransactionType;

  public abstract deleteMedicalQuestionGeneratorDocument(
    id: MedicalQuestionGeneratorDocumentId,
  ): TransactionType;
}
