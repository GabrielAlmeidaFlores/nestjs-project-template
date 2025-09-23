import { Module } from '@nestjs/common';

import { ImageProcessorGateway } from '@lib/image-processor/image-processor.gateway';
import { SharpModule } from '@lib/image-processor/implementation/sharp/sharp.module';
import { SharpService } from '@lib/image-processor/implementation/sharp/sharp.service';

@Module({
  imports: [SharpModule],
  providers: [
    {
      provide: ImageProcessorGateway,
      useClass: SharpService,
    },
    SharpService,
  ],
  exports: [ImageProcessorGateway],
})
export class ImageProcessorModule {
  protected readonly _type = ImageProcessorModule.name;
}
