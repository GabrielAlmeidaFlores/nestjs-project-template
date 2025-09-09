import { createMap, Mapper, constructUsing } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { PhoneNumber } from '@core/domain/schema/value-object/phone-number/phone-number.value-object';
import { CustomerTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer.typeorm.entity';
import { GetCustomerQueryResult } from '@module/customer/auth/domain/repository/customer/query/result/get-customer.query.result';
import { CustomerId } from '@module/customer/auth/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';

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
        phoneNumber: new PhoneNumber(source.phoneNumber),
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
        phoneNumber: source.phoneNumber.toString(),
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
