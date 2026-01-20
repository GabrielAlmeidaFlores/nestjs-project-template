import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { MedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingEntity } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis-legal-proceeding/medical-and-social-report-objection-generator-analysis-legal-proceeding.entity';
import type { MedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingId } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis-legal-proceeding/value-object/medical-and-social-report-objection-generator-analysis-legal-proceeding-id/medical-and-social-report-objection-generator-analysis-legal-proceeding-id.value-object';

export abstract class MedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingCommandRepositoryGateway {
  public abstract createMedicalAndSocialReportObjectionGeneratorAnalysisLegalProceeding(
    props: MedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingEntity,
  ): TransactionType;

  public abstract deleteMedicalAndSocialReportObjectionGeneratorAnalysisLegalProceeding(
    id: MedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingId,
  ): TransactionType;
}

