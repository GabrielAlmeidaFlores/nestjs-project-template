import { constructUsing, createMap, Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { AffiliateCustomerTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/affiliate-customer.typeorm.entity';
import { CustomerTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import { GetAffiliateCustomerQueryResult } from '@module/customer/affiliate-customer/domain/repository/affiliate-customer/query/result/get-affiliate-customer.query.result';
import { AffiliateCustomerId } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer/value-object/affiliate-customer-id/affiliate-customer-id.value-object';
import { PixAddressKey } from '@module/customer/affiliate-customer/domain/schema/value-object/pix-address-key/pix-address-key.value-object';

@Injectable()
export class GetAffiliateCustomerQueryResultAutoMapperProfile {
  protected readonly _type =
    GetAffiliateCustomerQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
    this.mapQueryResultToOrmEntity();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: AffiliateCustomerTypeormEntity,
    ): GetAffiliateCustomerQueryResult => {
      if (source.customer === null) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass: GetAffiliateCustomerQueryResult.name,
          sourceClass: AffiliateCustomerTypeormEntity.name,
        });
      }

      const pixAddressKey =
        source.pixAddressKey !== null && source.pixAddressKeyType !== null
          ? new PixAddressKey(source.pixAddressKey, source.pixAddressKeyType)
          : null;

      return GetAffiliateCustomerQueryResult.build({
        ...source,
        id: new AffiliateCustomerId(source.id),
        customerId: new CustomerId(source.customer.id),
        pixAddressKey,
      });
    };

    createMap(
      this.mapper,
      AffiliateCustomerTypeormEntity,
      GetAffiliateCustomerQueryResult,
      constructUsing(convertOrmEntityToQueryResult),
    );
  }

  private mapQueryResultToOrmEntity(): void {
    const convertQueryResultToOrmEntity = (
      source: GetAffiliateCustomerQueryResult,
    ): AffiliateCustomerTypeormEntity => {
      return AffiliateCustomerTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        customer: null as unknown as CustomerTypeormEntity,
        pixAddressKey: source.pixAddressKey?.toString() ?? null,
      });
    };

    createMap(
      this.mapper,
      GetAffiliateCustomerQueryResult,
      AffiliateCustomerTypeormEntity,
      constructUsing(convertQueryResultToOrmEntity),
    );
  }
}
