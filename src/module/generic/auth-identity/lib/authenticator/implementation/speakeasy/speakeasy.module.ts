import { Module } from '@nestjs/common';

import { SpeakeasyService } from '@module/generic/auth-identity/lib/authenticator/implementation/speakeasy/speakeasy.service';

@Module({
  providers: [SpeakeasyService],
  exports: [SpeakeasyService],
})
export class SpeakeasyModule {
  protected readonly _type = SpeakeasyModule.name;
}
