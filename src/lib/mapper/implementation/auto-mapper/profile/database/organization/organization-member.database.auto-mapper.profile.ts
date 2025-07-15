import { createMap, Mapper, constructUsing } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { CustomerEntity } from '@core/domain/schema/entity/customer/customer/customer.entity';
import { OrganizationEntity } from '@core/domain/schema/entity/organization/organization/organization.entity';
import { OrganizationMemberEntity } from '@core/domain/schema/entity/organization/organization-member/organization-member.entity';
import { RelationModel } from '@core/domain/schema/model/relation.model';
import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { CustomerTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer.typeorm.entity';
import { OrganizationMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-member.typeorm.entity';
import { OrganizationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization.typeorm.entity';
import { MissingRelationTypeError } from '@lib/mapper/implementation/auto-mapper/error/missing-relation-type.error';
import { BaseAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/base/base.auto-mapper.profile';

@Injectable()
export class OrganizationMemberDatabaseAutoMapperProfile extends BaseAutoMapperProfile {
  protected readonly _type = OrganizationMemberDatabaseAutoMapperProfile.name;

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
      source: OrganizationMemberTypeormEntity,
    ): OrganizationMemberEntity => {
      const sourceClassName = source.constructor.name;
      const targetClassName = OrganizationMemberEntity.name;

      if (!source.customer) {
        throw new MissingRelationTypeError({
          targetClassName,
          sourceClassName,
          relationName: 'customer',
        });
      }

      return new OrganizationMemberEntity({
        ...source,
        id: new Guid(source.id),
        organization: this.mapper.map(
          source.organization,
          OrganizationTypeormEntity,
          OrganizationEntity,
        ),
        customer: new RelationModel<CustomerEntity>({
          id: new Guid(source.customer.id),
        }),
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

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: OrganizationMemberEntity,
    ): OrganizationMemberTypeormEntity => {
      return OrganizationMemberTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        organization: this.mapper.map(
          source.organization,
          OrganizationEntity,
          OrganizationTypeormEntity,
        ),
        customer: {
          id: source.customer.id.toString(),
        } as CustomerTypeormEntity,
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
