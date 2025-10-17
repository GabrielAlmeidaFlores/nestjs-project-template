import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { CustomerTermsAcceptanceTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer-terms-acceptance.typeorm.entity';
import { CustomerTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer.typeorm.entity';
import { CustomerTermsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer-terms.typeorm.entity';
import { GetCustomerQueryResult } from '@module/customer/account/domain/repository/customer/query/result/get-customer.query.result';
import { GetCustomerTermsQueryResult } from '@module/customer/account/domain/repository/customer-terms/query/result/get-customer-terms.query.result';
import { GetCustomerTermsAcceptanceQueryResult } from '@module/customer/account/domain/repository/customer-terms-acceptance/query/result/get-customer-terms-acceptance.query.result';
import { CustomerTermsAcceptanceId } from '@module/customer/account/domain/schema/entity/customer-terms-acceptance/value-object/organization-member-id/customer-terms-acceptance-id.value-object';

@Injectable()
export class GetCustomerTermsAcceptanceQueryResultAutoMapperProfile {
  protected readonly _type =
    GetCustomerTermsAcceptanceQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToDomainEntity = (
      source: CustomerTermsAcceptanceTypeormEntity,
    ): GetCustomerTermsAcceptanceQueryResult => {
      const customer = this.mapper.map(
        source.customer,
        CustomerTypeormEntity,
        GetCustomerQueryResult,
      );
      const terms = this.mapper.map(
        source.customerTerms,
        CustomerTermsTypeormEntity,
        GetCustomerTermsQueryResult,
      );

      return GetCustomerTermsAcceptanceQueryResult.build({
        ...source,
        id: new CustomerTermsAcceptanceId(source.id),
        customer,
        customerTerms: terms,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      CustomerTermsAcceptanceTypeormEntity,
      GetCustomerTermsAcceptanceQueryResult,
      mappingFunction,
    );
  }
}
