import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { MedicalAndSocialReportObjectionGeneratorAnalysisResultEntityPropsInterface } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis-result/medical-and-social-report-objection-generator-analysis-result.entity.props.interface';
import { MedicalAndSocialReportObjectionGeneratorAnalysisResultId } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis-result/value-object/medical-and-social-report-objection-generator-analysis-result-id/medical-and-social-report-objection-generator-analysis-result-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class MedicalAndSocialReportObjectionGeneratorAnalysisResultEntity extends BaseEntity<MedicalAndSocialReportObjectionGeneratorAnalysisResultId> {
  @Description(
    'Análise completa do gerador de objeção de laudo médico e social.',
  )
  public readonly medicalAndSocialReportObjectionGeneratorCompleteAnalysis:
    | string
    | null;

  @Description(
    'Análise simplificada do gerador de objeção de laudo médico e social.',
  )
  public readonly medicalAndSocialReportObjectionGeneratorSimplifiedAnalysis:
    | string
    | null;

  protected readonly _type =
    MedicalAndSocialReportObjectionGeneratorAnalysisResultEntity.name;

  public constructor(
    props: MedicalAndSocialReportObjectionGeneratorAnalysisResultEntityPropsInterface,
  ) {
    super(MedicalAndSocialReportObjectionGeneratorAnalysisResultId, props);

    this.medicalAndSocialReportObjectionGeneratorCompleteAnalysis =
      props.medicalAndSocialReportObjectionGeneratorCompleteAnalysis ?? null;
    this.medicalAndSocialReportObjectionGeneratorSimplifiedAnalysis =
      props.medicalAndSocialReportObjectionGeneratorSimplifiedAnalysis ?? null;
  }
}
