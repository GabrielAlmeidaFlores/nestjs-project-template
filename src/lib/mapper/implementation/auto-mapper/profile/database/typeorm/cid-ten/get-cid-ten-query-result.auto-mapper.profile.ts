import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { CidTenTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/cid-ten.typeorm.entity';
import { GetCidTenQueryResult } from '@module/customer/analysis-tool/domain/repository/cid-ten/query/result/get-cid-ten.query.result';
import { CidTenId } from '@module/customer/analysis-tool/domain/schema/entity/cid-ten/value-object/cid-ten-id.value-object';

@Injectable()
export class GetCidTenQueryResultAutoMapperProfile {
  protected readonly _type = GetCidTenQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: CidTenTypeormEntity,
    ): GetCidTenQueryResult => {
      return GetCidTenQueryResult.build({
        ...source,
        id: new CidTenId(source.id),
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      CidTenTypeormEntity,
      GetCidTenQueryResult,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetCidTenQueryResult,
    ): CidTenTypeormEntity => {
      return CidTenTypeormEntity.build({
        ...source,
        id: source.id.toString(),
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetCidTenQueryResult,
      CidTenTypeormEntity,
      mappingFunction,
    );
  }
}
