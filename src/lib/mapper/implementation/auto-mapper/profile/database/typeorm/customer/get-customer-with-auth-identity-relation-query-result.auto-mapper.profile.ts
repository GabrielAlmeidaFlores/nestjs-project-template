import { createMap, Mapper, constructUsing } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { PhoneNumber } from '@core/domain/schema/value-object/phone-number/phone-number.value-object';
import { AuthIdentityTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/auth-identity.typeorm.entity';
import { CustomerTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer.typeorm.entity';
import { GetCustomerWithAuthIdentityRelationQueryResult } from '@module/customer/account/domain/repository/customer/query/result/get-customer-with-auth-identity-relation.query.result';
import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import { GetAuthIdentityQueryResult } from '@module/generic/auth-identity/domain/repository/auth-identity/query/result/get-auth-identity.query.result';

@Injectable()
export class GetCustomerWithAuthIdentityRelationQueryResultAutoMapperProfile {
  protected readonly _type =
    GetCustomerWithAuthIdentityRelationQueryResultAutoMapperProfile.name;

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
    ): GetCustomerWithAuthIdentityRelationQueryResult => {
      const authIdentity = this.mapper.map(
        source.authIdentity,
        AuthIdentityTypeormEntity,
        GetAuthIdentityQueryResult,
      );

      return GetCustomerWithAuthIdentityRelationQueryResult.build({
        ...source,
        id: new CustomerId(source.id),
        phoneNumber: new PhoneNumber(source.phoneNumber),
        authIdentity,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      CustomerTypeormEntity,
      GetCustomerWithAuthIdentityRelationQueryResult,
      mappingFunction,
    );
  }

  private mapQueryResultToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetCustomerWithAuthIdentityRelationQueryResult,
    ): CustomerTypeormEntity => {
      const authIdentity = this.mapper.map(
        source.authIdentity,
        GetAuthIdentityQueryResult,
        AuthIdentityTypeormEntity,
      );

      return CustomerTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        phoneNumber: source.phoneNumber.toString(),
        authIdentity,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetCustomerWithAuthIdentityRelationQueryResult,
      CustomerTypeormEntity,
      mappingFunction,
    );
  }
}
