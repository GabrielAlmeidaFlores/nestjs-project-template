import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { AuthIdentityController } from '@module/generic/auth-identity/auth-identity.controller';
import { AuthIdentitySessionModule } from '@module/generic/auth-identity/lib/auth-identity-session/auth-identity-session.module';
import { AuthenticatorModule } from '@module/generic/auth-identity/lib/authenticator/authenticator.module';
import { EmailMFAModule } from '@module/generic/auth-identity/lib/email-mfa/email-mfa.module';
import { AuthIdentitySignInUseCase } from '@module/generic/auth-identity/use-case/auth-identity-sign-in.use-case';
import { AuthIdentitySignOutUseCase } from '@module/generic/auth-identity/use-case/auth-identity-sign-out.use-case';
import { AuthIdentitySignUpUseCase } from '@module/generic/auth-identity/use-case/auth-identity-sign-up.use-case';
import { PreAuthIdentitySignInUseCase } from '@module/generic/auth-identity/use-case/pre-auth-identity-sign-in.use-case';
import { ValidateAuthIdentitySignInUseCase } from '@module/generic/auth-identity/use-case/validate-auth-identity-sign-in.use-case';
import { ValidateAuthIdentitySignUpUseCase } from '@module/generic/auth-identity/use-case/validate-auth-identity-sign-up.use-case';
import { AuthIdentitySignUpUseCaseGateway } from '@module/generic/auth-identity/use-case-gateway/auth-identity-sign-up.use-case-gateway';
import { ValidateAuthIdentitySignInUseCaseGateway } from '@module/generic/auth-identity/use-case-gateway/validate-auth-identity-sign-in.use-case-gateway';
import { ValidateAuthIdentitySignUpUseCaseGateway } from '@module/generic/auth-identity/use-case-gateway/validate-auth-identity-sign-up.use-case-gateway';
import { AuthIdentityForgotPasswordUseCase } from '@module/generic/auth-identity/use-case/auth-identity-forgot-password.use-case';
import { AuthIdentityForgotPasswordUseCaseGateway } from '@module/generic/auth-identity/use-case-gateway/auth-identity-forgot-password.use-case-gateway';
import { EmailForgotPasswordModule } from '@module/generic/auth-identity/lib/email-forgot-password/email-forgot-password.module';
import { AuthIdentityForgotPasswordValidateCodeUseCase } from '@module/generic/auth-identity/use-case/auth-identity-forgot-password-validate-code.use-case';
import { AuthIdentityResetPasswordUseCase } from '@module/generic/auth-identity/use-case/auth-identity-reset-password.use-case';
import { AuthIdentityResetPasswordUseCaseGateway } from '@module/generic/auth-identity/use-case-gateway/auth-identity-reset-password.use-case-gateway';

@Module({
  imports: [
    DatabaseModule,
    AuthenticatorModule,
    EmailMFAModule,
    AuthIdentitySessionModule,
    EmailForgotPasswordModule,
  ],
  controllers: [AuthIdentityController],
  providers: [
    ValidateAuthIdentitySignInUseCase,
    {
      provide: ValidateAuthIdentitySignInUseCaseGateway,
      useClass: ValidateAuthIdentitySignInUseCase,
    },
    AuthIdentitySignUpUseCase,
    {
      provide: AuthIdentitySignUpUseCaseGateway,
      useClass: AuthIdentitySignUpUseCase,
    },
    ValidateAuthIdentitySignUpUseCase,
    {
      provide: ValidateAuthIdentitySignUpUseCaseGateway,
      useClass: ValidateAuthIdentitySignUpUseCase,
    },
    AuthIdentityForgotPasswordUseCase,
    {
      provide: AuthIdentityForgotPasswordUseCaseGateway,
      useClass: AuthIdentityForgotPasswordUseCase,
    },
    AuthIdentityForgotPasswordValidateCodeUseCase,
    {
      provide: AuthIdentityForgotPasswordUseCaseGateway,
      useClass: AuthIdentityForgotPasswordValidateCodeUseCase,
    },
    AuthIdentityResetPasswordUseCase,
    {
      provide: AuthIdentityResetPasswordUseCaseGateway,
      useClass: ValidateAuthIdentitySignInUseCase,
    },
    PreAuthIdentitySignInUseCase,
    AuthIdentitySignInUseCase,
    AuthIdentitySignOutUseCase,
  ],
  exports: [
    ValidateAuthIdentitySignInUseCaseGateway,
    ValidateAuthIdentitySignUpUseCaseGateway,
    AuthIdentitySignUpUseCaseGateway,
  ],
})
export class AuthIdentityModule {
  protected readonly _type = AuthIdentityModule.name;
}
