import { createMap, Mapper, constructUsing } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { CustomerEntity } from '@core/domain/schema/entity/customer/customer/customer.entity';
import { CustomerAddressEntity } from '@core/domain/schema/entity/customer/customer-address/customer-address.entity';
import { StateCodeEnum } from '@core/domain/schema/entity/customer/enum/state-code.enum';
import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { PostalCode } from '@core/domain/schema/value-object/postal-code/postal-code.value-object';
import { CustomerTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer/customer/customer.typeorm.entity';
import { CustomerAddressTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer/customer-address/customer-address.typeorm.entity';
import { BaseAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/base/base.auto-mapper.profile';

@Injectable()
export class CustomerAddressDatabaseAutoMapperProfile extends BaseAutoMapperProfile {
  protected readonly _type = CustomerAddressDatabaseAutoMapperProfile.name;

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
      source: CustomerAddressTypeormEntity,
    ): CustomerAddressEntity => {
      const id = new Guid(source.id);
      const postalCode = new PostalCode(source.postalCode);
      const stateCode = this.convertStringToEnum(
        StateCodeEnum,
        source.stateCode,
      );
      const addressNumber = Number(source.addressNumber);
      const customer = this.mapper.map(
        source.customer,
        CustomerTypeormEntity,
        CustomerEntity,
      );

      return new CustomerAddressEntity({
        ...source,
        id,
        postalCode,
        stateCode,
        addressNumber,
        customer,
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
      const id = source.id.toString();
      const postalCode = source.postalCode.toString();
      const stateCode = source.stateCode;
      const addressNumber = String(source.addressNumber);
      const customer = this.mapper.map(
        source.customer,
        CustomerEntity,
        CustomerTypeormEntity,
      );

      return new CustomerAddressTypeormEntity({
        ...source,
        id,
        postalCode,
        stateCode,
        addressNumber,
        customer,
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
