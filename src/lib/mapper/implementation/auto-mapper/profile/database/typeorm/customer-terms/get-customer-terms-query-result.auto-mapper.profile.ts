import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { CustomerTermsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer-terms.typeorm.entity';
import { GetCustomerTermsQueryResult } from '@module/customer/account/domain/repository/customer-terms/query/result/get-customer-terms.query.result';
import { CustomerTermsId } from '@module/customer/account/domain/schema/entity/customer-terms/value-object/customer-terms-id/customer-terms-id.value-object';

@Injectable()
export class GetCustomerTermsQueryResultAutoMapperProfile {
  protected readonly _type = GetCustomerTermsQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
    this.mapQueryResultToOrmEntity();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToDomainEntity = (
      source: CustomerTermsTypeormEntity,
    ): GetCustomerTermsQueryResult => {
      return GetCustomerTermsQueryResult.build({
        ...source,
        id: new CustomerTermsId(source.id),
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      CustomerTermsTypeormEntity,
      GetCustomerTermsQueryResult,
      mappingFunction,
    );
  }

  private mapQueryResultToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetCustomerTermsQueryResult,
    ): CustomerTermsTypeormEntity => {
      return CustomerTermsTypeormEntity.build({
        ...source,
        id: source.id.toString(),
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetCustomerTermsQueryResult,
      CustomerTermsTypeormEntity,
      mappingFunction,
    );
  }
}
