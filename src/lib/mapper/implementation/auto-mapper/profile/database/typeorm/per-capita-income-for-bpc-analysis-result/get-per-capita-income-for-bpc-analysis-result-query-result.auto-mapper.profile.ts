import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { PerCapitaIncomeForBpcAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/per-capita-income-for-bpc-analysis-result.typeorm.entity';
import { GetPerCapitaIncomeForBpcAnalysisResultQueryResult } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/repository/per-capita-income-for-bpc-analysis-result/query/result/get-per-capita-income-for-bpc-analysis-result.query.result';
import { PerCapitaIncomeForBpcAnalysisResultId } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-result/value-object/per-capita-income-for-bpc-analysis-result-id/per-capita-income-for-bpc-analysis-result-id.value-object';

@Injectable()
export class GetPerCapitaIncomeForBpcAnalysisResultQueryResultAutoMapperProfile {
  protected readonly _type =
    GetPerCapitaIncomeForBpcAnalysisResultQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
    this.mapQueryResultToOrmEntity();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: PerCapitaIncomeForBpcAnalysisResultTypeormEntity,
    ): GetPerCapitaIncomeForBpcAnalysisResultQueryResult => {
      return GetPerCapitaIncomeForBpcAnalysisResultQueryResult.build({
        id: new PerCapitaIncomeForBpcAnalysisResultId(source.id),
        completeAnalysis: source.perCapitaIncomeForBpcCompleteAnalysis,
        simplifiedAnalysis: source.perCapitaIncomeForBpcSimplifiedAnalysis,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt ?? null,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToQueryResult);

    createMap(
      this.mapper,
      PerCapitaIncomeForBpcAnalysisResultTypeormEntity,
      GetPerCapitaIncomeForBpcAnalysisResultQueryResult,
      mappingFunction,
    );
  }

  private mapQueryResultToOrmEntity(): void {
    const convertQueryResultToOrmEntity = (
      source: GetPerCapitaIncomeForBpcAnalysisResultQueryResult,
    ): PerCapitaIncomeForBpcAnalysisResultTypeormEntity => {
      return PerCapitaIncomeForBpcAnalysisResultTypeormEntity.build({
        id: source.id.toString(),
        perCapitaIncomeForBpcCompleteAnalysis: source.completeAnalysis,
        perCapitaIncomeForBpcSimplifiedAnalysis: source.simplifiedAnalysis,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    const mappingFunction = constructUsing(convertQueryResultToOrmEntity);

    createMap(
      this.mapper,
      GetPerCapitaIncomeForBpcAnalysisResultQueryResult,
      PerCapitaIncomeForBpcAnalysisResultTypeormEntity,
      mappingFunction,
    );
  }
}
