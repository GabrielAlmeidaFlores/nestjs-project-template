import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { MedicalAndSocialReportObjectionGeneratorAnalysisBenefitEntity } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis-benefit/medical-and-social-report-objection-generator-analysis-benefit.entity';
import type { MedicalAndSocialReportObjectionGeneratorAnalysisBenefitId } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis-benefit/value-object/medical-and-social-report-objection-generator-analysis-benefit-id/medical-and-social-report-objection-generator-analysis-benefit-id.value-object';

export abstract class MedicalAndSocialReportObjectionGeneratorAnalysisBenefitCommandRepositoryGateway {
  public abstract createMedicalAndSocialReportObjectionGeneratorAnalysisBenefit(
    props: MedicalAndSocialReportObjectionGeneratorAnalysisBenefitEntity,
  ): TransactionType;

  public abstract deleteMedicalAndSocialReportObjectionGeneratorAnalysisBenefit(
    id: MedicalAndSocialReportObjectionGeneratorAnalysisBenefitId,
  ): TransactionType;
}
