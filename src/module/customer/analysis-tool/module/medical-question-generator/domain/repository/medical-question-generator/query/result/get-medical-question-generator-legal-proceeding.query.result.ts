import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { MedicalQuestionGeneratorLegalProceedingId } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator-legal-proceeding/value-object/medical-question-generator-legal-proceeding-id/medical-question-generator-legal-proceeding-id.value-object';

export class GetMedicalQuestionGeneratorLegalProceedingQueryResult extends BaseBuildableObject {
  public readonly id: MedicalQuestionGeneratorLegalProceedingId;
  public readonly legalProceedingNumber: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetMedicalQuestionGeneratorLegalProceedingQueryResult.name;
}
