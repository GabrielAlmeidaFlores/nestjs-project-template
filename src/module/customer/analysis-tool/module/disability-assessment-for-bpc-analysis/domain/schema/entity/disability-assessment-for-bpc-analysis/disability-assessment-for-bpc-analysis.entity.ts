import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { DisabilityAssessmentForBpcAnalysisId } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis/value-object/disability-assessment-for-bpc-analysis-id/disability-assessment-for-bpc-analysis-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import type { DisabilityAssessmentForBpcAnalysisEntityPropsInterface } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis/disability-assessment-for-bpc-analysis.entity.props.interface';
import type { DisabilityAssessmentForBpcAnalysisBenefitEntity } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis-benefit/disability-assessment-for-bpc-analysis-benefit.entity';
import type { DisabilityAssessmentForBpcAnalysisDocumentEntity } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis-document/disability-assessment-for-bpc-analysis-document.entity';
import type { DisabilityAssessmentForBpcAnalysisLegalProceedingEntity } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis-legal-proceeding/disability-assessment-for-bpc-analysis-legal-proceeding.entity';
import type { DisabilityAssessmentForBpcAnalysisResultEntity } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis-result/disability-assessment-for-bpc-analysis-result.entity';

export class DisabilityAssessmentForBpcAnalysisEntity extends BaseEntity<DisabilityAssessmentForBpcAnalysisId> {
  @Description('Data estimada do início da deficiência.')
  public readonly estimatedDisabilityStartDate: Date | null;

  @Description('Requerente frequenta escola ou curso técnico?')
  public readonly attendsSchoolOrTechnicalCourse: boolean | null;

  @Description('Realiza alguma atividade laboral?')
  public readonly performsLaborActivity: boolean | null;

  @Description('Necessita de ajuda de terceiros?')
  public readonly needsThirdPartyHelp: boolean | null;

  @Description('Tem acesso a serviços básicos (transporte, saúde, educação)?')
  public readonly hasAccessToBasicServices: boolean | null;

  @Description('Outras barreiras encontradas na vida do cliente.')
  public readonly otherBarriersDescription: string | null;

  @Description('Resultado da avaliação de deficiência para BPC.')
  public readonly disabilityAssessmentForBpcAnalysisResult: DisabilityAssessmentForBpcAnalysisResultEntity | null;

  @Description(
    'Benefícios INSS associados à avaliação de deficiência para BPC.',
  )
  public readonly disabilityAssessmentForBpcAnalysisBenefit: DisabilityAssessmentForBpcAnalysisBenefitEntity[];

  @Description(
    'Processos judiciais associados à avaliação de deficiência para BPC.',
  )
  public readonly disabilityAssessmentForBpcAnalysisLegalProceeding: DisabilityAssessmentForBpcAnalysisLegalProceedingEntity[];

  @Description(
    'Documentos médicos e sociais associados à avaliação de deficiência para BPC.',
  )
  public readonly disabilityAssessmentForBpcAnalysisDocument: DisabilityAssessmentForBpcAnalysisDocumentEntity[];

  @Description(
    'Membro da organização que criou a avaliação de deficiência para BPC.',
  )
  public readonly createdBy: OrganizationMemberId;

  @Description(
    'Membro da organização que atualizou a avaliação de deficiência para BPC.',
  )
  public readonly updatedBy: OrganizationMemberId;

  protected readonly _type = DisabilityAssessmentForBpcAnalysisEntity.name;

  public constructor(
    props: DisabilityAssessmentForBpcAnalysisEntityPropsInterface,
  ) {
    super(DisabilityAssessmentForBpcAnalysisId, props);

    this.estimatedDisabilityStartDate =
      props.estimatedDisabilityStartDate ?? null;
    this.attendsSchoolOrTechnicalCourse =
      props.attendsSchoolOrTechnicalCourse ?? null;
    this.performsLaborActivity = props.performsLaborActivity ?? null;
    this.needsThirdPartyHelp = props.needsThirdPartyHelp ?? null;
    this.hasAccessToBasicServices = props.hasAccessToBasicServices ?? null;
    this.otherBarriersDescription = props.otherBarriersDescription ?? null;
    this.disabilityAssessmentForBpcAnalysisResult =
      props.disabilityAssessmentForBpcAnalysisResult ?? null;
    this.disabilityAssessmentForBpcAnalysisBenefit =
      props.disabilityAssessmentForBpcAnalysisBenefit ?? [];
    this.disabilityAssessmentForBpcAnalysisLegalProceeding =
      props.disabilityAssessmentForBpcAnalysisLegalProceeding ?? [];
    this.disabilityAssessmentForBpcAnalysisDocument =
      props.disabilityAssessmentForBpcAnalysisDocument ?? [];
    this.createdBy = props.createdBy;
    this.updatedBy = props.updatedBy;
  }
}
