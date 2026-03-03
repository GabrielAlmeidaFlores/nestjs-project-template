import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { PerCapitaIncomeForBpcAnalysisFamilyMemberDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/per-capita-income-for-bpc-analysis-family-member-document.typeorm.entity';
import { PerCapitaIncomeForBpcAnalysisFamilyMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/per-capita-income-for-bpc-analysis-family-member.typeorm.entity';
import { GetPerCapitaIncomeForBpcAnalysisFamilyMemberDocumentQueryResult } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/repository/per-capita-income-for-bpc-analysis/query/result/get-per-capita-income-for-bpc-analysis-family-member-document.query.result';
import { GetPerCapitaIncomeForBpcAnalysisFamilyMemberQueryResult } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/repository/per-capita-income-for-bpc-analysis/query/result/get-per-capita-income-for-bpc-analysis-family-member.query.result';
import { PerCapitaIncomeForBpcAnalysisFamilyMemberId } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-family-member/value-object/per-capita-income-for-bpc-analysis-family-member-id/per-capita-income-for-bpc-analysis-family-member-id.value-object';

@Injectable()
export class GetPerCapitaIncomeForBpcAnalysisFamilyMemberQueryResultAutoMapperProfile {
  protected readonly _type =
    GetPerCapitaIncomeForBpcAnalysisFamilyMemberQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: PerCapitaIncomeForBpcAnalysisFamilyMemberTypeormEntity,
    ): GetPerCapitaIncomeForBpcAnalysisFamilyMemberQueryResult => {
      const perCapitaIncomeForBpcAnalysisFamilyMemberDocument =
        source.perCapitaIncomeForBpcAnalysisFamilyMemberDocument?.map((doc) =>
          this.mapper.map(
            doc,
            PerCapitaIncomeForBpcAnalysisFamilyMemberDocumentTypeormEntity,
            GetPerCapitaIncomeForBpcAnalysisFamilyMemberDocumentQueryResult,
          ),
        ) ?? [];

      return GetPerCapitaIncomeForBpcAnalysisFamilyMemberQueryResult.build({
        ...source,
        id: new PerCapitaIncomeForBpcAnalysisFamilyMemberId(source.id),
        monthlyIncomeAmount:
          source.monthlyIncomeAmount !== null
            ? Number(source.monthlyIncomeAmount)
            : null,
        perCapitaIncomeForBpcAnalysisFamilyMemberDocument,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      PerCapitaIncomeForBpcAnalysisFamilyMemberTypeormEntity,
      GetPerCapitaIncomeForBpcAnalysisFamilyMemberQueryResult,
      mappingFunction,
    );
  }
}
