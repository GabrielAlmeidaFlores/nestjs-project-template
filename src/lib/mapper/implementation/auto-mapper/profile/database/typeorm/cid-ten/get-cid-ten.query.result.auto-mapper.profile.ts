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
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: CidTenTypeormEntity,
    ): GetCidTenQueryResult => {
      return GetCidTenQueryResult.build({
        id: new CidTenId(source.id),
        code: source.code,
        description: source.description,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToQueryResult);

    createMap(
      this.mapper,
      CidTenTypeormEntity,
      GetCidTenQueryResult,
      mappingFunction,
    );
  }
}
