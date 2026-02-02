import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { AnalysisProcessorModule } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.module';
import { PaymentPlanModule } from '@module/customer/payment-plan/payment-plan.module';
import { InitialPetitionGeneratorController } from '@module/customer/documents-to-be-generated/module/initial-petition/initial-petition-generator.controller';
import { CreateInitialPetitionGeneratorUseCase } from '@module/customer/documents-to-be-generated/module/initial-petition/use-case/create-initial-petition-generator.use-case';

@Module({
  imports: [DatabaseModule, AnalysisProcessorModule, PaymentPlanModule],
  controllers: [InitialPetitionGeneratorController],
  providers: [CreateInitialPetitionGeneratorUseCase],
  exports: [],
})
export class InitialPetitionGeneratorModule {
  protected readonly _type = InitialPetitionGeneratorModule.name;
}
