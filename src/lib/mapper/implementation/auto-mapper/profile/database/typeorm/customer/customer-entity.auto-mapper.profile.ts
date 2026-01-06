import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { CustomerAddressTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer-address.typeorm.entity';
import { CustomerTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer.typeorm.entity';
import { CustomerEntity } from '@module/customer/account/domain/schema/entity/customer/customer.entity';
import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import { CustomerAddressEntity } from '@module/customer/account/domain/schema/entity/customer-address/customer-address.entity';

@Injectable()
export class CustomerEntityAutoMapperProfile {
  protected readonly _type = CustomerEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: CustomerTypeormEntity,
    ): CustomerEntity => {
      const customerAddress = this.mapper.map(
        source.customerAddress,
        CustomerAddressTypeormEntity,
        CustomerAddressEntity,
      );

      return new CustomerEntity({
        ...source,
        id: new CustomerId(source.id),
        customerAddress,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      CustomerTypeormEntity,
      CustomerEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: CustomerEntity,
    ): CustomerTypeormEntity => {
      const customerAddress = this.mapper.map(
        source.customerAddress,
        CustomerAddressEntity,
        CustomerAddressTypeormEntity,
      );

      return CustomerTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        customerAddress,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      CustomerEntity,
      CustomerTypeormEntity,
      mappingFunction,
    );
  }
}
