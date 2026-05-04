import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { GenerativeIaModule } from '@infra/generative-ia/generative-ia.module';
import { CnisAnalyzerModule } from '@lib/cnis-analyzer/cnis-analyzer.module';
import { CnisProcessorModule } from '@lib/cnis-processor/cnis-processor.module';
import { EventModule } from '@lib/event/event.module';
import { AnalysisToolController } from '@module/customer/analysis-tool/analysis-tool.controller';
import { AnalysisActivityTrackerModule } from '@module/customer/analysis-tool/lib/analysis-activity-tracker/analysis-activity-tracker.module';
import { AnalysisProcessorModule } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.module';
import { ExportDocumentModule } from '@module/customer/analysis-tool/lib/export-document/export-document.module';
import { FileProcessorModule } from '@module/customer/analysis-tool/lib/file-processor/file-processor.module';
import { RemunerationCalculatorModule } from '@module/customer/analysis-tool/lib/remuneration-calculator/remuneration-calculator.module';
import { AccidentAssistanceTerminatedModule } from '@module/customer/analysis-tool/module/accident-assistance-terminated/accident-assistance-terminated.module';
import { AccidentBenefitRejectionModule } from '@module/customer/analysis-tool/module/accident-benefit-rejection/accident-benefit-rejection.module';
import { AdministrativeProcedureInssAnalysisModule } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/administrative-procedure-inss-analysis.module';
import { AudienceQuestionGeneratorModule } from '@module/customer/analysis-tool/module/audience-question-generator/audience-question-generator.module';
import { BpcDisabilityDenialModule } from '@module/customer/analysis-tool/module/bpc-disability-denial/bpc-disability-denial.module';
import { BpcDisabilityTerminationModule } from '@module/customer/analysis-tool/module/bpc-disability-termination/bpc-disability-termination.module';
import { BpcElderlyAnalysisModule } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/bpc-elderly-analysis.module';
import { BpcElderlyCessationModule } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/bpc-elderly-cessation.module';
import { CnisFastAnalysisModule } from '@module/customer/analysis-tool/module/cnis-fast-analysis/cnis-fast-analysis.module';
import { DeathBenefitGrantModule } from '@module/customer/analysis-tool/module/death-benefit-grant/death-benefit-grant.module';
import { DeathBenefitRejectionModule } from '@module/customer/analysis-tool/module/death-benefit-rejection/death-benefit-rejection.module';
import { DisabilityAssessmentForBpcAnalysisModule } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/disability-assessment-for-bpc-analysis.module';
import { DisabilityRetirementPlanningModule } from '@module/customer/analysis-tool/module/disability-retirement-planning/disability-retirement-planning.module';
import { DisabilityRetirementPlanningGrantModule } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/disability-retirement-planning-grant.module';
import { DisabilityRetirementPlanningRejectionModule } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/disability-retirement-planning-rejection.module';
import { GeneralUrbanRetirementModule } from '@module/customer/analysis-tool/module/general-urban-retirement/general-urban-retirement.module';
import { GeneralUrbanRetirementDenialModule } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/general-urban-retirement-denial.module';
import { GeneralUrbanRetirementGrantModule } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/general-urban-retirement-grant.module';
import { GeneralUrbanRetirementReviewModule } from '@module/customer/analysis-tool/module/general-urban-retirement-review/general-urban-retirement-review.module';
import { InsuranceQualityAnalysisModule } from '@module/customer/analysis-tool/module/insurance-quality-analysis/insurance-quality-analysis.module';
import { JudicialCaseAnalysisModule } from '@module/customer/analysis-tool/module/judicial-case-analysis/judicial-case-analysis.module';
import { LegalPleadingModule } from '@module/customer/analysis-tool/module/legal-pleading/legal-pleading.module';
import { MaternityPayGrantModule } from '@module/customer/analysis-tool/module/maternity-pay-grant/maternity-pay-grant.module';
import { MaternityPayRejectionModule } from '@module/customer/analysis-tool/module/maternity-pay-rejection/maternity-pay-rejection.module';
import { MedicalAndSocialReportObjectionGeneratorAnalysisModule } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/medical-and-social-report-objection-generator-analysis.module';
import { MedicalQuestionGeneratorModule } from '@module/customer/analysis-tool/module/medical-question-generator/medical-question-generator.module';
import { PerCapitaIncomeForBpcAnalysisModule } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/per-capita-income-for-bpc-analysis.module';
import { RetirementPlanningRgpsModule } from '@module/customer/analysis-tool/module/retirement-planning-rgps/retirement-planning-rgps.module';
import { RetirementPlanningRppsModule } from '@module/customer/analysis-tool/module/retirement-planning-rpps/retirement-planning-rpps.module';
import { RuralOrHybridRetirementAnalysisModule } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/rural-or-hybrid-retirement-analysis.module';
import { RuralOrHybridRetirementRejectionModule } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/rural-or-hybrid-retirement-rejection.module';
import { RuralTimelineAnalysisModule } from '@module/customer/analysis-tool/module/rural-timeline-analysis/rural-timeline-analysis.module';
import { SpecialActivityAnalysisModule } from '@module/customer/analysis-tool/module/special-activity-analysis/special-activity-analysis.module';
import { SpecialCategoryRetirementAnalysisModule } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/special-category-retirement-analysis.module';
import { SpecialRetirementGrantModule } from '@module/customer/analysis-tool/module/special-retirement-grant/special-retirement-grant.module';
import { SpecialRetirementRejectionModule } from '@module/customer/analysis-tool/module/special-retirement-rejection/special-retirement-rejection.module';
import { SpeechGeneratorModule } from '@module/customer/analysis-tool/module/speech-generator/speech-generator.module';
import { SurvivorPensionAnalysisModule } from '@module/customer/analysis-tool/module/survivor-pension-analysis/survivor-pension-analysis.module';
import { TeacherRetirementPlanningModule } from '@module/customer/analysis-tool/module/teacher-retirement-planning/teacher-retirement-planning.module';
import { TemporaryDisabilityBenefitsGrantModule } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/temporary-disability-benefits-grant.module';
import { TemporaryDisabilityBenefitsTerminatedModule } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/temporary-disability-benefits-terminated.module';
import { TemporaryIncapacityBenefitRejectionModule } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/temporary-incapacity-benefit-rejection.module';
import { TemporaryIncapacityBenefitTerminationModule } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/temporary-incapacity-benefit-termination.module';
import { CreateAnalysisToolClientUseCase } from '@module/customer/analysis-tool/use-case/create-analysis-tool-client.use-case';
import { DeleteAnalysisToolClientUseCase } from '@module/customer/analysis-tool/use-case/delete-analysis-tool-client.use-case';
import { DeleteAnalysisToolRecordUseCase } from '@module/customer/analysis-tool/use-case/delete-analysis-tool-record.use-case';
import { GetAnalysisToolClientLegalProceedingUseCase } from '@module/customer/analysis-tool/use-case/get-analysis-tool-client-legal-proceeding.use-case';
import { GetAnalysisToolClientUseCase } from '@module/customer/analysis-tool/use-case/get-analysis-tool-client.use-case';
import { GetAnalysisToolRecordStatisticsUseCase } from '@module/customer/analysis-tool/use-case/get-analysis-tool-record-statistics.use-case';
import { ListAnalysisToolClientLegalProceedingWithCombinedFiltersUseCase } from '@module/customer/analysis-tool/use-case/list-analysis-tool-client-legal-proceeding-with-combined-filters.use-case';
import { ListAnalysisToolClientLegalProceedingUseCase } from '@module/customer/analysis-tool/use-case/list-analysis-tool-client-legal-proceeding.use-case';
import { ListAnalysisToolClientUseCase } from '@module/customer/analysis-tool/use-case/list-analysis-tool-client.use-case';
import { ListAnalysisToolRecordUseCase } from '@module/customer/analysis-tool/use-case/list-analysis-tool-record.use-case';
import { ListCidTenUseCase } from '@module/customer/analysis-tool/use-case/list-cid-ten.use-case';
import { UpdateAnalysisToolClientUseCase } from '@module/customer/analysis-tool/use-case/update-analysis-tool-client.use-case';
import { GetAnalysisToolClientLegalProceedingUseCaseGateway } from '@module/customer/analysis-tool/use-case-gateway/get-analysis-tool-client-legal-proceeding.use-case-gateway';
import { ListAnalysisToolClientLegalProceedingUseCaseGateway } from '@module/customer/analysis-tool/use-case-gateway/list-analysis-tool-client-legal-proceeding.use-case-gateway';
import { OrganizationCreditModule } from '@module/customer/organization-credit/organization-credit.module';
import { PaymentPlanModule } from '@module/customer/payment-plan/payment-plan.module';
import { AuthModule } from '@shared/api/gateway/guard/auth/auth.module';
import { OrganizationSessionModule } from '@shared/api/gateway/guard/organization-session/organization-session.module';

@Module({
  imports: [
    EventModule,
    AuthModule,
    DatabaseModule,
    AnalysisActivityTrackerModule,
    OrganizationSessionModule,
    OrganizationCreditModule,
    PaymentPlanModule,
    FileProcessorModule,
    AnalysisProcessorModule,
    ExportDocumentModule,
    RemunerationCalculatorModule,
    CnisAnalyzerModule,
    CnisProcessorModule,
    GenerativeIaModule,
    CnisFastAnalysisModule,
    SpecialActivityAnalysisModule,
    JudicialCaseAnalysisModule,
    AdministrativeProcedureInssAnalysisModule,
    AudienceQuestionGeneratorModule,
    MedicalQuestionGeneratorModule,
    MedicalAndSocialReportObjectionGeneratorAnalysisModule,
    SpeechGeneratorModule,
    DisabilityAssessmentForBpcAnalysisModule,
    InsuranceQualityAnalysisModule,
    PerCapitaIncomeForBpcAnalysisModule,
    BpcDisabilityDenialModule,
    BpcDisabilityTerminationModule,
    BpcElderlyAnalysisModule,
    AccidentAssistanceTerminatedModule,
    BpcElderlyCessationModule,
    LegalPleadingModule,
    RuralTimelineAnalysisModule,
    RuralOrHybridRetirementRejectionModule,
    RuralOrHybridRetirementAnalysisModule,
    RetirementPlanningRgpsModule,
    RetirementPlanningRppsModule,
    SpecialRetirementGrantModule,
    SpecialRetirementRejectionModule,
    TeacherRetirementPlanningModule,
    DisabilityRetirementPlanningModule,
    DisabilityRetirementPlanningGrantModule,
    GeneralUrbanRetirementGrantModule,
    GeneralUrbanRetirementReviewModule,
    GeneralUrbanRetirementModule,
    SpecialCategoryRetirementAnalysisModule,
    DeathBenefitGrantModule,
    DeathBenefitRejectionModule,
    SurvivorPensionAnalysisModule,
    GeneralUrbanRetirementDenialModule,
    MaternityPayGrantModule,
    DisabilityRetirementPlanningRejectionModule,
    TemporaryDisabilityBenefitsGrantModule,
    TemporaryDisabilityBenefitsTerminatedModule,
    TemporaryIncapacityBenefitRejectionModule,
    TemporaryIncapacityBenefitTerminationModule,
    AccidentBenefitRejectionModule,
    MaternityPayRejectionModule,
  ],
  controllers: [AnalysisToolController],
  providers: [
    ListAnalysisToolClientUseCase,
    CreateAnalysisToolClientUseCase,
    DeleteAnalysisToolClientUseCase,
    ListAnalysisToolRecordUseCase,
    GetAnalysisToolRecordStatisticsUseCase,
    UpdateAnalysisToolClientUseCase,
    DeleteAnalysisToolRecordUseCase,
    GetAnalysisToolClientUseCase,
    GetAnalysisToolClientLegalProceedingUseCase,
    ListCidTenUseCase,
    ListAnalysisToolClientLegalProceedingUseCase,
    ListAnalysisToolClientLegalProceedingWithCombinedFiltersUseCase,
    {
      provide: ListAnalysisToolClientLegalProceedingUseCaseGateway,
      useClass: ListAnalysisToolClientLegalProceedingUseCase,
    },
    {
      provide: GetAnalysisToolClientLegalProceedingUseCaseGateway,
      useClass: GetAnalysisToolClientLegalProceedingUseCase,
    },
  ],
  exports: [
    ListAnalysisToolClientLegalProceedingUseCaseGateway,
    GetAnalysisToolClientLegalProceedingUseCaseGateway,
  ],
})
export class AnalysisToolModule {
  protected readonly _type = AnalysisToolModule.name;
}
