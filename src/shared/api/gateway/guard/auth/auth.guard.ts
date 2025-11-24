import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { FastifyRequest } from 'fastify';

import { ValidateAuthIdentitySignInRequestDto } from '@module/generic/auth-identity/dto/request/validate-auth-identity-sign-in.request.dto';
import { ValidateAuthIdentitySignInUseCaseGateway } from '@module/generic/auth-identity/use-case-gateway/validate-auth-identity-sign-in.use-case-gateway';
import { ApiCookieEnum } from '@shared/api/enum/api-cookie.enum';

@Injectable()
export class AuthGuard implements CanActivate {
  protected readonly _type = AuthGuard.name;

  public constructor(
    private readonly reflector: Reflector,
    @Inject(ValidateAuthIdentitySignInUseCaseGateway)
    private readonly validateAuthIdentitySignInUseCaseGateway: ValidateAuthIdentitySignInUseCaseGateway,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<FastifyRequest>();

    const jwt = request.cookies[ApiCookieEnum.AUTH_TOKEN];

    if (typeof jwt !== 'string' || jwt.trim() === '') {
      return false;
    }

    const jwtContent =
      await this.validateAuthIdentitySignInUseCaseGateway.execute(
        ValidateAuthIdentitySignInRequestDto.build({ jwt }),
      );

    const allowedUserLevel = this.reflector.get<string[]>(
      'userLevel',
      context.getHandler(),
    );

    const isValidUserLevel = allowedUserLevel.some(
      (level) => level === jwtContent.userLevel,
    );

    if (!isValidUserLevel) {
      return false;
    }

    const internalRequest = request as unknown as {
      sessionData: unknown;
    };

    internalRequest.sessionData = jwtContent;

    return true;
  }
}
