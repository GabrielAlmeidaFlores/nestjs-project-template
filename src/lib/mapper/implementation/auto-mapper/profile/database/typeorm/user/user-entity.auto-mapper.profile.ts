import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import { UserTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/user.typeorm.entity';
import { GetUserQueryResult } from '@module/social/user/domain/repository/user/query/result/get-user.query.result';
import { UserEntity } from '@module/social/user/domain/schema/entity/user/user.entity';
import { UserId } from '@module/social/user/domain/schema/entity/user/value-object/user-id/user-id.value-object';

@Injectable()
export class UserEntityAutoMapperProfile {
  protected readonly _type = UserEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convert = (source: UserTypeormEntity): UserEntity =>
      new UserEntity({
        id: new UserId(source.id),
        authIdentityId: new AuthIdentityId(source.authIdentityId),
        name: source.name,
        username: source.username,
        bio: source.bio,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });

    createMap(
      this.mapper,
      UserTypeormEntity,
      UserEntity,
      constructUsing(convert),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convert = (source: UserEntity): UserTypeormEntity =>
      UserTypeormEntity.build({
        id: source.id.toString(),
        authIdentityId: source.authIdentityId.toString(),
        name: source.name,
        username: source.username,
        bio: source.bio,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });

    createMap(
      this.mapper,
      UserEntity,
      UserTypeormEntity,
      constructUsing(convert),
    );
  }

  private mapOrmEntityToQueryResult(): void {
    const convert = (source: UserTypeormEntity): GetUserQueryResult =>
      GetUserQueryResult.build({
        id: new UserId(source.id),
        authIdentityId: new AuthIdentityId(source.authIdentityId),
        name: source.name,
        username: source.username,
        bio: source.bio,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });

    createMap(
      this.mapper,
      UserTypeormEntity,
      GetUserQueryResult,
      constructUsing(convert),
    );
  }
}
