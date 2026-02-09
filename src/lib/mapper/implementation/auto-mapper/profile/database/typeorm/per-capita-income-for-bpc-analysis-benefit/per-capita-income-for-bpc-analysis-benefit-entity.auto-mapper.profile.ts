import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { PerCapitaIncomeForBpcAnalysisBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/per-capita-income-for-bpc-analysis-benefit.entity';
import { PerCapitaIncomeForBpcAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/per-capita-income-for-bpc-analysis.typeorm.entity';
import { PerCapitaIncomeForBpcAnalysisEntity } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis/per-capita-income-for-bpc-analysis.entity';
import { PerCapitaIncomeForBpcAnalysisBenefitEntity } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-benefit/per-capita-income-for-bpc-analysis-benefit.entity';
import { PerCapitaIncomeForBpcAnalysisBenefitId } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-benefit/value-object/per-capita-income-for-bpc-analysis-benefit-id/per-capita-income-for-bpc-analysis-benefit-id.value-object';

@Injectable()
export class PerCapitaIncomeForBpcAnalysisBenefitEntityAutoMapperProfile {
  protected readonly _type =
    PerCapitaIncomeForBpcAnalysisBenefitEntityAutoMapperProfile.name;

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
    ): PerCapitaIncomeForBpcAnalysisBenefitEntity => {
      const perCapitaIncomeForBpcAnalysis = this.mapper.map(
        source.perCapitaIncomeForBpcAnalysis,
        PerCapitaIncomeForBpcAnalysisTypeormEntity,
        PerCapitaIncomeForBpcAnalysisEntity,
      );

      return new PerCapitaIncomeForBpcAnalysisBenefitEntity({
        ...source,
        id: new PerCapitaIncomeForBpcAnalysisBenefitId(source.id),
        perCapitaIncomeForBpcAnalysis,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      PerCapitaIncomeForBpcAnalysisBenefitTypeormEntity,
      PerCapitaIncomeForBpcAnalysisBenefitEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: PerCapitaIncomeForBpcAnalysisBenefitEntity,
    ): PerCapitaIncomeForBpcAnalysisBenefitTypeormEntity => {
      const perCapitaIncomeForBpcAnalysis = this.mapper.map(
        source.perCapitaIncomeForBpcAnalysis,
        PerCapitaIncomeForBpcAnalysisEntity,
        PerCapitaIncomeForBpcAnalysisTypeormEntity,
      );

      return PerCapitaIncomeForBpcAnalysisBenefitTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        perCapitaIncomeForBpcAnalysis,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      PerCapitaIncomeForBpcAnalysisBenefitEntity,
      PerCapitaIncomeForBpcAnalysisBenefitTypeormEntity,
      mappingFunction,
    );
  }
}
