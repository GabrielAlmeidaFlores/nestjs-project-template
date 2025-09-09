import { createMap, Mapper, constructUsing } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { Hash } from '@core/domain/schema/value-object/hash/hash.value-object';
import { PhoneNumber } from '@core/domain/schema/value-object/phone-number/phone-number.value-object';
import { CustomerTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer.typeorm.entity';
import { GetCustomerQueryResult } from '@module/customer/account/domain/repository/customer/query/result/get-customer.query.result';
import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id.value-object';

@Injectable()
export class GetCustomerQueryResultAutoMapperProfile {
  protected readonly _type = GetCustomerQueryResultAutoMapperProfile.name;

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
    ): GetCustomerQueryResult => {
      return GetCustomerQueryResult.build({
        ...source,
        id: new CustomerId(source.id),
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
      GetCustomerQueryResult,
      mappingFunction,
    );
  }

  private mapQueryResultToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetCustomerQueryResult,
    ): CustomerTypeormEntity => {
      return CustomerTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        email: source.email.toString(),
        phoneNumber: source.phoneNumber.toString(),
        federalDocument: source.federalDocument.toString(),
        password: source.password.toString(),
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetCustomerQueryResult,
      CustomerTypeormEntity,
      mappingFunction,
    );
  }
}
