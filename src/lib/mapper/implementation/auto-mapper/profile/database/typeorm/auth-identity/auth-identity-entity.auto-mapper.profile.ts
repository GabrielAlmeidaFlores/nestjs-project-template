import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { AdminTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/admin.typeorm.entity';
import { AuthIdentityTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/auth-identity.typeorm.entity';
import { CustomerTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer.typeorm.entity';
import { SupportAttendantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/support-attendant.typeorm.entity';
import { AdminId } from '@module/admin/account/domain/schema/entity/admin/value-object/admin-id/admin-id.value-object';
import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import { SupportAttendantId } from '@module/customer/service-desk/domain/schema/entity/support-attendant/value-object/support-attendant-id/support-attendant-id.value-object';
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
      let supportAttendant: SupportAttendantId | null = null;

      if (source.customer?.id !== undefined) {
        customer = new CustomerId(source.customer.id);
      }

      if (source.admin?.id !== undefined) {
        admin = new AdminId(source.admin.id);
      }

      if (source.supportAttendant?.id !== undefined) {
        supportAttendant = new SupportAttendantId(source.supportAttendant.id);
      }

      return new AuthIdentityEntity({
        id: new AuthIdentityId(source.id),
        email: new Email(source.email),
        federalDocument:
          source.federalDocument !== null
            ? new FederalDocument(source.federalDocument)
            : null,
        password: new HashedPassword(source.password),
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
      let supportAttendant: SupportAttendantTypeormEntity | undefined =
        undefined;

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

      if (source.supportAttendant) {
        supportAttendant = {
          id: source.supportAttendant.toString(),
        } as SupportAttendantTypeormEntity;
      }

      return AuthIdentityTypeormEntity.build({
        id: source.id.toString(),
        email: source.email.toString(),
        federalDocument: source.federalDocument
          ? source.federalDocument.toString()
          : null,
        password: source.password.toString(),
        authenticatorAppSecret: source.authenticatorAppSecret,
        isActive: source.isActive,
        mustChangePassword: source.mustChangePassword,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
        customer,
        admin,
        supportAttendant,
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
