import { Inject, Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { FastifyReply } from 'fastify';

import { AuthIdentityQueryRepositoryGateway } from '@module/generic/auth-identity/domain/repository/auth-identity/query/auth-identity.query.repository.gateway';
import { AuthIdentitySignInRequestDto } from '@module/generic/auth-identity/dto/request/auth-identity-sign-in.request.dto';
import { AuthIdentitySignInResponseDto } from '@module/generic/auth-identity/dto/response/auth-identity-sign-in.response.dto';
import { AccountDeactivatedError } from '@module/generic/auth-identity/error/account-deactivated.error';
import { WrongSignInCredentialsError } from '@module/generic/auth-identity/error/wrong-sign-in-credentials.error';
import { SetAuthTokenCookieUseCaseGateway } from '@module/generic/auth-identity/use-case-gateway/set-auth-token-cookie.use-case-gateway';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

@Injectable()
export class AuthIdentitySignInUseCase {
  protected readonly _type = AuthIdentitySignInUseCase.name;

  public constructor(
    @Inject(AuthIdentityQueryRepositoryGateway)
    private readonly authIdentityQueryRepositoryGateway: AuthIdentityQueryRepositoryGateway,
    @Inject(SetAuthTokenCookieUseCaseGateway)
    private readonly setAuthTokenCookieUseCaseGateway: SetAuthTokenCookieUseCaseGateway,
  ) {}

  public async execute(
    reply: FastifyReply,
    dto: AuthIdentitySignInRequestDto,
  ): Promise<AuthIdentitySignInResponseDto> {
    const authIdentity =
      await this.authIdentityQueryRepositoryGateway.findOneAuthIdentityByEmailWithRelations(
        dto.email,
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

    const userLevel = UserLevelEnum.USER;

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
