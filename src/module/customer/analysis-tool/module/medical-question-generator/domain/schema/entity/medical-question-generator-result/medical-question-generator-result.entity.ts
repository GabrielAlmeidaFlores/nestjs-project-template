import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { MedicalQuestionGeneratorResultId } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator-result/value-object/medical-question-generator-result-id/medical-question-generator-result-id.value-object';

import type { MedicalQuestionGeneratorResultEntityPropsInterface } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator-result/medical-question-generator-result.entity.props.interface';

export class MedicalQuestionGeneratorResultEntity extends BaseEntity<MedicalQuestionGeneratorResultId> {
  public readonly medicalQuestionGeneratorCompleteAnalysis: string | null;
  public readonly medicalQuestionGeneratorSimplifiedAnalysis: string | null;

  protected readonly _type = MedicalQuestionGeneratorResultEntity.name;

  public constructor(
    props: MedicalQuestionGeneratorResultEntityPropsInterface,
  ) {
    super(MedicalQuestionGeneratorResultId, props);

    this.medicalQuestionGeneratorCompleteAnalysis =
      props.medicalQuestionGeneratorCompleteAnalysis ?? null;
    this.medicalQuestionGeneratorSimplifiedAnalysis =
      props.medicalQuestionGeneratorSimplifiedAnalysis ?? null;
  }
}
