import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-status.enum';
import { AnalysisToolRecordTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-tool-record-type.enum';
import { AnalysisToolRecordCode } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/value-object/analysis-tool-record-code/analysis-tool-record-code.value-object';
import { AnalysisToolRecordId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/value-object/analysis-tool-record-id/analysis-tool-record-id.value-objects';
import { AccidentAssistanceGrantEntity } from '@module/customer/analysis-tool/module/accident-assistance-grant/domain/schema/entity/accident-assistance-grant/accident-assistance-grant.entity';
import { AccidentAssistanceTerminatedEntity } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated/accident-assistance-terminated.entity';
import { AccidentBenefitRejectionEntity } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection/accident-benefit-rejection.entity';
import { AdministrativeProcedureInssAnalysisEntity } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/schema/entity/administrative-procedure-inss-analysis/administrative-procedure-inss-analysis.entity';
import { AudienceQuestionGeneratorEntity } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator/audience-question-generator.entity';
import { BpcDisabilityDenialEntity } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial/bpc-disability-denial.entity';
import { BpcDisabilityGrantEntity } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant/bpc-disability-grant.entity';
import { BpcDisabilityTerminationEntity } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination/bpc-disability-termination.entity';
import { BpcElderlyCessationEntity } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation/bpc-elderly-cessation.entity';
import { CnisFastAnalysisEntity } from '@module/customer/analysis-tool/module/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis/cnis-fast-analysis.entity';
import { DeathBenefitGrantEntity } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant/death-benefit-grant.entity';
import { DeathBenefitRejectionEntity } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection/death-benefit-rejection.entity';
import { DisabilityAssessmentForBpcAnalysisEntity } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis/disability-assessment-for-bpc-analysis.entity';
import { DisabilityRetirementPlanningGrantEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant/disability-retirement-planning-grant.entity';
import { DisabilityRetirementPlanningRejectionEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection/disability-retirement-planning-rejection.entity';
import { ElderlyBpcRejectionEntity } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection/elderly-bpc-rejection.entity';
import { GeneralUrbanRetirementAnalysisEntity } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis/general-urban-retirement-analysis-entity';
import { GeneralUrbanRetirementDenialEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial/general-urban-retirement-denial.entity';
import { GeneralUrbanRetirementGrantEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant/general-urban-retirement-grant.entity';
import { GeneralUrbanRetirementReviewEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review/general-urban-retirement-review.entity';
import { InsuranceQualityAnalysisEntity } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/schema/entity/insurance-quality-analysis/insurance-quality-analysis.entity';
import { JudicialCaseAnalysisEntity } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis/judicial-case-analysis.entity';
import { MaternityPayGrantEntity } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant/maternity-pay-grant.entity';
import { MedicalAndSocialReportObjectionGeneratorAnalysisEntity } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis/medical-and-social-report-objection-generator-analysis.entity';
import { MedicalQuestionGeneratorEntity } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator/medical-question-generator.entity';
import { PerCapitaIncomeForBpcAnalysisEntity } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis/per-capita-income-for-bpc-analysis.entity';
import { RetirementPermanentDisabilityRejectionEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection/retirement-permanent-disability-rejection.entity';
import { RetirementPermanentDisabilityRevisionEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision/retirement-permanent-disability-revision.entity';
import { RetirementPlanningRppsEntity } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps/retirement-planning-rpps-entity';
import { RuralOrHybridRetirementAnalysisEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis/rural-or-hybrid-retirement-analysis.entity';
import { RuralOrHybridRetirementRejectionEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection/rural-or-hybrid-retirement-rejection.entity';
import { RuralTimelineAnalysisEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/rural-timeline-analysis.entity';
import { SpecialActivityEntity } from '@module/customer/analysis-tool/module/special-activity-analysis/domain/schema/entity/special-activity/special-activity-entity';
import { SpecialCategoryRetirementAnalysisEntity } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis/special-category-retirement-analysis.entity';
import { SpecialRetirementGrantEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant/special-retirement-grant.entity';
import { SpecialRetirementRejectionEntity } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection/special-retirement-rejection.entity';
import { SpeechGeneratorEntity } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator/speech-generator.entity';
import { SurvivorPensionAnalysisEntity } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis/survivor-pension-analysis.entity';
import { TeacherRetirementPlanningEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning/teacher-retirement-planning.entity';
import { TeacherRetirementPlanningRejectionEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection/teacher-retirement-planning-rejection.entity';
import { TemporaryDisabilityBenefitsGrantEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant/temporary-disability-benefits-grant.entity';
import { TemporaryDisabilityBenefitsTerminatedEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated/temporary-disability-benefits-terminated.entity';
import { TemporaryIncapacityBenefitRejectionEntity } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection/temporary-incapacity-benefit-rejection.entity';
import { PermanentIncapacityBenefitTerminatedEntity } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated/permanent-incapacity-benefit-terminated.entity';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { AnalysisToolRecordEntityPropsInterface } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/analysis-tool-record.entity.props.interface';
import type { BpcElderlyAnalysisEntity } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis/bpc-elderly-analysis.entity';
import type { DisabilityRetirementPlanningEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning/disability-retirement-planning.entity';
import type { MaternityPayRejectionEntity } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection/maternity-pay-rejection.entity';
import type { RetirementPlanningRgpsEntity } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps/retirement-planning-rgps.entity';

export class AnalysisToolRecordEntity extends BaseEntity<AnalysisToolRecordId> {
  @Description(
    'Análise de revisão de aposentadoria por incapacidade permanente associada ao registro da ferramenta de análise',
  )
  public readonly retirementPermanentDisabilityRevision: RetirementPermanentDisabilityRevisionEntity | null;

  @Description('Status do registro da ferramenta de análise')
  public readonly status: AnalysisStatusEnum;

  @Description('Código de identificação do registro da ferramenta de análise')
  public readonly code: AnalysisToolRecordCode;

  @Description('Tipo do registro da ferramenta de análise')
  public readonly type: AnalysisToolRecordTypeEnum;

  @Description(
    'Análise rápida do CNIS associada ao registro da ferramenta de análise',
  )
  public readonly cnisFastAnalysis: CnisFastAnalysisEntity | null;

  @Description(
    'Registro de planejamento de aposentadoria RPPS associado ao registro da ferramenta de análise',
  )
  public readonly retirementPlanningRpps: RetirementPlanningRppsEntity | null;

  @Description(
    'Planejamento de aposentadoria RGPS associado ao registro da ferramenta de análise',
  )
  public readonly retirementPlanningRgps: RetirementPlanningRgpsEntity | null;

  @Description(
    'Atividade especial associada ao registro da ferramenta de análise',
  )
  public readonly specialActivity: SpecialActivityEntity | null;

  @Description(
    'Análise de caso judicial associada ao registro da ferramenta de análise',
  )
  public readonly judicialCaseAnalysis: JudicialCaseAnalysisEntity | null;

  @Description(
    'Análise administrativa do INSS associada ao registro da ferramenta de análise',
  )
  public readonly administrativeProcedureInssAnalysis: AdministrativeProcedureInssAnalysisEntity | null;

  @Description(
    'Gerador de perguntas médicas associado ao registro da ferramenta de análise',
  )
  public readonly medicalQuestionGenerator: MedicalQuestionGeneratorEntity | null;

  @Description(
    'Análise geradora de objeção de laudo médico e social associada ao registro da ferramenta de análise',
  )
  public readonly medicalAndSocialReportObjectionGeneratorAnalysis: MedicalAndSocialReportObjectionGeneratorAnalysisEntity | null;

  @Description(
    'Gerador de discurso associado ao registro da ferramenta de análise',
  )
  public readonly speechGenerator: SpeechGeneratorEntity | null;

  @Description(
    'Avaliação de deficiência para BPC associada ao registro da ferramenta de análise',
  )
  public readonly disabilityAssessmentForBpcAnalysis: DisabilityAssessmentForBpcAnalysisEntity | null;

  @Description(
    'Gerador de perguntas de audiência associado ao registro da ferramenta de análise',
  )
  public readonly audienceQuestionGenerator: AudienceQuestionGeneratorEntity | null;

  @Description(
    'Análise de renda per capita para BPC associada ao registro da ferramenta de análise',
  )
  public readonly perCapitaIncomeForBpcAnalysis: PerCapitaIncomeForBpcAnalysisEntity | null;

  @Description(
    'Análise de linha do tempo rural associada ao registro da ferramenta de análise',
  )
  public readonly ruralTimelineAnalysis: RuralTimelineAnalysisEntity | null;

  @Description(
    'Análise de qualidade de segurado associada ao registro da ferramenta de análise',
  )
  public readonly insuranceQualityAnalysis: InsuranceQualityAnalysisEntity | null;

  @Description(
    'Planejamento de aposentadoria de professor associado ao registro da ferramenta de análise',
  )
  public readonly teacherRetirementPlanning: TeacherRetirementPlanningEntity | null;

  @Description(
    'Indeferimento de aposentadoria de professor associado ao registro da ferramenta de análise',
  )
  public readonly teacherRetirementPlanningRejection: TeacherRetirementPlanningRejectionEntity | null;

  @Description(
    'Planejamento de aposentadoria por invalidez associado ao registro da ferramenta de análise',
  )
  public readonly disabilityRetirementPlanning: DisabilityRetirementPlanningEntity | null;

  @Description(
    'Concessão de aposentadoria urbana geral associada ao registro da ferramenta de análise',
  )
  public readonly generalUrbanRetirementGrant: GeneralUrbanRetirementGrantEntity | null;

  @Description(
    'Análise de aposentadoria urbana geral associada ao registro da ferramenta de análise',
  )
  public readonly generalUrbanRetirementAnalysis: GeneralUrbanRetirementAnalysisEntity | null;

  @Description(
    'Revisão de aposentadoria urbana geral associada ao registro da ferramenta de análise',
  )
  public readonly generalUrbanRetirementReview: GeneralUrbanRetirementReviewEntity | null;

  @Description(
    'Concessão de aposentadoria para deficiente associada ao registro da ferramenta de análise',
  )
  public readonly disabilityRetirementPlanningGrant: DisabilityRetirementPlanningGrantEntity | null;

  @Description(
    'Concessão de benefício por incapacidade temporária associada ao registro da ferramenta de análise',
  )
  public readonly temporaryDisabilityBenefitsGrant: TemporaryDisabilityBenefitsGrantEntity | null;

  @Description(
    'Cessação ou suspensão de benefício por incapacidade temporária associada ao registro da ferramenta de análise',
  )
  public readonly temporaryDisabilityBenefitsTerminated: TemporaryDisabilityBenefitsTerminatedEntity | null;

  @Description(
    'Análise de indeferimento de aposentadoria rural ou híbrida associada ao registro da ferramenta de análise',
  )
  public readonly ruralOrHybridRetirementRejection: RuralOrHybridRetirementRejectionEntity | null;

  @Description(
    'Análise de indeferimento de BPC ao Idoso associada ao registro da ferramenta de análise',
  )
  public readonly elderlyBpcRejection: ElderlyBpcRejectionEntity | null;

  @Description(
    'Análise de aposentadoria rural ou híbrida associada ao registro da ferramenta de análise',
  )
  public readonly ruralOrHybridRetirementAnalysis: RuralOrHybridRetirementAnalysisEntity | null;

  @Description(
    'Indeferimento de auxílio-acidente associado ao registro da ferramenta de análise',
  )
  public readonly accidentBenefitRejection: AccidentBenefitRejectionEntity | null;

  @Description(
    'Análise de pensão por morte associada ao registro da ferramenta de análise',
  )
  public readonly survivorPensionAnalysis: SurvivorPensionAnalysisEntity | null;

  @Description(
    'Análise de aposentadoria por categoria especial associada ao registro da ferramenta de análise',
  )
  public readonly specialCategoryRetirementAnalysis: SpecialCategoryRetirementAnalysisEntity | null;

  @Description(
    'Benefício de morte associado ao registro da ferramenta de análise',
  )
  public readonly deathBenefitGrant: DeathBenefitGrantEntity | null;

  @Description(
    'Indeferimento de benefício de morte associado ao registro da ferramenta de análise',
  )
  public readonly deathBenefitRejection: DeathBenefitRejectionEntity | null;

  @Description(
    'Concessão de aposentadoria especial associada ao registro da ferramenta de análise',
  )
  public readonly specialRetirementGrant: SpecialRetirementGrantEntity | null;

  @Description(
    'Análise de indeferimento de aposentadoria especial associada ao registro da ferramenta de análise',
  )
  public readonly specialRetirementRejection: SpecialRetirementRejectionEntity | null;

  @Description(
    'Análise de indeferimento de aposentadoria urbana geral associada ao registro da ferramenta de análise',
  )
  public readonly generalUrbanRetirementDenial: GeneralUrbanRetirementDenialEntity | null;

  @Description(
    'Análise de indeferimento de aposentadoria da pessoa com deficiência associada ao registro da ferramenta de análise',
  )
  public readonly disabilityRetirementPlanningRejection: DisabilityRetirementPlanningRejectionEntity | null;

  @Description(
    'Análise de concessão de BPC Pessoa com Deficiência associada ao registro da ferramenta de análise',
  )
  public readonly bpcDisabilityGrant: BpcDisabilityGrantEntity | null;

  @Description(
    'Análise de indeferimento de BPC Pessoa com Deficiência associada ao registro da ferramenta de análise',
  )
  public readonly bpcDisabilityDenial: BpcDisabilityDenialEntity | null;

  @Description(
    'Análise de BPC Pessoa com Deficiência cessado associada ao registro da ferramenta de análise',
  )
  public readonly bpcDisabilityTermination: BpcDisabilityTerminationEntity | null;

  @Description(
    'Análise de BPC ao Idoso associada ao registro da ferramenta de análise',
  )
  public readonly bpcElderlyAnalysis: BpcElderlyAnalysisEntity | null;

  @Description(
    'Análise de cessação ou suspensão de BPC ao Idoso associada ao registro da ferramenta de análise',
  )
  public readonly bpcElderlyCessation: BpcElderlyCessationEntity | null;

  @Description(
    'Análise de indeferimento de salário maternidade associada ao registro da ferramenta de análise',
  )
  public readonly maternityPayRejection: MaternityPayRejectionEntity | null;

  @Description(
    'Análise de indeferimento de benefício por incapacidade temporária associada ao registro da ferramenta de análise',
  )
  public readonly temporaryIncapacityBenefitRejection: TemporaryIncapacityBenefitRejectionEntity | null;

  @Description(
    'Análise de cessação de aposentadoria por incapacidade permanente associada ao registro da ferramenta de análise',
  )
  public readonly permanentIncapacityBenefitTerminated: PermanentIncapacityBenefitTerminatedEntity | null;

  @Description(
    'Análise de concessão de salário-maternidade associada ao registro da ferramenta de análise',
  )
  public readonly maternityPayGrant: MaternityPayGrantEntity | null;

  @Description(
    'Diagnóstico para auxílio-acidente (RGPS) associado ao registro da ferramenta de análise',
  )
  public readonly accidentAssistanceTerminated: AccidentAssistanceTerminatedEntity | null;

  @Description(
    'Análise de indeferimento de aposentadoria por incapacidade permanente associada ao registro da ferramenta de análise',
  )
  public readonly retirementPermanentDisabilityRejection: RetirementPermanentDisabilityRejectionEntity | null;

  @Description(
    'Análise de concessão de auxílio-acidente associada ao registro da ferramenta de análise',
  )
  public readonly accidentAssistanceGrant: AccidentAssistanceGrantEntity | null;

  @Description(
    'Cliente da ferramenta de análise associado ao registro da ferramenta de análise',
  )
  public readonly analysisToolClient: AnalysisToolClientEntity;

  @Description(
    'Membro da organização que criou o registro da ferramenta de análise.',
  )
  public readonly createdBy: OrganizationMemberId;

  @Description(
    'Membro da organização que atualizou o registro da ferramenta de análise.',
  )
  public readonly updatedBy: OrganizationMemberId;

  protected readonly _type = AnalysisToolRecordEntity.name;

  public constructor(props: AnalysisToolRecordEntityPropsInterface) {
    super(AnalysisToolRecordId, props);

    this.code = props.code;
    this.type = props.type;
    this.cnisFastAnalysis = props.cnisFastAnalysis ?? null;
    this.retirementPlanningRpps = props.retirementPlanningRpps ?? null;
    this.retirementPlanningRgps = props.retirementPlanningRgps ?? null;
    this.specialActivity = props.specialActivity ?? null;
    this.judicialCaseAnalysis = props.judicialCaseAnalysis ?? null;
    this.administrativeProcedureInssAnalysis =
      props.administrativeProcedureInssAnalysis ?? null;
    this.audienceQuestionGenerator = props.audienceQuestionGenerator ?? null;
    this.medicalQuestionGenerator = props.medicalQuestionGenerator ?? null;
    this.medicalAndSocialReportObjectionGeneratorAnalysis =
      props.medicalAndSocialReportObjectionGeneratorAnalysis ?? null;
    this.speechGenerator = props.speechGenerator ?? null;
    this.disabilityAssessmentForBpcAnalysis =
      props.disabilityAssessmentForBpcAnalysis ?? null;
    this.perCapitaIncomeForBpcAnalysis =
      props.perCapitaIncomeForBpcAnalysis ?? null;
    this.ruralTimelineAnalysis = props.ruralTimelineAnalysis ?? null;
    this.insuranceQualityAnalysis = props.insuranceQualityAnalysis ?? null;
    this.teacherRetirementPlanning = props.teacherRetirementPlanning ?? null;
    this.teacherRetirementPlanningRejection =
      props.teacherRetirementPlanningRejection ?? null;
    this.disabilityRetirementPlanning =
      props.disabilityRetirementPlanning ?? null;
    this.generalUrbanRetirementGrant =
      props.generalUrbanRetirementGrant ?? null;
    this.generalUrbanRetirementAnalysis =
      props.generalUrbanRetirementAnalysis ?? null;
    this.generalUrbanRetirementReview =
      props.generalUrbanRetirementReview ?? null;
    this.disabilityRetirementPlanningGrant =
      props.disabilityRetirementPlanningGrant ?? null;
    this.temporaryDisabilityBenefitsGrant =
      props.temporaryDisabilityBenefitsGrant ?? null;
    this.temporaryDisabilityBenefitsTerminated =
      props.temporaryDisabilityBenefitsTerminated ?? null;
    this.ruralOrHybridRetirementRejection =
      props.ruralOrHybridRetirementRejection ?? null;
    this.elderlyBpcRejection = props.elderlyBpcRejection ?? null;
    this.ruralOrHybridRetirementAnalysis =
      props.ruralOrHybridRetirementAnalysis ?? null;
    this.accidentBenefitRejection = props.accidentBenefitRejection ?? null;
    this.survivorPensionAnalysis = props.survivorPensionAnalysis ?? null;
    this.specialCategoryRetirementAnalysis =
      props.specialCategoryRetirementAnalysis ?? null;
    this.deathBenefitGrant = props.deathBenefitGrant ?? null;
    this.deathBenefitRejection = props.deathBenefitRejection ?? null;
    this.specialRetirementGrant = props.specialRetirementGrant ?? null;
    this.specialRetirementRejection = props.specialRetirementRejection ?? null;
    this.generalUrbanRetirementDenial =
      props.generalUrbanRetirementDenial ?? null;
    this.disabilityRetirementPlanningRejection =
      props.disabilityRetirementPlanningRejection ?? null;
    this.bpcDisabilityGrant = props.bpcDisabilityGrant ?? null;
    this.bpcDisabilityDenial = props.bpcDisabilityDenial ?? null;
    this.bpcDisabilityTermination = props.bpcDisabilityTermination ?? null;
    this.bpcElderlyAnalysis = props.bpcElderlyAnalysis ?? null;
    this.bpcElderlyCessation = props.bpcElderlyCessation ?? null;
    this.maternityPayRejection = props.maternityPayRejection ?? null;
    this.temporaryIncapacityBenefitRejection =
      props.temporaryIncapacityBenefitRejection ?? null;
    this.permanentIncapacityBenefitTerminated =
      props.permanentIncapacityBenefitTerminated ?? null;
    this.maternityPayGrant = props.maternityPayGrant ?? null;
    this.accidentAssistanceTerminated =
      props.accidentAssistanceTerminated ?? null;
    this.retirementPermanentDisabilityRejection =
      props.retirementPermanentDisabilityRejection ?? null;
    this.accidentAssistanceGrant = props.accidentAssistanceGrant ?? null;
    this.retirementPermanentDisabilityRevision =
      props.retirementPermanentDisabilityRevision ?? null;
    this.status = props.status;
    this.analysisToolClient = props.analysisToolClient;
    this.createdBy = props.createdBy;
    this.updatedBy = props.updatedBy;
  }
}
