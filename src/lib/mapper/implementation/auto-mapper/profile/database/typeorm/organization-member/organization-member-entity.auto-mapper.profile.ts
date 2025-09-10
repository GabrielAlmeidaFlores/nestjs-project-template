import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { CustomerTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer.typeorm.entity';
import { OrganizationMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-member.typeorm.entity';
import { OrganizationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization.typeorm.entity';
import { CustomerEntity } from '@module/customer/account/domain/schema/entity/customer/customer.entity';
import { OrganizationEntity } from '@module/customer/account/domain/schema/entity/organization/organization.entity';
import { OrganizationMemberEntity } from '@module/customer/account/domain/schema/entity/organization-member/organization-member.entity';
import { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';

@Injectable()
export class OrganizationMemberEntityAutoMapperProfile {
  protected readonly _type = OrganizationMemberEntityAutoMapperProfile.name;

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
    ): OrganizationMemberEntity => {
      const customer = this.mapper.map(
        source.customer,
        CustomerTypeormEntity,
        CustomerEntity,
      );

      const organization = this.mapper.map(
        source.organization,
        OrganizationTypeormEntity,
        OrganizationEntity,
      );

      return new OrganizationMemberEntity({
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
      OrganizationMemberEntity,
      mappingFunction,
    );
  }

  private mapQueryResultToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: OrganizationMemberEntity,
    ): OrganizationMemberTypeormEntity => {
      const customer = this.mapper.map(
        source.customer,
        CustomerEntity,
        CustomerTypeormEntity,
      );

      const organization = this.mapper.map(
        source.organization,
        OrganizationEntity,
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
      OrganizationMemberEntity,
      OrganizationMemberTypeormEntity,
      mappingFunction,
    );
  }
}
