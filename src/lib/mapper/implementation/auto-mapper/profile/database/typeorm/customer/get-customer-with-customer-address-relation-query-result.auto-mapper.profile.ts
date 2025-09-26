import { createMap, Mapper, constructUsing } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { PhoneNumber } from '@core/domain/schema/value-object/phone-number/phone-number.value-object';
import { CustomerAddressTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer-address.typeorm.entity';
import { CustomerTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer.typeorm.entity';
import { GetCustomerWithCustomerAddressRelationQueryResult } from '@module/customer/account/domain/repository/customer/query/result/get-customer-with-customer-address-relation.query.result';
import { GetCustomerAddressQueryResult } from '@module/customer/account/domain/repository/customer-address/query/result/get-customer-address.query.result';
import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';

@Injectable()
export class GetCustomerWithCustomerAddressRelationQueryResultAutoMapperProfile {
  protected readonly _type =
    GetCustomerWithCustomerAddressRelationQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
    this.mapQueryResultToOrmEntity();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToDomainEntity = (
      source: CustomerTypeormEntity,
    ): GetCustomerWithCustomerAddressRelationQueryResult => {
      const customerAddress = this.mapper.map(
        source.customerAddress,
        CustomerAddressTypeormEntity,
        GetCustomerAddressQueryResult,
      );

      return GetCustomerWithCustomerAddressRelationQueryResult.build({
        ...source,
        id: new CustomerId(source.id),
        phoneNumber: new PhoneNumber(source.phoneNumber),
        customerAddress,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      CustomerTypeormEntity,
      GetCustomerWithCustomerAddressRelationQueryResult,
      mappingFunction,
    );
  }

  private mapQueryResultToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetCustomerWithCustomerAddressRelationQueryResult,
    ): CustomerTypeormEntity => {
      const customerAddress = this.mapper.map(
        source.customerAddress,
        GetCustomerAddressQueryResult,
        CustomerAddressTypeormEntity,
      );

      return CustomerTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        phoneNumber: source.phoneNumber.toString(),
        customerAddress,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetCustomerWithCustomerAddressRelationQueryResult,
      CustomerTypeormEntity,
      mappingFunction,
    );
  }
}
