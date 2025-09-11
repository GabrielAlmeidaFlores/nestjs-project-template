import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { AuthIdentityController } from '@module/generic/auth-identity/auth-identity.controller';
import { AuthenticatorModule } from '@module/generic/auth-identity/lib/authenticator/authenticator.module';
import { AuthIdentitySignUpUseCase } from '@module/generic/auth-identity/use-case/auth-identity-sign-up.use-case';
import { PreAuthIdentitySignInUseCase } from '@module/generic/auth-identity/use-case/pre-auth-identity-sign-in.use-case';
import { ValidateAuthIdentitySignUpUseCase } from '@module/generic/auth-identity/use-case/validate-auth-identity-sign-up.use-case';
import { AuthIdentitySignUpUseCasePort } from '@module/generic/auth-identity/use-case-port/auth-identity-sign-up.use-case-port';
import { ValidateAuthIdentitySignUpUseCasePort } from '@module/generic/auth-identity/use-case-port/validate-auth-identity-sign-up.use-case-port';

@Module({
  imports: [DatabaseModule, AuthenticatorModule],
  controllers: [AuthIdentityController],
  providers: [
    AuthIdentitySignUpUseCase,
    {
      provide: AuthIdentitySignUpUseCasePort,
      useClass: AuthIdentitySignUpUseCase,
    },
    ValidateAuthIdentitySignUpUseCase,
    {
      provide: ValidateAuthIdentitySignUpUseCasePort,
      useClass: ValidateAuthIdentitySignUpUseCase,
    },
    PreAuthIdentitySignInUseCase,
  ],
  exports: [
    AuthIdentitySignUpUseCasePort,
    ValidateAuthIdentitySignUpUseCasePort,
  ],
})
export class AuthIdentityModule {
  protected readonly _type = AuthIdentityModule.name;
}
