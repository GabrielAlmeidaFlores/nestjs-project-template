import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { StateCodeEnum } from '@core/domain/schema/enum/state-code.enum';
import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { PostalCode } from '@core/domain/schema/value-object/postal-code/postal-code.value-object';
import { AuthIdentityTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/auth-identity.typeorm.entity';
import { CustomerAddressTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer-address.typeorm.entity';
import { CustomerTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { CustomerEntity } from '@module/customer/account/domain/schema/entity/customer/customer.entity';
import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import { CustomerAddressEntity } from '@module/customer/account/domain/schema/entity/customer-address/customer-address.entity';
import { GetAuthIdentityWithRelationsQueryResult } from '@module/generic/auth-identity/domain/repository/auth-identity/query/result/get-auth-identity-with-relations.query.result';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import { HashedPassword } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/hashed-password/hashed-password.value-object';

@Injectable()
export class GetAuthIdentityWithRelationsQueryResultAutoMapperProfile {
  protected readonly _type =
    GetAuthIdentityWithRelationsQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
    this.mapQueryResultToOrmEntity();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToDomainEntity = (
      source: AuthIdentityTypeormEntity,
    ): GetAuthIdentityWithRelationsQueryResult => {
      if (!source.customer?.customerAddress) {
        throw new IncompleteSourceDataForMappingError({
          sourceClass: AuthIdentityTypeormEntity.name,
          destinationClass: GetAuthIdentityWithRelationsQueryResult.name,
        });
      }

      const customerAddress = source.customer.customerAddress;
      const {
        postalCode,
        stateCode,
        city,
        neighborhood,
        street,
        addressNumber,
        createdAt,
        updatedAt,
        deletedAt,
      } = customerAddress;

      let parsedStateCode: StateCodeEnum;
      if (
        stateCode &&
        Object.values(StateCodeEnum).includes(stateCode as StateCodeEnum)
      ) {
        parsedStateCode = stateCode as StateCodeEnum;
      } else {
        throw new Error(`Invalid stateCode value: ${stateCode}`);
      }

      const customer = new CustomerEntity({
        id: new CustomerId(source.customer.id),
        name: source.customer.name,
        profilePicture: source.customer.profilePicture ?? null,
        customerAddress: new CustomerAddressEntity({
          postalCode: new PostalCode(postalCode),
          stateCode: parsedStateCode,
          city,
          neighborhood,
          street,
          addressNumber: Number(addressNumber),
          createdAt,
          updatedAt,
          deletedAt,
        }),
        createdAt: source.customer.createdAt,
        updatedAt: source.customer.updatedAt,
        deletedAt: source.customer.deletedAt,
      });

      return GetAuthIdentityWithRelationsQueryResult.build({
        ...source,
        id: new AuthIdentityId(source.id),
        federalDocument: new FederalDocument(source.federalDocument),
        email: new Email(source.email),
        password: new HashedPassword(source.password),
        customer,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      AuthIdentityTypeormEntity,
      GetAuthIdentityWithRelationsQueryResult,
      mappingFunction,
    );
  }

  private mapQueryResultToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetAuthIdentityWithRelationsQueryResult,
    ): AuthIdentityTypeormEntity => {
      const customerAddress = source.customer.customerAddress;

      const customerAddressOrm = CustomerAddressTypeormEntity.build({
        id: customerAddress.id.toString(),
        postalCode: customerAddress.postalCode.toString(),
        stateCode: customerAddress.stateCode,
        city: customerAddress.city,
        neighborhood: customerAddress.neighborhood,
        street: customerAddress.street,
        addressNumber: customerAddress.addressNumber.toString(),
        createdAt: customerAddress.createdAt,
        updatedAt: customerAddress.updatedAt,
        deletedAt: customerAddress.deletedAt,
      });

      const customerOrm = CustomerTypeormEntity.build({
        id: source.customer.id.toString(),
        name: source.customer.name,
        profilePicture: source.customer.profilePicture,
        createdAt: source.customer.createdAt,
        updatedAt: source.customer.updatedAt,
        deletedAt: source.customer.deletedAt,
        customerAddress: customerAddressOrm,
      });

      return AuthIdentityTypeormEntity.build({
        id: source.id.toString(),
        email: source.email.toString(),
        federalDocument: source.federalDocument.toString(),
        password: source.password.toString(),
        authenticatorAppSecret: source.authenticatorAppSecret,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
        customer: customerOrm,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetAuthIdentityWithRelationsQueryResult,
      AuthIdentityTypeormEntity,
      mappingFunction,
    );
  }
}
