import { Module } from '@nestjs/common';

import { OrganizationSessionModule } from '@module/customer/account/lib/organization-session/organization-session.module';
import { ValidateOrganizationSessionUseCaseGateway } from '@module/customer/account/use-case-gateway/validate-organization-session.use-case-gateway';
import { TranscriberModule } from '@module/customer/transcription/infra/transcriber/transcriber.module';
import { TranscriptionController } from '@module/customer/transcription/transcription.controller';
import { TranscribeAudioUseCase } from '@module/customer/transcription/use-case/transcribe-audio.use-case';
import { AuthModule } from '@shared/api/gateway/guard/auth/auth.module';

@Module({
  imports: [AuthModule, OrganizationSessionModule, TranscriberModule],
  controllers: [TranscriptionController],
  providers: [TranscribeAudioUseCase],
  exports: [ValidateOrganizationSessionUseCaseGateway],
})
export class TranscriptionModule {
  protected readonly _type = TranscriptionModule.name;
}
