import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { MedicalQuestionGeneratorEntity } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator/medical-question-generator.entity';
import type { MedicalQuestionGeneratorInssBenefitId } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator-inss-benefit/value-object/medical-question-generator-inss-benefit-id/medical-question-generator-inss-benefit-id.value-object';

export interface MedicalQuestionGeneratorInssBenefitEntityPropsInterface extends BaseEntityPropsInterface<MedicalQuestionGeneratorInssBenefitId> {
  inssBenefitNumber: string;
  medicalQuestionGenerator: MedicalQuestionGeneratorEntity;
}
