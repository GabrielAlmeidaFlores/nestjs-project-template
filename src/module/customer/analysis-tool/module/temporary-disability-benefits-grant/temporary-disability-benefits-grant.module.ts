import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { AnalysisProcessorModule } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.module';
import { CnisXRayAnalysisModule } from '@module/customer/analysis-tool/lib/cnis-x-ray-analysis/cnis-x-ray-analysis.module';
import { ExportDocumentModule } from '@module/customer/analysis-tool/lib/export-document/export-document.module';
import { FileProcessorModule } from '@module/customer/analysis-tool/lib/file-processor/file-processor.module';
import { TemporaryDisabilityBenefitsGrantController } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/temporary-disability-benefits-grant.controller';
import { CreateTemporaryDisabilityBenefitsGrantFirstAnalysisUseCase } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/use-case/create-temporary-disability-benefits-grant-first-analysis.use-case';
import { CreateTemporaryDisabilityBenefitsGrantInsuredStatusUseCase } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/use-case/create-temporary-disability-benefits-grant-insured-status.use-case';
import { CreateTemporaryDisabilityBenefitsGrantPeriodUseCase } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/use-case/create-temporary-disability-benefits-grant-period.use-case';
import { CreateTemporaryDisabilityBenefitsGrantResultUseCase } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/use-case/create-temporary-disability-benefits-grant-result.use-case';
import { CreateTemporaryDisabilityBenefitsGrantWorkPeriodsUseCase } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/use-case/create-temporary-disability-benefits-grant-work-periods.use-case';
import { CreateTemporaryDisabilityBenefitsGrantUseCase } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/use-case/create-temporary-disability-benefits-grant.use-case';
import { DownloadTemporaryDisabilityBenefitsGrantCompleteAnalysisUseCase } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/use-case/download-temporary-disability-benefits-grant-complete-analysis.use-case';
import { DownloadTemporaryDisabilityBenefitsGrantSimplifiedAnalysisUseCase } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/use-case/download-temporary-disability-benefits-grant-simplified-analysis.use-case';
import { GetTemporaryDisabilityBenefitsGrantUseCase } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/use-case/get-temporary-disability-benefits-grant.use-case';
import { UpdateTemporaryDisabilityBenefitsGrantInsuredStatusUseCase } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/use-case/update-temporary-disability-benefits-grant-insured-status.use-case';
import { UpdateTemporaryDisabilityBenefitsGrantPeriodUseCase } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/use-case/update-temporary-disability-benefits-grant-period.use-case';
import { UpdateTemporaryDisabilityBenefitsGrantWorkPeriodsUseCase } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/use-case/update-temporary-disability-benefits-grant-work-periods.use-case';
import { UpdateTemporaryDisabilityBenefitsGrantUseCase } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/use-case/update-temporary-disability-benefits-grant.use-case';
import { OrganizationCreditModule } from '@module/customer/organization-credit/organization-credit.module';
import { PaymentPlanModule } from '@module/customer/payment-plan/payment-plan.module';
import { AuthModule } from '@shared/api/gateway/guard/auth/auth.module';
import { OrganizationSessionModule } from '@shared/api/gateway/guard/organization-session/organization-session.module';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    AnalysisProcessorModule,
    CnisXRayAnalysisModule,
    ExportDocumentModule,
    OrganizationSessionModule,
    OrganizationCreditModule,
    PaymentPlanModule,
    FileProcessorModule,
  ],
  controllers: [TemporaryDisabilityBenefitsGrantController],
  providers: [
    CreateTemporaryDisabilityBenefitsGrantUseCase,
    GetTemporaryDisabilityBenefitsGrantUseCase,
    UpdateTemporaryDisabilityBenefitsGrantUseCase,
    CreateTemporaryDisabilityBenefitsGrantPeriodUseCase,
    UpdateTemporaryDisabilityBenefitsGrantPeriodUseCase,
    CreateTemporaryDisabilityBenefitsGrantInsuredStatusUseCase,
    UpdateTemporaryDisabilityBenefitsGrantInsuredStatusUseCase,
    CreateTemporaryDisabilityBenefitsGrantWorkPeriodsUseCase,
    UpdateTemporaryDisabilityBenefitsGrantWorkPeriodsUseCase,
    CreateTemporaryDisabilityBenefitsGrantFirstAnalysisUseCase,
    CreateTemporaryDisabilityBenefitsGrantResultUseCase,
    DownloadTemporaryDisabilityBenefitsGrantCompleteAnalysisUseCase,
    DownloadTemporaryDisabilityBenefitsGrantSimplifiedAnalysisUseCase,
  ],
})
export class TemporaryDisabilityBenefitsGrantModule {
  protected readonly _type = TemporaryDisabilityBenefitsGrantModule.name;
}
