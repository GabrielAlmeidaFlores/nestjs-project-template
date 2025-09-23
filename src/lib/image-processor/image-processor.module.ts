import { Module } from '@nestjs/common';

import { ImageProcessorGateway } from '@lib/image-processor/image-processor.gateway';
import { JimpModule } from '@lib/image-processor/implementation/jimp/jimp.module';
import { JimpService } from '@lib/image-processor/implementation/jimp/jimp.service';

@Module({
  imports: [JimpModule],
  providers: [
    {
      provide: ImageProcessorGateway,
      useClass: JimpService,
    },
    JimpService,
  ],
  exports: [ImageProcessorGateway],
})
export class ImageProcessorModule {
  protected readonly _type = ImageProcessorModule.name;
}
