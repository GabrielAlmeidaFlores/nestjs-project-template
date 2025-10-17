import { constructUsing, createMap, Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { CustomerTermsAcceptanceTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer-terms-acceptance.typeorm.entity';
import { CustomerTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer.typeorm.entity';
import { CustomerTermsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer-terms.typeorm.entity';
import { CustomerEntity } from '@module/customer/account/domain/schema/entity/customer/customer.entity';
import { CustomerTermsEntity } from '@module/customer/account/domain/schema/entity/customer-terms/customer-terms.entity';
import { CustomerTermsAcceptanceEntity } from '@module/customer/account/domain/schema/entity/customer-terms-acceptance/customer-terms-acceptance.entity';
import { CustomerTermsAcceptanceId } from '@module/customer/account/domain/schema/entity/customer-terms-acceptance/value-object/organization-member-id/customer-terms-acceptance-id.value-object';

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
      const customerTerms = this.mapper.map(
        source.customerTerms,
        CustomerTermsTypeormEntity,
        CustomerTermsEntity,
      );

      return new CustomerTermsAcceptanceEntity({
        ...source,
        id: new CustomerTermsAcceptanceId(source.id),
        customer,
        customerTerms,
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

      const customerTerms = this.mapper.map(
        source.customerTerms,
        CustomerTermsEntity,
        CustomerTermsTypeormEntity,
      );

      return CustomerTermsAcceptanceTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        customer,
        customerTerms,
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
