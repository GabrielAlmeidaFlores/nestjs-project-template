import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { Hash } from '@core/domain/schema/value-object/hash/hash.value-object';
import { PhoneNumber } from '@core/domain/schema/value-object/phone-number/phone-number.value-object';
import { CustomerAddressTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer-address.typeorm.entity';
import { CustomerTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer.typeorm.entity';
import { CustomerEntity } from '@module/customer/account/domain/schema/entity/customer/customer.entity';
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
        id: new Guid(source.id),
        email: new Email(source.email),
        phoneNumber: new PhoneNumber(source.phoneNumber),
        federalDocument: new FederalDocument(source.federalDocument),
        password: new Hash(source.password),
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
        email: source.email.toString(),
        phoneNumber: source.phoneNumber.toString(),
        federalDocument: source.federalDocument.toString(),
        password: source.password.toString(),
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
