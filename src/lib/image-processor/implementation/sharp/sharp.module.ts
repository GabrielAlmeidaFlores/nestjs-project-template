import { Module } from '@nestjs/common';

import { SharpService } from '@lib/image-processor/implementation/sharp/sharp.service';

@Module({
  providers: [SharpService],
  exports: [SharpService],
})
export class SharpModule {
  protected readonly _type = SharpModule.name;
}
