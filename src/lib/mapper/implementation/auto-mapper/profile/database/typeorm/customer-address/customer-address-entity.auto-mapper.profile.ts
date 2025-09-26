import { createMap, Mapper, constructUsing } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { PostalCode } from '@core/domain/schema/value-object/postal-code/postal-code.value-object';
import { CustomerAddressTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer-address.typeorm.entity';
import { CustomerAddressEntity } from '@module/customer/account/domain/schema/entity/customer-address/customer-address.entity';
import { StateCodeEnum } from '@module/customer/account/domain/schema/entity/customer-address/enum/state-code.enum';
import { CustomerAddressId } from '@module/customer/account/domain/schema/entity/customer-address/value-object/customer-address-id/customer-address-id.value-object';

@Injectable()
export class CustomerAddressEntityAutoMapperProfile {
  protected readonly _type = CustomerAddressEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: CustomerAddressTypeormEntity,
    ): CustomerAddressEntity => {
      return new CustomerAddressEntity({
        ...source,
        id: new CustomerAddressId(source.id),
        postalCode: new PostalCode(source.postalCode),
        stateCode: source.stateCode as StateCodeEnum,
        addressNumber: Number(source.addressNumber),
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      CustomerAddressTypeormEntity,
      CustomerAddressEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: CustomerAddressEntity,
    ): CustomerAddressTypeormEntity => {
      return CustomerAddressTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        postalCode: source.postalCode.toString(),
        addressNumber: String(source.addressNumber),
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      CustomerAddressEntity,
      CustomerAddressTypeormEntity,
      mappingFunction,
    );
  }
}
