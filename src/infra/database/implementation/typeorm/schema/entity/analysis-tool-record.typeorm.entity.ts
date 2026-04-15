import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

import { AdministrativeProcedureInssAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/administrative-procedure-inss-analysis.entity';
import { AnalysisToolClientTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-client.typeorm.entity';
import { AudienceQuestionGeneratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/audience-question-generator.typeorm.entity';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { CnisFastAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/cnis-fast-analysis.typeorm.entity';
import { DeathBenefitGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-grant.typeorm.entity';
import { DisabilityAssessmentForBpcAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-assessment-for-bpc-analysis.entity';
import { DisabilityRetirementPlanningGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-grant.typeorm.entity';
import { DisabilityRetirementPlanningTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning.typeorm.entity';
import { GeneralUrbanRetirementAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-analysis.typeorm.entity';
import { GeneralUrbanRetirementGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-grant.typeorm.entity';
import { InsuranceQualityAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/insurance-quality-analysis.typeorm.entity';
import { JudicialCaseAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/judicial-case-analysis.typeorm.entity';
import { MedicalAndSocialReportObjectionGeneratorAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/medical-and-social-report-objection-generator-analysis.entity';
import { MedicalQuestionGeneratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/medical-question-generator.typeorm.entity';
import { OrganizationMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-member.typeorm.entity';
import { PerCapitaIncomeForBpcAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/per-capita-income-for-bpc-analysis.typeorm.entity';
import { RetirementPlanningRgpsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rgps.typeorm.entity';
import { RetirementPlanningRppsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rpps.typeorm.entity';
import { RuralOrHybridRetirementRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-rejection.typeorm.entity';
import { RuralTimelineAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis.typeorm.entity';
import { SpecialActivityTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-activity.typeorm.entity';
import { SpecialCategoryRetirementAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-category-retirement-analysis.typeorm.entity';
import { SpecialRetirementGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-grant.typeorm.entity';
import { SpeechGeneratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/speech-generator.typeorm.entity';
import { SurvivorPensionAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis.typeorm.entity';
import { TeacherRetirementPlanningTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning.typeorm.entity';
import { TemporaryDisabilityBenefitsGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant.typeorm.entity';
import { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-status.enum';
import { AnalysisToolRecordTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-tool-record-type.enum';

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

  @ManyToOne(() => TemporaryDisabilityBenefitsGrantTypeormEntity)
  @JoinColumn({ name: 'temporary_disability_benefits_grant_id' })
  public temporaryDisabilityBenefitsGrant?: TemporaryDisabilityBenefitsGrantTypeormEntity | null;

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
