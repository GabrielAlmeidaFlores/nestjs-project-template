import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { FileProcessorModule } from '@module/customer/analysis-tool/lib/file-processor/file-processor.module';
import { DeathBenefitController } from '@module/customer/analysis-tool/module/death-benefit/death-benefit.controller';
import { CreateDeathBenefitDependentUseCase } from '@module/customer/analysis-tool/module/death-benefit/use-case/create-death-benefit-dependent.use-case';
import { CreateDeathBenefitFirstAnalysisUseCase } from '@module/customer/analysis-tool/module/death-benefit/use-case/create-death-benefit-first-analysis.use-case';
import { CreateDeathBenefitPeriodUseCase } from '@module/customer/analysis-tool/module/death-benefit/use-case/create-death-benefit-period.use-case';
import { CreateDeathBenefitResultUseCase } from '@module/customer/analysis-tool/module/death-benefit/use-case/create-death-benefit-result.use-case';
import { CreateDeathBenefitUseCase } from '@module/customer/analysis-tool/module/death-benefit/use-case/create-death-benefit.use-case';
import { DeleteDeathBenefitPeriodUseCase } from '@module/customer/analysis-tool/module/death-benefit/use-case/delete-death-benefit-period.use-case';
import { GetDeathBenefitUseCase } from '@module/customer/analysis-tool/module/death-benefit/use-case/get-death-benefit.use-case';
import { UpdateDeathBenefitBenefitInstitorUseCase } from '@module/customer/analysis-tool/module/death-benefit/use-case/update-death-benefit-benefit-institutor.use-case';
import { UpdateDeathBenefitDocumentUseCase } from '@module/customer/analysis-tool/module/death-benefit/use-case/update-death-benefit-document.use-case';
import { UpdateDeathBenefitLegalRepresentativeUseCase } from '@module/customer/analysis-tool/module/death-benefit/use-case/update-death-benefit-legal-representative.use-case';
import { UpdateDeathBenefitPeriodUseCase } from '@module/customer/analysis-tool/module/death-benefit/use-case/update-death-benefit-period.use-case';
import { UpdateDeathBenefitUseCase } from '@module/customer/analysis-tool/module/death-benefit/use-case/update-death-benefit.use-case';
import { AuthModule } from '@shared/api/gateway/guard/auth/auth.module';
import { OrganizationSessionModule } from '@shared/api/gateway/guard/organization-session/organization-session.module';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    FileProcessorModule,
    OrganizationSessionModule,
  ],
  controllers: [DeathBenefitController],
  providers: [
    CreateDeathBenefitUseCase,
    GetDeathBenefitUseCase,
    UpdateDeathBenefitUseCase,
    UpdateDeathBenefitDocumentUseCase,
    CreateDeathBenefitPeriodUseCase,
    UpdateDeathBenefitPeriodUseCase,
    DeleteDeathBenefitPeriodUseCase,
    UpdateDeathBenefitBenefitInstitorUseCase,
    UpdateDeathBenefitLegalRepresentativeUseCase,
    CreateDeathBenefitDependentUseCase,
    CreateDeathBenefitFirstAnalysisUseCase,
    CreateDeathBenefitResultUseCase,
  ],
})
export class DeathBenefitModule {
  protected readonly _type = DeathBenefitModule.name;
}
