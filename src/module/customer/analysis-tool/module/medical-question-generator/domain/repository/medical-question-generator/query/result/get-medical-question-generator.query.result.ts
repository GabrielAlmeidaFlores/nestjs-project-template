import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { MedicalQuestionGeneratorId } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator/value-object/medical-question-generator-id/medical-question-generator-id.value-object';

export class GetMedicalQuestionGeneratorQueryResult extends BaseBuildableObject {
  public readonly id: MedicalQuestionGeneratorId;
  public readonly disabilityDate: Date | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetMedicalQuestionGeneratorQueryResult.name;
}
