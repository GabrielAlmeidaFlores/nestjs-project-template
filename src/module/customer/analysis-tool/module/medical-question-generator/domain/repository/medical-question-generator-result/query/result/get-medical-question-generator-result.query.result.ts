import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import type { MedicalQuestionGeneratorResultId } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator-result/value-object/medical-question-generator-result-id/medical-question-generator-result-id.value-object';

export class GetMedicalQuestionGeneratorResultQueryResult extends BaseBuildableObject {
  public readonly id: MedicalQuestionGeneratorResultId;
  public readonly clientName: string | null;
  public readonly clientFederalDocument: FederalDocument | null;
  public readonly clientBirthDate: Date | null;
  public readonly clientLastAffiliationDate: Date | null;
  public readonly medicalQuestionGeneratorCompleteAnalysis: string | null;
  public readonly medicalQuestionGeneratorSimplifiedAnalysis: string | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetMedicalQuestionGeneratorResultQueryResult.name;
}
