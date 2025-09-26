import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { CustomerTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer.typeorm.entity';
import { OrganizationMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-member.typeorm.entity';
import { OrganizationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization.typeorm.entity';
import { GetCustomerWithAuthIdentityRelationQueryResult } from '@module/customer/account/domain/repository/customer/query/result/get-customer-with-auth-identity-relation.query.result';
import { GetOrganizationQueryResult } from '@module/customer/account/domain/repository/organization/query/result/get-organization.query.result';
import { GetOrganizationMemberWithCustomerAndOrganizationRelationsQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member-with-customer-and-organization-relations.query.result';
import { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';

@Injectable()
export class GetOrganizationMemberWithRelationsQueryResultAutoMapperProfile {
  protected readonly _type =
    GetOrganizationMemberWithRelationsQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
    this.mapQueryResultToOrmEntity();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToDomainEntity = (
      source: OrganizationMemberTypeormEntity,
    ): GetOrganizationMemberWithCustomerAndOrganizationRelationsQueryResult => {
      const customer = this.mapper.map(
        source.customer,
        CustomerTypeormEntity,
        GetCustomerWithAuthIdentityRelationQueryResult,
      );

      const organization = this.mapper.map(
        source.organization,
        OrganizationTypeormEntity,
        GetOrganizationQueryResult,
      );

      return GetOrganizationMemberWithCustomerAndOrganizationRelationsQueryResult.build(
        {
          ...source,
          id: new OrganizationMemberId(source.id),
          customer,
          organization,
        },
      );
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      OrganizationMemberTypeormEntity,
      GetOrganizationMemberWithCustomerAndOrganizationRelationsQueryResult,
      mappingFunction,
    );
  }

  private mapQueryResultToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetOrganizationMemberWithCustomerAndOrganizationRelationsQueryResult,
    ): OrganizationMemberTypeormEntity => {
      const customer = this.mapper.map(
        source.customer,
        GetCustomerWithAuthIdentityRelationQueryResult,
        CustomerTypeormEntity,
      );

      const organization = this.mapper.map(
        source.organization,
        GetOrganizationQueryResult,
        OrganizationTypeormEntity,
      );

      return OrganizationMemberTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        customer,
        organization,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetOrganizationMemberWithCustomerAndOrganizationRelationsQueryResult,
      OrganizationMemberTypeormEntity,
      mappingFunction,
    );
  }
}
