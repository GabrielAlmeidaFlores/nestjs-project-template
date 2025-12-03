import { createMap, Mapper, constructUsing } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { AdminTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/admin.typeorm.entity';
import { GetAdminQueryResult } from '@module/admin/account/domain/repository/admin/query/result/get-admin.query.result';
import { AdminId } from '@module/admin/account/domain/schema/entity/admin/value-object/admin-id/admin-id.value-object';

@Injectable()
export class GetAdminQueryResultAutoMapperProfile {
  protected readonly _type = GetAdminQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
    this.mapQueryResultToOrmEntity();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToDomainEntity = (
      source: AdminTypeormEntity,
    ): GetAdminQueryResult => {
      return GetAdminQueryResult.build({
        ...source,
        id: new AdminId(source.id),
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      AdminTypeormEntity,
      GetAdminQueryResult,
      mappingFunction,
    );
  }

  private mapQueryResultToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetAdminQueryResult,
    ): AdminTypeormEntity => {
      return AdminTypeormEntity.build({
        ...source,
        id: source.id.toString(),
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetAdminQueryResult,
      AdminTypeormEntity,
      mappingFunction,
    );
  }
}
