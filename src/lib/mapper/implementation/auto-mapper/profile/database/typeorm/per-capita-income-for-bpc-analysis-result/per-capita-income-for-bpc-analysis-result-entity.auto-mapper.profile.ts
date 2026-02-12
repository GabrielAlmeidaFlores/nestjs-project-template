import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { PerCapitaIncomeForBpcAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/per-capita-income-for-bpc-analysis-result.typeorm.entity';
import { PerCapitaIncomeForBpcAnalysisResultEntity } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-result/per-capita-income-for-bpc-analysis-result.entity';
import { PerCapitaIncomeForBpcAnalysisResultId } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-result/value-object/per-capita-income-for-bpc-analysis-result-id/per-capita-income-for-bpc-analysis-result-id.value-object';

@Injectable()
export class PerCapitaIncomeForBpcAnalysisResultEntityAutoMapperProfile {
  protected readonly _type =
    PerCapitaIncomeForBpcAnalysisResultEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: PerCapitaIncomeForBpcAnalysisResultTypeormEntity,
    ): PerCapitaIncomeForBpcAnalysisResultEntity => {
      return new PerCapitaIncomeForBpcAnalysisResultEntity({
        ...source,
        id: new PerCapitaIncomeForBpcAnalysisResultId(source.id),
        completeAnalysis: source.perCapitaIncomeForBpcCompleteAnalysis,
        simplifiedAnalysis: source.perCapitaIncomeForBpcSimplifiedAnalysis,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      PerCapitaIncomeForBpcAnalysisResultTypeormEntity,
      PerCapitaIncomeForBpcAnalysisResultEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: PerCapitaIncomeForBpcAnalysisResultEntity,
    ): PerCapitaIncomeForBpcAnalysisResultTypeormEntity => {
      const result = PerCapitaIncomeForBpcAnalysisResultTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        perCapitaIncomeForBpcCompleteAnalysis: source.completeAnalysis,
        perCapitaIncomeForBpcSimplifiedAnalysis: source.simplifiedAnalysis,
      });

      return result;
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      PerCapitaIncomeForBpcAnalysisResultEntity,
      PerCapitaIncomeForBpcAnalysisResultTypeormEntity,
      mappingFunction,
    );
  }
}
