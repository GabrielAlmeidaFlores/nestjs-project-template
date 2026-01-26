import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { MedicalQuestionGeneratorResultId } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator-result/value-object/medical-question-generator-result-id/medical-question-generator-result-id.value-object';

export interface MedicalQuestionGeneratorResultEntityPropsInterface extends BaseEntityPropsInterface<MedicalQuestionGeneratorResultId> {
  medicalQuestionGeneratorCompleteAnalysis?: string | null;
  medicalQuestionGeneratorSimplifiedAnalysis?: string | null;
}
