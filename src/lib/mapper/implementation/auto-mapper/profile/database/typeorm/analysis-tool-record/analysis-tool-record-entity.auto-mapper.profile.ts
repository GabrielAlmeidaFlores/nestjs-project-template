import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { AccidentAssistanceGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-assistance-grant/accident-assistance-grant.typeorm.entity';
import { AccidentAssistanceTerminatedTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-assistance-terminated.entity';
import { AccidentBenefitRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-benefit-rejection.typeorm.entity';
import { AdministrativeProcedureInssAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/administrative-procedure-inss-analysis.entity';
import { AnalysisToolClientTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-client.typeorm.entity';
import { AnalysisToolRecordTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-record.typeorm.entity';
import { AudienceQuestionGeneratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/audience-question-generator.typeorm.entity';
import { BpcDisabilityDenialTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-denial.typeorm.entity';
import { BpcDisabilityGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-grant.typeorm.entity';
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
import { ElderlyBpcRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/elderly-bpc-rejection.typeorm.entity';
import { GeneralUrbanRetirementAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-analysis.typeorm.entity';
import { GeneralUrbanRetirementDenialTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-denial.typeorm.entity';
import { GeneralUrbanRetirementGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-grant.typeorm.entity';
import { GeneralUrbanRetirementReviewTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-review.typeorm.entity';
import { InsuranceQualityAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/insurance-quality-analysis.typeorm.entity';
import { JudicialCaseAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/judicial-case-analysis.typeorm.entity';
import { MaternityPayGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-grant.typeorm.entity';
import { MaternityPayRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-rejection.typeorm.entity';
import { MedicalAndSocialReportObjectionGeneratorAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/medical-and-social-report-objection-generator-analysis.entity';
import { MedicalQuestionGeneratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/medical-question-generator.typeorm.entity';
import { OrganizationMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-member.typeorm.entity';
import { PerCapitaIncomeForBpcAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/per-capita-income-for-bpc-analysis.typeorm.entity';
import { RetirementPermanentDisabilityRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-rejection.typeorm.entity';
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
import { PermanentIncapacityBenefitTerminatedTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/permanent-incapacity-benefit-terminated.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { AnalysisToolRecordEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/analysis-tool-record.entity';
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
import { BpcElderlyAnalysisEntity } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis/bpc-elderly-analysis.entity';
import { BpcElderlyCessationEntity } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation/bpc-elderly-cessation.entity';
import { CnisFastAnalysisEntity } from '@module/customer/analysis-tool/module/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis/cnis-fast-analysis.entity';
import { DeathBenefitGrantEntity } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant/death-benefit-grant.entity';
import { DeathBenefitRejectionEntity } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection/death-benefit-rejection.entity';
import { DisabilityAssessmentForBpcAnalysisEntity } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis/disability-assessment-for-bpc-analysis.entity';
import { DisabilityRetirementPlanningEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning/disability-retirement-planning.entity';
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
import { MaternityPayRejectionEntity } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection/maternity-pay-rejection.entity';
import { MedicalAndSocialReportObjectionGeneratorAnalysisEntity } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis/medical-and-social-report-objection-generator-analysis.entity';
import { MedicalQuestionGeneratorEntity } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator/medical-question-generator.entity';
import { PerCapitaIncomeForBpcAnalysisEntity } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis/per-capita-income-for-bpc-analysis.entity';
import { RetirementPermanentDisabilityRejectionEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection/retirement-permanent-disability-rejection.entity';
import { RetirementPermanentDisabilityRevisionEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision/retirement-permanent-disability-revision.entity';
import { RetirementPlanningRgpsEntity } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps/retirement-planning-rgps.entity';
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
import { TeacherRetirementPlanningRejectionEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection/teacher-retirement-planning-rejection.entity';
import { TemporaryDisabilityBenefitsGrantEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant/temporary-disability-benefits-grant.entity';
import { TemporaryDisabilityBenefitsTerminatedEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated/temporary-disability-benefits-terminated.entity';
import { TemporaryIncapacityBenefitRejectionEntity } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection/temporary-incapacity-benefit-rejection.entity';
import { PermanentIncapacityBenefitTerminatedEntity } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated/permanent-incapacity-benefit-terminated.entity';

@Injectable()
export class AnalysisToolRecordEntityAutoMapperProfile {
  protected readonly _type = AnalysisToolRecordEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: AnalysisToolRecordTypeormEntity,
    ): AnalysisToolRecordEntity => {
      if (!source.createdBy || !source.updatedBy) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass: AnalysisToolRecordEntity.name,
          sourceClass: CnisFastAnalysisTypeormEntity.name,
        });
      }

      const cnisFastAnalysis = source.cnisFastAnalysis
        ? this.mapper.map(
            source.cnisFastAnalysis,
            CnisFastAnalysisTypeormEntity,
            CnisFastAnalysisEntity,
          )
        : null;

      const retirementPlanningRpps = source.retirementPlanningRpps
        ? this.mapper.map(
            source.retirementPlanningRpps,
            RetirementPlanningRppsTypeormEntity,
            RetirementPlanningRppsEntity,
          )
        : null;

      const judicialCaseAnalysis =
        source.judicialCaseAnalysis !== undefined
          ? this.mapper.map(
              source.judicialCaseAnalysis,
              JudicialCaseAnalysisTypeormEntity,
              JudicialCaseAnalysisEntity,
            )
          : null;

      const administrativeProcedureInssAnalysis =
        source.administrativeProcedureInssAnalysis !== undefined
          ? this.mapper.map(
              source.administrativeProcedureInssAnalysis,
              AdministrativeProcedureInssAnalysisTypeormEntity,
              AdministrativeProcedureInssAnalysisEntity,
            )
          : null;

      const medicalQuestionGenerator =
        source.medicalQuestionGenerator !== undefined
          ? this.mapper.map(
              source.medicalQuestionGenerator,
              MedicalQuestionGeneratorTypeormEntity,
              MedicalQuestionGeneratorEntity,
            )
          : null;

      const medicalAndSocialReportObjectionGeneratorAnalysis =
        source.medicalAndSocialReportObjectionGeneratorAnalysis !== undefined
          ? this.mapper.map(
              source.medicalAndSocialReportObjectionGeneratorAnalysis,
              MedicalAndSocialReportObjectionGeneratorAnalysisTypeormEntity,
              MedicalAndSocialReportObjectionGeneratorAnalysisEntity,
            )
          : null;

      const speechGenerator =
        source.speechGenerator !== undefined
          ? this.mapper.map(
              source.speechGenerator,
              SpeechGeneratorTypeormEntity,
              SpeechGeneratorEntity,
            )
          : null;

      const disabilityAssessmentForBpcAnalysis =
        source.disabilityAssessmentForBpcAnalysis !== undefined
          ? this.mapper.map(
              source.disabilityAssessmentForBpcAnalysis,
              DisabilityAssessmentForBpcAnalysisTypeormEntity,
              DisabilityAssessmentForBpcAnalysisEntity,
            )
          : null;

      const audienceQuestionGenerator =
        source.audienceQuestionGenerator !== undefined
          ? this.mapper.map(
              source.audienceQuestionGenerator,
              AudienceQuestionGeneratorTypeormEntity,
              AudienceQuestionGeneratorEntity,
            )
          : null;

      const ruralTimelineAnalysis =
        source.ruralTimeline !== undefined
          ? this.mapper.map(
              source.ruralTimeline,
              RuralTimelineAnalysisTypeormEntity,
              RuralTimelineAnalysisEntity,
            )
          : null;

      const retirementPlanningRgps = this.mapper.map(
        source.retirementPlanningRgps,
        RetirementPlanningRgpsTypeormEntity,
        RetirementPlanningRgpsEntity,
      );

      const generalUrbanRetirementGrant =
        source.generalUrbanRetirementGrant !== null
          ? this.mapper.map(
              source.generalUrbanRetirementGrant,
              GeneralUrbanRetirementGrantTypeormEntity,
              GeneralUrbanRetirementGrantEntity,
            )
          : null;

      const generalUrbanRetirementReview =
        source.generalUrbanRetirementReview !== null &&
        source.generalUrbanRetirementReview !== undefined
          ? this.mapper.map(
              source.generalUrbanRetirementReview,
              GeneralUrbanRetirementReviewTypeormEntity,
              GeneralUrbanRetirementReviewEntity,
            )
          : null;

      const analysisToolClient = this.mapper.map(
        source.analysisToolClient,
        AnalysisToolClientTypeormEntity,
        AnalysisToolClientEntity,
      );

      const perCapitaIncomeForBpcAnalysis = this.mapper.map(
        source.perCapitaIncomeForBpcAnalysis,
        PerCapitaIncomeForBpcAnalysisTypeormEntity,
        PerCapitaIncomeForBpcAnalysisEntity,
      );

      const bpcDisabilityDenial =
        source.bpcDisabilityDenial !== null &&
        source.bpcDisabilityDenial !== undefined
          ? this.mapper.map(
              source.bpcDisabilityDenial,
              BpcDisabilityDenialTypeormEntity,
              BpcDisabilityDenialEntity,
            )
          : null;

      const bpcDisabilityTermination =
        source.bpcDisabilityTermination !== null &&
        source.bpcDisabilityTermination !== undefined
          ? this.mapper.map(
              source.bpcDisabilityTermination,
              BpcDisabilityTerminationTypeormEntity,
              BpcDisabilityTerminationEntity,
            )
          : null;

      const bpcElderlyAnalysis =
        source.bpcElderlyAnalysis !== null &&
        source.bpcElderlyAnalysis !== undefined
          ? this.mapper.map(
              source.bpcElderlyAnalysis,
              BpcElderlyAnalysisTypeormEntity,
              BpcElderlyAnalysisEntity,
            )
          : null;

      const elderlyBpcRejection =
        source.elderlyBpcRejection !== null &&
        source.elderlyBpcRejection !== undefined
          ? this.mapper.map(
              source.elderlyBpcRejection,
              ElderlyBpcRejectionTypeormEntity,
              ElderlyBpcRejectionEntity,
            )
          : null;

      const accidentAssistanceTerminated =
        source.accidentAssistanceTerminated !== null &&
        source.accidentAssistanceTerminated !== undefined
          ? this.mapper.map(
              source.accidentAssistanceTerminated,
              AccidentAssistanceTerminatedTypeormEntity,
              AccidentAssistanceTerminatedEntity,
            )
          : null;

      const bpcElderlyCessation =
        source.bpcElderlyCessation !== null &&
        source.bpcElderlyCessation !== undefined
          ? this.mapper.map(
              source.bpcElderlyCessation,
              BpcElderlyCessationTypeormEntity,
              BpcElderlyCessationEntity,
            )
          : null;

      const maternityPayRejection =
        source.maternityPayRejection !== null &&
        source.maternityPayRejection !== undefined
          ? this.mapper.map(
              source.maternityPayRejection,
              MaternityPayRejectionTypeormEntity,
              MaternityPayRejectionEntity,
            )
          : null;

      const specialActivity =
        source.specialActivity !== null
          ? this.mapper.map(
              source.specialActivity,
              SpecialActivityTypeormEntity,
              SpecialActivityEntity,
            )
          : null;

      const insuranceQualityAnalysis =
        source.insuranceQualityAnalysis !== null
          ? this.mapper.map(
              source.insuranceQualityAnalysis,
              InsuranceQualityAnalysisTypeormEntity,
              InsuranceQualityAnalysisEntity,
            )
          : null;

      const disabilityRetirementPlanning =
        source.disabilityRetirementPlanning !== null
          ? this.mapper.map(
              source.disabilityRetirementPlanning,
              DisabilityRetirementPlanningTypeormEntity,
              DisabilityRetirementPlanningEntity,
            )
          : null;

      const generalUrbanRetirementAnalysis =
        source.generalUrbanRetirementAnalysis !== null
          ? this.mapper.map(
              source.generalUrbanRetirementAnalysis,
              GeneralUrbanRetirementAnalysisTypeormEntity,
              GeneralUrbanRetirementAnalysisEntity,
            )
          : null;

      const disabilityRetirementPlanningGrant =
        source.disabilityRetirementPlanningGrant !== null
          ? this.mapper.map(
              source.disabilityRetirementPlanningGrant,
              DisabilityRetirementPlanningGrantTypeormEntity,
              DisabilityRetirementPlanningGrantEntity,
            )
          : null;

      const specialCategoryRetirementAnalysis =
        source.specialCategoryRetirementAnalysis !== null
          ? this.mapper.map(
              source.specialCategoryRetirementAnalysis,
              SpecialCategoryRetirementAnalysisTypeormEntity,
              SpecialCategoryRetirementAnalysisEntity,
            )
          : null;

      const deathBenefitGrant =
        source.deathBenefitGrant !== null
          ? this.mapper.map(
              source.deathBenefitGrant,
              DeathBenefitGrantTypeormEntity,
              DeathBenefitGrantEntity,
            )
          : null;

      const deathBenefitRejection =
        source.deathBenefitRejection !== null
          ? this.mapper.map(
              source.deathBenefitRejection,
              DeathBenefitRejectionTypeormEntity,
              DeathBenefitRejectionEntity,
            )
          : null;

      const specialRetirementGrant =
        source.specialRetirementGrant !== undefined
          ? this.mapper.map(
              source.specialRetirementGrant,
              SpecialRetirementGrantTypeormEntity,
              SpecialRetirementGrantEntity,
            )
          : null;

      const specialRetirementRejection =
        source.specialRetirementRejection !== null &&
        source.specialRetirementRejection !== undefined
          ? this.mapper.map(
              source.specialRetirementRejection,
              SpecialRetirementRejectionTypeormEntity,
              SpecialRetirementRejectionEntity,
            )
          : null;

      const temporaryDisabilityBenefitsGrant =
        source.temporaryDisabilityBenefitsGrant !== null &&
        source.temporaryDisabilityBenefitsGrant !== undefined
          ? this.mapper.map(
              source.temporaryDisabilityBenefitsGrant,
              TemporaryDisabilityBenefitsGrantTypeormEntity,
              TemporaryDisabilityBenefitsGrantEntity,
            )
          : null;

      const temporaryDisabilityBenefitsTerminated =
        source.temporaryDisabilityBenefitsTerminated !== null &&
        source.temporaryDisabilityBenefitsTerminated !== undefined
          ? this.mapper.map(
              source.temporaryDisabilityBenefitsTerminated,
              TemporaryDisabilityBenefitsTerminatedTypeormEntity,
              TemporaryDisabilityBenefitsTerminatedEntity,
            )
          : null;

      const temporaryIncapacityBenefitRejection =
        source.temporaryIncapacityBenefitRejection !== null &&
        source.temporaryIncapacityBenefitRejection !== undefined
          ? this.mapper.map(
              source.temporaryIncapacityBenefitRejection,
              TemporaryIncapacityBenefitRejectionTypeormEntity,
              TemporaryIncapacityBenefitRejectionEntity,
            )
          : null;

      const permanentIncapacityBenefitTerminated =
        source.permanentIncapacityBenefitTerminated !== null &&
        source.permanentIncapacityBenefitTerminated !== undefined
          ? this.mapper.map(
              source.permanentIncapacityBenefitTerminated,
              PermanentIncapacityBenefitTerminatedTypeormEntity,
              PermanentIncapacityBenefitTerminatedEntity,
            )
          : null;

      const accidentBenefitRejection =
        source.accidentBenefitRejection !== null &&
        source.accidentBenefitRejection !== undefined
          ? this.mapper.map(
              source.accidentBenefitRejection,
              AccidentBenefitRejectionTypeormEntity,
              AccidentBenefitRejectionEntity,
            )
          : null;

      const survivorPensionAnalysis =
        source.survivorPensionAnalysis !== undefined
          ? this.mapper.map(
              source.survivorPensionAnalysis,
              SurvivorPensionAnalysisTypeormEntity,
              SurvivorPensionAnalysisEntity,
            )
          : null;

      const ruralOrHybridRetirementRejection =
        source.ruralOrHybridRetirementRejection !== null
          ? this.mapper.map(
              source.ruralOrHybridRetirementRejection,
              RuralOrHybridRetirementRejectionTypeormEntity,
              RuralOrHybridRetirementRejectionEntity,
            )
          : null;

      const teacherRetirementPlanningRejection =
        source.teacherRetirementPlanningRejection !== null &&
        source.teacherRetirementPlanningRejection !== undefined
          ? this.mapper.map(
              source.teacherRetirementPlanningRejection,
              TeacherRetirementPlanningRejectionTypeormEntity,
              TeacherRetirementPlanningRejectionEntity,
            )
          : null;

      const ruralOrHybridRetirementAnalysis =
        source.ruralOrHybridRetirementAnalysis !== null &&
        source.ruralOrHybridRetirementAnalysis !== undefined
          ? this.mapper.map(
              source.ruralOrHybridRetirementAnalysis,
              RuralOrHybridRetirementAnalysisTypeormEntity,
              RuralOrHybridRetirementAnalysisEntity,
            )
          : null;

      const generalUrbanRetirementDenial =
        source.generalUrbanRetirementDenial !== undefined
          ? this.mapper.map(
              source.generalUrbanRetirementDenial,
              GeneralUrbanRetirementDenialTypeormEntity,
              GeneralUrbanRetirementDenialEntity,
            )
          : null;

      const maternityPayGrant =
        source.maternityPayGrant !== undefined
          ? this.mapper.map(
              source.maternityPayGrant,
              MaternityPayGrantTypeormEntity,
              MaternityPayGrantEntity,
            )
          : null;

      const disabilityRetirementPlanningRejection =
        source.disabilityRetirementPlanningRejection !== undefined
          ? this.mapper.map(
              source.disabilityRetirementPlanningRejection,
              DisabilityRetirementPlanningRejectionTypeormEntity,
              DisabilityRetirementPlanningRejectionEntity,
            )
          : null;

      const retirementPermanentDisabilityRejection =
        source.retirementPermanentDisabilityRejection !== null &&
        source.retirementPermanentDisabilityRejection !== undefined
          ? this.mapper.map(
              source.retirementPermanentDisabilityRejection,
              RetirementPermanentDisabilityRejectionTypeormEntity,
              RetirementPermanentDisabilityRejectionEntity,
            )
          : null;

      const accidentAssistanceGrant =
        source.accidentAssistanceGrant !== null &&
        source.accidentAssistanceGrant !== undefined
          ? this.mapper.map(
              source.accidentAssistanceGrant,
              AccidentAssistanceGrantTypeormEntity,
              AccidentAssistanceGrantEntity,
            )
          : null;

      const retirementPermanentDisabilityRevision =
        source.retirementPermanentDisabilityRevision !== null &&
        source.retirementPermanentDisabilityRevision !== undefined
          ? this.mapper.map(
              source.retirementPermanentDisabilityRevision,
              RetirementPermanentDisabilityRevisionTypeormEntity,
              RetirementPermanentDisabilityRevisionEntity,
            )
          : null;

      return new AnalysisToolRecordEntity({
        id: new AnalysisToolRecordId(source.id),
        code: new AnalysisToolRecordCode(source.code),
        disabilityRetirementPlanningGrant,
        type: source.type,
        status: source.status,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
        cnisFastAnalysis,
        retirementPlanningRpps,
        retirementPlanningRgps,
        generalUrbanRetirementGrant,
        generalUrbanRetirementReview,
        specialActivity,
        createdBy: new OrganizationMemberId(source.createdBy.id),
        updatedBy: new OrganizationMemberId(source.updatedBy.id),
        analysisToolClient,
        judicialCaseAnalysis,
        administrativeProcedureInssAnalysis,
        medicalQuestionGenerator,
        medicalAndSocialReportObjectionGeneratorAnalysis,
        speechGenerator,
        disabilityAssessmentForBpcAnalysis,
        audienceQuestionGenerator,
        perCapitaIncomeForBpcAnalysis,
        bpcDisabilityDenial,
        bpcElderlyAnalysis,
        elderlyBpcRejection,
        accidentAssistanceTerminated,
        bpcElderlyCessation,
        ruralTimelineAnalysis,
        insuranceQualityAnalysis,
        disabilityRetirementPlanning,
        generalUrbanRetirementAnalysis,
        generalUrbanRetirementDenial,
        disabilityRetirementPlanningRejection,
        specialCategoryRetirementAnalysis,
        deathBenefitGrant,
        deathBenefitRejection,
        specialRetirementGrant,
        specialRetirementRejection,
        temporaryDisabilityBenefitsGrant,
        temporaryDisabilityBenefitsTerminated,
        temporaryIncapacityBenefitRejection,
        permanentIncapacityBenefitTerminated,
        accidentBenefitRejection,
        survivorPensionAnalysis,
        ruralOrHybridRetirementRejection,
        teacherRetirementPlanningRejection,
        maternityPayRejection,
        ruralOrHybridRetirementAnalysis,
        bpcDisabilityTermination,
        maternityPayGrant,
        retirementPermanentDisabilityRejection,
        accidentAssistanceGrant,
        retirementPermanentDisabilityRevision,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      AnalysisToolRecordTypeormEntity,
      AnalysisToolRecordEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: AnalysisToolRecordEntity,
    ): AnalysisToolRecordTypeormEntity => {
      const cnisFastAnalysis = source.cnisFastAnalysis
        ? this.mapper.map(
            source.cnisFastAnalysis,
            CnisFastAnalysisEntity,
            CnisFastAnalysisTypeormEntity,
          )
        : null;

      const retirementPlanningRpps = source.retirementPlanningRpps
        ? this.mapper.map(
            source.retirementPlanningRpps,
            RetirementPlanningRppsEntity,
            RetirementPlanningRppsTypeormEntity,
          )
        : null;

      const judicialCaseAnalysis =
        source.judicialCaseAnalysis !== null
          ? this.mapper.map(
              source.judicialCaseAnalysis,
              JudicialCaseAnalysisEntity,
              JudicialCaseAnalysisTypeormEntity,
            )
          : null;

      const administrativeProcedureInssAnalysis =
        source.administrativeProcedureInssAnalysis !== null
          ? this.mapper.map(
              source.administrativeProcedureInssAnalysis,
              AdministrativeProcedureInssAnalysisEntity,
              AdministrativeProcedureInssAnalysisTypeormEntity,
            )
          : null;

      const medicalQuestionGenerator =
        source.medicalQuestionGenerator !== null
          ? this.mapper.map(
              source.medicalQuestionGenerator,
              MedicalQuestionGeneratorEntity,
              MedicalQuestionGeneratorTypeormEntity,
            )
          : null;

      const medicalAndSocialReportObjectionGeneratorAnalysis =
        source.medicalAndSocialReportObjectionGeneratorAnalysis !== null
          ? this.mapper.map(
              source.medicalAndSocialReportObjectionGeneratorAnalysis,
              MedicalAndSocialReportObjectionGeneratorAnalysisEntity,
              MedicalAndSocialReportObjectionGeneratorAnalysisTypeormEntity,
            )
          : null;

      const speechGenerator =
        source.speechGenerator !== null
          ? this.mapper.map(
              source.speechGenerator,
              SpeechGeneratorEntity,
              SpeechGeneratorTypeormEntity,
            )
          : null;

      const disabilityAssessmentForBpcAnalysis =
        source.disabilityAssessmentForBpcAnalysis !== null
          ? this.mapper.map(
              source.disabilityAssessmentForBpcAnalysis,
              DisabilityAssessmentForBpcAnalysisEntity,
              DisabilityAssessmentForBpcAnalysisTypeormEntity,
            )
          : null;

      const audienceQuestionGenerator =
        source.audienceQuestionGenerator !== null
          ? this.mapper.map(
              source.audienceQuestionGenerator,
              AudienceQuestionGeneratorEntity,
              AudienceQuestionGeneratorTypeormEntity,
            )
          : null;

      const ruralTimeline =
        source.ruralTimelineAnalysis !== null
          ? this.mapper.map(
              source.ruralTimelineAnalysis,
              RuralTimelineAnalysisEntity,
              RuralTimelineAnalysisTypeormEntity,
            )
          : null;

      const retirementPlanningRgps = this.mapper.map(
        source.retirementPlanningRgps,
        RetirementPlanningRgpsEntity,
        RetirementPlanningRgpsTypeormEntity,
      );

      const generalUrbanRetirementGrant =
        source.generalUrbanRetirementGrant !== null
          ? this.mapper.map(
              source.generalUrbanRetirementGrant,
              GeneralUrbanRetirementGrantEntity,
              GeneralUrbanRetirementGrantTypeormEntity,
            )
          : null;

      const generalUrbanRetirementReview =
        source.generalUrbanRetirementReview !== null
          ? this.mapper.map(
              source.generalUrbanRetirementReview,
              GeneralUrbanRetirementReviewEntity,
              GeneralUrbanRetirementReviewTypeormEntity,
            )
          : null;

      const generalUrbanRetirementDenial =
        source.generalUrbanRetirementDenial !== null
          ? this.mapper.map(
              source.generalUrbanRetirementDenial,
              GeneralUrbanRetirementDenialEntity,
              GeneralUrbanRetirementDenialTypeormEntity,
            )
          : null;

      const maternityPayGrant =
        source.maternityPayGrant !== null
          ? ({
              id: source.maternityPayGrant.id.toString(),
            } as MaternityPayGrantTypeormEntity)
          : null;

      const accidentAssistanceGrant =
        source.accidentAssistanceGrant !== null
          ? ({
              id: source.accidentAssistanceGrant.id.toString(),
            } as AccidentAssistanceGrantTypeormEntity)
          : null;

      const disabilityRetirementPlanningRejection =
        source.disabilityRetirementPlanningRejection !== null
          ? this.mapper.map(
              source.disabilityRetirementPlanningRejection,
              DisabilityRetirementPlanningRejectionEntity,
              DisabilityRetirementPlanningRejectionTypeormEntity,
            )
          : null;

      const perCapitaIncomeForBpcAnalysis = this.mapper.map(
        source.perCapitaIncomeForBpcAnalysis,
        PerCapitaIncomeForBpcAnalysisEntity,
        PerCapitaIncomeForBpcAnalysisTypeormEntity,
      );

      const bpcDisabilityDenial =
        source.bpcDisabilityDenial !== null
          ? this.mapper.map(
              source.bpcDisabilityDenial,
              BpcDisabilityDenialEntity,
              BpcDisabilityDenialTypeormEntity,
            )
          : null;

      const bpcDisabilityGrant =
        source.bpcDisabilityGrant !== null
          ? this.mapper.map(
              source.bpcDisabilityGrant,
              BpcDisabilityGrantEntity,
              BpcDisabilityGrantTypeormEntity,
            )
          : null;

      const bpcDisabilityTermination =
        source.bpcDisabilityTermination !== null
          ? this.mapper.map(
              source.bpcDisabilityTermination,
              BpcDisabilityTerminationEntity,
              BpcDisabilityTerminationTypeormEntity,
            )
          : null;

      const bpcElderlyAnalysis =
        source.bpcElderlyAnalysis !== null
          ? this.mapper.map(
              source.bpcElderlyAnalysis,
              BpcElderlyAnalysisEntity,
              BpcElderlyAnalysisTypeormEntity,
            )
          : null;

      const accidentAssistanceTerminated =
        source.accidentAssistanceTerminated !== null
          ? this.mapper.map(
              source.accidentAssistanceTerminated,
              AccidentAssistanceTerminatedEntity,
              AccidentAssistanceTerminatedTypeormEntity,
            )
          : null;

      const bpcElderlyCessation =
        source.bpcElderlyCessation !== null
          ? this.mapper.map(
              source.bpcElderlyCessation,
              BpcElderlyCessationEntity,
              BpcElderlyCessationTypeormEntity,
            )
          : null;

      const maternityPayRejection =
        source.maternityPayRejection !== null
          ? this.mapper.map(
              source.maternityPayRejection,
              MaternityPayRejectionEntity,
              MaternityPayRejectionTypeormEntity,
            )
          : null;

      const elderlyBpcRejection =
        source.elderlyBpcRejection !== null
          ? this.mapper.map(
              source.elderlyBpcRejection,
              ElderlyBpcRejectionEntity,
              ElderlyBpcRejectionTypeormEntity,
            )
          : null;

      const analysisToolClient = this.mapper.map(
        source.analysisToolClient,
        AnalysisToolClientEntity,
        AnalysisToolClientTypeormEntity,
      );

      const temporaryDisabilityBenefitsGrant =
        source.temporaryDisabilityBenefitsGrant !== null
          ? this.mapper.map(
              source.temporaryDisabilityBenefitsGrant,
              TemporaryDisabilityBenefitsGrantEntity,
              TemporaryDisabilityBenefitsGrantTypeormEntity,
            )
          : null;

      const temporaryDisabilityBenefitsTerminated =
        source.temporaryDisabilityBenefitsTerminated !== null
          ? this.mapper.map(
              source.temporaryDisabilityBenefitsTerminated,
              TemporaryDisabilityBenefitsTerminatedEntity,
              TemporaryDisabilityBenefitsTerminatedTypeormEntity,
            )
          : null;

      const temporaryIncapacityBenefitRejection =
        source.temporaryIncapacityBenefitRejection !== null
          ? this.mapper.map(
              source.temporaryIncapacityBenefitRejection,
              TemporaryIncapacityBenefitRejectionEntity,
              TemporaryIncapacityBenefitRejectionTypeormEntity,
            )
          : null;

      const ruralOrHybridRetirementRejection =
        source.ruralOrHybridRetirementRejection !== null
          ? this.mapper.map(
              source.ruralOrHybridRetirementRejection,
              RuralOrHybridRetirementRejectionEntity,
              RuralOrHybridRetirementRejectionTypeormEntity,
            )
          : null;

      const teacherRetirementPlanningRejection =
        source.teacherRetirementPlanningRejection !== null
          ? this.mapper.map(
              source.teacherRetirementPlanningRejection,
              TeacherRetirementPlanningRejectionEntity,
              TeacherRetirementPlanningRejectionTypeormEntity,
            )
          : null;

      const ruralOrHybridRetirementAnalysis =
        source.ruralOrHybridRetirementAnalysis !== null
          ? this.mapper.map(
              source.ruralOrHybridRetirementAnalysis,
              RuralOrHybridRetirementAnalysisEntity,
              RuralOrHybridRetirementAnalysisTypeormEntity,
            )
          : null;

      const accidentBenefitRejection =
        source.accidentBenefitRejection !== null
          ? ({
              id: source.accidentBenefitRejection.id.toString(),
            } as AccidentBenefitRejectionTypeormEntity)
          : null;

      const survivorPensionAnalysis =
        source.survivorPensionAnalysis !== null
          ? ({
              id: source.survivorPensionAnalysis.id.toString(),
            } as SurvivorPensionAnalysisTypeormEntity)
          : undefined;

      const specialActivity =
        source.specialActivity !== null
          ? this.mapper.map(
              source.specialActivity,
              SpecialActivityEntity,
              SpecialActivityTypeormEntity,
            )
          : null;

      const insuranceQualityAnalysis =
        source.insuranceQualityAnalysis !== null
          ? this.mapper.map(
              source.insuranceQualityAnalysis,
              InsuranceQualityAnalysisEntity,
              InsuranceQualityAnalysisTypeormEntity,
            )
          : null;

      const teacherRetirementPlanning = source.teacherRetirementPlanning
        ? ({
            id: source.teacherRetirementPlanning.id.toString(),
          } as TeacherRetirementPlanningTypeormEntity)
        : null;

      const disabilityRetirementPlanning =
        source.disabilityRetirementPlanning !== null
          ? this.mapper.map(
              source.disabilityRetirementPlanning,
              DisabilityRetirementPlanningEntity,
              DisabilityRetirementPlanningTypeormEntity,
            )
          : null;

      const generalUrbanRetirementAnalysis =
        source.generalUrbanRetirementAnalysis !== null
          ? this.mapper.map(
              source.generalUrbanRetirementAnalysis,
              GeneralUrbanRetirementAnalysisEntity,
              GeneralUrbanRetirementAnalysisTypeormEntity,
            )
          : null;

      const disabilityRetirementPlanningGrant =
        source.disabilityRetirementPlanningGrant !== null
          ? this.mapper.map(
              source.disabilityRetirementPlanningGrant,
              DisabilityRetirementPlanningGrantEntity,
              DisabilityRetirementPlanningGrantTypeormEntity,
            )
          : null;

      const specialCategoryRetirementAnalysis =
        source.specialCategoryRetirementAnalysis !== null
          ? this.mapper.map(
              source.specialCategoryRetirementAnalysis,
              SpecialCategoryRetirementAnalysisEntity,
              SpecialCategoryRetirementAnalysisTypeormEntity,
            )
          : null;

      const specialRetirementGrant =
        source.specialRetirementGrant !== null
          ? this.mapper.map(
              source.specialRetirementGrant,
              SpecialRetirementGrantEntity,
              SpecialRetirementGrantTypeormEntity,
            )
          : null;

      const specialRetirementRejection =
        source.specialRetirementRejection !== null
          ? this.mapper.map(
              source.specialRetirementRejection,
              SpecialRetirementRejectionEntity,
              SpecialRetirementRejectionTypeormEntity,
            )
          : null;

      const deathBenefitGrant =
        source.deathBenefitGrant !== null
          ? this.mapper.map(
              source.deathBenefitGrant,
              DeathBenefitGrantEntity,
              DeathBenefitGrantTypeormEntity,
            )
          : null;

      const deathBenefitRejection =
        source.deathBenefitRejection !== null
          ? this.mapper.map(
              source.deathBenefitRejection,
              DeathBenefitRejectionEntity,
              DeathBenefitRejectionTypeormEntity,
            )
          : null;

      const permanentIncapacityBenefitTerminated =
        source.permanentIncapacityBenefitTerminated !== null
          ? this.mapper.map(
              source.permanentIncapacityBenefitTerminated,
              PermanentIncapacityBenefitTerminatedEntity,
              PermanentIncapacityBenefitTerminatedTypeormEntity,
            )
          : null;

      const retirementPermanentDisabilityRejection =
        source.retirementPermanentDisabilityRejection !== null
          ? this.mapper.map(
              source.retirementPermanentDisabilityRejection,
              RetirementPermanentDisabilityRejectionEntity,
              RetirementPermanentDisabilityRejectionTypeormEntity,
            )
          : null;

      const retirementPermanentDisabilityRevision =
        source.retirementPermanentDisabilityRevision !== null
          ? this.mapper.map(
              source.retirementPermanentDisabilityRevision,
              RetirementPermanentDisabilityRevisionEntity,
              RetirementPermanentDisabilityRevisionTypeormEntity,
            )
          : null;

      return AnalysisToolRecordTypeormEntity.build({
        id: source.id.toString(),
        code: source.code.toString(),
        disabilityRetirementPlanningGrant,
        type: source.type,
        status: source.status,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
        audienceQuestionGenerator,
        cnisFastAnalysis,
        retirementPlanningRpps,
        retirementPlanningRgps,
        generalUrbanRetirementGrant,
        generalUrbanRetirementReview,
        specialActivity,
        judicialCaseAnalysis,
        administrativeProcedureInssAnalysis,
        medicalQuestionGenerator,
        medicalAndSocialReportObjectionGeneratorAnalysis,
        speechGenerator,
        disabilityAssessmentForBpcAnalysis,
        perCapitaIncomeForBpcAnalysis,
        bpcDisabilityGrant,
        bpcDisabilityDenial,
        bpcDisabilityTermination,
        bpcElderlyAnalysis,
        elderlyBpcRejection,
        accidentAssistanceTerminated,
        bpcElderlyCessation,
        ruralTimeline,
        insuranceQualityAnalysis,
        teacherRetirementPlanning,
        disabilityRetirementPlanning,
        generalUrbanRetirementAnalysis,
        specialCategoryRetirementAnalysis,
        specialRetirementGrant,
        specialRetirementRejection,
        temporaryDisabilityBenefitsGrant,
        temporaryDisabilityBenefitsTerminated,
        permanentIncapacityBenefitTerminated,
        temporaryIncapacityBenefitRejection,
        accidentBenefitRejection,
        survivorPensionAnalysis,
        ruralOrHybridRetirementRejection,
        teacherRetirementPlanningRejection,
        ruralOrHybridRetirementAnalysis,
        deathBenefitGrant,
        deathBenefitRejection,
        analysisToolClient,
        generalUrbanRetirementDenial,
        maternityPayGrant,
        disabilityRetirementPlanningRejection,
        maternityPayRejection,
        retirementPermanentDisabilityRejection,
        accidentAssistanceGrant,
        retirementPermanentDisabilityRevision,
        createdBy: {
          id: source.createdBy.toString(),
        } as OrganizationMemberTypeormEntity,
        updatedBy: {
          id: source.updatedBy.toString(),
        } as OrganizationMemberTypeormEntity,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      AnalysisToolRecordEntity,
      AnalysisToolRecordTypeormEntity,
      mappingFunction,
    );
  }
}
