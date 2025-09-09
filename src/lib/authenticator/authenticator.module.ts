import { Module } from '@nestjs/common';

import { AuthenticatorGateway } from '@lib/authenticator/authenticator.gateway';
import { SpeakeasyModule } from '@lib/authenticator/implementation/speakeasy/speakeasy.module';
import { SpeakeasyService } from '@lib/authenticator/implementation/speakeasy/speakeasy.service';

@Module({
  imports: [SpeakeasyModule],
  providers: [
    {
      provide: AuthenticatorGateway,
      useClass: SpeakeasyService,
    },
    SpeakeasyService,
  ],
  exports: [AuthenticatorGateway],
})
export class AuthenticatorModule {
  protected readonly _type = AuthenticatorModule.name;
}
