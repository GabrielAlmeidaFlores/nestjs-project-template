import type { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import type { NotFoundError } from '@core/error/not-found.error';
import type { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import type { ListAnalysisToolRecordQueryParam } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/param/list-analysis-tool-record.query.param';
import type { GetAnalysisToolRecordStatisticsMonthlyQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/result/analysis-tool-record-statistics-monthly.query.result';
import type { AnalysisToolRecordStatisticsQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/result/analysis-tool-record-statistics.query.result';
import type { GetAnalysisToolRecordWithFullRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/result/get-analysis-tool-record-with-full-relations.query.result';
import type { GetAnalysisToolRecordWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/result/get-analysis-tool-record-with-relations.query.result';
import type { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import type { AnalysisToolRecordTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-tool-record-type.enum';
import type { AnalysisToolRecordId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/value-object/analysis-tool-record-id/analysis-tool-record-id.value-objects';
import type { AccidentAssistanceGrantId } from '@module/customer/analysis-tool/module/accident-assistance-grant/domain/schema/entity/accident-assistance-grant/value-object/accident-assistance-grant-id.value-object';
import type { AccidentAssistanceTerminatedId } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated/value-object/accident-assistance-terminated-id/accident-assistance-terminated-id.value-object';
import type { AccidentBenefitRejectionId } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection/value-object/accident-benefit-rejection-id.value-object';
import type { AdministrativeProcedureInssAnalysisId } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/schema/entity/administrative-procedure-inss-analysis/value-object/administrative-procedure-inss-analysis-id/administrative-procedure-inss-analysis-id.value-object';
import type { AudienceQuestionGeneratorId } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator/value-object/audience-question-generator-id/audience-question-generator-id.value-object';
import type { BpcDisabilityDenialId } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial/value-object/bpc-disability-denial-id/bpc-disability-denial-id.value-object';
import type { BpcDisabilityGrantId } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant/value-object/bpc-disability-grant-id/bpc-disability-grant-id.value-object';
import type { BpcDisabilityTerminationId } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination/value-object/bpc-disability-termination-id/bpc-disability-termination-id.value-object';
import type { BpcElderlyAnalysisId } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis/value-object/bpc-elderly-analysis-id/bpc-elderly-analysis-id.value-object';
import type { BpcElderlyCessationId } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation/value-object/bpc-elderly-cessation-id/bpc-elderly-cessation-id.value-object';
import type { CnisFastAnalysisId } from '@module/customer/analysis-tool/module/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis/value-object/cnis-fast-analysis-id/cnis-fast-analysis-id.value-object';
import type { DeathBenefitGrantId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant/value-object/death-benefit-grant-id.value-object';
import type { DeathBenefitRejectionId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection/value-object/death-benefit-rejection-id.value-object';
import type { DisabilityAssessmentForBpcAnalysisId } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis/value-object/disability-assessment-for-bpc-analysis-id/disability-assessment-for-bpc-analysis-id.value-object';
import type { DisabilityRetirementPlanningId } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning/value-object/disability-retirement-planning-id.value-object';
import type * as DisabilityRetirementPlanningGrantIdType from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant/value-object/disability-retirement-planning-grant-id.value-object';
import type { DisabilityRetirementPlanningRejectionId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection/value-object/disability-retirement-planning-rejection-id/disability-retirement-planning-rejection-id.value-object';
import type { ElderlyBpcRejectionId } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection/value-object/elderly-bpc-rejection-id/elderly-bpc-rejection-id.value-object';
import type { GeneralUrbanRetirementAnalysisId } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis/value-object/general-urban-retirement-analysis-id.value-object';
import type { GeneralUrbanRetirementDenialId } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial/value-object/general-urban-retirement-denial-id/general-urban-retirement-denial-id.value-object';
import type { GeneralUrbanRetirementGrantId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant/value-object/general-urban-retirement-grant-id.value-object';
import type { GeneralUrbanRetirementReviewId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review/value-object/general-urban-retirement-review-id.value-object';
import type { InsuranceQualityAnalysisId } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/schema/entity/insurance-quality-analysis/value-object/insurance-quality-analysis-id/insurance-quality-analysis-id.value-object';
import type { JudicialCaseAnalysisId } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis/value-object/judicial-case-analysis-id/judicial-case-analysis-id.value-object';
import type { MaternityPayGrantId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant/value-object/maternity-pay-grant-id.value-object';
import type { MaternityPayRejectionId } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection/value-object/maternity-pay-rejection-id.value-object';
import type { MedicalAndSocialReportObjectionGeneratorAnalysisId } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis/value-object/medical-and-social-report-objection-generator-analysis-id/medical-and-social-report-objection-generator-analysis-id.value-object';
import type { MedicalQuestionGeneratorId } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator/value-object/medical-question-generator-id/medical-question-generator-id.value-object';
import type { PerCapitaIncomeForBpcAnalysisId } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis/value-object/per-capita-income-for-bpc-analysis-id/per-capita-income-for-bpc-analysis-id.value-object';
import type { PermanentIncapacityBenefitTerminatedId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated/value-object/permanent-incapacity-benefit-terminated-id.value-object';
import type { RetirementPermanentDisabilityRejectionId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection/value-object/retirement-permanent-disability-rejection-id/retirement-permanent-disability-rejection-id.value-object';
import type { RetirementPermanentDisabilityRevisionId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision/value-object/retirement-permanent-disability-revision-id.value-object';
import type { RetirementPlanningRgpsId } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps/value-object/retirement-planning-rgps-id.value-object';
import type { RetirementPlanningRppsId } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps/value-object/retirement-planning-rpps-id.value-object';
import type { RuralOrHybridRetirementAnalysisId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis/value-object/rural-or-hybrid-retirement-analysis-id.value-object';
import type { RuralOrHybridRetirementRejectionId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection/value-object/rural-or-hybrid-retirement-rejection-id.value-object';
import type { RuralTimelineAnalysisId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/value-object/rural-timeline-analysis-id/rural-timeline-analysis-id.value-object';
import type { SpecialActivityId } from '@module/customer/analysis-tool/module/special-activity-analysis/domain/schema/entity/special-activity/value-object/special-activity-id.value-object';
import type { SpecialRetirementGrantId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant/value-object/special-retirement-grant-id/special-retirement-grant-id.value-object';
import type { SpecialRetirementRejectionId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection/value-object/special-retirement-rejection-id.value-object';
import type { SpeechGeneratorId } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator/value-object/speech-generator-id/speech-generator-id.value-object';
import type { SurvivorPensionAnalysisId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis/value-object/survivor-pension-analysis-id/survivor-pension-analysis-id.value-object';
import type { TeacherRetirementPlanningId } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning/value-object/teacher-retirement-planning-id.value-object';
import type { TeacherRetirementPlanningRejectionId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection/value-object/teacher-retirement-planning-rejection-id.value-object';
import type { TemporaryDisabilityBenefitsGrantId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant/value-object/temporary-disability-benefits-grant-id.value-object';
import type { TemporaryDisabilityBenefitsTerminatedId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated/value-object/temporary-disability-benefits-terminated-id.value-object';
import type { TemporaryIncapacityBenefitRejectionId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection/value-object/temporary-incapacity-benefit-rejection-id.value-object';
import type { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class AnalysisToolRecordQueryRepositoryGateway {
  public abstract findOneByAnalysisToolRecordIdAndAuthIdentityIdAndOrganizationIdWithRelationsOrFail(
    id: AnalysisToolRecordId,
    organizationId: OrganizationId,
    AuthIdentityId: AuthIdentityId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult>;

  public abstract countByOrganizationIdAndAuthIdentityId(
    organizationId: OrganizationId,
    AuthIdentityId: AuthIdentityId,
  ): Promise<number>;

  public abstract findMaxCodeByOrganizationIdAndAuthIdentityId(
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
  ): Promise<number>;

  public abstract listByOrganizationIdAndAuthIdentityId(
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    listData: ListAnalysisToolRecordQueryParam,
  ): Promise<
    ListDataOutputModel<GetAnalysisToolRecordWithRelationsQueryResult>
  >;

  public abstract countByOrganizationIdAndAnalysisToolClientIdAndAuthIdentityId(
    organizationId: OrganizationId,
    analysisToolClientId: AnalysisToolClientId,
    AuthIdentityId: AuthIdentityId,
  ): Promise<number>;

  public abstract findWithRelationsByClientIdAndOrganizationIdAndAuthIdentityId(
    analysisToolClientId: AnalysisToolClientId,
    organizationId: OrganizationId,
    AuthIdentityId: AuthIdentityId,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult[]>;

  public abstract findWithRelationsByCnisFastAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
    cnisFastAnalysisId: CnisFastAnalysisId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult>;

  public abstract findWithRelationsByRetirementPlanningRppsIdAndOrganizationIdAndAuthIdentityIdOrFail(
    retirementPlanningRppsId: RetirementPlanningRppsId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult>;

  public abstract getStatisticsByOrganizationIdAndAuthIdentityId(
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    startDate: Date,
    endDate: Date,
    type?: AnalysisToolRecordTypeEnum,
  ): Promise<AnalysisToolRecordStatisticsQueryResult>;

  public abstract findWithRelationsByRetirementPlanningRgpsIdAndOrganizationIdAndAuthIdentityIdOrFail(
    retirementPlanningRgpsId: RetirementPlanningRgpsId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult>;

  public abstract findWithRelationsByGeneralUrbanRetirementGrantIdAndOrganizationIdAndAuthIdentityIdOrFail(
    generalUrbanRetirementGrantId: GeneralUrbanRetirementGrantId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult>;

  public abstract findWithRelationsBySpecialActivityIdAndOrganizationIdAndAuthIdentityIdOrFail(
    specialActivityId: SpecialActivityId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult>;

  public abstract findWithRelationsBySpecialRetirementGrantIdAndOrganizationIdAndAuthIdentityIdOrFail(
    specialRetirementGrantId: SpecialRetirementGrantId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult>;

  public abstract findWithRelationsBySpecialRetirementRejectionIdAndOrganizationIdAndAuthIdentityIdOrFail(
    specialRetirementRejectionId: SpecialRetirementRejectionId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult>;

  public abstract findWithRelationsByJudicialCaseAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
    judicialCaseAnalysisId: JudicialCaseAnalysisId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult>;

  public abstract findWithRelationsByAdministrativeProcedureInssAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
    administrativeProcedureInssAnalysisId: AdministrativeProcedureInssAnalysisId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult>;

  public abstract findWithRelationsByAudienceQuestionGeneratorIdAndOrganizationIdAndAuthIdentityIdOrFail(
    audienceQuestionGeneratorId: AudienceQuestionGeneratorId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult>;

  public abstract findWithRelationsByMedicalQuestionGeneratorIdAndOrganizationIdAndAuthIdentityIdOrFail(
    medicalQuestionGeneratorId: MedicalQuestionGeneratorId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult>;

  public abstract findWithRelationsByMedicalAndSocialReportObjectionGeneratorAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
    medicalAndSocialReportObjectionGeneratorAnalysisId: MedicalAndSocialReportObjectionGeneratorAnalysisId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult>;

  public abstract findWithRelationsBySpeechGeneratorIdAndOrganizationIdAndAuthIdentityIdOrFail(
    speechGeneratorId: SpeechGeneratorId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult>;

  public abstract findWithRelationsByDisabilityAssessmentForBpcAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
    disabilityAssessmentForBpcAnalysisId: DisabilityAssessmentForBpcAnalysisId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult>;

  public abstract findWithRelationsByInsuranceQualityAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
    insuranceQualityAnalysisId: InsuranceQualityAnalysisId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult>;

  public abstract findWithRelationsByPerCapitaIncomeForBpcAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
    perCapitaIncomeForBpcAnalysisId: PerCapitaIncomeForBpcAnalysisId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult>;

  public abstract findWithRelationsByBpcElderlyAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
    bpcElderlyAnalysisId: BpcElderlyAnalysisId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult>;

  public abstract findWithRelationsByBpcElderlyCessationIdAndOrganizationIdAndAuthIdentityIdOrFail(
    bpcElderlyCessationId: BpcElderlyCessationId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult>;

  public abstract findWithRelationsByBpcDisabilityGrantIdAndOrganizationIdAndAuthIdentityIdOrFail(
    bpcDisabilityGrantId: BpcDisabilityGrantId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult>;

  public abstract findWithRelationsByBpcDisabilityDenialIdAndOrganizationIdAndAuthIdentityIdOrFail(
    bpcDisabilityDenialId: BpcDisabilityDenialId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult>;

  public abstract findWithRelationsByAccidentAssistanceTerminatedIdAndOrganizationIdAndAuthIdentityIdOrFail(
    accidentAssistanceTerminatedId: AccidentAssistanceTerminatedId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult>;

  public abstract findWithRelationsByAccidentAssistanceGrantIdAndOrganizationIdAndAuthIdentityIdOrFail(
    accidentAssistanceGrantId: AccidentAssistanceGrantId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult>;
  public abstract findWithRelationsByRuralTimelineAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
    ruralTimelineAnalysisId: RuralTimelineAnalysisId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult>;

  public abstract findWithRelationsByDisabilityRetirementPlanningIdAndOrganizationIdAndAuthIdentityIdOrFail(
    disabilityRetirementPlanningId: DisabilityRetirementPlanningId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult>;

  public abstract findWithRelationsByDisabilityRetirementPlanningGrantIdAndOrganizationIdAndAuthIdentityIdOrFail(
    disabilityRetirementPlanningGrantId: DisabilityRetirementPlanningGrantIdType.DisabilityRetirementPlanningGrantId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult>;

  public abstract findWithRelationsByTemporaryDisabilityBenefitsGrantIdAndOrganizationIdAndAuthIdentityIdOrFail(
    temporaryDisabilityBenefitsGrantId: TemporaryDisabilityBenefitsGrantId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult>;

  public abstract findWithRelationsByTemporaryDisabilityBenefitsGrantIdAndOrganizationIdAndAuthIdentityId(
    temporaryDisabilityBenefitsGrantId: TemporaryDisabilityBenefitsGrantId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult | null>;

  public abstract findWithRelationsByTemporaryDisabilityBenefitsTerminatedIdAndOrganizationIdAndAuthIdentityIdOrFail(
    temporaryDisabilityBenefitsTerminatedId: TemporaryDisabilityBenefitsTerminatedId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult>;

  public abstract findWithRelationsByGeneralUrbanRetirementAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
    generalUrbanRetirementAnalysisId: GeneralUrbanRetirementAnalysisId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult>;

  public abstract findWithRelationsByDeathBenefitGrantIdAndOrganizationIdAndAuthIdentityIdOrFail(
    deathBenefitGrantId: DeathBenefitGrantId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult>;

  public abstract findWithRelationsByDeathBenefitRejectionIdAndOrganizationIdAndAuthIdentityIdOrFail(
    deathBenefitRejectionId: DeathBenefitRejectionId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult>;

  public abstract countAllAnalysesForYear(
    year: number,
    type?: AnalysisToolRecordTypeEnum,
  ): Promise<number>;

  public abstract countAllMonthlyAnalysesForYear(
    year: number,
    type?: AnalysisToolRecordTypeEnum,
  ): Promise<Array<GetAnalysisToolRecordStatisticsMonthlyQueryResult>>;

  public abstract listAllAnalysesForYear(
    year: number,
    listData: ListAnalysisToolRecordQueryParam,
  ): Promise<
    ListDataOutputModel<GetAnalysisToolRecordWithRelationsQueryResult>
  >;

  public abstract listAllAnalysesForYearWithFullRelations(
    year: number,
    listData: ListAnalysisToolRecordQueryParam,
  ): Promise<
    ListDataOutputModel<GetAnalysisToolRecordWithFullRelationsQueryResult>
  >;

  public abstract findWithRelationsByTeacherRetirementPlanningIdAndOrganizationIdAndAuthIdentityIdOrFail(
    teacherRetirementPlanningId: TeacherRetirementPlanningId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult>;

  public abstract findWithRelationsByRuralOrHybridRetirementRejectionIdAndOrganizationIdAndAuthIdentityIdOrFail(
    ruralOrHybridRetirementRejectionId: RuralOrHybridRetirementRejectionId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult>;

  public abstract findWithRelationsByRuralOrHybridRetirementRejectionIdOrFail(
    ruralOrHybridRetirementRejectionId: RuralOrHybridRetirementRejectionId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult>;

  public abstract findWithRelationsByRuralOrHybridRetirementAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
    ruralOrHybridRetirementAnalysisId: RuralOrHybridRetirementAnalysisId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult>;

  public abstract findWithRelationsByRuralOrHybridRetirementAnalysisIdOrFail(
    ruralOrHybridRetirementAnalysisId: RuralOrHybridRetirementAnalysisId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult>;

  public abstract findWithRelationsBySurvivorPensionAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
    survivorPensionAnalysisId: SurvivorPensionAnalysisId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult>;

  public abstract findWithRelationsByGeneralUrbanRetirementDenialIdAndOrganizationIdAndAuthIdentityIdOrFail(
    generalUrbanRetirementDenialId: GeneralUrbanRetirementDenialId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult>;

  public abstract findWithRelationsByGeneralUrbanRetirementReviewIdAndOrganizationIdAndAuthIdentityIdOrFail(
    generalUrbanRetirementReviewId: GeneralUrbanRetirementReviewId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult>;

  public abstract findWithRelationsByAccidentBenefitRejectionIdAndOrganizationIdAndAuthIdentityIdOrFail(
    accidentBenefitRejectionId: AccidentBenefitRejectionId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult>;

  public abstract findWithRelationsByMaternityPayGrantIdAndOrganizationIdAndAuthIdentityIdOrFail(
    maternityPayGrantId: MaternityPayGrantId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult>;

  public abstract findWithRelationsByDisabilityRetirementPlanningRejectionIdAndOrganizationIdAndAuthIdentityIdOrFail(
    disabilityRetirementPlanningRejectionId: DisabilityRetirementPlanningRejectionId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult>;

  public abstract findWithRelationsByBpcDisabilityTerminationIdAndOrganizationIdAndAuthIdentityIdOrFail(
    bpcDisabilityTerminationId: BpcDisabilityTerminationId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult>;

  public abstract findWithRelationsByMaternityPayRejectionIdAndOrganizationIdAndAuthIdentityIdOrFail(
    maternityPayRejectionId: MaternityPayRejectionId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult>;

  public abstract findWithRelationsByTemporaryIncapacityBenefitRejectionIdAndOrganizationIdAndAuthIdentityIdOrFail(
    temporaryIncapacityBenefitRejectionId: TemporaryIncapacityBenefitRejectionId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult>;

  public abstract findWithRelationsByPermanentIncapacityBenefitTerminatedIdAndOrganizationIdAndAuthIdentityIdOrFail(
    permanentIncapacityBenefitTerminatedId: PermanentIncapacityBenefitTerminatedId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult>;

  public abstract findWithRelationsByRetirementPermanentDisabilityRejectionIdAndOrganizationIdAndAuthIdentityIdOrFail(
    retirementPermanentDisabilityRejectionId: RetirementPermanentDisabilityRejectionId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult>;

  public abstract findWithRelationsByTeacherRetirementPlanningRejectionIdAndOrganizationIdAndAuthIdentityIdOrFail(
    teacherRetirementPlanningRejectionId: TeacherRetirementPlanningRejectionId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult>;

  public abstract findWithRelationsByTeacherRetirementPlanningRejectionIdOrFail(
    teacherRetirementPlanningRejectionId: TeacherRetirementPlanningRejectionId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult>;

  public abstract findWithRelationsByRetirementPermanentDisabilityRevisionIdAndOrganizationIdAndAuthIdentityIdOrFail(
    retirementPermanentDisabilityRevisionId: RetirementPermanentDisabilityRevisionId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult>;

  public abstract findWithRelationsByElderlyBpcRejectionIdAndOrganizationIdAndAuthIdentityIdOrFail(
    elderlyBpcRejectionId: ElderlyBpcRejectionId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult>;

  public abstract findWithRelationsByElderlyBpcRejectionIdAndOrganizationIdOrFail(
    elderlyBpcRejectionId: ElderlyBpcRejectionId,
    organizationId: OrganizationId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult>;
}
