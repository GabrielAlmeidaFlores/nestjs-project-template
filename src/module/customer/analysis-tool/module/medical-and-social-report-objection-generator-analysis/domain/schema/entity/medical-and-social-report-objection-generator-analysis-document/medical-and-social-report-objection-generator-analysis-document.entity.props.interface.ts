import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { MedicalAndSocialReportObjectionGeneratorAnalysisEntity } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis/medical-and-social-report-objection-generator-analysis.entity';
import type { MedicalAndSocialReportObjectionGeneratorAnalysisDocumentTypeEnum } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis-document/enum/medical-and-social-report-objection-generator-analysis-document-type.enum';
import type { MedicalAndSocialReportObjectionGeneratorAnalysisDocumentId } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis-document/value-object/medical-and-social-report-objection-generator-analysis-document-id/medical-and-social-report-objection-generator-analysis-document-id.value-object';

export interface MedicalAndSocialReportObjectionGeneratorAnalysisDocumentEntityPropsInterface extends BaseEntityPropsInterface<MedicalAndSocialReportObjectionGeneratorAnalysisDocumentId> {
  document: string;
  type: MedicalAndSocialReportObjectionGeneratorAnalysisDocumentTypeEnum;
  medicalAndSocialReportObjectionGeneratorAnalysis: MedicalAndSocialReportObjectionGeneratorAnalysisEntity;
}
