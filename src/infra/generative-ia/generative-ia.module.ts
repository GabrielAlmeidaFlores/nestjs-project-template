import { Module } from '@nestjs/common';

import { GenerativeIaGateway } from '@infra/generative-ia/generative-ia.gateway';
import { GeminiModule } from '@infra/generative-ia/implementation/gemini/gemini.module';
import { GeminiService } from '@infra/generative-ia/implementation/gemini/gemini.service';
import { LoremIpsumModule } from '@infra/generative-ia/implementation/lorem-ipsum/lorem-ipsum.module';
import { LoremIpsumService } from '@infra/generative-ia/implementation/lorem-ipsum/lorem-ipsum.service';
import { NodeApplicationVariable } from '@shared/system/constant/application-variable/source/node.application-variable';
import { ObservabilityModule } from '@shared/system/observability/observability.module';

@Module({
  imports: [GeminiModule, LoremIpsumModule, ObservabilityModule],
  providers: [
    {
      provide: GenerativeIaGateway,
      useClass: NodeApplicationVariable.PRODUCTION_ENVIRONMENT
        ? GeminiService
        : LoremIpsumService,
    },
    GeminiService,
    LoremIpsumService,
  ],
  exports: [GenerativeIaGateway],
})
export class GenerativeIaModule {
  protected readonly _type = GenerativeIaModule.name;
}
