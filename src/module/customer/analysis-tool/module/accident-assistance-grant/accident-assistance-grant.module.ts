import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { CnisAnalyzerModule } from '@lib/cnis-analyzer/cnis-analyzer.module';
import { AnalysisProcessorModule } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.module';
import { FileProcessorModule } from '@module/customer/analysis-tool/lib/file-processor/file-processor.module';
import { AccidentAssistanceGrantController } from '@module/customer/analysis-tool/module/accident-assistance-grant/accident-assistance-grant.controller';
import { CreateAccidentAssistanceGrantFirstAnalysisUseCase } from '@module/customer/analysis-tool/module/accident-assistance-grant/use-case/create-accident-assistance-grant-first-analysis.use-case';
import { CreateAccidentAssistanceGrantUseCase } from '@module/customer/analysis-tool/module/accident-assistance-grant/use-case/create-accident-assistance-grant.use-case';
import { GetAccidentAssistanceGrantUseCase } from '@module/customer/analysis-tool/module/accident-assistance-grant/use-case/get-accident-assistance-grant.use-case';
import { UpdateAccidentAssistanceGrantUseCase } from '@module/customer/analysis-tool/module/accident-assistance-grant/use-case/update-accident-assistance-grant.use-case';
import { OrganizationCreditModule } from '@module/customer/organization-credit/organization-credit.module';
import { PaymentPlanModule } from '@module/customer/payment-plan/payment-plan.module';
import { AuthModule } from '@shared/api/gateway/guard/auth/auth.module';
import { OrganizationSessionModule } from '@shared/api/gateway/guard/organization-session/organization-session.module';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    AnalysisProcessorModule,
    OrganizationSessionModule,
    OrganizationCreditModule,
    PaymentPlanModule,
    FileProcessorModule,
    CnisAnalyzerModule,
  ],
  controllers: [AccidentAssistanceGrantController],
  providers: [
    CreateAccidentAssistanceGrantUseCase,
    GetAccidentAssistanceGrantUseCase,
    UpdateAccidentAssistanceGrantUseCase,
    CreateAccidentAssistanceGrantFirstAnalysisUseCase,
  ],
})
export class AccidentAssistanceGrantModule {
  protected readonly _type = AccidentAssistanceGrantModule.name;
}
