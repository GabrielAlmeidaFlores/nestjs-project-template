import { createMap, Mapper, constructUsing } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { PostalCode } from '@core/domain/schema/value-object/postal-code/postal-code.value-object';
import { CustomerAddressTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer-address.typeorm.entity';
import { GetCustomerAddressQueryResult } from '@module/customer/account/domain/repository/customer-address/query/result/get-customer-address.query.result';
import { StateCodeEnum } from '@module/customer/account/domain/schema/entity/customer-address/enum/state-code.enum';

@Injectable()
export class GetCustomerAddressQueryResultAutoMapperProfile {
  protected readonly _type =
    GetCustomerAddressQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
    this.mapQueryResultToOrmEntity();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToDomainEntity = (
      source: CustomerAddressTypeormEntity,
    ): GetCustomerAddressQueryResult => {
      return GetCustomerAddressQueryResult.build({
        ...source,
        id: new Guid(source.id),
        postalCode: new PostalCode(source.postalCode),
        stateCode: source.stateCode as StateCodeEnum,
        addressNumber: Number(source.addressNumber),
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      CustomerAddressTypeormEntity,
      GetCustomerAddressQueryResult,
      mappingFunction,
    );
  }

  private mapQueryResultToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetCustomerAddressQueryResult,
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
      GetCustomerAddressQueryResult,
      CustomerAddressTypeormEntity,
      mappingFunction,
    );
  }
}
