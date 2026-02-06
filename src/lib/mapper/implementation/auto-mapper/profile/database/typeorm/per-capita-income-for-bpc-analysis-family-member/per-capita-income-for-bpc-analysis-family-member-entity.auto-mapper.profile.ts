import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { PerCapitaIncomeForBpcAnalysisFamilyMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/per-capita-income-for-bpc-analysis-family-member.typeorm.entity';
import { PerCapitaIncomeForBpcAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/per-capita-income-for-bpc-analysis.typeorm.entity';
import { PerCapitaIncomeForBpcAnalysisEntity } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis/per-capita-income-for-bpc-analysis.entity';
import { PerCapitaIncomeForBpcAnalysisFamilyMemberEntity } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-family-member/per-capita-income-for-bpc-analysis-family-member.entity';
import { PerCapitaIncomeForBpcAnalysisFamilyMemberId } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-family-member/value-object/per-capita-income-for-bpc-analysis-family-member-id/per-capita-income-for-bpc-analysis-family-member-id.value-object';

@Injectable()
export class PerCapitaIncomeForBpcAnalysisFamilyMemberEntityAutoMapperProfile {
  protected readonly _type =
    PerCapitaIncomeForBpcAnalysisFamilyMemberEntityAutoMapperProfile.name;

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
    ): PerCapitaIncomeForBpcAnalysisFamilyMemberEntity => {
      const perCapitaIncomeForBpcAnalysis = this.mapper.map(
        source.perCapitaIncomeForBpcAnalysis,
        PerCapitaIncomeForBpcAnalysisTypeormEntity,
        PerCapitaIncomeForBpcAnalysisEntity,
      );

      return new PerCapitaIncomeForBpcAnalysisFamilyMemberEntity({
        ...source,
        id: new PerCapitaIncomeForBpcAnalysisFamilyMemberId(source.id),
        monthlyIncomeAmount: source.monthlyIncomeAmount
          ? parseFloat(source.monthlyIncomeAmount)
          : null,
        perCapitaIncomeForBpcAnalysis,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      PerCapitaIncomeForBpcAnalysisFamilyMemberTypeormEntity,
      PerCapitaIncomeForBpcAnalysisFamilyMemberEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: PerCapitaIncomeForBpcAnalysisFamilyMemberEntity,
    ): PerCapitaIncomeForBpcAnalysisFamilyMemberTypeormEntity => {
      const perCapitaIncomeForBpcAnalysis = this.mapper.map(
        source.perCapitaIncomeForBpcAnalysis,
        PerCapitaIncomeForBpcAnalysisEntity,
        PerCapitaIncomeForBpcAnalysisTypeormEntity,
      );

      return PerCapitaIncomeForBpcAnalysisFamilyMemberTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        monthlyIncomeAmount: source.monthlyIncomeAmount?.toString() ?? null,
        perCapitaIncomeForBpcAnalysis,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      PerCapitaIncomeForBpcAnalysisFamilyMemberEntity,
      PerCapitaIncomeForBpcAnalysisFamilyMemberTypeormEntity,
      mappingFunction,
    );
  }
}