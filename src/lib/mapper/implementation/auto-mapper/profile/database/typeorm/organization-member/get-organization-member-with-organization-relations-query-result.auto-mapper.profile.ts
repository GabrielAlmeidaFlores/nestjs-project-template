import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { OrganizationMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-member.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { GetOrganizationMemberWithOrganizationRelationQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member-with-organization-relation.query.result';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';

@Injectable()
export class GetOrganizationMemberWithOrganizationRelationQueryResultAutoMapperProfile {
  protected readonly _type =
    GetOrganizationMemberWithOrganizationRelationQueryResultAutoMapperProfile.name;

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
    ): GetOrganizationMemberWithOrganizationRelationQueryResult => {
      if (!source.organization) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass:
            GetOrganizationMemberWithOrganizationRelationQueryResult.name,
          sourceClass: OrganizationMemberTypeormEntity.name,
        });
      }

      return GetOrganizationMemberWithOrganizationRelationQueryResult.build({
        id: new OrganizationMemberId(source.id),
        owner: source.owner,
        organizationId: new OrganizationId(source.organization.id),
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      OrganizationMemberTypeormEntity,
      GetOrganizationMemberWithOrganizationRelationQueryResult,
      mappingFunction,
    );
  }

  private mapQueryResultToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetOrganizationMemberWithOrganizationRelationQueryResult,
    ): OrganizationMemberTypeormEntity => {
      return OrganizationMemberTypeormEntity.build({
        id: source.id.toString(),
        owner: source.owner,
        isActive: true,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetOrganizationMemberWithOrganizationRelationQueryResult,
      OrganizationMemberTypeormEntity,
      mappingFunction,
    );
  }
}
