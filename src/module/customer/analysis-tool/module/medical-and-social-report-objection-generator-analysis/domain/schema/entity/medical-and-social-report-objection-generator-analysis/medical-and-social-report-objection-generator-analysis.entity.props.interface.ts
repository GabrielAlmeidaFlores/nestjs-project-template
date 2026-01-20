import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import type { MedicalAndSocialReportObjectionGeneratorAnalysisId } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis/value-object/medical-and-social-report-objection-generator-analysis-id/medical-and-social-report-objection-generator-analysis-id.value-object';
import type { MedicalAndSocialReportObjectionGeneratorAnalysisBenefitEntity } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis-benefit/medical-and-social-report-objection-generator-analysis-benefit.entity';
import type { MedicalAndSocialReportObjectionGeneratorAnalysisDocumentEntity } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis-document/medical-and-social-report-objection-generator-analysis-document.entity';
import type { MedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingEntity } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis-legal-proceeding/medical-and-social-report-objection-generator-analysis-legal-proceeding.entity';
import type { MedicalAndSocialReportObjectionGeneratorAnalysisResultEntity } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis-result/medical-and-social-report-objection-generator-analysis-result.entity';

export interface MedicalAndSocialReportObjectionGeneratorAnalysisEntityPropsInterface
  extends BaseEntityPropsInterface<MedicalAndSocialReportObjectionGeneratorAnalysisId> {
  medicalAndSocialReportObjectionGeneratorAnalysisResult?: MedicalAndSocialReportObjectionGeneratorAnalysisResultEntity | null;
  medicalAndSocialReportObjectionGeneratorAnalysisBenefit?: MedicalAndSocialReportObjectionGeneratorAnalysisBenefitEntity[];
  medicalAndSocialReportObjectionGeneratorAnalysisLegalProceeding?: MedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingEntity[];
  medicalAndSocialReportObjectionGeneratorAnalysisDocument?: MedicalAndSocialReportObjectionGeneratorAnalysisDocumentEntity[];
  createdBy: OrganizationMemberId;
  updatedBy: OrganizationMemberId;
}

