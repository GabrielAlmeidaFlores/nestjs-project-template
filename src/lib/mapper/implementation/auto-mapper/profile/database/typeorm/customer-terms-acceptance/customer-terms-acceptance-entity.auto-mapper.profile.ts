import { constructUsing, createMap, Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { CustomerTermsAcceptanceTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer-terms-acceptance.typeorm.entity';
import { CustomerTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer.typeorm.entity';
import { TermsAndConditionsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/terms-and-conditions.typeorm.entity';
import { CustomerTermsAcceptanceEntity } from '@module/customer/account/domain/schema/entity/customer-terms-acceptance/customer-terms-acceptance.entity';
import { CustomerTermsAcceptanceId } from '@module/customer/account/domain/schema/entity/customer-terms-acceptance/value-object/organization-member-id/customer-terms-acceptance-id.value-object';
import { CustomerEntity } from '@module/customer/account/domain/schema/entity/customer/customer.entity';
import { TermsEntity } from '@module/customer/account/domain/schema/entity/terms/terms.entity';

@Injectable()
export class CustomerTermsAcceptanceEntityAutoMapperProfile {
  protected readonly _type =
    CustomerTermsAcceptanceEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: CustomerTermsAcceptanceTypeormEntity,
    ): CustomerTermsAcceptanceEntity => {
      const customer = this.mapper.map(
        source.customer,
        CustomerTypeormEntity,
        CustomerEntity,
      );
      const terms = this.mapper.map(
        source.terms,
        TermsAndConditionsTypeormEntity,
        TermsEntity,
      );

      return new CustomerTermsAcceptanceEntity({
        ...source,
        id: new CustomerTermsAcceptanceId(source.id),
        customer,
        terms,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      CustomerTermsAcceptanceTypeormEntity,
      CustomerTermsAcceptanceEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: CustomerTermsAcceptanceEntity,
    ): CustomerTermsAcceptanceTypeormEntity => {
      const customer = this.mapper.map(
        source.customer,
        CustomerEntity,
        CustomerTypeormEntity,
      );

      const terms = this.mapper.map(
        source.terms,
        TermsEntity,
        TermsAndConditionsTypeormEntity,
      );

      return CustomerTermsAcceptanceTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        customer,
        terms,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      CustomerTermsAcceptanceEntity,
      CustomerTermsAcceptanceTypeormEntity,
      mappingFunction,
    );
  }
}
