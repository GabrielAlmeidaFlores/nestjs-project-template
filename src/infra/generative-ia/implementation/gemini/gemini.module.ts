import { Module } from '@nestjs/common';

import { GeminiService } from '@infra/generative-ia/implementation/gemini/gemini.service';
import { ObservabilityModule } from '@shared/system/observability/observability.module';

@Module({
  imports: [ObservabilityModule],
  providers: [GeminiService],
  exports: [GeminiService],
})
export class GeminiModule {
  protected readonly _type = GeminiModule.name;
}
