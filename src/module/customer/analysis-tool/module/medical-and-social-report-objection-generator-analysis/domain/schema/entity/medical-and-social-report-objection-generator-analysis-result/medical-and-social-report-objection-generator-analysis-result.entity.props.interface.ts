import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { MedicalAndSocialReportObjectionGeneratorAnalysisResultId } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis-result/value-object/medical-and-social-report-objection-generator-analysis-result-id/medical-and-social-report-objection-generator-analysis-result-id.value-object';

export interface MedicalAndSocialReportObjectionGeneratorAnalysisResultEntityPropsInterface extends BaseEntityPropsInterface<MedicalAndSocialReportObjectionGeneratorAnalysisResultId> {
  medicalAndSocialReportObjectionGeneratorCompleteAnalysis?: string | null;
  medicalAndSocialReportObjectionGeneratorSimplifiedAnalysis?: string | null;
}
