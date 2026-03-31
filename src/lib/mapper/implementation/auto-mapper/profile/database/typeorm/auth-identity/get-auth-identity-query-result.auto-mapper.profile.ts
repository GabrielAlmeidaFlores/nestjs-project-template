import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { AuthIdentityTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/auth-identity.typeorm.entity';
import { GetAuthIdentityQueryResult } from '@module/generic/auth-identity/domain/repository/auth-identity/query/result/get-auth-identity.query.result';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import { HashedPassword } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/hashed-password/hashed-password.value-object';

@Injectable()
export class GetAuthIdentityQueryResultAutoMapperProfile {
  protected readonly _type = GetAuthIdentityQueryResultAutoMapperProfile.name;

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
    ): GetAuthIdentityQueryResult => {
      return GetAuthIdentityQueryResult.build({
        ...source,
        id: new AuthIdentityId(source.id),
        federalDocument:
          source.federalDocument !== null
            ? new FederalDocument(source.federalDocument)
            : null,
        email: new Email(source.email),
        password: new HashedPassword(source.password),
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      AuthIdentityTypeormEntity,
      GetAuthIdentityQueryResult,
      mappingFunction,
    );
  }

  private mapQueryResultToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetAuthIdentityQueryResult,
    ): AuthIdentityTypeormEntity => {
      return AuthIdentityTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        email: source.email.toString(),
        federalDocument: source.federalDocument
          ? source.federalDocument.toString()
          : null,
        password: source.password.toString(),
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetAuthIdentityQueryResult,
      AuthIdentityTypeormEntity,
      mappingFunction,
    );
  }
}
