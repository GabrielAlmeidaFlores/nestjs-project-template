import { createMap, Mapper, constructUsing } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { OrganizationEntity } from '@core/domain/schema/entity/organization/organization/organization.entity';
import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { OrganizationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization.typeorm.entity';
import { BaseAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/base/base.auto-mapper.profile';

@Injectable()
export class OrganizationDatabaseAutoMapperProfile extends BaseAutoMapperProfile {
  protected readonly _type = OrganizationDatabaseAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    super();
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
      const id = new Guid(source.id);

      return new OrganizationEntity({
        ...source,
        id,
        organizationLogo: source.organizationLogo,
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
      const id = source.id.toString();

      return OrganizationTypeormEntity.build({
        ...source,
        id,
        organizationLogo: source.organizationLogo ?? '',
        organizationMember: undefined,
        organizationCreditPlanPurchase: undefined,
        organizationCreditPurchase: undefined,
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
