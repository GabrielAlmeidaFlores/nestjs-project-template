import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { MedicalQuestionGeneratorInssBenefitId } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator-inss-benefit/value-object/medical-question-generator-inss-benefit-id/medical-question-generator-inss-benefit-id.value-object';

import type { MedicalQuestionGeneratorInssBenefitEntityPropsInterface } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator-inss-benefit/medical-question-generator-inss-benefit.entity.props.interface';

export class MedicalQuestionGeneratorInssBenefitEntity extends BaseEntity<MedicalQuestionGeneratorInssBenefitId> {
  public readonly inssBenefitNumber: string;

  protected readonly _type = MedicalQuestionGeneratorInssBenefitEntity.name;

  public constructor(
    props: MedicalQuestionGeneratorInssBenefitEntityPropsInterface,
  ) {
    super(MedicalQuestionGeneratorInssBenefitId, props);

    this.inssBenefitNumber = props.inssBenefitNumber;
  }
}
