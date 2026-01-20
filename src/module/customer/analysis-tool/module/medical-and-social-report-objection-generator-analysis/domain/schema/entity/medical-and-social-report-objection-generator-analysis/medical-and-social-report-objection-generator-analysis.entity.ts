import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { MedicalAndSocialReportObjectionGeneratorAnalysisId } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis/value-object/medical-and-social-report-objection-generator-analysis-id/medical-and-social-report-objection-generator-analysis-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import type { MedicalAndSocialReportObjectionGeneratorAnalysisEntityPropsInterface } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis/medical-and-social-report-objection-generator-analysis.entity.props.interface';
import type { MedicalAndSocialReportObjectionGeneratorAnalysisBenefitEntity } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis-benefit/medical-and-social-report-objection-generator-analysis-benefit.entity';
import type { MedicalAndSocialReportObjectionGeneratorAnalysisDocumentEntity } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis-document/medical-and-social-report-objection-generator-analysis-document.entity';
import type { MedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingEntity } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis-legal-proceeding/medical-and-social-report-objection-generator-analysis-legal-proceeding.entity';
import type { MedicalAndSocialReportObjectionGeneratorAnalysisResultEntity } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis-result/medical-and-social-report-objection-generator-analysis-result.entity';

export class MedicalAndSocialReportObjectionGeneratorAnalysisEntity extends BaseEntity<MedicalAndSocialReportObjectionGeneratorAnalysisId> {
  @Description('Resultado do gerador de objeção de laudo médico e social.')
  public readonly medicalAndSocialReportObjectionGeneratorAnalysisResult: MedicalAndSocialReportObjectionGeneratorAnalysisResultEntity | null;

  @Description('Benefícios INSS do gerador de objeção de laudo médico e social.')
  public readonly medicalAndSocialReportObjectionGeneratorAnalysisBenefit: MedicalAndSocialReportObjectionGeneratorAnalysisBenefitEntity[];

  @Description('Processos judiciais do gerador de objeção de laudo médico e social.')
  public readonly medicalAndSocialReportObjectionGeneratorAnalysisLegalProceeding: MedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingEntity[];

  @Description('Documentos do gerador de objeção de laudo médico e social.')
  public readonly medicalAndSocialReportObjectionGeneratorAnalysisDocument: MedicalAndSocialReportObjectionGeneratorAnalysisDocumentEntity[];

  @Description(
    'Membro da organização que criou o gerador de objeção de laudo médico e social.',
  )
  public readonly createdBy: OrganizationMemberId;

  @Description(
    'Membro da organização que atualizou o gerador de objeção de laudo médico e social.',
  )
  public readonly updatedBy: OrganizationMemberId;

  protected readonly _type = MedicalAndSocialReportObjectionGeneratorAnalysisEntity.name;

  public constructor(
    props: MedicalAndSocialReportObjectionGeneratorAnalysisEntityPropsInterface,
  ) {
    super(MedicalAndSocialReportObjectionGeneratorAnalysisId, props);

    this.medicalAndSocialReportObjectionGeneratorAnalysisResult =
      props.medicalAndSocialReportObjectionGeneratorAnalysisResult ?? null;
    this.medicalAndSocialReportObjectionGeneratorAnalysisBenefit =
      props.medicalAndSocialReportObjectionGeneratorAnalysisBenefit ?? [];
    this.medicalAndSocialReportObjectionGeneratorAnalysisLegalProceeding =
      props.medicalAndSocialReportObjectionGeneratorAnalysisLegalProceeding ?? [];
    this.medicalAndSocialReportObjectionGeneratorAnalysisDocument =
      props.medicalAndSocialReportObjectionGeneratorAnalysisDocument ?? [];
    this.createdBy = props.createdBy;
    this.updatedBy = props.updatedBy;
  }
}

