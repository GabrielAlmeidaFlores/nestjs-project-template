import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { AuthIdentityTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/auth-identity.typeorm.entity';
import { AuthIdentityEntity } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/auth-identity.entity';
import { AuthIdentityEntityPropsInputModel } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/auth-identity.entity.props.input.model';
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
    const convert = (source: AuthIdentityTypeormEntity): AuthIdentityEntity =>
      new AuthIdentityEntity(
        AuthIdentityEntityPropsInputModel.build({
          id: new AuthIdentityId(source.id),
          email: new Email(source.email),
          password: new HashedPassword(source.password),
          isActive: source.isActive,
          createdAt: source.createdAt,
          updatedAt: source.updatedAt,
          deletedAt: source.deletedAt,
        }),
      );

    createMap(
      this.mapper,
      AuthIdentityTypeormEntity,
      AuthIdentityEntity,
      constructUsing(convert),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convert = (source: AuthIdentityEntity): AuthIdentityTypeormEntity =>
      AuthIdentityTypeormEntity.build({
        id: source.id.toString(),
        email: source.email.toString(),
        password: source.password.toString(),
        isActive: source.isActive,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });

    createMap(
      this.mapper,
      AuthIdentityEntity,
      AuthIdentityTypeormEntity,
      constructUsing(convert),
    );
  }
}
