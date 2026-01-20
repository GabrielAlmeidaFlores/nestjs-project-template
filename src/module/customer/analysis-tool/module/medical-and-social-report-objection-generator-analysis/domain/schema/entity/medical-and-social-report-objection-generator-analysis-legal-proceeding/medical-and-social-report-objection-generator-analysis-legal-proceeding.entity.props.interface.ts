import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { MedicalAndSocialReportObjectionGeneratorAnalysisEntity } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis/medical-and-social-report-objection-generator-analysis.entity';
import type { MedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingId } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis-legal-proceeding/value-object/medical-and-social-report-objection-generator-analysis-legal-proceeding-id/medical-and-social-report-objection-generator-analysis-legal-proceeding-id.value-object';

export interface MedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingEntityPropsInterface
  extends BaseEntityPropsInterface<MedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingId> {
  legalProceedingNumber: string;
  medicalAndSocialReportObjectionGeneratorAnalysis: MedicalAndSocialReportObjectionGeneratorAnalysisEntity;
}

