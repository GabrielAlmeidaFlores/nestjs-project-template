import * as core from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { AuthIdentityTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/auth-identity.typeorm.entity';
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
    const convert = (
      source: AuthIdentityTypeormEntity,
    ): GetAuthIdentityWithRelationsQueryResult =>
      GetAuthIdentityWithRelationsQueryResult.build({
        id: new AuthIdentityId(source.id),
        email: new Email(source.email),
        password: new HashedPassword(source.password),
        isActive: source.isActive,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });

    core.createMap(
      this.mapper,
      AuthIdentityTypeormEntity,
      GetAuthIdentityWithRelationsQueryResult,
      core.constructUsing(convert),
    );
  }

  private mapQueryResultToOrmEntity(): void {
    const convert = (
      source: GetAuthIdentityWithRelationsQueryResult,
    ): AuthIdentityTypeormEntity =>
      AuthIdentityTypeormEntity.build({
        id: source.id.toString(),
        email: source.email.toString(),
        password: source.password.toString(),
        isActive: source.isActive,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });

    core.createMap(
      this.mapper,
      GetAuthIdentityWithRelationsQueryResult,
      AuthIdentityTypeormEntity,
      core.constructUsing(convert),
    );
  }
}
