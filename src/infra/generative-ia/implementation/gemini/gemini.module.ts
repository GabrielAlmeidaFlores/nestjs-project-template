import { Module } from '@nestjs/common';

import { GeminiService } from '@infra/generative-ia/implementation/gemini/gemini.service';

@Module({
  providers: [GeminiService],
  exports: [GeminiService],
})
export class GeminiModule {
  protected readonly _type = GeminiModule.name;
}
