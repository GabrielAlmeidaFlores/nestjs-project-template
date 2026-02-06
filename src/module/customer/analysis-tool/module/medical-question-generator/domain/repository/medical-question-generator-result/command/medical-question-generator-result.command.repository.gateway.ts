import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { MedicalQuestionGeneratorResultEntity } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator-result/medical-question-generator-result.entity';
import type { MedicalQuestionGeneratorResultId } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator-result/value-object/medical-question-generator-result-id/medical-question-generator-result-id.value-object';

export abstract class MedicalQuestionGeneratorResultCommandRepositoryGateway {
  public abstract createMedicalQuestionGeneratorResult(
    props: MedicalQuestionGeneratorResultEntity,
  ): TransactionType;

  public abstract updateMedicalQuestionGeneratorResult(
    id: MedicalQuestionGeneratorResultId,
    props: MedicalQuestionGeneratorResultEntity,
  ): TransactionType;
}
