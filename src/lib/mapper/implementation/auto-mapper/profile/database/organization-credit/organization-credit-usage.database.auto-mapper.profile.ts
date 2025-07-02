import { createMap, Mapper, constructUsing } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { ApplicationPaidResourceEntity } from '@core/domain/schema/entity/application-resource/application-paid-resource/application-paid-resource.entity';
import { CustomerEntity } from '@core/domain/schema/entity/customer/customer/customer.entity';
import { OrganizationEntity } from '@core/domain/schema/entity/organization/organization/organization.entity';
import { OrganizationCreditUsageEntity } from '@core/domain/schema/entity/organization-credit/organization-credit-usage/organization-credit-usage.entity';
import { RelationModel } from '@core/domain/schema/model/relation.model';
import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { ApplicationPaidResourceTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/application-paid-resource.typeorm.entity';
import { CustomerTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer.typeorm.entity';
import { OrganizationCreditUsageTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-credit-usage.typeorm.entity';
import { OrganizationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization.typeorm.entity';
import { BaseAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/base/base.auto-mapper.profile';

@Injectable()
export class OrganizationCreditUsageDatabaseAutoMapperProfile extends BaseAutoMapperProfile {
  protected readonly _type =
    OrganizationCreditUsageDatabaseAutoMapperProfile.name;

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
      source: OrganizationCreditUsageTypeormEntity,
    ): OrganizationCreditUsageEntity => {
      const id = new Guid(source.id);
      const organization = this.mapper.map(
        source.organization,
        OrganizationTypeormEntity,
        RelationModel<OrganizationEntity>,
      );
      const applicationPaidResource = this.mapper.map(
        source.applicationPaidResource,
        ApplicationPaidResourceTypeormEntity,
        RelationModel<ApplicationPaidResourceEntity>,
      );
      return new OrganizationCreditUsageEntity({
        ...source,
        id,
        organization,
        applicationPaidResource,
        createdBy: new RelationModel<CustomerEntity>({
          id: new Guid(source.createdBy.id),
        }),
        updatedBy: new RelationModel<CustomerEntity>({
          id: new Guid(source.updatedBy.id),
        }),
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      OrganizationCreditUsageTypeormEntity,
      OrganizationCreditUsageEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: OrganizationCreditUsageEntity,
    ): OrganizationCreditUsageTypeormEntity => {
      const id = source.id.toString();
      const organization = this.mapper.map(
        source.organization,
        RelationModel<OrganizationEntity>,
        OrganizationTypeormEntity,
      );
      const applicationPaidResource = this.mapper.map(
        source.applicationPaidResource,
        RelationModel<ApplicationPaidResourceEntity>,
        ApplicationPaidResourceTypeormEntity,
      );

      return OrganizationCreditUsageTypeormEntity.build({
        ...source,
        id,
        organization,
        applicationPaidResource,
        createdBy: new CustomerTypeormEntity(),
        updatedBy: new CustomerTypeormEntity(),
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      OrganizationCreditUsageEntity,
      OrganizationCreditUsageTypeormEntity,
      mappingFunction,
    );
  }
}
