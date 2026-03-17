import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { AdministrativeProcedureInssAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/administrative-procedure-inss-analysis.entity';
import { AnalysisToolClientTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-client.typeorm.entity';
import { AnalysisToolRecordTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-record.typeorm.entity';
import { AudienceQuestionGeneratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/audience-question-generator.typeorm.entity';
import { CnisFastAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/cnis-fast-analysis.typeorm.entity';
import { DisabilityAssessmentForBpcAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-assessment-for-bpc-analysis.entity';
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
import { RuralTimelineAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis.typeorm.entity';
import { SpecialActivityTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-activity.typeorm.entity';
import { SpecialCategoryRetirementAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-category-retirement-analysis.typeorm.entity';
import { SpeechGeneratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/speech-generator.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { AnalysisToolRecordEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/analysis-tool-record.entity';
import { AnalysisToolRecordCode } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/value-object/analysis-tool-record-code/analysis-tool-record-code.value-object';
import { AnalysisToolRecordId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/value-object/analysis-tool-record-id/analysis-tool-record-id.value-objects';
import { AdministrativeProcedureInssAnalysisEntity } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/schema/entity/administrative-procedure-inss-analysis/administrative-procedure-inss-analysis.entity';
import { AudienceQuestionGeneratorEntity } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator/audience-question-generator.entity';
import { CnisFastAnalysisEntity } from '@module/customer/analysis-tool/module/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis/cnis-fast-analysis.entity';
import { DisabilityAssessmentForBpcAnalysisEntity } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis/disability-assessment-for-bpc-analysis.entity';
import { GeneralUrbanRetirementAnalysisEntity } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis/general-urban-retirement-analysis-entity';
import { GeneralUrbanRetirementAnalysisId } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis/value-object/general-urban-retirement-analysis-id.value-object';
import { GeneralUrbanRetirementAnalysisResultEntity } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-result/general-urban-retirement-analysis-result.entity';
import { GeneralUrbanRetirementAnalysisResultId } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-result/value-object/general-urban-retirement-analysis-result-id.value-object';
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
import { SpeechGeneratorEntity } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator/speech-generator.entity';

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

      const generalUrbanRetirementAnalysis =
        source.generalUrbanRetirementAnalysis !== null
          ? (() => {
              const g = source.generalUrbanRetirementAnalysis;
              const result =
                g?.generalUrbanRetirementAnalysisResult !== undefined
                  ? new GeneralUrbanRetirementAnalysisResultEntity({
                      id: new GeneralUrbanRetirementAnalysisResultId(
                        g.generalUrbanRetirementAnalysisResult.id,
                      ),
                      generalUrbanRetirementCompleteAnalysis:
                        g.generalUrbanRetirementAnalysisResult
                          .generalUrbanRetirementCompleteAnalysis ?? null,
                      generalUrbanRetirementCompleteAnalysisDownload:
                        g.generalUrbanRetirementAnalysisResult
                          .generalUrbanRetirementCompleteAnalysisDownload ??
                        null,
                      generalUrbanRetirementSimplifiedAnalysis:
                        g.generalUrbanRetirementAnalysisResult
                          .generalUrbanRetirementSimplifiedAnalysis ?? null,
                    })
                  : null;

              const generalUrbanRetirementAnalysisEntity =
                g !== undefined
                  ? new GeneralUrbanRetirementAnalysisEntity({
                      id: new GeneralUrbanRetirementAnalysisId(g.id),
                      careerStartDate: g.careerStartDate,
                      publicServiceStartDate: g.publicServiceStartDate,
                      generalUrbanRetirementBenefitAnalysis:
                        g.generalUrbanRetirementBenefitAnalysis ?? null,
                      generalUrbanRetirementAnalysisResult: result,
                      federativeEntity: g.federativeEntity ?? null,
                      state: g.state ?? null,
                      municipality: g.municipality ?? null,
                      name: g.name ?? null,
                      benefitType: g.benefitType ?? null,
                    })
                  : null;

              return generalUrbanRetirementAnalysisEntity;
            })()
          : null;

      const specialCategoryRetirementAnalysis =
        source.specialCategoryRetirementAnalysis !== null
          ? this.mapper.map(
              source.specialCategoryRetirementAnalysis,
              SpecialCategoryRetirementAnalysisTypeormEntity,
              SpecialCategoryRetirementAnalysisEntity,
            )
          : null;

      return new AnalysisToolRecordEntity({
        ...source,
        id: new AnalysisToolRecordId(source.id),
        code: new AnalysisToolRecordCode(source.code),
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
        ruralTimelineAnalysis,
        insuranceQualityAnalysis,
        generalUrbanRetirementAnalysis,
        specialCategoryRetirementAnalysis,
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

      const perCapitaIncomeForBpcAnalysis = this.mapper.map(
        source.perCapitaIncomeForBpcAnalysis,
        PerCapitaIncomeForBpcAnalysisEntity,
        PerCapitaIncomeForBpcAnalysisTypeormEntity,
      );

      const analysisToolClient = this.mapper.map(
        source.analysisToolClient,
        AnalysisToolClientEntity,
        AnalysisToolClientTypeormEntity,
      );

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

      const generalUrbanRetirementAnalysis =
        source.generalUrbanRetirementAnalysis !== null
          ? ({
              id: source.generalUrbanRetirementAnalysis.id.toString(),
              careerStartDate:
                source.generalUrbanRetirementAnalysis.careerStartDate,
              publicServiceStartDate:
                source.generalUrbanRetirementAnalysis.publicServiceStartDate,
              generalUrbanRetirementBenefitAnalysis:
                source.generalUrbanRetirementAnalysis
                  .generalUrbanRetirementBenefitAnalysis ?? null,
              federativeEntity:
                source.generalUrbanRetirementAnalysis.federativeEntity ?? null,
              state: source.generalUrbanRetirementAnalysis.state ?? null,
              municipality:
                source.generalUrbanRetirementAnalysis.municipality ?? null,
              name: source.generalUrbanRetirementAnalysis.name ?? null,
              benefitType:
                source.generalUrbanRetirementAnalysis.benefitType ?? null,
              generalUrbanRetirementAnalysisResult:
                source.generalUrbanRetirementAnalysis
                  .generalUrbanRetirementAnalysisResult !== null
                  ? {
                      id: source.generalUrbanRetirementAnalysis.generalUrbanRetirementAnalysisResult.id.toString(),
                      generalUrbanRetirementCompleteAnalysis:
                        source.generalUrbanRetirementAnalysis
                          .generalUrbanRetirementAnalysisResult
                          .generalUrbanRetirementCompleteAnalysis,
                      generalUrbanRetirementCompleteAnalysisDownload:
                        source.generalUrbanRetirementAnalysis
                          .generalUrbanRetirementAnalysisResult
                          .generalUrbanRetirementCompleteAnalysisDownload,
                      generalUrbanRetirementSimplifiedAnalysis:
                        source.generalUrbanRetirementAnalysis
                          .generalUrbanRetirementAnalysisResult
                          .generalUrbanRetirementSimplifiedAnalysis,
                    }
                  : undefined,
            } as unknown as GeneralUrbanRetirementAnalysisTypeormEntity)
          : null;

      const specialCategoryRetirementAnalysis =
        source.specialCategoryRetirementAnalysis !== null
          ? this.mapper.map(
              source.specialCategoryRetirementAnalysis,
              SpecialCategoryRetirementAnalysisEntity,
              SpecialCategoryRetirementAnalysisTypeormEntity,
            )
          : null;

      const createdBy = {
        id: source.createdBy.toString(),
      } as OrganizationMemberTypeormEntity;

      const updatedBy = {
        id: source.updatedBy.toString(),
      } as OrganizationMemberTypeormEntity;

      return AnalysisToolRecordTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        code: source.code.toString(),
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
        ruralTimeline,
        insuranceQualityAnalysis,
        generalUrbanRetirementAnalysis,
        specialCategoryRetirementAnalysis,
        analysisToolClient,
        createdBy,
        updatedBy,
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
