import { GeminiModule } from '@infra/generative-ia/implementation/geminini/gemini.module';
import { Module } from '@nestjs/common';

import { TranscriberModule } from '@module/customer/transcription/infra/transcriber/transcriber.module';
import { TranscriptionController } from '@module/customer/transcription/transcription.controller';
import { TranscribeAudioUseCase } from '@module/customer/transcription/use-case/transcribe-audio.use-case';
import { AuthModule } from '@shared/api/gateway/guard/auth/auth.module';
import { OrganizationSessionModule } from '@shared/api/gateway/guard/organization-session/organization-session.module';

@Module({
  imports: [
    AuthModule,
    OrganizationSessionModule,
    TranscriberModule,
    GeminiModule,
  ],
  controllers: [TranscriptionController],
  providers: [TranscribeAudioUseCase],
})
export class TranscriptionModule {
  protected readonly _type = TranscriptionModule.name;
}
