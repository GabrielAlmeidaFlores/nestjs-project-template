import { Module } from '@nestjs/common';

import { SpeakeasyService } from '@lib/authenticator/implementation/speakeasy/speakeasy.service';

@Module({
  providers: [SpeakeasyService],
  exports: [SpeakeasyService],
})
export class SpeakeasyModule {
  protected readonly _type = SpeakeasyModule.name;
}
