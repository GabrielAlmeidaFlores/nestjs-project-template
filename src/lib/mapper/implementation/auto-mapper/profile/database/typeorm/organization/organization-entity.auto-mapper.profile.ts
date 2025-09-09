import { createMap, Mapper, constructUsing } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { OrganizationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization.typeorm.entity';
import { OrganizationEntity } from '@module/customer/account/domain/schema/entity/organization/organization.entity';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id.value-object';

@Injectable()
export class OrganizationEntityAutoMapperProfile {
  protected readonly _type = OrganizationEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: OrganizationTypeormEntity,
    ): OrganizationEntity => {
      return new OrganizationEntity({
        ...source,
        id: new OrganizationId(source.id),
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      OrganizationTypeormEntity,
      OrganizationEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: OrganizationEntity,
    ): OrganizationTypeormEntity => {
      return OrganizationTypeormEntity.build({
        ...source,
        id: source.id.toString(),
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      OrganizationEntity,
      OrganizationTypeormEntity,
      mappingFunction,
    );
  }
}
