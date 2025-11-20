import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { AdminTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/admin.typeorm.entity';
import { AuthIdentityTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/auth-identity.typeorm.entity';
import { CustomerTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer.typeorm.entity';
import { AdminId } from '@module/admin/account/domain/schema/entity/admin/value-object/admin-id/admin-id.value-object';
import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import { AuthIdentityEntity } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/auth-identity.entity';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import { HashedPassword } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/hashed-password/hashed-password.value-object';

@Injectable()
export class AuthIdentityEntityAutoMapperProfile {
  protected readonly _type = AuthIdentityEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: AuthIdentityTypeormEntity,
    ): AuthIdentityEntity => {
      let customer: CustomerId | null = null;
      let admin: AdminId | null = null;

      if (source.customer?.id !== undefined) {
        customer = new CustomerId(source.customer.id);
      }

      if (source.admin?.id !== undefined) {
        admin = new AdminId(source.admin.id);
      }

      return new AuthIdentityEntity({
        ...source,
        id: new AuthIdentityId(source.id),
        email: new Email(source.email),
        federalDocument: new FederalDocument(source.federalDocument),
        password: new HashedPassword(source.password),
        customer,
        admin,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      AuthIdentityTypeormEntity,
      AuthIdentityEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: AuthIdentityEntity,
    ): AuthIdentityTypeormEntity => {
      let customer: CustomerTypeormEntity | undefined = undefined;
      let admin: AdminTypeormEntity | undefined = undefined;

      if (source.customer) {
        customer = {
          id: source.customer.toString(),
        } as CustomerTypeormEntity;
      }

      if (source.admin) {
        admin = {
          id: source.admin.toString(),
        } as AdminTypeormEntity;
      }

      return AuthIdentityTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        email: source.email.toString(),
        federalDocument: source.federalDocument.toString(),
        password: source.password.toString(),
        customer,
        admin,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      AuthIdentityEntity,
      AuthIdentityTypeormEntity,
      mappingFunction,
    );
  }
}
