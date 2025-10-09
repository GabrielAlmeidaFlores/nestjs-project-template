import { Module } from '@nestjs/common';

import { HuggingFaceService } from '@module/customer/transcription/infra/transcriber/implementation/huggingface/huggingface.service';

@Module({
  providers: [HuggingFaceService],
  exports: [HuggingFaceService],
})
export class HuggingFaceModule {
  protected readonly _type = HuggingFaceModule.name;
}
