import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { AnalysisProcessorModule } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.module';
import { CreateInitialPetitionGeneratorUseCase } from '@module/customer/analysis-tool/module/generate-initial-petition/use-case/create-initial-petition-generator.use-case';
import { PaymentPlanModule } from '@module/customer/payment-plan/payment-plan.module';
import { GenerateInitialPetitionController } from '@module/customer/analysis-tool/module/generate-initial-petition/initial-petition-generator.controller';

@Module({
  imports: [DatabaseModule, AnalysisProcessorModule, PaymentPlanModule],
  controllers: [GenerateInitialPetitionController],
  providers: [CreateInitialPetitionGeneratorUseCase],
  exports: [],
})
export class GenerateInitialPetitionModule {
  protected readonly _type = GenerateInitialPetitionModule.name;
}
