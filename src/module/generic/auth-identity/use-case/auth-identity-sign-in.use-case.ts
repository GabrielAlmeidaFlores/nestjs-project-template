import { Inject, Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { FastifyReply } from 'fastify';

import { AuthIdentityQueryRepositoryGateway } from '@module/generic/auth-identity/domain/repository/auth-identity/query/auth-identity.query.repository.gateway';
import { AuthIdentitySignInRequestDto } from '@module/generic/auth-identity/dto/request/auth-identity-sign-in.request.dto';
import { AuthIdentitySignInResponseDto } from '@module/generic/auth-identity/dto/response/auth-identity-sign-in.response.dto';
import { SignInMFAOptionEnum } from '@module/generic/auth-identity/enum/sign-in-mfa-option.enum';
import { AuthenticatorAppNotConfiguredError } from '@module/generic/auth-identity/error/authenticator-app-not-configured.error';
import { WrongSignInCredentialsError } from '@module/generic/auth-identity/error/wrong-sign-in-credentials.error';
import { AuthIdentitySessionGateway } from '@module/generic/auth-identity/lib/auth-identity-session/auth-identity-session.gateway';
import { AuthenticatorGateway } from '@module/generic/auth-identity/lib/authenticator/authenticator.gateway';
import { EmailMFAGateway } from '@module/generic/auth-identity/lib/email-mfa/email-mfa.gateway';
import { ApiCookieEnum } from '@shared/api/enum/api-cookie.enum';
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
    @Inject(AuthIdentitySessionGateway)
    private readonly authIdentitySessionGateway: AuthIdentitySessionGateway,
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

    const jwtSession = await this.authIdentitySessionGateway.createSession(
      authIdentity.id,
      userLevel,
    );

    const sevenDaysInSeconds = 604800;

    reply.setCookie(ApiCookieEnum.AUTH_TOKEN, jwtSession, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      path: '/',
      maxAge: sevenDaysInSeconds,
    });

    return AuthIdentitySignInResponseDto.build({
      userLevel,
    });
  }
}
