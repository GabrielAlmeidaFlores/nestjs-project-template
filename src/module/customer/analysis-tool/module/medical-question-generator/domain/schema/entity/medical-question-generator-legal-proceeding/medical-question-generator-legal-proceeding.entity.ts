import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { MedicalQuestionGeneratorLegalProceedingId } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator-legal-proceeding/value-object/medical-question-generator-legal-proceeding-id/medical-question-generator-legal-proceeding-id.value-object';

import type { MedicalQuestionGeneratorEntity } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator/medical-question-generator.entity';
import type { MedicalQuestionGeneratorLegalProceedingEntityPropsInterface } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator-legal-proceeding/medical-question-generator-legal-proceeding.entity.props.interface';

export class MedicalQuestionGeneratorLegalProceedingEntity extends BaseEntity<MedicalQuestionGeneratorLegalProceedingId> {
  public readonly legalProceedingNumber: string;
  public readonly medicalQuestionGenerator: MedicalQuestionGeneratorEntity;

  protected readonly _type = MedicalQuestionGeneratorLegalProceedingEntity.name;

  public constructor(
    props: MedicalQuestionGeneratorLegalProceedingEntityPropsInterface,
  ) {
    super(MedicalQuestionGeneratorLegalProceedingId, props);

    this.legalProceedingNumber = props.legalProceedingNumber;
    this.medicalQuestionGenerator = props.medicalQuestionGenerator;
  }
}
