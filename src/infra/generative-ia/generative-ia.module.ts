import { Module } from '@nestjs/common';

import { S3Module } from '@infra/bucket/implementation/s3/s3.module';
import { GenerativeIaGateway } from '@infra/generative-ia/generative-ia.gateway';
import { GeminiModule } from '@infra/generative-ia/implementation/geminini/gemini.module';

@Module({
  imports: [S3Module],
  providers: [
    {
      provide: GenerativeIaGateway,
      useClass: GeminiModule,
    },
    GeminiModule,
  ],
  exports: [GenerativeIaGateway],
})
export class GenerativeIaModule {
  protected readonly _type = GenerativeIaModule.name;
}
