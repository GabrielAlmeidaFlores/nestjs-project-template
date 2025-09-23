import { Module } from '@nestjs/common';

import { JimpService } from '@lib/image-processor/implementation/jimp/jimp.service';

@Module({
  providers: [JimpService],
  exports: [JimpService],
})
export class JimpModule {
  protected readonly _type = JimpModule.name;
}
