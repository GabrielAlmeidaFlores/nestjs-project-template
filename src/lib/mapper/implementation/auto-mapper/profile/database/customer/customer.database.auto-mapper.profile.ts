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
      const id = new Guid(source.id);
      const email = new Email(source.email);
      const phoneNumber = new PhoneNumber(source.phoneNumber);
      const federalDocument = new FederalDocument(source.federalDocument);
      const password = new Hash(source.password);

      return new CustomerEntity({
        ...source,
        id,
        email,
        phoneNumber,
        federalDocument,
        password,
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
      const id = source.id.toString();
      const email = source.email.toString();
      const phoneNumber = source.phoneNumber.toString();
      const federalDocument = source.federalDocument.toString();
      const password = source.password.toString();

      return CustomerTypeormEntity.build({
        ...source,
        id,
        email,
        phoneNumber,
        federalDocument,
        password,
        customerAddress: undefined,
        organizationMember: undefined,
        affiliateCustomer: undefined,
        organizationCreditUsage: undefined,
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
