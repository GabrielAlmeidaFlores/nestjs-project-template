import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { MedicalQuestionGeneratorInssBenefitEntity } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator-inss-benefit/medical-question-generator-inss-benefit.entity';
import type { MedicalQuestionGeneratorInssBenefitId } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator-inss-benefit/value-object/medical-question-generator-inss-benefit-id/medical-question-generator-inss-benefit-id.value-object';

export abstract class MedicalQuestionGeneratorInssBenefitCommandRepositoryGateway {
  public abstract createMedicalQuestionGeneratorInssBenefit(
    props: MedicalQuestionGeneratorInssBenefitEntity,
  ): TransactionType;

  public abstract deleteMedicalQuestionGeneratorInssBenefit(
    id: MedicalQuestionGeneratorInssBenefitId,
  ): TransactionType;
}
