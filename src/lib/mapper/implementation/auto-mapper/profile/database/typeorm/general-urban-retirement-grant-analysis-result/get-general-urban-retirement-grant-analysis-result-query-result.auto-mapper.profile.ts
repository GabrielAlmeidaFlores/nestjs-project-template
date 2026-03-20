import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { GeneralUrbanRetirementGrantAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-grant-analysis-result.typeorm.entity';
import { GeneralUrbanRetirementGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-grant.typeorm.entity';
import { GetGeneralUrbanRetirementGrantAnalysisResultQueryResult } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/repository/general-urban-retirement-grant-analysis-result/query/result/get-general-urban-retirement-grant-analysis-result.query.result';
import { GeneralUrbanRetirementGrantEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant/general-urban-retirement-grant.entity';
import { GeneralUrbanRetirementGrantAnalysisResultId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-analysis-result/value-object/general-urban-retirement-grant-analysis-result-id.value-object';

@Injectable()
export class GetGeneralUrbanRetirementGrantAnalysisResultQueryResultAutoMapperProfile {
  protected readonly _type =
    GetGeneralUrbanRetirementGrantAnalysisResultQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
    this.mapQueryResultToOrmEntity();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: GeneralUrbanRetirementGrantAnalysisResultTypeormEntity,
    ): GetGeneralUrbanRetirementGrantAnalysisResultQueryResult => {
      const generalUrbanRetirementGrant =
        source.generalUrbanRetirementGrant !== undefined &&
        source.generalUrbanRetirementGrant !== null
          ? this.mapper.map(
              source.generalUrbanRetirementGrant,
              GeneralUrbanRetirementGrantTypeormEntity,
              GeneralUrbanRetirementGrantEntity,
            )
          : null;

      return GetGeneralUrbanRetirementGrantAnalysisResultQueryResult.build({
        ...source,
        id: new GeneralUrbanRetirementGrantAnalysisResultId(source.id),
        response: source.response,
        generalUrbanRetirementGrant,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToQueryResult);

    createMap(
      this.mapper,
      GeneralUrbanRetirementGrantAnalysisResultTypeormEntity,
      GetGeneralUrbanRetirementGrantAnalysisResultQueryResult,
      mappingFunction,
    );
  }

  private mapQueryResultToOrmEntity(): void {
    const convertQueryResultToOrmEntity = (
      source: GetGeneralUrbanRetirementGrantAnalysisResultQueryResult,
    ): GeneralUrbanRetirementGrantAnalysisResultTypeormEntity => {
      return GeneralUrbanRetirementGrantAnalysisResultTypeormEntity.build({
        id: source.id.toString(),
        analysisType: source.analysisType ?? null,
        response: source.response ?? '',
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt ?? null,
      });
    };

    const mappingFunction = constructUsing(convertQueryResultToOrmEntity);

    createMap(
      this.mapper,
      GetGeneralUrbanRetirementGrantAnalysisResultQueryResult,
      GeneralUrbanRetirementGrantAnalysisResultTypeormEntity,
      mappingFunction,
    );
  }
}
