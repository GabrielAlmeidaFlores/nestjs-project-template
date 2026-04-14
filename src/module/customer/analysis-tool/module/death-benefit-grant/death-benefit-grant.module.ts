import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { CnisAnalyzerModule } from '@lib/cnis-analyzer/cnis-analyzer.module';
import { AnalysisProcessorModule } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.module';
import { FileProcessorModule } from '@module/customer/analysis-tool/lib/file-processor/file-processor.module';
import { DeathBenefitGrantController } from '@module/customer/analysis-tool/module/death-benefit-grant/death-benefit-grant.controller';
import { CreateDeathBenefitGrantFirstAnalysisUseCase } from '@module/customer/analysis-tool/module/death-benefit-grant/use-case/create-death-benefit-grant-first-analysis.use-case';
import { CreateDeathBenefitGrantPeriodUseCase } from '@module/customer/analysis-tool/module/death-benefit-grant/use-case/create-death-benefit-grant-period.use-case';
import { CreateDeathBenefitGrantResultUseCase } from '@module/customer/analysis-tool/module/death-benefit-grant/use-case/create-death-benefit-grant-result.use-case';
import { CreateDeathBenefitGrantUseCase } from '@module/customer/analysis-tool/module/death-benefit-grant/use-case/create-death-benefit-grant.use-case';
import { DeleteDeathBenefitGrantPeriodUseCase } from '@module/customer/analysis-tool/module/death-benefit-grant/use-case/delete-death-benefit-grant-period.use-case';
import { GetDeathBenefitGrantUseCase } from '@module/customer/analysis-tool/module/death-benefit-grant/use-case/get-death-benefit-grant.use-case';
import { UpdateDeathBenefitGrantDependentUseCase } from '@module/customer/analysis-tool/module/death-benefit-grant/use-case/update-death-benefit-grant-dependent.use-case';
import { UpdateDeathBenefitGrantInstitutorDataUseCase } from '@module/customer/analysis-tool/module/death-benefit-grant/use-case/update-death-benefit-grant-institutor-data.use-case';
import { UpdateDeathBenefitGrantLegalRepresentativeUseCase } from '@module/customer/analysis-tool/module/death-benefit-grant/use-case/update-death-benefit-grant-legal-representative.use-case';
import { UpdateDeathBenefitGrantPeriodUseCase } from '@module/customer/analysis-tool/module/death-benefit-grant/use-case/update-death-benefit-grant-period.use-case';
import { UpdateDeathBenefitGrantUseCase } from '@module/customer/analysis-tool/module/death-benefit-grant/use-case/update-death-benefit-grant.use-case';
import { OrganizationCreditModule } from '@module/customer/organization-credit/organization-credit.module';
import { PaymentPlanModule } from '@module/customer/payment-plan/payment-plan.module';
import { AuthModule } from '@shared/api/gateway/guard/auth/auth.module';
import { OrganizationSessionModule } from '@shared/api/gateway/guard/organization-session/organization-session.module';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    AnalysisProcessorModule,
    FileProcessorModule,
    OrganizationSessionModule,
    OrganizationCreditModule,
    PaymentPlanModule,
    CnisAnalyzerModule,
  ],
  controllers: [DeathBenefitGrantController],
  providers: [
    CreateDeathBenefitGrantUseCase,
    GetDeathBenefitGrantUseCase,
    UpdateDeathBenefitGrantUseCase,
    UpdateDeathBenefitGrantInstitutorDataUseCase,
    CreateDeathBenefitGrantPeriodUseCase,
    UpdateDeathBenefitGrantPeriodUseCase,
    DeleteDeathBenefitGrantPeriodUseCase,
    UpdateDeathBenefitGrantLegalRepresentativeUseCase,
    UpdateDeathBenefitGrantDependentUseCase,
    CreateDeathBenefitGrantFirstAnalysisUseCase,
    CreateDeathBenefitGrantResultUseCase,
  ],
})
export class DeathBenefitGrantModule {
  protected readonly _type = DeathBenefitGrantModule.name;
}
