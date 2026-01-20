import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { MedicalAndSocialReportObjectionGeneratorAnalysisEntity } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis/medical-and-social-report-objection-generator-analysis.entity';
import type { MedicalAndSocialReportObjectionGeneratorAnalysisBenefitId } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis-benefit/value-object/medical-and-social-report-objection-generator-analysis-benefit-id/medical-and-social-report-objection-generator-analysis-benefit-id.value-object';

export interface MedicalAndSocialReportObjectionGeneratorAnalysisBenefitEntityPropsInterface
  extends BaseEntityPropsInterface<MedicalAndSocialReportObjectionGeneratorAnalysisBenefitId> {
  inssBenefitNumber: string;
  medicalAndSocialReportObjectionGeneratorAnalysis: MedicalAndSocialReportObjectionGeneratorAnalysisEntity;
}

