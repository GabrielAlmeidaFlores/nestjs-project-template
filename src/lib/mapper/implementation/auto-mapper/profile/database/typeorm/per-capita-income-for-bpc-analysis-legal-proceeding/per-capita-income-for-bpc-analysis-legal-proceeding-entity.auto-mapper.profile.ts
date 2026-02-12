import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { PerCapitaIncomeForBpcAnalysisLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/per-capita-income-for-bpc-analysis-legal-proceeding.entity';
import { PerCapitaIncomeForBpcAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/per-capita-income-for-bpc-analysis.typeorm.entity';
import { PerCapitaIncomeForBpcAnalysisEntity } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis/per-capita-income-for-bpc-analysis.entity';
import { PerCapitaIncomeForBpcAnalysisLegalProceedingEntity } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-legal-proceeding/per-capita-income-for-bpc-analysis-legal-proceeding.entity';
import { PerCapitaIncomeForBpcAnalysisLegalProceedingId } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-legal-proceeding/value-object/per-capita-income-for-bpc-analysis-legal-proceeding-id/per-capita-income-for-bpc-analysis-legal-proceeding-id.value-object';

@Injectable()
export class PerCapitaIncomeForBpcAnalysisLegalProceedingEntityAutoMapperProfile {
  protected readonly _type =
    PerCapitaIncomeForBpcAnalysisLegalProceedingEntityAutoMapperProfile.name;

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
    ): PerCapitaIncomeForBpcAnalysisLegalProceedingEntity => {
      const perCapitaIncomeForBpcAnalysis = this.mapper.map(
        source.perCapitaIncomeForBpcAnalysis,
        PerCapitaIncomeForBpcAnalysisTypeormEntity,
        PerCapitaIncomeForBpcAnalysisEntity,
      );

      return new PerCapitaIncomeForBpcAnalysisLegalProceedingEntity({
        ...source,
        id: new PerCapitaIncomeForBpcAnalysisLegalProceedingId(source.id),
        perCapitaIncomeForBpcAnalysis,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      PerCapitaIncomeForBpcAnalysisLegalProceedingTypeormEntity,
      PerCapitaIncomeForBpcAnalysisLegalProceedingEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: PerCapitaIncomeForBpcAnalysisLegalProceedingEntity,
    ): PerCapitaIncomeForBpcAnalysisLegalProceedingTypeormEntity => {
      const perCapitaIncomeForBpcAnalysis = this.mapper.map(
        source.perCapitaIncomeForBpcAnalysis,
        PerCapitaIncomeForBpcAnalysisEntity,
        PerCapitaIncomeForBpcAnalysisTypeormEntity,
      );

      return PerCapitaIncomeForBpcAnalysisLegalProceedingTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        perCapitaIncomeForBpcAnalysis,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      PerCapitaIncomeForBpcAnalysisLegalProceedingEntity,
      PerCapitaIncomeForBpcAnalysisLegalProceedingTypeormEntity,
      mappingFunction,
    );
  }
}
