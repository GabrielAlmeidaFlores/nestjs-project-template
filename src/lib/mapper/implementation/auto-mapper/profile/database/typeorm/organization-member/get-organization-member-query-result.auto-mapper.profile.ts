import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { CustomerTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer.typeorm.entity';
import { OrganizationMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-member.typeorm.entity';
import { OrganizationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization.typeorm.entity';
import { GetCustomerQueryResult } from '@module/customer/auth/domain/repository/customer/query/result/get-customer.query.result';
import { GetOrganizationQueryResult } from '@module/customer/auth/domain/repository/organization/query/result/get-organization.query.result';
import { GetOrganizationMemberQueryResult } from '@module/customer/auth/domain/repository/organization-member/query/result/get-organization-member.query.result';
import { OrganizationMemberId } from '@module/customer/auth/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';

@Injectable()
export class GetOrganizationMemberQueryResultAutoMapperProfile {
  protected readonly _type =
    GetOrganizationMemberQueryResultAutoMapperProfile.name;

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
    ): GetOrganizationMemberQueryResult => {
      const customer = this.mapper.map(
        source.customer,
        CustomerTypeormEntity,
        GetCustomerQueryResult,
      );

      const organization = this.mapper.map(
        source.organization,
        OrganizationTypeormEntity,
        GetOrganizationQueryResult,
      );

      return GetOrganizationMemberQueryResult.build({
        ...source,
        id: new OrganizationMemberId(source.id),
        customer,
        organization,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      OrganizationMemberTypeormEntity,
      GetOrganizationMemberQueryResult,
      mappingFunction,
    );
  }

  private mapQueryResultToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetOrganizationMemberQueryResult,
    ): OrganizationMemberTypeormEntity => {
      const customer = this.mapper.map(
        source.customer,
        GetCustomerQueryResult,
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
      GetOrganizationMemberQueryResult,
      OrganizationMemberTypeormEntity,
      mappingFunction,
    );
  }
}
