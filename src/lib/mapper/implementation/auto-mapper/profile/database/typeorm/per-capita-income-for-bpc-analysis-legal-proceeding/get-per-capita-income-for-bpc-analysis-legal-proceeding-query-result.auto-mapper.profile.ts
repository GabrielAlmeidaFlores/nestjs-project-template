import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { PerCapitaIncomeForBpcAnalysisLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/per-capita-income-for-bpc-analysis-legal-proceeding.entity';
import { GetPerCapitaIncomeForBpcAnalysisLegalProceedingQueryResult } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/repository/per-capita-income-for-bpc-analysis/query/result/get-per-capita-income-for-bpc-analysis-legal-proceeding.query.result';

@Injectable()
export class GetPerCapitaIncomeForBpcAnalysisLegalProceedingQueryResultAutoMapperProfile {
  protected readonly _type =
    GetPerCapitaIncomeForBpcAnalysisLegalProceedingQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: PerCapitaIncomeForBpcAnalysisLegalProceedingTypeormEntity,
    ): GetPerCapitaIncomeForBpcAnalysisLegalProceedingQueryResult => {
      return GetPerCapitaIncomeForBpcAnalysisLegalProceedingQueryResult.build({
        ...source,
        id: new Guid(source.id),
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      PerCapitaIncomeForBpcAnalysisLegalProceedingTypeormEntity,
      GetPerCapitaIncomeForBpcAnalysisLegalProceedingQueryResult,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetPerCapitaIncomeForBpcAnalysisLegalProceedingQueryResult,
    ): PerCapitaIncomeForBpcAnalysisLegalProceedingTypeormEntity => {
      return PerCapitaIncomeForBpcAnalysisLegalProceedingTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        perCapitaIncomeForBpcAnalysis: undefined,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetPerCapitaIncomeForBpcAnalysisLegalProceedingQueryResult,
      PerCapitaIncomeForBpcAnalysisLegalProceedingTypeormEntity,
      mappingFunction,
    );
  }
}
