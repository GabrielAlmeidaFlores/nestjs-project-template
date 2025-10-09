import { Module } from '@nestjs/common';

import { OrganizationSessionGateway } from '@module/customer/account/lib/organization-session/organization-session.gateway';
import { OrganizationSessionService } from '@module/customer/account/lib/organization-session/organization-session.service';

@Module({
  providers: [
    OrganizationSessionService,
    {
      provide: OrganizationSessionGateway,
      useClass: OrganizationSessionService,
    },
  ],
  exports: [OrganizationSessionGateway],
})
export class OrganizationSessionModule {
  protected readonly _type = OrganizationSessionModule.name;
}
