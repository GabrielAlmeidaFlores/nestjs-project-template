import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { FastifyRequest } from 'fastify';

import { ValidateAuthIdentitySignInRequestDto } from '@module/generic/auth-identity/dto/request/validate-auth-identity-sign-in.request.dto';
import { ValidateAuthIdentitySignInUseCaseGateway } from '@module/generic/auth-identity/use-case-gateway/validate-auth-identity-sign-in.use-case-gateway';

@Injectable()
export class AuthGuard implements CanActivate {
  protected readonly _type = AuthGuard.name;

  public constructor(
    @Inject(ValidateAuthIdentitySignInUseCaseGateway)
    private readonly validateAuthIdentitySignInUseCaseGateway: ValidateAuthIdentitySignInUseCaseGateway,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<FastifyRequest>();

    const jwt = request.cookies['auth_token'];

    if (typeof jwt !== 'string' || jwt.trim() === '') {
      return false;
    }

    const jwtContent =
      await this.validateAuthIdentitySignInUseCaseGateway.execute(
        ValidateAuthIdentitySignInRequestDto.build({ jwt }),
      );

    const internalRequest = request as unknown as {
      sessionData: unknown;
    };

    internalRequest.sessionData = jwtContent;

    return true;
  }
}
