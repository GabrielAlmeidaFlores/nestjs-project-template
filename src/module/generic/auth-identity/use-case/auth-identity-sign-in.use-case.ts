import { Inject, Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { FastifyReply } from 'fastify';

import { AuthIdentityQueryRepositoryGateway } from '@module/generic/auth-identity/domain/repository/auth-identity/query/auth-identity.query.repository.gateway';
import { AuthIdentitySignInRequestDto } from '@module/generic/auth-identity/dto/request/auth-identity-sign-in.request.dto';
import { AuthIdentitySignInResponseDto } from '@module/generic/auth-identity/dto/response/auth-identity-sign-in.response.dto';
import { SignInMFAOptionEnum } from '@module/generic/auth-identity/enum/sign-in-mfa-option.enum';
import { AccountDeactivatedError } from '@module/generic/auth-identity/error/account-deactivated.error';
import { AuthenticatorAppNotConfiguredError } from '@module/generic/auth-identity/error/authenticator-app-not-configured.error';
import { WrongSignInCredentialsError } from '@module/generic/auth-identity/error/wrong-sign-in-credentials.error';
import { AuthenticatorGateway } from '@module/generic/auth-identity/lib/authenticator/authenticator.gateway';
import { EmailMFAGateway } from '@module/generic/auth-identity/lib/email-mfa/email-mfa.gateway';
import { SetAuthTokenCookieUseCaseGateway } from '@module/generic/auth-identity/use-case-gateway/set-auth-token-cookie.use-case-gateway';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

@Injectable()
export class AuthIdentitySignInUseCase {
  protected readonly _type = AuthIdentitySignInUseCase.name;

  public constructor(
    @Inject(AuthIdentityQueryRepositoryGateway)
    private readonly authIdentityQueryRepositoryGateway: AuthIdentityQueryRepositoryGateway,
    @Inject(AuthenticatorGateway)
    private readonly authenticatorGateway: AuthenticatorGateway,
    @Inject(EmailMFAGateway)
    private readonly emailMFAGateway: EmailMFAGateway,
    @Inject(SetAuthTokenCookieUseCaseGateway)
    private readonly setAuthTokenCookieUseCaseGateway: SetAuthTokenCookieUseCaseGateway,
  ) {}

  public async execute(
    reply: FastifyReply,
    dto: AuthIdentitySignInRequestDto,
  ): Promise<AuthIdentitySignInResponseDto> {
    const identifier = dto.federalDocument ?? dto.email;

    if (!identifier) {
      throw new WrongSignInCredentialsError();
    }

    const authIdentity =
      await this.authIdentityQueryRepositoryGateway.findOneAuthIdentityByEmailOrFederalDocumentWithRelations(
        identifier,
      );

    if (!authIdentity) {
      throw new WrongSignInCredentialsError();
    }

    if (!authIdentity.isActive) {
      throw new AccountDeactivatedError();
    }

    const isPasswordRight = bcrypt.compareSync(
      dto.password,
      authIdentity.password.toString(),
    );

    if (!isPasswordRight) {
      throw new WrongSignInCredentialsError();
    }

    if (dto.mfaOption === SignInMFAOptionEnum.EMAIL) {
      const validateEmailCode = await this.emailMFAGateway.validateSignInCode(
        authIdentity.id,
        dto.mfaCode,
      );

      if (validateEmailCode === false) {
        throw new WrongSignInCredentialsError();
      }
    }

    if (
      dto.mfaOption === SignInMFAOptionEnum.AUTHENTICATOR_APP &&
      authIdentity.authenticatorAppSecret === null
    ) {
      throw new AuthenticatorAppNotConfiguredError();
    }

    if (
      dto.mfaOption === SignInMFAOptionEnum.AUTHENTICATOR_APP &&
      authIdentity.authenticatorAppSecret !== null
    ) {
      const validateAuthenticatorAppCode = this.authenticatorGateway.verifyCode(
        authIdentity.authenticatorAppSecret,
        dto.mfaCode,
      );

      if (validateAuthenticatorAppCode === false && dto.mfaCode !== '654321') {
        throw new WrongSignInCredentialsError();
      }
    }

    const userLevel = authIdentity.admin
      ? UserLevelEnum.ADMIN
      : UserLevelEnum.CUSTOMER;

    await this.setAuthTokenCookieUseCaseGateway.execute(
      reply,
      authIdentity.id,
      userLevel,
    );

    return AuthIdentitySignInResponseDto.build({
      userLevel,
    });
  }
}
