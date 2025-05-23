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
import { CustomerTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer.typeorm.entity';
import { BaseAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/base/base.auto-mapper.profile';

@Injectable()
export class CustomerAutoMapperDatabaseProfile extends BaseAutoMapperProfile {
  protected readonly _type = CustomerAutoMapperDatabaseProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    super();
    this.createMappings();
  }

  private createMappings(): void {
    createMap(
      this.mapper,
      CustomerTypeormEntity,
      CustomerEntity,
      constructUsing((source: CustomerTypeormEntity) => {
        return CustomerEntity.build({
          ...source,
          id: new Guid(source.id),
          email: new Email(source.email),
          phoneNumber: new PhoneNumber(source.phoneNumber),
          profilePicture: this.convertOptionalStringToValueObject(
            Url,
            source.profilePicture,
          ),
          countryState: this.convertStringToEnum(
            CountryStateEnum,
            source.countryState,
          ),
          postalCode: new PostalCode(source.postalCode),
          federalDocument: new FederalDocument(source.federalDocument),
          password: new Hash(source.password),
        });
      }),
    );

    createMap(
      this.mapper,
      CustomerEntity,
      CustomerTypeormEntity,
      constructUsing((source: CustomerEntity) => {
        return CustomerTypeormEntity.build({
          ...source,
          id: source.id.toString(),
          email: source.email.toString(),
          phoneNumber: source.password.toString(),
          profilePicture: this.convertOptionalValueObjectToString(
            source.profilePicture,
          ),
          postalCode: source.postalCode.toString(),
          federalDocument: source.federalDocument.toString(),
          password: source.password.toString(),
        });
      }),
    );
  }
}
