import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { FastifyRequest } from 'fastify';

import { ValidateOrganizationSessionRequestDto } from '@module/customer/account/dto/request/validate-organization-session.request.dto';
import { ValidateOrganizationSessionUseCaseGateway } from '@module/customer/account/use-case-gateway/validate-organization-session.use-case-gateway';
import { ApiCookieEnum } from '@shared/api/enum/api-cookie.enum';

@Injectable()
export class OrganizationSessionGuard implements CanActivate {
  protected readonly _type = OrganizationSessionGuard.name;

  public constructor(
    @Inject(ValidateOrganizationSessionUseCaseGateway)
    private readonly validateOrganizationSessionUseCaseGateway: ValidateOrganizationSessionUseCaseGateway,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<FastifyRequest>();

    const jwt = request.cookies[ApiCookieEnum.AUTH_TOKEN];

    if (typeof jwt !== 'string' || jwt.trim() === '') {
      return false;
    }

    const jwtContent =
      await this.validateOrganizationSessionUseCaseGateway.execute(
        ValidateOrganizationSessionRequestDto.build({ jwt }),
      );

    const internalRequest = request as unknown as {
      organizationSessionData: unknown;
    };

    internalRequest.organizationSessionData = jwtContent;

    return true;
  }
}
