import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { MedicalAndSocialReportObjectionGeneratorAnalysisEntity } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis/medical-and-social-report-objection-generator-analysis.entity';
import { MedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingEntityPropsInterface } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis-legal-proceeding/medical-and-social-report-objection-generator-analysis-legal-proceeding.entity.props.interface';
import { MedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingId } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis-legal-proceeding/value-object/medical-and-social-report-objection-generator-analysis-legal-proceeding-id/medical-and-social-report-objection-generator-analysis-legal-proceeding-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class MedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingEntity extends BaseEntity<MedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingId> {
  @Description(
    'Número do processo judicial relacionado ao gerador de objeção de laudo médico e social.',
  )
  public readonly legalProceedingNumber: string;

  @Description(
    'Gerador de objeção de laudo médico e social associado ao processo judicial.',
  )
  public readonly medicalAndSocialReportObjectionGeneratorAnalysis: MedicalAndSocialReportObjectionGeneratorAnalysisEntity;

  protected readonly _type =
    MedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingEntity.name;

  public constructor(
    props: MedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingEntityPropsInterface,
  ) {
    super(MedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingId, props);

    this.legalProceedingNumber = props.legalProceedingNumber;
    this.medicalAndSocialReportObjectionGeneratorAnalysis =
      props.medicalAndSocialReportObjectionGeneratorAnalysis;
  }
}

