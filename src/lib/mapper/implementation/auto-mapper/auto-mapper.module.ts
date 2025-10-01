import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { Module } from '@nestjs/common';

import { AutoMapperService } from '@lib/mapper/implementation/auto-mapper/auto-mapper.service';
import { AuthIdentityEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/auth-identity/auth-identity-entity.auto-mapper.profile';
import { CnisFastAnalysisEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/cnis-fast-analysis/cnis-fast-analysis-entity.auto-mapper.profile';
import { CnisFastAnalysisClientEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/cnis-fast-analysis-client/cnis-fast-analysis-client-entity.auto-mapper.profile';
import { CnisFastAnalysisClientInssBenefitEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/cnis-fast-analysis-client-inss-benefit/cnis-fast-analysis-client-inss-benefit-entity.auto-mapper.profile';
import { CnisFastAnalysisClientLegalProceedingEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/cnis-fast-analysis-client-legal-proceeding/cnis-fast-analysis-client-legal-proceeding-entity.auto-mapper.profile';
import { CnisFastAnalysisResultEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/cnis-fast-analysis-result/cnis-fast-analysis-result-entity.auto-mapper.profile';
import { CustomerEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/customer/customer-entity.auto-mapper.profile';
import { CustomerAddressEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/customer-address/customer-address-entity.auto-mapper.profile';
import { OrganizationEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/organization/organization-entity.auto-mapper.profile';
import { OrganizationMemberEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/organization-member/organization-member-entity.auto-mapper.profile';
import { GetAuthIdentityQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/repository/query/auth-identity/get-auth-identity-query-result.auto-mapper.profile';
import { GetCustomerQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/repository/query/customer/get-customer-query-result.auto-mapper.profile';
import { GetCustomerWithAuthIdentityRelationQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/repository/query/customer/get-customer-with-auth-identity-relation-query-result.auto-mapper.profile';
import { GetCustomerWithCustomerAddressRelationQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/repository/query/customer/get-customer-with-customer-address-relation-query-result.auto-mapper.profile';
import { GetCustomerAddressQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/repository/query/customer-address/get-customer-query-result.auto-mapper.profile';
import { GetOrganizationQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/repository/query/organization/get-organization-query-result.auto-mapper.profile';
import { GetOrganizationMemberQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/repository/query/organization-member/get-organization-member-query-result.auto-mapper.profile';
import { GetOrganizationMemberWithRelationsQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/repository/query/organization-member/get-organization-member-with-relations-query-result.auto-mapper.profile';

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
    GetCustomerWithCustomerAddressRelationQueryResultAutoMapperProfile,
    GetOrganizationMemberWithRelationsQueryResultAutoMapperProfile,
    GetCustomerWithAuthIdentityRelationQueryResultAutoMapperProfile,
    CustomerEntityAutoMapperProfile,
    CustomerAddressEntityAutoMapperProfile,
    OrganizationEntityAutoMapperProfile,
    OrganizationMemberEntityAutoMapperProfile,
    AuthIdentityEntityAutoMapperProfile,
    CnisFastAnalysisEntityAutoMapperProfile,
    CnisFastAnalysisClientEntityAutoMapperProfile,
    CnisFastAnalysisClientInssBenefitEntityAutoMapperProfile,
    CnisFastAnalysisClientLegalProceedingEntityAutoMapperProfile,
    CnisFastAnalysisResultEntityAutoMapperProfile,
  ],
  exports: [AutoMapperService],
})
export class AutoMapperModule {
  protected readonly _type = AutoMapperModule.name;
}
