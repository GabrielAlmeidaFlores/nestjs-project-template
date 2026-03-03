import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { MedicalAndSocialReportObjectionGeneratorAnalysisResultId } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis-result/value-object/medical-and-social-report-objection-generator-analysis-result-id/medical-and-social-report-objection-generator-analysis-result-id.value-object';

export class GetMedicalAndSocialReportObjectionGeneratorAnalysisResultQueryResult extends BaseBuildableObject {
  public readonly id: MedicalAndSocialReportObjectionGeneratorAnalysisResultId;
  public readonly medicalAndSocialReportObjectionGeneratorCompleteAnalysis:
    | string
    | null;
  public readonly medicalAndSocialReportObjectionGeneratorSimplifiedAnalysis:
    | string
    | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetMedicalAndSocialReportObjectionGeneratorAnalysisResultQueryResult.name;
}
