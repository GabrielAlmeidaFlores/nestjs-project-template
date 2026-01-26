import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { GetMedicalQuestionGeneratorDocumentQueryResult } from '@module/customer/analysis-tool/module/medical-question-generator/domain/repository/medical-question-generator/query/result/get-medical-question-generator-document.query.result';
import type { GetMedicalQuestionGeneratorInssBenefitQueryResult } from '@module/customer/analysis-tool/module/medical-question-generator/domain/repository/medical-question-generator/query/result/get-medical-question-generator-inss-benefit.query.result';
import type { GetMedicalQuestionGeneratorLegalProceedingQueryResult } from '@module/customer/analysis-tool/module/medical-question-generator/domain/repository/medical-question-generator/query/result/get-medical-question-generator-legal-proceeding.query.result';
import type { GetMedicalQuestionGeneratorResultQueryResult } from '@module/customer/analysis-tool/module/medical-question-generator/domain/repository/medical-question-generator-result/query/result/get-medical-question-generator-result.query.result';
import type { MedicalQuestionGeneratorId } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator/value-object/medical-question-generator-id/medical-question-generator-id.value-object';

export class GetMedicalQuestionGeneratorWithRelationsQueryResult extends BaseBuildableObject {
  public readonly id: MedicalQuestionGeneratorId;
  public readonly disabilityDate: Date | null;
  public readonly medicalQuestionGeneratorResult: GetMedicalQuestionGeneratorResultQueryResult | null;
  public readonly medicalQuestionGeneratorInssBenefit: GetMedicalQuestionGeneratorInssBenefitQueryResult[];
  public readonly medicalQuestionGeneratorLegalProceeding: GetMedicalQuestionGeneratorLegalProceedingQueryResult[];
  public readonly medicalQuestionGeneratorDocument: GetMedicalQuestionGeneratorDocumentQueryResult[];
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetMedicalQuestionGeneratorWithRelationsQueryResult.name;
}
