import { createMap, Mapper, constructUsing } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { CustomerEntity } from '@core/domain/schema/entity/customer/customer/customer.entity';
import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { Hash } from '@core/domain/schema/value-object/hash/hash.value-object';
import { PhoneNumber } from '@core/domain/schema/value-object/phone-number/phone-number.value-object';
import { CustomerTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer.typeorm.entity';
import { BaseAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/base/base.auto-mapper.profile';

@Injectable()
export class CustomerDatabaseAutoMapperProfile extends BaseAutoMapperProfile {
  protected readonly _type = CustomerDatabaseAutoMapperProfile.name;

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
      source: CustomerTypeormEntity,
    ): CustomerEntity => {
      return new CustomerEntity({
        ...source,
        id: new Guid(source.id),
        email: new Email(source.email),
        phoneNumber: new PhoneNumber(source.phoneNumber),
        federalDocument: new FederalDocument(source.federalDocument),
        password: new Hash(source.password),
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
      return CustomerTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        email: source.email.toString(),
        phoneNumber: source.phoneNumber.toString(),
        federalDocument: source.federalDocument.toString(),
        password: source.password.toString(),
        customerAddress: undefined,
        organizationMember: undefined,
        affiliateCustomer: undefined,
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
