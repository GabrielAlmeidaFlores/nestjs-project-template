import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import type { MedicalAndSocialReportObjectionGeneratorAnalysisEntity } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis/medical-and-social-report-objection-generator-analysis.entity';
import type { MedicalAndSocialReportObjectionGeneratorAnalysisId } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis/value-object/medical-and-social-report-objection-generator-analysis-id/medical-and-social-report-objection-generator-analysis-id.value-object';

export abstract class MedicalAndSocialReportObjectionGeneratorAnalysisCommandRepositoryGateway {
  public abstract createMedicalAndSocialReportObjectionGeneratorAnalysis(
    props: MedicalAndSocialReportObjectionGeneratorAnalysisEntity,
  ): TransactionType;

  public abstract updateMedicalAndSocialReportObjectionGeneratorAnalysis(
    id: MedicalAndSocialReportObjectionGeneratorAnalysisId,
    props: MedicalAndSocialReportObjectionGeneratorAnalysisEntity,
  ): TransactionType;

  public abstract deleteMedicalAndSocialReportObjectionGeneratorAnalysis(
    id: MedicalAndSocialReportObjectionGeneratorAnalysisId,
    updatedBy: OrganizationMemberId,
  ): TransactionType;
}
