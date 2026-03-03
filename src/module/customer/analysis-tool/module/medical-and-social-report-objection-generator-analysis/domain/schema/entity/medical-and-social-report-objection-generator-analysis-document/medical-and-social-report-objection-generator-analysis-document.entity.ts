import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { MedicalAndSocialReportObjectionGeneratorAnalysisEntity } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis/medical-and-social-report-objection-generator-analysis.entity';
import { MedicalAndSocialReportObjectionGeneratorAnalysisDocumentTypeEnum } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis-document/enum/medical-and-social-report-objection-generator-analysis-document-type.enum';
import { MedicalAndSocialReportObjectionGeneratorAnalysisDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis-document/medical-and-social-report-objection-generator-analysis-document.entity.props.interface';
import { MedicalAndSocialReportObjectionGeneratorAnalysisDocumentId } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis-document/value-object/medical-and-social-report-objection-generator-analysis-document-id/medical-and-social-report-objection-generator-analysis-document-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class MedicalAndSocialReportObjectionGeneratorAnalysisDocumentEntity extends BaseEntity<MedicalAndSocialReportObjectionGeneratorAnalysisDocumentId> {
  @Description('Documento do laudo médico pericial ou processo judicial.')
  public readonly document: string;

  @Description('Tipo de documento.')
  public readonly type: MedicalAndSocialReportObjectionGeneratorAnalysisDocumentTypeEnum;

  @Description(
    'Análise geradora de objeção de laudo médico e social associado ao documento.',
  )
  public readonly medicalAndSocialReportObjectionGeneratorAnalysis: MedicalAndSocialReportObjectionGeneratorAnalysisEntity;

  protected readonly _type =
    MedicalAndSocialReportObjectionGeneratorAnalysisDocumentEntity.name;

  public constructor(
    props: MedicalAndSocialReportObjectionGeneratorAnalysisDocumentEntityPropsInterface,
  ) {
    super(MedicalAndSocialReportObjectionGeneratorAnalysisDocumentId, props);

    this.document = props.document;
    this.type = props.type;
    this.medicalAndSocialReportObjectionGeneratorAnalysis =
      props.medicalAndSocialReportObjectionGeneratorAnalysis;
  }
}
