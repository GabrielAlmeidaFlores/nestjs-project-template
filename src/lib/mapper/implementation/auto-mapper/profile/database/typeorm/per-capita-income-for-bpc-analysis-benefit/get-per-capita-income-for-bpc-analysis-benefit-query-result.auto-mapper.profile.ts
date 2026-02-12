import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { PerCapitaIncomeForBpcAnalysisBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/per-capita-income-for-bpc-analysis-benefit.entity';
import { GetPerCapitaIncomeForBpcAnalysisBenefitQueryResult } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/repository/per-capita-income-for-bpc-analysis/query/result/get-per-capita-income-for-bpc-analysis-benefit.query.result';

@Injectable()
export class GetPerCapitaIncomeForBpcAnalysisBenefitQueryResultAutoMapperProfile {
  protected readonly _type =
    GetPerCapitaIncomeForBpcAnalysisBenefitQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: PerCapitaIncomeForBpcAnalysisBenefitTypeormEntity,
    ): GetPerCapitaIncomeForBpcAnalysisBenefitQueryResult => {
      return GetPerCapitaIncomeForBpcAnalysisBenefitQueryResult.build({
        ...source,
        id: new Guid(source.id),
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      PerCapitaIncomeForBpcAnalysisBenefitTypeormEntity,
      GetPerCapitaIncomeForBpcAnalysisBenefitQueryResult,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetPerCapitaIncomeForBpcAnalysisBenefitQueryResult,
    ): PerCapitaIncomeForBpcAnalysisBenefitTypeormEntity => {
      return PerCapitaIncomeForBpcAnalysisBenefitTypeormEntity.build({
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
      GetPerCapitaIncomeForBpcAnalysisBenefitQueryResult,
      PerCapitaIncomeForBpcAnalysisBenefitTypeormEntity,
      mappingFunction,
    );
  }
}
