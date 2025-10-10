import { GeminiModule } from '@infra/generative-ia/implementation/geminini/gemini.module';
import { GeminiService } from '@infra/generative-ia/implementation/geminini/gemini.service';
import { Module } from '@nestjs/common';

import { GenerativeIaGateway } from '@infra/generative-ia/generative-ia.gateway';

@Module({
  imports: [GeminiModule],
  providers: [
    {
      provide: GenerativeIaGateway,
      useClass: GeminiService,
    },
    GeminiService,
  ],
  exports: [GenerativeIaGateway],
})
export class GenerativeIaModule {
  protected readonly _type = GenerativeIaModule.name;
}
