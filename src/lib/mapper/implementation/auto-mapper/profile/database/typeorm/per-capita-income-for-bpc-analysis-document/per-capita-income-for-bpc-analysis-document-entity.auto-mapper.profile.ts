import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { PerCapitaIncomeForBpcAnalysisDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/per-capita-income-for-bpc-analysis-document.typeorm.entity';
import { PerCapitaIncomeForBpcAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/per-capita-income-for-bpc-analysis.typeorm.entity';
import { PerCapitaIncomeForBpcAnalysisEntity } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis/per-capita-income-for-bpc-analysis.entity';
import { PerCapitaIncomeForBpcAnalysisDocumentEntity } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-document/per-capita-income-for-bpc-analysis-document.entity';
import { PerCapitaIncomeForBpcAnalysisDocumentId } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-document/value-object/per-capita-income-for-bpc-analysis-document-id/per-capita-income-for-bpc-analysis-document-id.value-object';

@Injectable()
export class PerCapitaIncomeForBpcAnalysisDocumentEntityAutoMapperProfile {
  protected readonly _type =
    PerCapitaIncomeForBpcAnalysisDocumentEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: PerCapitaIncomeForBpcAnalysisDocumentTypeormEntity,
    ): PerCapitaIncomeForBpcAnalysisDocumentEntity => {
      const perCapitaIncomeForBpcAnalysis = this.mapper.map(
        source.perCapitaIncomeForBpcAnalysis,
        PerCapitaIncomeForBpcAnalysisTypeormEntity,
        PerCapitaIncomeForBpcAnalysisEntity,
      );

      return new PerCapitaIncomeForBpcAnalysisDocumentEntity({
        ...source,
        id: new PerCapitaIncomeForBpcAnalysisDocumentId(source.id),
        perCapitaIncomeForBpcAnalysis,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      PerCapitaIncomeForBpcAnalysisDocumentTypeormEntity,
      PerCapitaIncomeForBpcAnalysisDocumentEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: PerCapitaIncomeForBpcAnalysisDocumentEntity,
    ): PerCapitaIncomeForBpcAnalysisDocumentTypeormEntity => {
      const perCapitaIncomeForBpcAnalysis = this.mapper.map(
        source.perCapitaIncomeForBpcAnalysis,
        PerCapitaIncomeForBpcAnalysisEntity,
        PerCapitaIncomeForBpcAnalysisTypeormEntity,
      );

      return PerCapitaIncomeForBpcAnalysisDocumentTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        perCapitaIncomeForBpcAnalysis,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      PerCapitaIncomeForBpcAnalysisDocumentEntity,
      PerCapitaIncomeForBpcAnalysisDocumentTypeormEntity,
      mappingFunction,
    );
  }
}
