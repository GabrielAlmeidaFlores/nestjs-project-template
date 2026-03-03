import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { PerCapitaIncomeForBpcAnalysisFamilyMemberDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/per-capita-income-for-bpc-analysis-family-member-document.typeorm.entity';
import { GetPerCapitaIncomeForBpcAnalysisFamilyMemberDocumentQueryResult } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/repository/per-capita-income-for-bpc-analysis/query/result/get-per-capita-income-for-bpc-analysis-family-member-document.query.result';
import { PerCapitaIncomeForBpcAnalysisFamilyMemberDocumentId } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-family-member-document/value-object/per-capita-income-for-bpc-analysis-family-member-document-id/per-capita-income-for-bpc-analysis-family-member-document-id.value-object';

@Injectable()
export class GetPerCapitaIncomeForBpcAnalysisFamilyMemberDocumentQueryResultAutoMapperProfile {
  protected readonly _type =
    GetPerCapitaIncomeForBpcAnalysisFamilyMemberDocumentQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: PerCapitaIncomeForBpcAnalysisFamilyMemberDocumentTypeormEntity,
    ): GetPerCapitaIncomeForBpcAnalysisFamilyMemberDocumentQueryResult => {
      return GetPerCapitaIncomeForBpcAnalysisFamilyMemberDocumentQueryResult.build(
        {
          ...source,
          id: new PerCapitaIncomeForBpcAnalysisFamilyMemberDocumentId(
            source.id,
          ),
        },
      );
    };

    const mappingFunction = constructUsing(convertOrmEntityToQueryResult);

    createMap(
      this.mapper,
      PerCapitaIncomeForBpcAnalysisFamilyMemberDocumentTypeormEntity,
      GetPerCapitaIncomeForBpcAnalysisFamilyMemberDocumentQueryResult,
      mappingFunction,
    );
  }
}
