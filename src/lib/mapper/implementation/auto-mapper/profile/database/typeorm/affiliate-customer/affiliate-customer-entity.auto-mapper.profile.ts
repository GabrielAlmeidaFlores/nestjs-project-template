import { constructUsing, createMap, Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { AffiliateCustomerTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/affiliate-customer.typeorm.entity';
import { CustomerTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import { AffiliateCustomerEntity } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer/affiliate-customer.entity';
import { AffiliateCustomerId } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer/value-object/affiliate-customer-id/affiliate-customer-id.value-object';
import { PixAddressKey } from '@module/customer/affiliate-customer/domain/schema/value-object/pix-address-key/pix-address-key.value-object';

@Injectable()
export class AffiliateCustomerEntityAutoMapperProfile {
  protected readonly _type = AffiliateCustomerEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: AffiliateCustomerTypeormEntity,
    ): AffiliateCustomerEntity => {
      if (source.customer === null) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass: AffiliateCustomerEntity.name,
          sourceClass: AffiliateCustomerTypeormEntity.name,
        });
      }

      const pixAddressKey =
        source.pixAddressKey !== null && source.pixAddressKeyType !== null
          ? new PixAddressKey(source.pixAddressKey, source.pixAddressKeyType)
          : null;

      return new AffiliateCustomerEntity({
        ...source,
        id: new AffiliateCustomerId(source.id),
        customerId: new CustomerId(source.customer.id),
        pixAddressKey,
      });
    };

    createMap(
      this.mapper,
      AffiliateCustomerTypeormEntity,
      AffiliateCustomerEntity,
      constructUsing(convertOrmEntityToDomainEntity),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: AffiliateCustomerEntity,
    ): AffiliateCustomerTypeormEntity => {
      const customer = {
        id: source.customerId.toString(),
      } as CustomerTypeormEntity;

      return AffiliateCustomerTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        customer,
        pixAddressKey: source.pixAddressKey?.toString() ?? null,
      });
    };

    createMap(
      this.mapper,
      AffiliateCustomerEntity,
      AffiliateCustomerTypeormEntity,
      constructUsing(convertDomainEntityToOrmEntity),
    );
  }
}
