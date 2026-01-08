import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { RetirementPlanningRgpsAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rgps-analysis-result.typeorm.entity';
import { RetirementPlanningRgpsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rgps.typeorm.entity';
import { GetRetirementPlanningRgpsAnalysisResultQueryResult } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rgps-analysis-result/query/result/get-retirement-planning-rgps-analysis-result.query.result';
import { RetirementPlanningRgpsEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps/retirement-planning-rgps.entity';
import { RetirementPlanningRgpsAnalysisResultId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-analysis-result/value-object/retirement-planning-rgps-analysis-result-id.value-object';

@Injectable()
export class GetRetirementPlanningRgpsAnalysisResultQueryResultAutoMapperProfile {
  protected readonly _type =
    GetRetirementPlanningRgpsAnalysisResultQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
    this.mapQueryResultToOrmEntity();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: RetirementPlanningRgpsAnalysisResultTypeormEntity,
    ): GetRetirementPlanningRgpsAnalysisResultQueryResult => {
      const retirementPlanningRgps = this.mapper.map(
        source.retirementPlanningRgps,
        RetirementPlanningRgpsTypeormEntity,
        RetirementPlanningRgpsEntity,
      );

      return GetRetirementPlanningRgpsAnalysisResultQueryResult.build({
        ...source,
        id: new RetirementPlanningRgpsAnalysisResultId(source.id),
        retirementPlanningRgps,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToQueryResult);

    createMap(
      this.mapper,
      RetirementPlanningRgpsAnalysisResultTypeormEntity,
      GetRetirementPlanningRgpsAnalysisResultQueryResult,
      mappingFunction,
    );
  }

  private mapQueryResultToOrmEntity(): void {
    const convertQueryResultToOrmEntity = (
      source: GetRetirementPlanningRgpsAnalysisResultQueryResult,
    ): RetirementPlanningRgpsAnalysisResultTypeormEntity => {
      return RetirementPlanningRgpsAnalysisResultTypeormEntity.build({
        id: source.id.toString(),
        analysisType: source.analysisType ?? '',
        response: source.response ?? '',
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt ?? null,
      });
    };

    const mappingFunction = constructUsing(convertQueryResultToOrmEntity);

    createMap(
      this.mapper,
      GetRetirementPlanningRgpsAnalysisResultQueryResult,
      RetirementPlanningRgpsAnalysisResultTypeormEntity,
      mappingFunction,
    );
  }
}
