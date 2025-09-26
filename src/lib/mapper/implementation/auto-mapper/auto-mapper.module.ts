import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { Module } from '@nestjs/common';

import { AutoMapperService } from '@lib/mapper/implementation/auto-mapper/auto-mapper.service';
import { GetAuthIdentityQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/auth-identity/get-auth-identity-query-result.auto-mapper.profile';
import { GetCustomerQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/customer/get-customer-query-result.auto-mapper.profile';
import { GetCustomerWithAddressRelationQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/customer/get-customer-with-address-relation-query-result.auto-mapper.profile';
import { GetCustomerWithAuthIdentityRelationQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/customer/get-customer-with-auth-identity-relation-query-result.auto-mapper.profile';
import { GetCustomerAddressQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/customer-address/get-customer-query-result.auto-mapper.profile';
import { GetOrganizationQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/organization/get-organization-query-result.auto-mapper.profile';
import { GetOrganizationMemberQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/organization-member/get-organization-member-query-result.auto-mapper.profile';
import { GetOrganizationMemberWithRelationsQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/organization-member/get-organization-member-with-relations-query-result.auto-mapper.profile';

@Module({
  imports: [
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
  ],
  providers: [
    AutoMapperService,
    GetAuthIdentityQueryResultAutoMapperProfile,
    GetCustomerQueryResultAutoMapperProfile,
    GetCustomerAddressQueryResultAutoMapperProfile,
    GetOrganizationQueryResultAutoMapperProfile,
    GetOrganizationMemberQueryResultAutoMapperProfile,
    GetCustomerWithAddressRelationQueryResultAutoMapperProfile,
    GetOrganizationMemberWithRelationsQueryResultAutoMapperProfile,
    GetCustomerWithAuthIdentityRelationQueryResultAutoMapperProfile,
  ],
  exports: [AutoMapperService],
})
export class AutoMapperModule {
  protected readonly _type = AutoMapperModule.name;
}
