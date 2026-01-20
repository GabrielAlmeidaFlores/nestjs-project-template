import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { MedicalAndSocialReportObjectionGeneratorAnalysisBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/medical-and-social-report-objection-generator-analysis-benefit.entity';
import type { MedicalAndSocialReportObjectionGeneratorAnalysisDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/medical-and-social-report-objection-generator-analysis-document.entity';
import type { MedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/medical-and-social-report-objection-generator-analysis-legal-proceeding.entity';
import type { MedicalAndSocialReportObjectionGeneratorAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/medical-and-social-report-objection-generator-analysis-result.entity';
import type { MedicalAndSocialReportObjectionGeneratorAnalysisId } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis/value-object/medical-and-social-report-objection-generator-analysis-id/medical-and-social-report-objection-generator-analysis-id.value-object';

export class GetMedicalAndSocialReportObjectionGeneratorAnalysisQueryResult extends BaseBuildableObject {
  public readonly id: MedicalAndSocialReportObjectionGeneratorAnalysisId;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;
  public readonly medicalAndSocialReportObjectionGeneratorAnalysisResult: MedicalAndSocialReportObjectionGeneratorAnalysisResultTypeormEntity | null;
  public readonly medicalAndSocialReportObjectionGeneratorAnalysisBenefit: MedicalAndSocialReportObjectionGeneratorAnalysisBenefitTypeormEntity[];
  public readonly medicalAndSocialReportObjectionGeneratorAnalysisLegalProceeding: MedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingTypeormEntity[];
  public readonly medicalAndSocialReportObjectionGeneratorAnalysisDocument: MedicalAndSocialReportObjectionGeneratorAnalysisDocumentTypeormEntity[];
  protected override readonly _type =
    GetMedicalAndSocialReportObjectionGeneratorAnalysisQueryResult.name;
}

