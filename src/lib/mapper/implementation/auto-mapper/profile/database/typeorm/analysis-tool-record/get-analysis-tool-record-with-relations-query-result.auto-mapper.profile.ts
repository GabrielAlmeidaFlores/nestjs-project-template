import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { AdministrativeProcedureInssAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/administrative-procedure-inss-analysis.entity';
import { AnalysisToolClientTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-client.typeorm.entity';
import { AnalysisToolRecordTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-record.typeorm.entity';
import { AudienceQuestionGeneratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/audience-question-generator.typeorm.entity';
import { BpcDisabilityDenialTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-denial.typeorm.entity';
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
import { MaternityPayRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-rejection.typeorm.entity';
import { MaternityPayGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-grant.typeorm.entity';
import { MedicalAndSocialReportObjectionGeneratorAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/medical-and-social-report-objection-generator-analysis.entity';
import { MedicalQuestionGeneratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/medical-question-generator.typeorm.entity';
import { OrganizationMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-member.typeorm.entity';
import { PerCapitaIncomeForBpcAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/per-capita-income-for-bpc-analysis.typeorm.entity';
import { RetirementPlanningRgpsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rgps.typeorm.entity';
import { RetirementPlanningRppsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rpps.typeorm.entity';
import { RuralOrHybridRetirementAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-analysis.typeorm.entity';
import { RuralOrHybridRetirementRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-rejection.typeorm.entity';
import { RuralTimelineAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis.typeorm.entity';
import { SpecialActivityTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-activity.typeorm.entity';
import { SpecialCategoryRetirementAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-category-retirement-analysis.typeorm.entity';
import { SpecialRetirementGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-grant.typeorm.entity';
import { SpeechGeneratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/speech-generator.typeorm.entity';
import { SurvivorPensionAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis.typeorm.entity';
import { TeacherRetirementPlanningTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning.typeorm.entity';
import { TemporaryDisabilityBenefitsGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant.typeorm.entity';
import { TemporaryIncapacityBenefitRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-rejection.typeorm.entity';
import { TemporaryIncapacityBenefitTerminationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-termination.typeorm.entity';
import { GetOrganizationMemberWithCustomerRelationQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member-with-customer-relation.query.result';
import { GetAnalysisToolClientWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/result/get-analysis-tool-client-with-relations.query.result';
import { GetAnalysisToolRecordWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/result/get-analysis-tool-record-with-relations.query.result';
import { AnalysisToolRecordCode } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/value-object/analysis-tool-record-code/analysis-tool-record-code.value-object';
import { AnalysisToolRecordId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/value-object/analysis-tool-record-id/analysis-tool-record-id.value-objects';
import { GetAdministrativeProcedureInssAnalysisQueryResult } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/repository/administrative-procedure-inss-analysis/query/result/get-administrative-procedure-inss-analysis.query.result';
import { GetAudienceQuestionGeneratorWithRelationsQueryResult } from '@module/customer/analysis-tool/module/audience-question-generator/domain/repository/audience-question-generator/query/result/get-audience-question-generator-with-relations.query.result';
import { GetBpcDisabilityDenialWithRelationsQueryResult } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/repository/bpc-disability-denial/query/result/get-bpc-disability-denial-with-relations.query.result';
import { GetBpcElderlyAnalysisWithRelationsQueryResult } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/repository/bpc-elderly-analysis/query/result/get-bpc-elderly-analysis-with-relations.query.result';
import { GetCnisFastAnalysisQueryResult } from '@module/customer/analysis-tool/module/cnis-fast-analysis/domain/repository/cnis-fast-analysis/query/result/get-cnis-fast-analysis.query.result';
import { GetDeathBenefitGrantWithRelationsQueryResult } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/repository/death-benefit-grant/query/result/get-death-benefit-grant-with-relations.query.result';
import { GetDeathBenefitRejectionWithRelationsQueryResult } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/repository/death-benefit-rejection/query/result/get-death-benefit-rejection-with-relations.query.result';
import { GetDisabilityAssessmentForBpcAnalysisQueryResult } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/repository/disability-assessment-for-bpc-analysis/query/result/get-disability-assessment-for-bpc-analysis.query.result';
import { GetDisabilityRetirementPlanningWithRelationsQueryResult } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/repository/disability-retirement-planning/query/result/get-disability-retirement-planning-with-relations.query.result';
import { GetDisabilityRetirementPlanningGrantWithRelationsQueryResult } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/repository/disability-retirement-planning-grant/query/result/get-disability-retirement-planning-grant-with-relations.query.result';
import { GetGeneralUrbanRetirementAnalysisWithRelationsQueryResult } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/repository/general-urban-retirement-analysis/query/result/get-general-urban-retirement-analysis-with-relations.query.result';
import { GetGeneralUrbanRetirementAnalysisQueryResult } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/repository/general-urban-retirement-analysis/query/result/get-general-urban-retirement-analysis.query.result';
import { GetGeneralUrbanRetirementAnalysisRemunerationQueryResult } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/repository/general-urban-retirement-analysis-remuneration/query/result/get-general-urban-retirement-analysis-remuneration.query.result';
import { GetGeneralUrbanRetirementAnalysisResultQueryResult } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/repository/general-urban-retirement-analysis-result/query/result/get-general-urban-retirement-analysis-result.query.result';
import { GeneralUrbanRetirementAnalysisId } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis/value-object/general-urban-retirement-analysis-id.value-object';
import { GeneralUrbanRetirementAnalysisRemunerationId } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-remuneration/value-object/general-urban-retirement-analysis-remuneration-id.value-object';
import { GeneralUrbanRetirementAnalysisResultId } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-result/value-object/general-urban-retirement-analysis-result-id.value-object';
import { GetGeneralUrbanRetirementDenialWithRelationsQueryResult } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/repository/general-urban-retirement-denial/query/result/get-general-urban-retirement-denial-with-relations.query.result';
import { GetGeneralUrbanRetirementGrantWithRelationsQueryResult } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/repository/general-urban-retirement-grant/query/result/get-general-urban-retirement-grant-with-relations.query.result';
import { GetInsuranceQualityAnalysisWithRelationsQueryResult } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/repository/insurance-quality-analysis/query/result/get-insurance-quality-analysis-with-relations.query.result';
import { GetJudicialCaseAnalysisQueryResult } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/repository/judicial-case-analysis/query/result/get-judicial-case-analysis.query.result';
import { GetMaternityPayRejectionWithRelationsQueryResult } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/repository/maternity-pay-rejection/query/result/get-maternity-pay-rejection-with-relations.query.result';
import { GetMaternityPayGrantWithRelationsQueryResult } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/repository/maternity-pay-grant/query/result/get-maternity-pay-grant-with-relations.query.result';
import { GetMedicalAndSocialReportObjectionGeneratorAnalysisQueryResult } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/repository/medical-and-social-report-objection-generator-analysis/query/result/get-medical-and-social-report-objection-generator-analysis.query.result';
import { GetMedicalQuestionGeneratorWithRelationsQueryResult } from '@module/customer/analysis-tool/module/medical-question-generator/domain/repository/medical-question-generator/query/result/get-medical-question-generator-with-relations.query.result';
import { GetPerCapitaIncomeForBpcAnalysisWithRelationsQueryResult } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/repository/per-capita-income-for-bpc-analysis/query/result/get-per-capita-income-for-bpc-analysis-with-relations.query.result';
import { GetRetirementPlanningRgpsWithRelationsQueryResult } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/repository/retirement-planning-rgps/query/result/get-retirement-planning-rgps-with-relations.query.result';
import { GetRetirementPlanningRppsQueryResult } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/repository/retirement-planning-rpps/query/result/get-retirement-planning-rpps.query.resut';
import { RuralOrHybridRetirementAnalysisEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis/rural-or-hybrid-retirement-analysis.entity';
import { RuralOrHybridRetirementRejectionEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection/rural-or-hybrid-retirement-rejection.entity';
import { GetRuralTimelineAnalysisWithRelationsQueryResult } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis/query/result/get-rural-timeline-analysis-with-relations.query.result';
import { GetSpecialActivityAnalysisWithRelationsQueryResult } from '@module/customer/analysis-tool/module/special-activity-analysis/domain/repository/special-activity-analysis/query/result/get-special-activity-analysis-with-relations.query.result';
import { GetSpecialCategoryRetirementAnalysisWithRelationsQueryResult } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis/query/result/get-special-category-retirement-analysis-with-relations.query.result';
import { GetSpecialRetirementGrantWithRelationsQueryResult } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/repository/special-retirement-grant/query/result/get-special-retirement-grant-with-relations.query.result';
import { GetSpeechGeneratorQueryResult } from '@module/customer/analysis-tool/module/speech-generator/domain/repository/speech-generator/query/result/get-speech-generator.query.result';
import { GetSurvivorPensionAnalysisQueryResult } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis/query/result/get-survivor-pension-analysis.query.result';
import { GetTeacherRetirementPlanningWithRelationsQueryResult } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/repository/teacher-retirement-planning/query/result/get-teacher-retirement-planning-with-relations.query.result';
import { GetTemporaryDisabilityBenefitsGrantWithRelationsQueryResult } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/repository/temporary-disability-benefits-grant/query/result/get-temporary-disability-benefits-grant-with-relations.query.result';
import { GetTemporaryIncapacityBenefitRejectionWithRelationsQueryResult } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/repository/temporary-incapacity-benefit-rejection/query/result/get-temporary-incapacity-benefit-rejection-with-relations.query.result';
import { GetTemporaryIncapacityBenefitTerminationWithRelationsQueryResult } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/repository/temporary-incapacity-benefit-termination/query/result/get-temporary-incapacity-benefit-termination-with-relations.query.result';

@Injectable()
export class GetAnalysisToolRecordWithRelationsQueryResultAutoMapperProfile {
  protected readonly _type =
    GetAnalysisToolRecordWithRelationsQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
    this.mapQueryResultToOrmEntity();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: AnalysisToolRecordTypeormEntity,
    ): GetAnalysisToolRecordWithRelationsQueryResult => {
      const updatedBy = this.mapper.map(
        source.updatedBy,
        OrganizationMemberTypeormEntity,
        GetOrganizationMemberWithCustomerRelationQueryResult,
      );

      const createdBy = this.mapper.map(
        source.createdBy,
        OrganizationMemberTypeormEntity,
        GetOrganizationMemberWithCustomerRelationQueryResult,
      );

      const cnisFastAnalysis = this.mapper.map(
        source.cnisFastAnalysis,
        CnisFastAnalysisTypeormEntity,
        GetCnisFastAnalysisQueryResult,
      );

      const retirementPlanningRpps = this.mapper.map(
        source.retirementPlanningRpps,
        RetirementPlanningRppsTypeormEntity,
        GetRetirementPlanningRppsQueryResult,
      );

      const retirementPlanningRgps = this.mapper.map(
        source.retirementPlanningRgps,
        RetirementPlanningRgpsTypeormEntity,
        GetRetirementPlanningRgpsWithRelationsQueryResult,
      );

      const generalUrbanRetirementGrant =
        source.generalUrbanRetirementGrant !== null
          ? this.mapper.map(
              source.generalUrbanRetirementGrant,
              GeneralUrbanRetirementGrantTypeormEntity,
              GetGeneralUrbanRetirementGrantWithRelationsQueryResult,
            )
          : null;

      const specialActivity = this.mapper.map(
        source.specialActivity,
        SpecialActivityTypeormEntity,
        GetSpecialActivityAnalysisWithRelationsQueryResult,
      );

      const specialCategoryRetirementAnalysis =
        source.specialCategoryRetirementAnalysis !== null &&
        source.specialCategoryRetirementAnalysis !== undefined
          ? this.mapper.map(
              source.specialCategoryRetirementAnalysis,
              SpecialCategoryRetirementAnalysisTypeormEntity,
              GetSpecialCategoryRetirementAnalysisWithRelationsQueryResult,
            )
          : null;

      const judicialCaseAnalysis = this.mapper.map(
        source.judicialCaseAnalysis,
        JudicialCaseAnalysisTypeormEntity,
        GetJudicialCaseAnalysisQueryResult,
      );

      const administrativeProcedureInssAnalysis = this.mapper.map(
        source.administrativeProcedureInssAnalysis,
        AdministrativeProcedureInssAnalysisTypeormEntity,
        GetAdministrativeProcedureInssAnalysisQueryResult,
      );

      const medicalQuestionGenerator = this.mapper.map(
        source.medicalQuestionGenerator,
        MedicalQuestionGeneratorTypeormEntity,
        GetMedicalQuestionGeneratorWithRelationsQueryResult,
      );

      const medicalAndSocialReportObjectionGeneratorAnalysis = this.mapper.map(
        source.medicalAndSocialReportObjectionGeneratorAnalysis,
        MedicalAndSocialReportObjectionGeneratorAnalysisTypeormEntity,
        GetMedicalAndSocialReportObjectionGeneratorAnalysisQueryResult,
      );

      const speechGenerator =
        source.speechGenerator !== null
          ? this.mapper.map(
              source.speechGenerator,
              SpeechGeneratorTypeormEntity,
              GetSpeechGeneratorQueryResult,
            )
          : null;

      const disabilityAssessmentForBpcAnalysis = this.mapper.map(
        source.disabilityAssessmentForBpcAnalysis,
        DisabilityAssessmentForBpcAnalysisTypeormEntity,
        GetDisabilityAssessmentForBpcAnalysisQueryResult,
      );

      const audienceQuestionGenerator = this.mapper.map(
        source.audienceQuestionGenerator,
        AudienceQuestionGeneratorTypeormEntity,
        GetAudienceQuestionGeneratorWithRelationsQueryResult,
      );

      const perCapitaIncomeForBpcAnalysis = this.mapper.map(
        source.perCapitaIncomeForBpcAnalysis,
        PerCapitaIncomeForBpcAnalysisTypeormEntity,
        GetPerCapitaIncomeForBpcAnalysisWithRelationsQueryResult,
      );

      const ruralOrHybridRetirementRejection =
        source.ruralOrHybridRetirementRejection !== null &&
        source.ruralOrHybridRetirementRejection !== undefined
          ? this.mapper.map(
              source.ruralOrHybridRetirementRejection,
              RuralOrHybridRetirementRejectionTypeormEntity,
              RuralOrHybridRetirementRejectionEntity,
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

      const bpcDisabilityDenial =
        source.bpcDisabilityDenial !== null &&
        source.bpcDisabilityDenial !== undefined
          ? this.mapper.map(
              source.bpcDisabilityDenial,
              BpcDisabilityDenialTypeormEntity,
              GetBpcDisabilityDenialWithRelationsQueryResult,
            )
          : null;

      const bpcElderlyAnalysis =
        source.bpcElderlyAnalysis !== null &&
        source.bpcElderlyAnalysis !== undefined
          ? this.mapper.map(
              source.bpcElderlyAnalysis,
              BpcElderlyAnalysisTypeormEntity,
              GetBpcElderlyAnalysisWithRelationsQueryResult,
            )
          : null;

      const ruralTimelineAnalysis =
        source.ruralTimeline !== null &&
        source.ruralTimeline?.ruralTimelineAnalysisInssBenefit !== undefined &&
        source.ruralTimeline.ruralTimelineAnalysisLegalProceeding !== undefined
          ? this.mapper.map(
              source.ruralTimeline,
              RuralTimelineAnalysisTypeormEntity,
              GetRuralTimelineAnalysisWithRelationsQueryResult,
            )
          : null;

      const insuranceQualityAnalysis = this.mapper.map(
        source.insuranceQualityAnalysis,
        InsuranceQualityAnalysisTypeormEntity,
        GetInsuranceQualityAnalysisWithRelationsQueryResult,
      );

      const teacherRetirementPlanning = this.mapper.map(
        source.teacherRetirementPlanning,
        TeacherRetirementPlanningTypeormEntity,
        GetTeacherRetirementPlanningWithRelationsQueryResult,
      );

      const disabilityRetirementPlanning = this.mapper.map(
        source.disabilityRetirementPlanning,
        DisabilityRetirementPlanningTypeormEntity,
        GetDisabilityRetirementPlanningWithRelationsQueryResult,
      );

      const disabilityRetirementPlanningGrant =
        source.disabilityRetirementPlanningGrant !== null
          ? this.mapper.map(
              source.disabilityRetirementPlanningGrant,
              DisabilityRetirementPlanningGrantTypeormEntity,
              GetDisabilityRetirementPlanningGrantWithRelationsQueryResult,
            )
          : null;

      const analysisToolClient = this.mapper.map(
        source.analysisToolClient,
        AnalysisToolClientTypeormEntity,
        GetAnalysisToolClientWithRelationsQueryResult,
      );

      const generalUrbanRetirementAnalysisSource =
        source.generalUrbanRetirementAnalysis;

      const generalUrbanRetirementAnalysis =
        generalUrbanRetirementAnalysisSource !== null &&
        generalUrbanRetirementAnalysisSource !== undefined
          ? ((): GetGeneralUrbanRetirementAnalysisWithRelationsQueryResult => {
              const g = generalUrbanRetirementAnalysisSource;
              const result =
                g.generalUrbanRetirementAnalysisResult?.id !== undefined
                  ? GetGeneralUrbanRetirementAnalysisResultQueryResult.build({
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
                      createdAt:
                        g.generalUrbanRetirementAnalysisResult.createdAt,
                      updatedAt:
                        g.generalUrbanRetirementAnalysisResult.updatedAt,
                      deletedAt:
                        g.generalUrbanRetirementAnalysisResult.deletedAt ??
                        null,
                    })
                  : null;
              const remunerations = (g.remunerations ?? []).map((r) =>
                GetGeneralUrbanRetirementAnalysisRemunerationQueryResult.build({
                  id: new GeneralUrbanRetirementAnalysisRemunerationId(r.id),
                  remunerationDate: r.remunerationDate,
                  remunerationAmount: new DecimalValue(r.remunerationAmount),
                  createdAt: r.createdAt,
                  updatedAt: r.updatedAt,
                  deletedAt: r.deletedAt ?? null,
                }),
              );
              return GetGeneralUrbanRetirementAnalysisWithRelationsQueryResult.build(
                {
                  ...GetGeneralUrbanRetirementAnalysisQueryResult.build({
                    id: new GeneralUrbanRetirementAnalysisId(g.id),
                    careerStartDate: g.careerStartDate,
                    publicServiceStartDate: g.publicServiceStartDate,
                    generalUrbanRetirementBenefitAnalysis:
                      g.generalUrbanRetirementBenefitAnalysis ?? null,
                    federativeEntity: g.federativeEntity ?? null,
                    state: g.state ?? null,
                    municipality: g.municipality ?? null,
                    name: g.name ?? null,
                    benefitType: g.benefitType ?? null,
                    currentPosition: g.currentPosition ?? null,
                    createdAt: g.createdAt,
                    updatedAt: g.updatedAt,
                    deletedAt: g.deletedAt ?? null,
                  }),
                  generalUrbanRetirementAnalysisResult: result,
                  remunerations,
                  periods: [],
                  documents: [],
                  legalProceedings: [],
                },
              );
            })()
          : null;

      const specialRetirementGrant = this.mapper.map(
        source.specialRetirementGrant,
        SpecialRetirementGrantTypeormEntity,
        GetSpecialRetirementGrantWithRelationsQueryResult,
      );

      const temporaryDisabilityBenefitsGrant =
        source.temporaryDisabilityBenefitsGrant !== null &&
        source.temporaryDisabilityBenefitsGrant !== undefined
          ? this.mapper.map(
              source.temporaryDisabilityBenefitsGrant,
              TemporaryDisabilityBenefitsGrantTypeormEntity,
              GetTemporaryDisabilityBenefitsGrantWithRelationsQueryResult,
            )
          : null;

      const survivorPensionAnalysis =
        source.survivorPensionAnalysis !== undefined
          ? this.mapper.map(
              source.survivorPensionAnalysis,
              SurvivorPensionAnalysisTypeormEntity,
              GetSurvivorPensionAnalysisQueryResult,
            )
          : null;

      const disabilityRetirementPlanningRejection =
        source.disabilityRetirementPlanningRejection !== undefined &&
        source.disabilityRetirementPlanningRejection !== null
          ? this.mapper.map(
              source.disabilityRetirementPlanningRejection,
              DisabilityRetirementPlanningRejectionTypeormEntity,
              GetDisabilityRetirementPlanningWithRelationsQueryResult,
            )
          : null;

      const generalUrbanRetirementDenial =
        source.generalUrbanRetirementDenial !== undefined
          ? this.mapper.map(
              source.generalUrbanRetirementDenial,
              GeneralUrbanRetirementDenialTypeormEntity,
              GetGeneralUrbanRetirementDenialWithRelationsQueryResult,
            )
          : null;

      const deathBenefitGrant =
        source.deathBenefitGrant !== undefined &&
        source.deathBenefitGrant !== null
          ? this.mapper.map(
              source.deathBenefitGrant,
              DeathBenefitGrantTypeormEntity,
              GetDeathBenefitGrantWithRelationsQueryResult,
            )
          : null;

      const temporaryIncapacityBenefitRejection =
        source.temporaryIncapacityBenefitRejection !== undefined &&
        source.temporaryIncapacityBenefitRejection !== null
          ? this.mapper.map(
              source.temporaryIncapacityBenefitRejection,
              TemporaryIncapacityBenefitRejectionTypeormEntity,
              GetTemporaryIncapacityBenefitRejectionWithRelationsQueryResult,
            )
          : null;

      const temporaryIncapacityBenefitTermination =
        source.temporaryIncapacityBenefitTermination !== undefined &&
        source.temporaryIncapacityBenefitTermination !== null
          ? this.mapper.map(
              source.temporaryIncapacityBenefitTermination,
              TemporaryIncapacityBenefitTerminationTypeormEntity,
              GetTemporaryIncapacityBenefitTerminationWithRelationsQueryResult,
            )
          : null;

      const maternityPayGrant =
        source.maternityPayGrant !== undefined
          ? this.mapper.map(
              source.maternityPayGrant,
              MaternityPayGrantTypeormEntity,
              GetMaternityPayGrantWithRelationsQueryResult,
            )
          : null;
      const deathBenefitRejection =
        source.deathBenefitRejection !== undefined &&
        source.deathBenefitRejection !== null
          ? this.mapper.map(
              source.deathBenefitRejection,
              DeathBenefitRejectionTypeormEntity,
              GetDeathBenefitRejectionWithRelationsQueryResult,
            )
          : null;

      const maternityPayRejection =
        source.maternityPayRejection !== undefined &&
        source.maternityPayRejection !== null
          ? this.mapper.map(
              source.maternityPayRejection,
              MaternityPayRejectionTypeormEntity,
              GetMaternityPayRejectionWithRelationsQueryResult,
            )
          : null;

      return GetAnalysisToolRecordWithRelationsQueryResult.build({
        id: new AnalysisToolRecordId(source.id),
        code: new AnalysisToolRecordCode(source.code),
        type: source.type,
        status: source.status,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
        cnisFastAnalysis,
        retirementPlanningRpps,
        retirementPlanningRgps,
        specialActivity,
        specialCategoryRetirementAnalysis,
        judicialCaseAnalysis,
        administrativeProcedureInssAnalysis,
        medicalQuestionGenerator,
        medicalAndSocialReportObjectionGeneratorAnalysis,
        speechGenerator,
        disabilityAssessmentForBpcAnalysis,
        disabilityRetirementPlanningRejection,
        audienceQuestionGenerator,
        perCapitaIncomeForBpcAnalysis,
        ruralOrHybridRetirementRejection,
        ruralOrHybridRetirementAnalysis,
        bpcDisabilityDenial,
        bpcElderlyAnalysis,
        ruralTimelineAnalysis,
        insuranceQualityAnalysis,
        teacherRetirementPlanning,
        disabilityRetirementPlanning,
        generalUrbanRetirementGrant,
        generalUrbanRetirementAnalysis,
        specialRetirementGrant,
        disabilityRetirementPlanningGrant,
        temporaryDisabilityBenefitsGrant,
        survivorPensionAnalysis,
        generalUrbanRetirementDenial,
        deathBenefitGrant,
        temporaryIncapacityBenefitRejection,
        temporaryIncapacityBenefitTermination,
        maternityPayGrant,
        deathBenefitRejection,
        maternityPayRejection,
        analysisToolClient,
        createdBy,
        updatedBy,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToQueryResult);

    createMap(
      this.mapper,
      AnalysisToolRecordTypeormEntity,
      GetAnalysisToolRecordWithRelationsQueryResult,
      mappingFunction,
    );
  }

  private mapQueryResultToOrmEntity(): void {
    const convertQueryResultToOrmEntity = (
      source: GetAnalysisToolRecordWithRelationsQueryResult,
    ): AnalysisToolRecordTypeormEntity => {
      const updatedBy = this.mapper.map(
        source.updatedBy,
        GetOrganizationMemberWithCustomerRelationQueryResult,
        OrganizationMemberTypeormEntity,
      );

      const createdBy = this.mapper.map(
        source.updatedBy,
        GetOrganizationMemberWithCustomerRelationQueryResult,
        OrganizationMemberTypeormEntity,
      );

      const cnisFastAnalysis = this.mapper.map(
        source.cnisFastAnalysis,
        GetCnisFastAnalysisQueryResult,
        CnisFastAnalysisTypeormEntity,
      );

      const retirementPlanningRpps = this.mapper.map(
        source.retirementPlanningRpps,
        GetRetirementPlanningRppsQueryResult,
        RetirementPlanningRppsTypeormEntity,
      );

      const retirementPlanningRgps = this.mapper.map(
        source.retirementPlanningRgps,
        GetRetirementPlanningRgpsWithRelationsQueryResult,
        RetirementPlanningRgpsTypeormEntity,
      );

      const generalUrbanRetirementGrant =
        source.generalUrbanRetirementGrant !== null
          ? this.mapper.map(
              source.generalUrbanRetirementGrant,
              GetGeneralUrbanRetirementGrantWithRelationsQueryResult,
              GeneralUrbanRetirementGrantTypeormEntity,
            )
          : null;

      const specialActivity = this.mapper.map(
        source.specialActivity,
        GetSpecialActivityAnalysisWithRelationsQueryResult,
        SpecialActivityTypeormEntity,
      );

      const judicialCaseAnalysis = this.mapper.map(
        source.judicialCaseAnalysis,
        GetJudicialCaseAnalysisQueryResult,
        JudicialCaseAnalysisTypeormEntity,
      );

      const administrativeProcedureInssAnalysis = this.mapper.map(
        source.administrativeProcedureInssAnalysis,
        GetAdministrativeProcedureInssAnalysisQueryResult,
        AdministrativeProcedureInssAnalysisTypeormEntity,
      );

      const medicalQuestionGenerator = this.mapper.map(
        source.medicalQuestionGenerator,
        GetMedicalQuestionGeneratorWithRelationsQueryResult,
        MedicalQuestionGeneratorTypeormEntity,
      );

      const medicalAndSocialReportObjectionGeneratorAnalysis = this.mapper.map(
        source.medicalAndSocialReportObjectionGeneratorAnalysis,
        GetMedicalAndSocialReportObjectionGeneratorAnalysisQueryResult,
        MedicalAndSocialReportObjectionGeneratorAnalysisTypeormEntity,
      );

      const speechGenerator =
        source.speechGenerator !== null
          ? this.mapper.map(
              source.speechGenerator,
              GetSpeechGeneratorQueryResult,
              SpeechGeneratorTypeormEntity,
            )
          : null;

      const disabilityAssessmentForBpcAnalysis = this.mapper.map(
        source.disabilityAssessmentForBpcAnalysis,
        GetDisabilityAssessmentForBpcAnalysisQueryResult,
        DisabilityAssessmentForBpcAnalysisTypeormEntity,
      );

      const audienceQuestionGenerator = this.mapper.map(
        source.audienceQuestionGenerator,
        GetAudienceQuestionGeneratorWithRelationsQueryResult,
        AudienceQuestionGeneratorTypeormEntity,
      );

      const perCapitaIncomeForBpcAnalysis = this.mapper.map(
        source.perCapitaIncomeForBpcAnalysis,
        GetPerCapitaIncomeForBpcAnalysisWithRelationsQueryResult,
        PerCapitaIncomeForBpcAnalysisTypeormEntity,
      );

      const ruralOrHybridRetirementRejection =
        source.ruralOrHybridRetirementRejection !== null
          ? this.mapper.map(
              source.ruralOrHybridRetirementRejection,
              RuralOrHybridRetirementRejectionEntity,
              RuralOrHybridRetirementRejectionTypeormEntity,
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

      const bpcDisabilityDenial =
        source.bpcDisabilityDenial !== null
          ? this.mapper.map(
              source.bpcDisabilityDenial,
              GetBpcDisabilityDenialWithRelationsQueryResult,
              BpcDisabilityDenialTypeormEntity,
            )
          : null;

      const bpcElderlyAnalysis =
        source.bpcElderlyAnalysis !== null
          ? this.mapper.map(
              source.bpcElderlyAnalysis,
              GetBpcElderlyAnalysisWithRelationsQueryResult,
              BpcElderlyAnalysisTypeormEntity,
            )
          : null;

      const ruralTimeline = this.mapper.map(
        source.ruralTimelineAnalysis,
        GetRuralTimelineAnalysisWithRelationsQueryResult,
        RuralTimelineAnalysisTypeormEntity,
      );

      const insuranceQualityAnalysis = this.mapper.map(
        source.insuranceQualityAnalysis,
        GetInsuranceQualityAnalysisWithRelationsQueryResult,
        InsuranceQualityAnalysisTypeormEntity,
      );

      const disabilityRetirementPlanning = this.mapper.map(
        source.disabilityRetirementPlanning,
        GetDisabilityRetirementPlanningWithRelationsQueryResult,
        DisabilityRetirementPlanningTypeormEntity,
      );

      const disabilityRetirementPlanningGrant =
        source.disabilityRetirementPlanningGrant !== null
          ? this.mapper.map(
              source.disabilityRetirementPlanningGrant,
              GetDisabilityRetirementPlanningGrantWithRelationsQueryResult,
              DisabilityRetirementPlanningGrantTypeormEntity,
            )
          : null;

      const analysisToolClient = this.mapper.map(
        source.analysisToolClient,
        GetAnalysisToolClientWithRelationsQueryResult,
        AnalysisToolClientTypeormEntity,
      );

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
                      createdAt:
                        source.generalUrbanRetirementAnalysis
                          .generalUrbanRetirementAnalysisResult.createdAt,
                      updatedAt:
                        source.generalUrbanRetirementAnalysis
                          .generalUrbanRetirementAnalysisResult.updatedAt,
                      deletedAt:
                        source.generalUrbanRetirementAnalysis
                          .generalUrbanRetirementAnalysisResult.deletedAt,
                    }
                  : undefined,
              remunerations:
                source.generalUrbanRetirementAnalysis.remunerations.map(
                  (r) => ({
                    id: r.id.toString(),
                    remunerationDate: r.remunerationDate,
                    remunerationAmount: r.remunerationAmount,
                    createdAt: r.createdAt,
                    updatedAt: r.updatedAt,
                    deletedAt: r.deletedAt,
                  }),
                ),
            } as unknown as GeneralUrbanRetirementAnalysisTypeormEntity)
          : null;

      const specialRetirementGrant = this.mapper.map(
        source.specialRetirementGrant,
        GetSpecialRetirementGrantWithRelationsQueryResult,
        SpecialRetirementGrantTypeormEntity,
      );

      const temporaryDisabilityBenefitsGrant =
        source.temporaryDisabilityBenefitsGrant !== null
          ? this.mapper.map(
              source.temporaryDisabilityBenefitsGrant,
              GetTemporaryDisabilityBenefitsGrantWithRelationsQueryResult,
              TemporaryDisabilityBenefitsGrantTypeormEntity,
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
        cnisFastAnalysis,
        retirementPlanningRpps,
        retirementPlanningRgps,
        judicialCaseAnalysis,
        administrativeProcedureInssAnalysis,
        medicalQuestionGenerator,
        medicalAndSocialReportObjectionGeneratorAnalysis,
        speechGenerator,
        disabilityAssessmentForBpcAnalysis,
        audienceQuestionGenerator,
        perCapitaIncomeForBpcAnalysis,
        ruralOrHybridRetirementRejection,
        ruralOrHybridRetirementAnalysis,
        bpcDisabilityDenial,
        bpcElderlyAnalysis,
        ruralTimeline,
        insuranceQualityAnalysis,
        disabilityRetirementPlanning,
        generalUrbanRetirementGrant,
        generalUrbanRetirementAnalysis,
        specialRetirementGrant,
        temporaryDisabilityBenefitsGrant,
        analysisToolClient,
        specialActivity,
        createdBy,
        updatedBy,
      });
    };

    const mappingFunction = constructUsing(convertQueryResultToOrmEntity);

    createMap(
      this.mapper,
      GetAnalysisToolRecordWithRelationsQueryResult,
      AnalysisToolRecordTypeormEntity,
      mappingFunction,
    );
  }
}
