import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { MedicalAndSocialReportObjectionGeneratorAnalysisDocumentEntity } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis-document/medical-and-social-report-objection-generator-analysis-document.entity';
import type { MedicalAndSocialReportObjectionGeneratorAnalysisDocumentId } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis-document/value-object/medical-and-social-report-objection-generator-analysis-document-id/medical-and-social-report-objection-generator-analysis-document-id.value-object';

export abstract class MedicalAndSocialReportObjectionGeneratorAnalysisDocumentCommandRepositoryGateway {
  public abstract createMedicalAndSocialReportObjectionGeneratorAnalysisDocument(
    props: MedicalAndSocialReportObjectionGeneratorAnalysisDocumentEntity,
  ): TransactionType;

  public abstract deleteMedicalAndSocialReportObjectionGeneratorAnalysisDocument(
    id: MedicalAndSocialReportObjectionGeneratorAnalysisDocumentId,
  ): TransactionType;
}

