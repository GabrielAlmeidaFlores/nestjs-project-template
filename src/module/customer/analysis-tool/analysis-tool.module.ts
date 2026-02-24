import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { GenerativeIaModule } from '@infra/generative-ia/generative-ia.module';
import { CnisAnalyzerModule } from '@lib/cnis-analyzer/cnis-analyzer.module';
import { CnisProcessorModule } from '@lib/cnis-processor/cnis-processor.module';
import { EventModule } from '@lib/event/event.module';
import { AnalysisToolController } from '@module/customer/analysis-tool/analysis-tool.controller';
import { AnalysisProcessorModule } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.module';
import { ExportDocumentModule } from '@module/customer/analysis-tool/lib/export-document/export-document.module';
import { FileProcessorModule } from '@module/customer/analysis-tool/lib/file-processor/file-processor.module';
import { RemunerationCalculatorModule } from '@module/customer/analysis-tool/lib/remuneration-calculator/remuneration-calculator.module';
import { AdministrativeProcedureInssAnalysisModule } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/administrative-procedure-inss-analysis.module';
import { AudienceQuestionGeneratorModule } from '@module/customer/analysis-tool/module/audience-question-generator/audience-question-generator.module';
import { CnisFastAnalysisModule } from '@module/customer/analysis-tool/module/cnis-fast-analysis/cnis-fast-analysis.module';
import { DisabilityAssessmentForBpcAnalysisModule } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/disability-assessment-for-bpc-analysis.module';
import { InsuranceQualityAnalysisModule } from '@module/customer/analysis-tool/module/insurance-quality-analysis/insurance-quality-analysis.module';
import { JudicialCaseAnalysisModule } from '@module/customer/analysis-tool/module/judicial-case-analysis/judicial-case-analysis.module';
import { LegalPleadingModule } from '@module/customer/analysis-tool/module/legal-pleading/legal-pleading.module';
import { MedicalAndSocialReportObjectionGeneratorAnalysisModule } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/medical-and-social-report-objection-generator-analysis.module';
import { MedicalQuestionGeneratorModule } from '@module/customer/analysis-tool/module/medical-question-generator/medical-question-generator.module';
import { PerCapitaIncomeForBpcAnalysisModule } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/per-capita-income-for-bpc-analysis.module';
import { RetirementPlanningRgpsModule } from '@module/customer/analysis-tool/module/retirement-planning-rgps/retirement-planning-rgps.module';
import { RetirementPlanningRppsModule } from '@module/customer/analysis-tool/module/retirement-planning-rpps/retirement-planning-rpps.module';
import { RuralTimelineAnalysisModule } from '@module/customer/analysis-tool/module/rural-timeline-analysis/rural-timeline-analysis.module';
import { SpecialActivityAnalysisModule } from '@module/customer/analysis-tool/module/special-activity-analysis/special-activity-analysis.module';
import { SpeechGeneratorModule } from '@module/customer/analysis-tool/module/speech-generator/speech-generator.module';
import { TeacherRetirementPlanningModule } from '@module/customer/analysis-tool/module/teacher-retirement-planning/teacher-retirement-planning.module';
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
    LegalPleadingModule,
    RuralTimelineAnalysisModule,
    RetirementPlanningRgpsModule,
    RetirementPlanningRppsModule,
    TeacherRetirementPlanningModule,
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
