import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { AdministrativeProcedureInssAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/administrative-procedure-inss-analysis.entity';
import { AnalysisToolClientTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-client.typeorm.entity';
import { AnalysisToolRecordTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-record.typeorm.entity';
import { AudienceQuestionGeneratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/audience-question-generator.typeorm.entity';
import { BpcElderlyAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-analysis.typeorm.entity';
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
import { InsuranceQualityAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/insurance-quality-analysis.typeorm.entity';
import { JudicialCaseAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/judicial-case-analysis.typeorm.entity';
import { MedicalAndSocialReportObjectionGeneratorAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/medical-and-social-report-objection-generator-analysis.entity';
import { MedicalQuestionGeneratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/medical-question-generator.typeorm.entity';
import { OrganizationMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-member.typeorm.entity';
import { PerCapitaIncomeForBpcAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/per-capita-income-for-bpc-analysis.typeorm.entity';
import { RetirementPlanningRgpsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rgps.typeorm.entity';
import { RetirementPlanningRppsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rpps.typeorm.entity';
import { RuralTimelineAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis.typeorm.entity';
import { SpecialActivityTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-activity.typeorm.entity';
import { SpecialCategoryRetirementAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-category-retirement-analysis.typeorm.entity';
import { SpecialRetirementGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-grant.typeorm.entity';
import { SpeechGeneratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/speech-generator.typeorm.entity';
import { SurvivorPensionAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis.typeorm.entity';
import { TeacherRetirementPlanningTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning.typeorm.entity';
import { TemporaryDisabilityBenefitsGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { AnalysisToolRecordEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/analysis-tool-record.entity';
import { AnalysisToolRecordCode } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/value-object/analysis-tool-record-code/analysis-tool-record-code.value-object';
import { AnalysisToolRecordId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/value-object/analysis-tool-record-id/analysis-tool-record-id.value-objects';
import { AdministrativeProcedureInssAnalysisEntity } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/schema/entity/administrative-procedure-inss-analysis/administrative-procedure-inss-analysis.entity';
import { AudienceQuestionGeneratorEntity } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator/audience-question-generator.entity';
import { BpcElderlyAnalysisEntity } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis/bpc-elderly-analysis.entity';
import { CnisFastAnalysisEntity } from '@module/customer/analysis-tool/module/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis/cnis-fast-analysis.entity';
import { DeathBenefitGrantEntity } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant/death-benefit-grant.entity';
import { DeathBenefitRejectionEntity } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection/death-benefit-rejection.entity';
import { DisabilityAssessmentForBpcAnalysisEntity } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis/disability-assessment-for-bpc-analysis.entity';
import { DisabilityRetirementPlanningEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning/disability-retirement-planning.entity';
import { DisabilityRetirementPlanningGrantEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant/disability-retirement-planning-grant.entity';
import { DisabilityRetirementPlanningRejectionEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection/disability-retirement-planning-rejection.entity';
import { GeneralUrbanRetirementAnalysisEntity } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis/general-urban-retirement-analysis-entity';
import { GeneralUrbanRetirementDenialEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial/general-urban-retirement-denial.entity';
import { GeneralUrbanRetirementGrantEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant/general-urban-retirement-grant.entity';
import { InsuranceQualityAnalysisEntity } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/schema/entity/insurance-quality-analysis/insurance-quality-analysis.entity';
import { JudicialCaseAnalysisEntity } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis/judicial-case-analysis.entity';
import { MedicalAndSocialReportObjectionGeneratorAnalysisEntity } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis/medical-and-social-report-objection-generator-analysis.entity';
import { MedicalQuestionGeneratorEntity } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator/medical-question-generator.entity';
import { PerCapitaIncomeForBpcAnalysisEntity } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis/per-capita-income-for-bpc-analysis.entity';
import { RetirementPlanningRgpsEntity } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps/retirement-planning-rgps.entity';
import { RetirementPlanningRppsEntity } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps/retirement-planning-rpps-entity';
import { RuralTimelineAnalysisEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/rural-timeline-analysis.entity';
import { SpecialActivityEntity } from '@module/customer/analysis-tool/module/special-activity-analysis/domain/schema/entity/special-activity/special-activity-entity';
import { SpecialCategoryRetirementAnalysisEntity } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis/special-category-retirement-analysis.entity';
import { SpecialRetirementGrantEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant/special-retirement-grant.entity';
import { SpeechGeneratorEntity } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator/speech-generator.entity';
import { SurvivorPensionAnalysisEntity } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis/survivor-pension-analysis.entity';
import { TemporaryDisabilityBenefitsGrantEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant/temporary-disability-benefits-grant.entity';

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

      const bpcElderlyAnalysis =
        source.bpcElderlyAnalysis !== null &&
        source.bpcElderlyAnalysis !== undefined
          ? this.mapper.map(
              source.bpcElderlyAnalysis,
              BpcElderlyAnalysisTypeormEntity,
              BpcElderlyAnalysisEntity,
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

      const temporaryDisabilityBenefitsGrant =
        source.temporaryDisabilityBenefitsGrant !== null &&
        source.temporaryDisabilityBenefitsGrant !== undefined
          ? this.mapper.map(
              source.temporaryDisabilityBenefitsGrant,
              TemporaryDisabilityBenefitsGrantTypeormEntity,
              TemporaryDisabilityBenefitsGrantEntity,
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

      const generalUrbanRetirementDenial =
        source.generalUrbanRetirementDenial !== undefined
          ? this.mapper.map(
              source.generalUrbanRetirementDenial,
              GeneralUrbanRetirementDenialTypeormEntity,
              GeneralUrbanRetirementDenialEntity,
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
        bpcElderlyAnalysis,
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
        temporaryDisabilityBenefitsGrant,
        survivorPensionAnalysis,
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

      const generalUrbanRetirementDenial =
        source.generalUrbanRetirementDenial !== null
          ? this.mapper.map(
              source.generalUrbanRetirementDenial,
              GeneralUrbanRetirementDenialEntity,
              GeneralUrbanRetirementDenialTypeormEntity,
            )
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

      const bpcElderlyAnalysis =
        source.bpcElderlyAnalysis !== null
          ? this.mapper.map(
              source.bpcElderlyAnalysis,
              BpcElderlyAnalysisEntity,
              BpcElderlyAnalysisTypeormEntity,
            )
          : null;

      const analysisToolClient = this.mapper.map(
        source.analysisToolClient,
        AnalysisToolClientEntity,
        AnalysisToolClientTypeormEntity,
      );

      const temporaryDisabilityBenefitsGrant =
        source.temporaryDisabilityBenefitsGrant !== null
          ? ({
              id: source.temporaryDisabilityBenefitsGrant.id.toString(),
            } as TemporaryDisabilityBenefitsGrantTypeormEntity)
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
        specialActivity,
        judicialCaseAnalysis,
        administrativeProcedureInssAnalysis,
        medicalQuestionGenerator,
        medicalAndSocialReportObjectionGeneratorAnalysis,
        speechGenerator,
        disabilityAssessmentForBpcAnalysis,
        perCapitaIncomeForBpcAnalysis,
        bpcElderlyAnalysis,
        ruralTimeline,
        insuranceQualityAnalysis,
        teacherRetirementPlanning,
        disabilityRetirementPlanning,
        generalUrbanRetirementAnalysis,
        specialCategoryRetirementAnalysis,
        specialRetirementGrant,
        temporaryDisabilityBenefitsGrant,
        survivorPensionAnalysis,
        analysisToolClient,
        generalUrbanRetirementDenial,
        disabilityRetirementPlanningRejection,
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
