import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { MedicalQuestionGeneratorEntity } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator/medical-question-generator.entity';
import type { MedicalQuestionGeneratorLegalProceedingId } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator-legal-proceeding/value-object/medical-question-generator-legal-proceeding-id/medical-question-generator-legal-proceeding-id.value-object';

export interface MedicalQuestionGeneratorLegalProceedingEntityPropsInterface extends BaseEntityPropsInterface<MedicalQuestionGeneratorLegalProceedingId> {
  legalProceedingNumber: string;
  medicalQuestionGenerator: MedicalQuestionGeneratorEntity;
}
