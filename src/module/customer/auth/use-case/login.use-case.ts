import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { FastifyReply } from 'fastify';

import { CustomerQueryRepositoryGateway } from '@core/domain/repository/customer/customer/customer.query.repository.gateway';
import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { UserSessionGateway } from '@lib/user-session/user-session.gateway';
import { LoginRequestDto } from '@module/customer/auth/dto/request/login.request.dto';
import { LoginResponseDto } from '@module/customer/auth/dto/response/login.response.dto';
import { InvalidLoginCredentialsError } from '@module/customer/auth/error/invalid-login-credentials.error';
import { NodeApplicationVariable } from '@shared/system/constant/application-variable/node.application-variable';

@Injectable()
export class LoginUseCase {
  protected readonly _type = LoginUseCase.name;

  public constructor(
    private readonly customerQueryRepositoryGateway: CustomerQueryRepositoryGateway,
    private readonly userSessionGateway: UserSessionGateway,
  ) {}

  public async execute(
    reply: FastifyReply,
    dto: LoginRequestDto,
  ): Promise<LoginResponseDto> {
    const identifier = dto.email ?? dto.federalDocument;

    if (!identifier) {
      throw new InvalidLoginCredentialsError();
    }

    const user =
      await this.customerQueryRepositoryGateway.findCustomerByEmailOrFederalDocument(
        identifier,
      );

    if (!user) {
      throw new InvalidLoginCredentialsError();
    }

    const isPasswordRight = await bcrypt.compare(
      dto.password,
      user.password.toString(),
    );

    if (!isPasswordRight) {
      throw new InvalidLoginCredentialsError();
    }
    await this.setAuthTokenCookie(reply, user.id);

    return LoginResponseDto.build({
      authenticated: true,
    });
  }

  private async setAuthTokenCookie(
    reply: FastifyReply,
    userId: Guid,
  ): Promise<void> {
    const userSession =
      await this.userSessionGateway.createCustomerSession(userId);

    const userSessionAsString = userSession.toString();
    const sevenDaysInSeconds = 604800;

    const secure = NodeApplicationVariable.PRODUCTION_ENVIRONMENT
      ? true
      : false;

    reply.setCookie('auth_token', userSessionAsString, {
      httpOnly: true,
      secure,
      sameSite: 'lax',
      path: '/',
      maxAge: sevenDaysInSeconds,
    });
  }
}
