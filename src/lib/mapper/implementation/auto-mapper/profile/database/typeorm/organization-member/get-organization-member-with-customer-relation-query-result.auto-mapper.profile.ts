import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { CustomerTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer.typeorm.entity';
import { OrganizationMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-member.typeorm.entity';
import { GetCustomerQueryResult } from '@module/customer/account/domain/repository/customer/query/result/get-customer.query.result';
import { GetOrganizationMemberWithCustomerRelationQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member-with-customer-relation.query.result';
import { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';

@Injectable()
export class GetOrganizationMemberWithCustomerRelationQueryResultAutoMapperProfile {
  protected readonly _type =
    GetOrganizationMemberWithCustomerRelationQueryResultAutoMapperProfile.name;

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
    ): GetOrganizationMemberWithCustomerRelationQueryResult => {
      const customer = this.mapper.map(
        source.customer,
        CustomerTypeormEntity,
        GetCustomerQueryResult,
      );

      return GetOrganizationMemberWithCustomerRelationQueryResult.build({
        ...source,
        id: new OrganizationMemberId(source.id),
        customer,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      OrganizationMemberTypeormEntity,
      GetOrganizationMemberWithCustomerRelationQueryResult,
      mappingFunction,
    );
  }

  private mapQueryResultToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetOrganizationMemberWithCustomerRelationQueryResult,
    ): OrganizationMemberTypeormEntity => {
      const customer = this.mapper.map(
        source.customer,
        GetCustomerQueryResult,
        CustomerTypeormEntity,
      );

      return OrganizationMemberTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        customer,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetOrganizationMemberWithCustomerRelationQueryResult,
      OrganizationMemberTypeormEntity,
      mappingFunction,
    );
  }
}
