import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

import { AccidentAssistanceGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-assistance-grant/accident-assistance-grant.typeorm.entity';
import { AccidentAssistanceTerminatedTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-assistance-terminated.entity';
import { AccidentBenefitRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-benefit-rejection.typeorm.entity';
import { AdministrativeProcedureInssAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/administrative-procedure-inss-analysis.entity';
import { AnalysisToolClientTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-client.typeorm.entity';
import { AudienceQuestionGeneratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/audience-question-generator.typeorm.entity';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { BpcDisabilityDenialTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-denial.typeorm.entity';
import { BpcDisabilityTerminationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-termination.typeorm.entity';
import { BpcElderlyAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-analysis.typeorm.entity';
import { BpcElderlyCessationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-cessation.typeorm.entity';
import { CnisFastAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/cnis-fast-analysis.typeorm.entity';
import { DeathBenefitGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-grant.typeorm.entity';
import { DeathBenefitRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-rejection.typeorm.entity';
import { DisabilityAssessmentForBpcAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-assessment-for-bpc-analysis.entity';
import { DisabilityRetirementPlanningGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-grant.typeorm.entity';
import { DisabilityRetirementPlanningRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-rejection.typeorm.entity';
import { DisabilityRetirementPlanningTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning.typeorm.entity';
import { GeneralUrbanRetirementAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-analysis.typeorm.entity';
import { GeneralUrbanRetirementDenialTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-denial.typeorm.entity';
import { GeneralUrbanRetirementGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-grant.typeorm.entity';
import { GeneralUrbanRetirementReviewTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-review.typeorm.entity';
import { InsuranceQualityAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/insurance-quality-analysis.typeorm.entity';
import { JudicialCaseAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/judicial-case-analysis.typeorm.entity';
import { MaternityPayGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-grant.typeorm.entity';
import { MedicalAndSocialReportObjectionGeneratorAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/medical-and-social-report-objection-generator-analysis.entity';
import { MedicalQuestionGeneratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/medical-question-generator.typeorm.entity';
import { OrganizationMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-member.typeorm.entity';
import { PerCapitaIncomeForBpcAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/per-capita-income-for-bpc-analysis.typeorm.entity';
import { RetirementPermanentDisabilityRevisionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-revision.typeorm.entity';
import { RetirementPlanningRgpsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rgps.typeorm.entity';
import { RetirementPlanningRppsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rpps.typeorm.entity';
import { RuralOrHybridRetirementAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-analysis.typeorm.entity';
import { RuralOrHybridRetirementRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-rejection.typeorm.entity';
import { RuralTimelineAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis.typeorm.entity';
import { SpecialActivityTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-activity.typeorm.entity';
import { SpecialCategoryRetirementAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-category-retirement-analysis.typeorm.entity';
import { SpecialRetirementGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-grant.typeorm.entity';
import { SpecialRetirementRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-rejection.typeorm.entity';
import { SpeechGeneratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/speech-generator.typeorm.entity';
import { SurvivorPensionAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis.typeorm.entity';
import { TeacherRetirementPlanningRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning-rejection.typeorm.entity';
import { TeacherRetirementPlanningTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning.typeorm.entity';
import { TemporaryDisabilityBenefitsGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant.typeorm.entity';
import { TemporaryDisabilityBenefitsTerminatedTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-terminated.typeorm.entity';
import { TemporaryIncapacityBenefitRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-rejection.typeorm.entity';
import { TemporaryIncapacityBenefitTerminationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-termination.typeorm.entity';
import { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-status.enum';
import { AnalysisToolRecordTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-tool-record-type.enum';

import type { MaternityPayRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-rejection.typeorm.entity';

@Entity({ name: 'analysis_tool_record' })
export class AnalysisToolRecordTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'status',
    type: 'simple-enum',
    enum: AnalysisStatusEnum,
    default: AnalysisStatusEnum.IN_PROGRESS,
  })
  public status: AnalysisStatusEnum;

  @Column({
    name: 'code',
    type: 'varchar',
    length: 255,
  })
  public code: string;

  @Column({
    name: 'type',
    type: 'simple-enum',
    enum: AnalysisToolRecordTypeEnum,
  })
  public type: AnalysisToolRecordTypeEnum;

  @OneToOne(
    () => AdministrativeProcedureInssAnalysisTypeormEntity,
    (entity) => entity.analysisToolRecord,
    {
      nullable: true,
    },
  )
  @JoinColumn({ name: 'administrative_procedure_inss_analysis_id' })
  public administrativeProcedureInssAnalysis?: AdministrativeProcedureInssAnalysisTypeormEntity | null;

  @OneToOne(
    () => CnisFastAnalysisTypeormEntity,
    (entity) => entity.analysisToolRecord,
    {
      nullable: true,
    },
  )
  @JoinColumn({ name: 'cnis_fast_analysis_id' })
  public cnisFastAnalysis?: CnisFastAnalysisTypeormEntity | null;

  @OneToOne(
    () => RetirementPlanningRppsTypeormEntity,
    (entity) => entity.analysisToolRecord,
    {
      nullable: true,
    },
  )
  @JoinColumn({ name: 'retirement_planning_rpps_id' })
  public retirementPlanningRpps?: RetirementPlanningRppsTypeormEntity | null;

  @ManyToOne(() => RetirementPlanningRgpsTypeormEntity)
  @JoinColumn({ name: 'retirement_planning_rgps_id' })
  public retirementPlanningRgps?: RetirementPlanningRgpsTypeormEntity | null;

  @OneToOne(() => SpecialActivityTypeormEntity, { nullable: true })
  @JoinColumn({ name: 'special_activity_id' })
  public specialActivity?: SpecialActivityTypeormEntity | null;

  @OneToOne(
    () => TeacherRetirementPlanningTypeormEntity,
    (entity) => entity.analysisToolRecord,
    {
      nullable: true,
    },
  )
  @JoinColumn({ name: 'teacher_retirement_planning_id' })
  public teacherRetirementPlanning?: TeacherRetirementPlanningTypeormEntity | null;

  @OneToOne(
    () => SpecialCategoryRetirementAnalysisTypeormEntity,
    (entity) => entity.analysisToolRecord,
    {
      nullable: true,
    },
  )
  @JoinColumn({ name: 'special_category_retirement_analysis_id' })
  public specialCategoryRetirementAnalysis?: SpecialCategoryRetirementAnalysisTypeormEntity | null;
  @OneToOne(
    () => JudicialCaseAnalysisTypeormEntity,
    (entity) => entity.analysisToolRecord,
    {
      nullable: true,
    },
  )
  @JoinColumn({ name: 'judicial_case_analysis_id' })
  public judicialCaseAnalysis?: JudicialCaseAnalysisTypeormEntity | null;

  @OneToOne(
    () => MedicalQuestionGeneratorTypeormEntity,
    (entity) => entity.analysisToolRecord,
    {
      nullable: true,
    },
  )
  @JoinColumn({ name: 'medical_question_generator_id' })
  public medicalQuestionGenerator?: MedicalQuestionGeneratorTypeormEntity | null;

  @OneToOne(
    () => MedicalAndSocialReportObjectionGeneratorAnalysisTypeormEntity,
    (entity) => entity.analysisToolRecord,
    {
      nullable: true,
    },
  )
  @JoinColumn({
    name: 'medical_and_social_report_objection_generator_analysis_id',
  })
  public medicalAndSocialReportObjectionGeneratorAnalysis?: MedicalAndSocialReportObjectionGeneratorAnalysisTypeormEntity | null;

  @OneToOne(
    () => SpeechGeneratorTypeormEntity,
    (entity) => entity.analysisToolRecord,
    {
      nullable: true,
    },
  )
  @JoinColumn({ name: 'speech_generator_id' })
  public speechGenerator?: SpeechGeneratorTypeormEntity | null;

  @OneToOne(
    () => DisabilityAssessmentForBpcAnalysisTypeormEntity,
    (entity) => entity.analysisToolRecord,
    {
      nullable: true,
    },
  )
  @JoinColumn({ name: 'disability_assessment_for_bpc_analysis_id' })
  public disabilityAssessmentForBpcAnalysis?: DisabilityAssessmentForBpcAnalysisTypeormEntity | null;

  @OneToOne(
    () => AudienceQuestionGeneratorTypeormEntity,
    (entity) => entity.analysisToolRecord,
    {
      nullable: true,
    },
  )
  @JoinColumn({ name: 'audience_question_generator_id' })
  public audienceQuestionGenerator?: AudienceQuestionGeneratorTypeormEntity | null;

  @OneToOne(
    () => RuralTimelineAnalysisTypeormEntity,
    (entity) => entity.analysisToolRecord,
    {
      nullable: true,
    },
  )
  @JoinColumn({ name: 'rural_timeline_id' })
  public ruralTimeline?: RuralTimelineAnalysisTypeormEntity | null;

  @ManyToOne(() => RuralOrHybridRetirementRejectionTypeormEntity)
  @JoinColumn({ name: 'rural_or_hybrid_retirement_rejection_id' })
  public ruralOrHybridRetirementRejection?: RuralOrHybridRetirementRejectionTypeormEntity | null;

  @ManyToOne(() => RuralOrHybridRetirementAnalysisTypeormEntity)
  @JoinColumn({ name: 'rural_or_hybrid_retirement_analysis_id' })
  public ruralOrHybridRetirementAnalysis?: RuralOrHybridRetirementAnalysisTypeormEntity | null;

  @OneToOne(
    () => InsuranceQualityAnalysisTypeormEntity,
    (entity) => entity.analysisToolRecord,
    {
      nullable: true,
    },
  )
  @JoinColumn({ name: 'insurance_quality_analysis_id' })
  public insuranceQualityAnalysis?: InsuranceQualityAnalysisTypeormEntity | null;

  @OneToOne(
    () => PerCapitaIncomeForBpcAnalysisTypeormEntity,
    (entity) => entity.analysisToolRecord,
    {
      nullable: true,
    },
  )
  @JoinColumn({ name: 'per_capita_income_for_bpc_analysis_id' })
  public perCapitaIncomeForBpcAnalysis?: PerCapitaIncomeForBpcAnalysisTypeormEntity | null;

  @OneToOne(
    () => DisabilityRetirementPlanningTypeormEntity,
    (entity) => entity.analysisToolRecord,
    {
      nullable: true,
    },
  )
  @JoinColumn({ name: 'disability_retirement_planning_id' })
  public disabilityRetirementPlanning?: DisabilityRetirementPlanningTypeormEntity | null;

  @ManyToOne(() => DisabilityRetirementPlanningGrantTypeormEntity)
  @JoinColumn({ name: 'disability_retirement_planning_grant_id' })
  public disabilityRetirementPlanningGrant?: DisabilityRetirementPlanningGrantTypeormEntity | null;

  @ManyToOne(() => DeathBenefitGrantTypeormEntity)
  @JoinColumn({ name: 'death_benefit_grant_id' })
  public deathBenefitGrant?: DeathBenefitGrantTypeormEntity | null;

  @ManyToOne(() => DeathBenefitRejectionTypeormEntity)
  @JoinColumn({ name: 'death_benefit_rejection_id' })
  public deathBenefitRejection?: DeathBenefitRejectionTypeormEntity | null;

  @ManyToOne(() => TemporaryDisabilityBenefitsGrantTypeormEntity)
  @JoinColumn({ name: 'temporary_disability_benefits_grant_id' })
  public temporaryDisabilityBenefitsGrant?: TemporaryDisabilityBenefitsGrantTypeormEntity | null;

  @OneToOne(
    () => TemporaryDisabilityBenefitsTerminatedTypeormEntity,
    (entity) => entity.analysisToolRecord,
  )
  @JoinColumn({ name: 'temporary_disability_benefits_terminated_id' })
  public temporaryDisabilityBenefitsTerminated?: TemporaryDisabilityBenefitsTerminatedTypeormEntity | null;

  @ManyToOne(() => AccidentBenefitRejectionTypeormEntity)
  @JoinColumn({ name: 'accident_benefit_rejection_id' })
  public accidentBenefitRejection?: AccidentBenefitRejectionTypeormEntity | null;

  @OneToOne(
    () => SurvivorPensionAnalysisTypeormEntity,
    (entity) => entity.analysisToolRecord,
    { nullable: true },
  )
  @JoinColumn({ name: 'survivor_pension_analysis_id' })
  public survivorPensionAnalysis?:
    | SurvivorPensionAnalysisTypeormEntity
    | undefined;

  @ManyToOne(() => GeneralUrbanRetirementGrantTypeormEntity)
  @JoinColumn({ name: 'general_urban_retirement_grant_id' })
  public generalUrbanRetirementGrant?: GeneralUrbanRetirementGrantTypeormEntity | null;

  @ManyToOne(() => GeneralUrbanRetirementReviewTypeormEntity)
  @JoinColumn({ name: 'general_urban_retirement_review_id' })
  public generalUrbanRetirementReview?: GeneralUrbanRetirementReviewTypeormEntity | null;

  @OneToOne(
    () => GeneralUrbanRetirementAnalysisTypeormEntity,
    (entity) => entity.analysisToolRecord,
    {
      nullable: true,
    },
  )
  @JoinColumn({ name: 'general_urban_retirement_analysis_id' })
  public generalUrbanRetirementAnalysis?: GeneralUrbanRetirementAnalysisTypeormEntity | null;

  @OneToOne(
    () => SpecialRetirementGrantTypeormEntity,
    (entity) => entity.analysisToolRecord,
    {
      nullable: true,
    },
  )
  @JoinColumn({ name: 'special_retirement_grant_id' })
  public specialRetirementGrant?: SpecialRetirementGrantTypeormEntity | null;

  @ManyToOne(() => SpecialRetirementRejectionTypeormEntity)
  @JoinColumn({ name: 'special_retirement_rejection_id' })
  public specialRetirementRejection?: SpecialRetirementRejectionTypeormEntity | null;

  @ManyToOne(() => GeneralUrbanRetirementDenialTypeormEntity)
  @JoinColumn({ name: 'general_urban_retirement_denial_id' })
  public generalUrbanRetirementDenial?: GeneralUrbanRetirementDenialTypeormEntity | null;

  @ManyToOne(() => DisabilityRetirementPlanningRejectionTypeormEntity)
  @JoinColumn({ name: 'disability_retirement_planning_rejection_id' })
  public disabilityRetirementPlanningRejection?: DisabilityRetirementPlanningRejectionTypeormEntity | null;

  @OneToOne(
    () => BpcDisabilityDenialTypeormEntity,
    (entity) => entity.analysisToolRecord,
    { nullable: true },
  )
  @JoinColumn({ name: 'bpc_disability_denial_id' })
  public bpcDisabilityDenial?: BpcDisabilityDenialTypeormEntity | null;

  @OneToOne(
    () => BpcElderlyAnalysisTypeormEntity,
    (entity) => entity.analysisToolRecord,
    { nullable: true },
  )
  @JoinColumn({ name: 'bpc_elderly_analysis_id' })
  public bpcElderlyAnalysis?: BpcElderlyAnalysisTypeormEntity | null;

  @OneToOne(
    () => BpcElderlyCessationTypeormEntity,
    (entity) => entity.analysisToolRecord,
    { nullable: true },
  )
  @JoinColumn({ name: 'bpc_elderly_cessation_id' })
  public bpcElderlyCessation?: BpcElderlyCessationTypeormEntity | null;

  @ManyToOne('MaternityPayRejectionTypeormEntity')
  @JoinColumn({ name: 'maternity_pay_rejection_id' })
  public maternityPayRejection?: MaternityPayRejectionTypeormEntity | null;

  @ManyToOne(() => TemporaryIncapacityBenefitRejectionTypeormEntity)
  @JoinColumn({ name: 'temporary_incapacity_benefit_rejection_id' })
  public temporaryIncapacityBenefitRejection?: TemporaryIncapacityBenefitRejectionTypeormEntity | null;

  @ManyToOne(() => TemporaryIncapacityBenefitTerminationTypeormEntity)
  @JoinColumn({ name: 'temporary_incapacity_benefit_termination_id' })
  public temporaryIncapacityBenefitTermination?: TemporaryIncapacityBenefitTerminationTypeormEntity | null;

  @ManyToOne(() => MaternityPayGrantTypeormEntity)
  @JoinColumn({ name: 'maternity_pay_grant_id' })
  public maternityPayGrant?: MaternityPayGrantTypeormEntity | null;

  @ManyToOne(() => TeacherRetirementPlanningRejectionTypeormEntity)
  @JoinColumn({ name: 'teacher_retirement_planning_rejection_id' })
  public teacherRetirementPlanningRejection?: TeacherRetirementPlanningRejectionTypeormEntity | null;

  @ManyToOne(() => BpcDisabilityTerminationTypeormEntity)
  @JoinColumn({ name: 'bpc_disability_termination_id' })
  public bpcDisabilityTermination?: BpcDisabilityTerminationTypeormEntity | null;

  @OneToOne(
    () => AccidentAssistanceTerminatedTypeormEntity,
    (entity) => entity.analysisToolRecord,
    { nullable: true },
  )
  @JoinColumn({ name: 'accident_assistance_terminated_id' })
  public accidentAssistanceTerminated?: AccidentAssistanceTerminatedTypeormEntity | null;

  @ManyToOne(() => AccidentAssistanceGrantTypeormEntity)
  @JoinColumn({ name: 'accident_assistance_grant_id' })
  public accidentAssistanceGrant?: AccidentAssistanceGrantTypeormEntity | null;

  @ManyToOne(() => RetirementPermanentDisabilityRevisionTypeormEntity)
  @JoinColumn({ name: 'retirement_permanent_disability_revision_id' })
  public retirementPermanentDisabilityRevision?: RetirementPermanentDisabilityRevisionTypeormEntity | null;

  @ManyToOne(
    () => AnalysisToolClientTypeormEntity,
    (entity) => entity.analysisToolRecord,
  )
  @JoinColumn({ name: 'analysis_tool_client_id' })
  public analysisToolClient?: AnalysisToolClientTypeormEntity | undefined;

  @ManyToOne(() => OrganizationMemberTypeormEntity)
  @JoinColumn({ name: 'created_by_id' })
  public createdBy?: OrganizationMemberTypeormEntity | undefined;

  @ManyToOne(() => OrganizationMemberTypeormEntity)
  @JoinColumn({ name: 'updated_by_id' })
  public updatedBy?: OrganizationMemberTypeormEntity | undefined;

  protected override readonly _type = AnalysisToolRecordTypeormEntity.name;
}
