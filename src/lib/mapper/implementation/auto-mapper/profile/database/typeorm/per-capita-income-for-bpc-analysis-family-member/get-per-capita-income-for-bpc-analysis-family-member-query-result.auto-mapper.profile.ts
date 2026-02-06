import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { PerCapitaIncomeForBpcAnalysisFamilyMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/per-capita-income-for-bpc-analysis-family-member.typeorm.entity';
import { GetPerCapitaIncomeForBpcAnalysisFamilyMemberQueryResult } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/repository/per-capita-income-for-bpc-analysis-family-member/query/result/get-per-capita-income-for-bpc-analysis-family-member.query.result';
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
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: PerCapitaIncomeForBpcAnalysisFamilyMemberTypeormEntity,
    ): GetPerCapitaIncomeForBpcAnalysisFamilyMemberQueryResult => {
      return GetPerCapitaIncomeForBpcAnalysisFamilyMemberQueryResult.build({
        ...source,
        id: new PerCapitaIncomeForBpcAnalysisFamilyMemberId(source.id),
        monthlyIncomeAmount: source.monthlyIncomeAmount
          ? Number(source.monthlyIncomeAmount)
          : null,
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

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetPerCapitaIncomeForBpcAnalysisFamilyMemberQueryResult,
    ): PerCapitaIncomeForBpcAnalysisFamilyMemberTypeormEntity => {
      return PerCapitaIncomeForBpcAnalysisFamilyMemberTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        monthlyIncomeAmount: source.monthlyIncomeAmount
          ? String(source.monthlyIncomeAmount)
          : null,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetPerCapitaIncomeForBpcAnalysisFamilyMemberQueryResult,
      PerCapitaIncomeForBpcAnalysisFamilyMemberTypeormEntity,
      mappingFunction,
    );
  }
}
