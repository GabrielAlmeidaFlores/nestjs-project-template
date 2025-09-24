import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { OrganizationMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-member.typeorm.entity';
import { GetOrganizationMemberQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member.query.result';
import { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';

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
      return GetOrganizationMemberQueryResult.build({
        ...source,
        id: new OrganizationMemberId(source.id),
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
      return OrganizationMemberTypeormEntity.build({
        ...source,
        id: source.id.toString(),
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
