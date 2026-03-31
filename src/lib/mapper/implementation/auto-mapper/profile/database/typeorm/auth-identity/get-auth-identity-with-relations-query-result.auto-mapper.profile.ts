import * as core from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { AdminTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/admin.typeorm.entity';
import { AuthIdentityTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/auth-identity.typeorm.entity';
import { CustomerTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer.typeorm.entity';
import { GetAdminQueryResult } from '@module/admin/account/domain/repository/admin/query/result/get-admin.query.result';
import { GetCustomerQueryResult } from '@module/customer/account/domain/repository/customer/query/result/get-customer.query.result';
import { GetAuthIdentityWithRelationsQueryResult } from '@module/generic/auth-identity/domain/repository/auth-identity/query/result/get-auth-identity-with-relations.query.result';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import { HashedPassword } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/hashed-password/hashed-password.value-object';

@Injectable()
export class GetAuthIdentityWithRelationsQueryResultAutoMapperProfile {
  protected readonly _type =
    GetAuthIdentityWithRelationsQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: core.Mapper) {
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
      const customer = this.mapper.map(
        source.customer,
        CustomerTypeormEntity,
        GetCustomerQueryResult,
      );

      const admin = this.mapper.map(
        source.admin,
        AdminTypeormEntity,
        GetAdminQueryResult,
      );

      return GetAuthIdentityWithRelationsQueryResult.build({
        ...source,
        id: new AuthIdentityId(source.id),
        federalDocument: new FederalDocument(source.federalDocument),
        email: new Email(source.email),
        password: new HashedPassword(source.password),
        customer,
        admin,
      });
    };

    const mappingFunction = core.constructUsing(convertOrmEntityToDomainEntity);

    core.createMap(
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
      const customer = this.mapper.map(
        source.customer,
        GetCustomerQueryResult,
        CustomerTypeormEntity,
      );

      const admin = this.mapper.map(
        source.admin,
        GetAdminQueryResult,
        AdminTypeormEntity,
      );

      return AuthIdentityTypeormEntity.build({
        id: source.id.toString(),
        email: source.email.toString(),
        federalDocument: source.federalDocument.toString(),
        password: source.password.toString(),
        authenticatorAppSecret: source.authenticatorAppSecret,
        isActive: source.isActive,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
        customer,
        admin,
      });
    };

    const mappingFunction = core.constructUsing(convertDomainEntityToOrmEntity);

    core.createMap(
      this.mapper,
      GetAuthIdentityWithRelationsQueryResult,
      AuthIdentityTypeormEntity,
      mappingFunction,
    );
  }
}
