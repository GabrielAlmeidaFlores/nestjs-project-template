import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { MedicalAndSocialReportObjectionGeneratorAnalysisEntity } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis/medical-and-social-report-objection-generator-analysis.entity';
import { MedicalAndSocialReportObjectionGeneratorAnalysisBenefitEntityPropsInterface } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis-benefit/medical-and-social-report-objection-generator-analysis-benefit.entity.props.interface';
import { MedicalAndSocialReportObjectionGeneratorAnalysisBenefitId } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis-benefit/value-object/medical-and-social-report-objection-generator-analysis-benefit-id/medical-and-social-report-objection-generator-analysis-benefit-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class MedicalAndSocialReportObjectionGeneratorAnalysisBenefitEntity extends BaseEntity<MedicalAndSocialReportObjectionGeneratorAnalysisBenefitId> {
  @Description(
    'Número do benefício INSS associado ao gerador de objeção de laudo médico e social.',
  )
  public readonly inssBenefitNumber: string;

  @Description(
    'Gerador de objeção de laudo médico e social associado ao benefício INSS.',
  )
  public readonly medicalAndSocialReportObjectionGeneratorAnalysis: MedicalAndSocialReportObjectionGeneratorAnalysisEntity;

  protected readonly _type =
    MedicalAndSocialReportObjectionGeneratorAnalysisBenefitEntity.name;

  public constructor(
    props: MedicalAndSocialReportObjectionGeneratorAnalysisBenefitEntityPropsInterface,
  ) {
    super(MedicalAndSocialReportObjectionGeneratorAnalysisBenefitId, props);

    this.inssBenefitNumber = props.inssBenefitNumber;
    this.medicalAndSocialReportObjectionGeneratorAnalysis =
      props.medicalAndSocialReportObjectionGeneratorAnalysis;
  }
}
