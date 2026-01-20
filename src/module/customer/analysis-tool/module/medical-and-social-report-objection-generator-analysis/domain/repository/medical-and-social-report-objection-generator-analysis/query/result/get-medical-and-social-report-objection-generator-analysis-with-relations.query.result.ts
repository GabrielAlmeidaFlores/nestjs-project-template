import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { GetOrganizationMemberWithCustomerRelationQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member-with-customer-relation.query.result';
import type { GetMedicalAndSocialReportObjectionGeneratorAnalysisBenefitQueryResult } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/repository/medical-and-social-report-objection-generator-analysis/query/result/get-medical-and-social-report-objection-generator-analysis-benefit.query.result';
import type { GetMedicalAndSocialReportObjectionGeneratorAnalysisDocumentQueryResult } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/repository/medical-and-social-report-objection-generator-analysis/query/result/get-medical-and-social-report-objection-generator-analysis-document.query.result';
import type { GetMedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingQueryResult } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/repository/medical-and-social-report-objection-generator-analysis/query/result/get-medical-and-social-report-objection-generator-analysis-legal-proceeding.query.result';
import type { GetMedicalAndSocialReportObjectionGeneratorAnalysisResultQueryResult } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/repository/medical-and-social-report-objection-generator-analysis-result/query/result/get-medical-and-social-report-objection-generator-analysis-result.query.result';
import type { MedicalAndSocialReportObjectionGeneratorAnalysisId } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis/value-object/medical-and-social-report-objection-generator-analysis-id/medical-and-social-report-objection-generator-analysis-id.value-object';

export class GetMedicalAndSocialReportObjectionGeneratorAnalysisWithRelationsQueryResult extends BaseBuildableObject {
  public readonly id: MedicalAndSocialReportObjectionGeneratorAnalysisId;
  public readonly medicalAndSocialReportObjectionGeneratorAnalysisResult: GetMedicalAndSocialReportObjectionGeneratorAnalysisResultQueryResult | null;
  public readonly medicalAndSocialReportObjectionGeneratorAnalysisBenefit: GetMedicalAndSocialReportObjectionGeneratorAnalysisBenefitQueryResult[];
  public readonly medicalAndSocialReportObjectionGeneratorAnalysisLegalProceeding: GetMedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingQueryResult[];
  public readonly medicalAndSocialReportObjectionGeneratorAnalysisDocument: GetMedicalAndSocialReportObjectionGeneratorAnalysisDocumentQueryResult[];
  public readonly createdBy: GetOrganizationMemberWithCustomerRelationQueryResult;
  public readonly updatedBy: GetOrganizationMemberWithCustomerRelationQueryResult;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetMedicalAndSocialReportObjectionGeneratorAnalysisWithRelationsQueryResult.name;
}

