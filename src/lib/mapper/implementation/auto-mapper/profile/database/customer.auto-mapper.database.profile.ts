import { createMap, Mapper, constructUsing } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { CustomerEntity } from '@core/domain/schema/entity/customer/customer.entity';
import { CountryStateEnum } from '@core/domain/schema/enum/country-state.enum';
import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { Hash } from '@core/domain/schema/value-object/hash/hash.value-object';
import { PhoneNumber } from '@core/domain/schema/value-object/phone-number/phone-number.value-object';
import { PostalCode } from '@core/domain/schema/value-object/postal-code/postal-code.value-object';
import { Url } from '@core/domain/schema/value-object/url/url.value-object';
import { CustomerTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer/customer.typeorm.entity';
import { BaseAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/base/base.auto-mapper.profile';

@Injectable()
export class CustomerAutoMapperDatabaseProfile extends BaseAutoMapperProfile {
  protected readonly _type = CustomerAutoMapperDatabaseProfile.name;

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
      const profilePicture = this.convertOptionalStringToValueObject(
        Url,
        source.profilePicture,
      );
      const countryState = this.convertStringToEnum(
        CountryStateEnum,
        source.countryState,
      );
      const postalCode = new PostalCode(source.postalCode);
      const federalDocument = new FederalDocument(source.federalDocument);
      const password = new Hash(source.password);

      return new CustomerEntity({
        ...source,
        id,
        email,
        phoneNumber,
        profilePicture,
        countryState,
        postalCode,
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
      const profilePicture = this.convertOptionalValueObjectToString(
        source.profilePicture,
      );
      const postalCode = source.postalCode.toString();
      const federalDocument = source.federalDocument.toString();
      const password = source.password.toString();

      return new CustomerTypeormEntity({
        ...source,
        id,
        email,
        phoneNumber,
        profilePicture,
        postalCode,
        federalDocument,
        password,
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
