import * as core from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { AdminTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/admin.typeorm.entity';
import { AuthIdentityTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/auth-identity.typeorm.entity';
import { CustomerTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer.typeorm.entity';
import { SupportAttendantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/support-attendant.typeorm.entity';
import { GetAdminQueryResult } from '@module/admin/account/domain/repository/admin/query/result/get-admin.query.result';
import { GetCustomerQueryResult } from '@module/customer/account/domain/repository/customer/query/result/get-customer.query.result';
import { GetAuthIdentityWithRelationsQueryResult } from '@module/generic/auth-identity/domain/repository/auth-identity/query/result/get-auth-identity-with-relations.query.result';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import { HashedPassword } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/hashed-password/hashed-password.value-object';
import { GetSupportAttendantQueryResult } from '@module/support/account/domain/repository/support-attendant/query/result/get-support-attendant.query.result';
import { SupportAttendantId } from '@module/support/account/domain/schema/entity/support-attendant/value-object/support-attendant-id/support-attendant-id.value-object';

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

      const supportAttendant = source.supportAttendant
        ? GetSupportAttendantQueryResult.build({
            id: new SupportAttendantId(source.supportAttendant.id),
            name: source.supportAttendant.name,
            email: new Email(source.supportAttendant.email),
            supportType: source.supportAttendant.supportType,
            isActive: source.supportAttendant.isActive,
            createdAt: source.supportAttendant.createdAt,
            updatedAt: source.supportAttendant.updatedAt,
          })
        : null;

      return GetAuthIdentityWithRelationsQueryResult.build({
        ...source,
        id: new AuthIdentityId(source.id),
        federalDocument: new FederalDocument(source.federalDocument),
        email: new Email(source.email),
        password: new HashedPassword(source.password),
        customer,
        admin,
        supportAttendant,
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

      const supportAttendant = source.supportAttendant
        ? SupportAttendantTypeormEntity.build({
            id: source.supportAttendant.id.toString(),
            name: source.supportAttendant.name,
            email: source.supportAttendant.email.toString(),
            supportType: source.supportAttendant.supportType,
            isActive: source.supportAttendant.isActive,
            createdAt: source.supportAttendant.createdAt,
            updatedAt: source.supportAttendant.updatedAt,
            deletedAt: null,
          })
        : undefined;

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
        supportAttendant,
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
