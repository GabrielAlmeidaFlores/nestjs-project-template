import { Module } from '@nestjs/common';

import { HuggingFaceModule } from '@module/customer/transcription/infra/transcriber/implementation/huggingface/huggingface.module';
import { HuggingFaceService } from '@module/customer/transcription/infra/transcriber/implementation/huggingface/huggingface.service';
import { TranscriberGateway } from '@module/customer/transcription/infra/transcriber/transcriber.gateway';

@Module({
  imports: [HuggingFaceModule],
  providers: [
    {
      provide: TranscriberGateway,
      useClass: HuggingFaceService,
    },
    HuggingFaceService,
  ],
  exports: [TranscriberGateway],
})
export class TranscriberModule {
  protected readonly _type = TranscriberModule.name;
}
