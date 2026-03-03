import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { MedicalQuestionGeneratorInssBenefitId } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator-inss-benefit/value-object/medical-question-generator-inss-benefit-id/medical-question-generator-inss-benefit-id.value-object';

export class GetMedicalQuestionGeneratorInssBenefitQueryResult extends BaseBuildableObject {
  public readonly id: MedicalQuestionGeneratorInssBenefitId;
  public readonly inssBenefitNumber: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetMedicalQuestionGeneratorInssBenefitQueryResult.name;
}
