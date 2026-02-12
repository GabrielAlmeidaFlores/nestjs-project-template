import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { PerCapitaIncomeForBpcAnalysisDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/per-capita-income-for-bpc-analysis-document.typeorm.entity';
import { GetPerCapitaIncomeForBpcAnalysisDocumentQueryResult } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/repository/per-capita-income-for-bpc-analysis/query/result/get-per-capita-income-for-bpc-analysis-document.query.result';
import { PerCapitaIncomeForBpcAnalysisDocumentId } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-document/value-object/per-capita-income-for-bpc-analysis-document-id/per-capita-income-for-bpc-analysis-document-id.value-object';

@Injectable()
export class GetPerCapitaIncomeForBpcAnalysisDocumentQueryResultAutoMapperProfile {
  protected readonly _type =
    GetPerCapitaIncomeForBpcAnalysisDocumentQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: PerCapitaIncomeForBpcAnalysisDocumentTypeormEntity,
    ): GetPerCapitaIncomeForBpcAnalysisDocumentQueryResult => {
      return GetPerCapitaIncomeForBpcAnalysisDocumentQueryResult.build({
        ...source,
        id: new PerCapitaIncomeForBpcAnalysisDocumentId(source.id),
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToQueryResult);

    createMap(
      this.mapper,
      PerCapitaIncomeForBpcAnalysisDocumentTypeormEntity,
      GetPerCapitaIncomeForBpcAnalysisDocumentQueryResult,
      mappingFunction,
    );
  }
}
