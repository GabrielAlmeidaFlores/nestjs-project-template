import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { OrganizationSessionJwtModel } from '@module/customer/account/lib/organization-session/model/generic/organization-session-jwt.model';
import { OrganizationSessionJwtOutputModel } from '@module/customer/account/lib/organization-session/model/output/organization-session-jwt.output.model';
import { OrganizationSessionGateway } from '@module/customer/account/lib/organization-session/organization-session.gateway';

@Injectable()
export class OrganizationSessionService implements OrganizationSessionGateway {
  protected readonly _type = OrganizationSessionService.name;

  public constructor(
    @Inject(JwtService)
    private readonly jwtService: JwtService,
  ) {}

  public createSession(organizationId: OrganizationId): string {
    const jwtContent = {
      organizationId: organizationId.toString(),
    } as OrganizationSessionJwtModel;

    return this.jwtService.sign(jwtContent);
  }

  public getSessionDataFromJwt(
    jwt: string,
  ): OrganizationSessionJwtOutputModel | null {
    const jwtContent = this.extractDataFromJWT(jwt);

    if (jwtContent === null) {
      return null;
    }

    const jwtWithParsedContent = OrganizationSessionJwtOutputModel.build({
      organizationId: new OrganizationId(jwtContent.organizationId),
    });

    return jwtWithParsedContent;
  }

  private extractDataFromJWT(
    token: string,
  ): OrganizationSessionJwtModel | null {
    try {
      return this.jwtService.verify<OrganizationSessionJwtModel>(token);
    } catch {
      return null;
    }
  }
}
