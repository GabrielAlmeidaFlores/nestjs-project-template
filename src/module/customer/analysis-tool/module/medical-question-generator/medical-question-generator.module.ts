import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { AnalysisProcessorModule } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.module';
import { ExportDocumentModule } from '@module/customer/analysis-tool/lib/export-document/export-document.module';
import { FileProcessorModule } from '@module/customer/analysis-tool/lib/file-processor/file-processor.module';
import { MedicalQuestionGeneratorController } from '@module/customer/analysis-tool/module/medical-question-generator/medical-question-generator.controller';
import { CreateMedicalQuestionGeneratorResultUseCase } from '@module/customer/analysis-tool/module/medical-question-generator/use-case/create-medical-question-generator-result.use-case';
import { CreateMedicalQuestionGeneratorUseCase } from '@module/customer/analysis-tool/module/medical-question-generator/use-case/create-medical-question-generator.use-case';
import { DeleteMedicalQuestionGeneratorUseCase } from '@module/customer/analysis-tool/module/medical-question-generator/use-case/delete-medical-question-generator.use-case';
import { DownloadMedicalQuestionGeneratorCompleteAnalysisUseCase } from '@module/customer/analysis-tool/module/medical-question-generator/use-case/download-medical-question-generator-complete-analysis.use-case';
import { DownloadMedicalQuestionGeneratorSimplifiedAnalysisUseCase } from '@module/customer/analysis-tool/module/medical-question-generator/use-case/download-medical-question-generator-simplified-analysis.use-case';
import { GetMedicalQuestionGeneratorUseCase } from '@module/customer/analysis-tool/module/medical-question-generator/use-case/get-medical-question-generator.use-case';
import { UpdateMedicalQuestionGeneratorUseCase } from '@module/customer/analysis-tool/module/medical-question-generator/use-case/update-medical-question-generator.use-case';
import { OrganizationCreditModule } from '@module/customer/organization-credit/organization-credit.module';
import { PaymentPlanModule } from '@module/customer/payment-plan/payment-plan.module';
import { AuthModule } from '@shared/api/gateway/guard/auth/auth.module';
import { OrganizationSessionModule } from '@shared/api/gateway/guard/organization-session/organization-session.module';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    OrganizationSessionModule,
    OrganizationCreditModule,
    PaymentPlanModule,
    FileProcessorModule,
    AnalysisProcessorModule,
    ExportDocumentModule,
  ],
  controllers: [MedicalQuestionGeneratorController],
  providers: [
    CreateMedicalQuestionGeneratorUseCase,
    CreateMedicalQuestionGeneratorResultUseCase,
    DeleteMedicalQuestionGeneratorUseCase,
    DownloadMedicalQuestionGeneratorCompleteAnalysisUseCase,
    DownloadMedicalQuestionGeneratorSimplifiedAnalysisUseCase,
    GetMedicalQuestionGeneratorUseCase,
    UpdateMedicalQuestionGeneratorUseCase,
  ],
})
export class MedicalQuestionGeneratorModule {
  protected readonly _type = MedicalQuestionGeneratorModule.name;
}
