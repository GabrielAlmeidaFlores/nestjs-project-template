import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { MedicalQuestionGeneratorId } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator/value-object/medical-question-generator-id/medical-question-generator-id.value-object';

import type { MedicalQuestionGeneratorEntityPropsInterface } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator/medical-question-generator.entity.props.interface';
import type { MedicalQuestionGeneratorDocumentEntity } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator-document/medical-question-generator-document.entity';
import type { MedicalQuestionGeneratorInssBenefitEntity } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator-inss-benefit/medical-question-generator-inss-benefit.entity';
import type { MedicalQuestionGeneratorLegalProceedingEntity } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator-legal-proceeding/medical-question-generator-legal-proceeding.entity';
import type { MedicalQuestionGeneratorResultEntity } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator-result/medical-question-generator-result.entity';

export class MedicalQuestionGeneratorEntity extends BaseEntity<MedicalQuestionGeneratorId> {
  public readonly disabilityDate: Date | null;
  public readonly medicalQuestionGeneratorResult: MedicalQuestionGeneratorResultEntity | null;
  public readonly medicalQuestionGeneratorInssBenefit: MedicalQuestionGeneratorInssBenefitEntity[];
  public readonly medicalQuestionGeneratorLegalProceeding: MedicalQuestionGeneratorLegalProceedingEntity[];
  public readonly medicalQuestionGeneratorDocument: MedicalQuestionGeneratorDocumentEntity[];

  protected readonly _type = MedicalQuestionGeneratorEntity.name;

  public constructor(props: MedicalQuestionGeneratorEntityPropsInterface) {
    super(MedicalQuestionGeneratorId, props);

    this.disabilityDate = props.disabilityDate ?? null;
    this.medicalQuestionGeneratorResult =
      props.medicalQuestionGeneratorResult ?? null;
    this.medicalQuestionGeneratorInssBenefit =
      props.medicalQuestionGeneratorInssBenefit ?? [];
    this.medicalQuestionGeneratorLegalProceeding =
      props.medicalQuestionGeneratorLegalProceeding ?? [];
    this.medicalQuestionGeneratorDocument =
      props.medicalQuestionGeneratorDocument ?? [];
  }
}
