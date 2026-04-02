import { constructUsing, createMap, Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { AffiliateCustomerConfigTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/affiliate-customer-config.typeorm.entity';
import { AffiliateCustomerConfigEntity } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer-config/affiliate-customer-config.entity';
import { AffiliateCustomerConfigId } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer-config/value-object/affiliate-customer-config-id/affiliate-customer-config-id.value-object';

@Injectable()
export class AffiliateCustomerConfigAutoMapperProfile {
  protected readonly _type = AffiliateCustomerConfigAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convert = (
      source: AffiliateCustomerConfigTypeormEntity,
    ): AffiliateCustomerConfigEntity => {
      return new AffiliateCustomerConfigEntity({
        id: new AffiliateCustomerConfigId(source.id),
        config: source.config,
        value: source.value,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      AffiliateCustomerConfigTypeormEntity,
      AffiliateCustomerConfigEntity,
      constructUsing(convert),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convert = (
      source: AffiliateCustomerConfigEntity,
    ): AffiliateCustomerConfigTypeormEntity => {
      return AffiliateCustomerConfigTypeormEntity.build({
        id: source.id.toString(),
        config: source.config,
        value: source.value,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      AffiliateCustomerConfigEntity,
      AffiliateCustomerConfigTypeormEntity,
      constructUsing(convert),
    );
  }
}
