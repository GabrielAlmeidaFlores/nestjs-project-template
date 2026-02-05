import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { MedicalQuestionGeneratorEntity } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator/medical-question-generator.entity';
import type { MedicalQuestionGeneratorDocumentTypeEnum } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator-document/enum/medical-question-generator-document-type.enum';
import type { MedicalQuestionGeneratorDocumentId } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator-document/value-object/medical-question-generator-document-id/medical-question-generator-document-id.value-object';

export interface MedicalQuestionGeneratorDocumentEntityPropsInterface extends BaseEntityPropsInterface<MedicalQuestionGeneratorDocumentId> {
  document: string;
  type: MedicalQuestionGeneratorDocumentTypeEnum;
  medicalQuestionGenerator: MedicalQuestionGeneratorEntity;
}
