import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { GeneralUrbanRetirementGrantResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-grant-result.typeorm.entity';
import { GetGeneralUrbanRetirementGrantResultQueryResult } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/repository/general-urban-retirement-grant-result/query/result/get-general-urban-retirement-grant-result.query.result';
import { GeneralUrbanRetirementGrantResultId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-result/value-object/general-urban-retirement-grant-result-id.value-object';

@Injectable()
export class GetGeneralUrbanRetirementGrantResultQueryResultAutoMapperProfile {
  protected readonly _type =
    GetGeneralUrbanRetirementGrantResultQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
    this.mapQueryResultToOrmEntity();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: GeneralUrbanRetirementGrantResultTypeormEntity,
    ): GetGeneralUrbanRetirementGrantResultQueryResult => {
      return GetGeneralUrbanRetirementGrantResultQueryResult.build({
        ...source,
        id: new GeneralUrbanRetirementGrantResultId(source.id),
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToQueryResult);

    createMap(
      this.mapper,
      GeneralUrbanRetirementGrantResultTypeormEntity,
      GetGeneralUrbanRetirementGrantResultQueryResult,
      mappingFunction,
    );
  }

  private mapQueryResultToOrmEntity(): void {
    const convertQueryResultToOrmEntity = (
      source: GetGeneralUrbanRetirementGrantResultQueryResult,
    ): GeneralUrbanRetirementGrantResultTypeormEntity => {
      return GeneralUrbanRetirementGrantResultTypeormEntity.build({
        ...source,
        id: source.id.toString(),
      });
    };

    const mappingFunction = constructUsing(convertQueryResultToOrmEntity);

    createMap(
      this.mapper,
      GetGeneralUrbanRetirementGrantResultQueryResult,
      GeneralUrbanRetirementGrantResultTypeormEntity,
      mappingFunction,
    );
  }
}
