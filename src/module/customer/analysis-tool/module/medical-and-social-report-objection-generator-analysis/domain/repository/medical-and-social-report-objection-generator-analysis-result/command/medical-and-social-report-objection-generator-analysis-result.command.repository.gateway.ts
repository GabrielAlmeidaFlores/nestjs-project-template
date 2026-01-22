import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { MedicalAndSocialReportObjectionGeneratorAnalysisResultEntity } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis-result/medical-and-social-report-objection-generator-analysis-result.entity';
import type { MedicalAndSocialReportObjectionGeneratorAnalysisResultId } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis-result/value-object/medical-and-social-report-objection-generator-analysis-result-id/medical-and-social-report-objection-generator-analysis-result-id.value-object';

export abstract class MedicalAndSocialReportObjectionGeneratorAnalysisResultCommandRepositoryGateway {
  public abstract createMedicalAndSocialReportObjectionGeneratorAnalysisResult(
    props: MedicalAndSocialReportObjectionGeneratorAnalysisResultEntity,
  ): TransactionType;

  public abstract updateMedicalAndSocialReportObjectionGeneratorAnalysisResult(
    id: MedicalAndSocialReportObjectionGeneratorAnalysisResultId,
    props: MedicalAndSocialReportObjectionGeneratorAnalysisResultEntity,
  ): TransactionType;
}
