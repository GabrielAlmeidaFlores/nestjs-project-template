import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { PerCapitaIncomeForBpcAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/per-capita-income-for-bpc-analysis.typeorm.entity';
import { GetPerCapitaIncomeForBpcAnalysisQueryResult } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/repository/per-capita-income-for-bpc-analysis/query/result/get-per-capita-income-for-bpc-analysis.query.result';
import { PerCapitaIncomeForBpcAnalysisId } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis/value-object/per-capita-income-for-bpc-analysis-id/per-capita-income-for-bpc-analysis-id.value-object';

@Injectable()
export class GetPerCapitaIncomeForBpcAnalysisQueryResultAutoMapperProfile {
  protected readonly _type =
    GetPerCapitaIncomeForBpcAnalysisQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: PerCapitaIncomeForBpcAnalysisTypeormEntity,
    ): GetPerCapitaIncomeForBpcAnalysisQueryResult => {
      return GetPerCapitaIncomeForBpcAnalysisQueryResult.build({
        id: new PerCapitaIncomeForBpcAnalysisId(source.id),
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt ?? null,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      PerCapitaIncomeForBpcAnalysisTypeormEntity,
      GetPerCapitaIncomeForBpcAnalysisQueryResult,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetPerCapitaIncomeForBpcAnalysisQueryResult,
    ): PerCapitaIncomeForBpcAnalysisTypeormEntity => {
      return PerCapitaIncomeForBpcAnalysisTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        perCapitaIncomeForBpcAnalysisResult: undefined,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetPerCapitaIncomeForBpcAnalysisQueryResult,
      PerCapitaIncomeForBpcAnalysisTypeormEntity,
      mappingFunction,
    );
  }
}
