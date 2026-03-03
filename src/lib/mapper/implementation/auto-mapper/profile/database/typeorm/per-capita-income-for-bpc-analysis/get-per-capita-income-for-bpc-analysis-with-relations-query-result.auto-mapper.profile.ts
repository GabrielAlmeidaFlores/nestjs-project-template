import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { PerCapitaIncomeForBpcAnalysisBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/per-capita-income-for-bpc-analysis-benefit.entity';
import { PerCapitaIncomeForBpcAnalysisDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/per-capita-income-for-bpc-analysis-document.typeorm.entity';
import { PerCapitaIncomeForBpcAnalysisFamilyMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/per-capita-income-for-bpc-analysis-family-member.typeorm.entity';
import { PerCapitaIncomeForBpcAnalysisLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/per-capita-income-for-bpc-analysis-legal-proceeding.entity';
import { PerCapitaIncomeForBpcAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/per-capita-income-for-bpc-analysis-result.typeorm.entity';
import { PerCapitaIncomeForBpcAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/per-capita-income-for-bpc-analysis.typeorm.entity';
import { GetPerCapitaIncomeForBpcAnalysisBenefitQueryResult } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/repository/per-capita-income-for-bpc-analysis/query/result/get-per-capita-income-for-bpc-analysis-benefit.query.result';
import { GetPerCapitaIncomeForBpcAnalysisDocumentQueryResult } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/repository/per-capita-income-for-bpc-analysis/query/result/get-per-capita-income-for-bpc-analysis-document.query.result';
import { GetPerCapitaIncomeForBpcAnalysisFamilyMemberQueryResult } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/repository/per-capita-income-for-bpc-analysis/query/result/get-per-capita-income-for-bpc-analysis-family-member.query.result';
import { GetPerCapitaIncomeForBpcAnalysisLegalProceedingQueryResult } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/repository/per-capita-income-for-bpc-analysis/query/result/get-per-capita-income-for-bpc-analysis-legal-proceeding.query.result';
import { GetPerCapitaIncomeForBpcAnalysisWithRelationsQueryResult } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/repository/per-capita-income-for-bpc-analysis/query/result/get-per-capita-income-for-bpc-analysis-with-relations.query.result';
import { GetPerCapitaIncomeForBpcAnalysisResultQueryResult } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/repository/per-capita-income-for-bpc-analysis-result/query/result/get-per-capita-income-for-bpc-analysis-result.query.result';
import { PerCapitaIncomeForBpcAnalysisId } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis/value-object/per-capita-income-for-bpc-analysis-id/per-capita-income-for-bpc-analysis-id.value-object';

@Injectable()
export class GetPerCapitaIncomeForBpcAnalysisWithRelationsQueryResultAutoMapperProfile {
  protected readonly _type =
    GetPerCapitaIncomeForBpcAnalysisWithRelationsQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: PerCapitaIncomeForBpcAnalysisTypeormEntity,
    ): GetPerCapitaIncomeForBpcAnalysisWithRelationsQueryResult => {
      const perCapitaIncomeForBpcAnalysisResult =
        source.perCapitaIncomeForBpcAnalysisResult
          ? this.mapper.map(
              source.perCapitaIncomeForBpcAnalysisResult,
              PerCapitaIncomeForBpcAnalysisResultTypeormEntity,
              GetPerCapitaIncomeForBpcAnalysisResultQueryResult,
            )
          : null;

      const perCapitaIncomeForBpcAnalysisFamilyMember =
        source.perCapitaIncomeForBpcAnalysisFamilyMember?.map((member) =>
          this.mapper.map(
            member,
            PerCapitaIncomeForBpcAnalysisFamilyMemberTypeormEntity,
            GetPerCapitaIncomeForBpcAnalysisFamilyMemberQueryResult,
          ),
        ) ?? [];

      const perCapitaIncomeForBpcAnalysisDocument =
        source.perCapitaIncomeForBpcAnalysisDocument?.map((doc) =>
          this.mapper.map(
            doc,
            PerCapitaIncomeForBpcAnalysisDocumentTypeormEntity,
            GetPerCapitaIncomeForBpcAnalysisDocumentQueryResult,
          ),
        ) ?? [];

      const perCapitaIncomeForBpcAnalysisBenefit =
        source.perCapitaIncomeForBpcAnalysisBenefit?.map((benefit) =>
          this.mapper.map(
            benefit,
            PerCapitaIncomeForBpcAnalysisBenefitTypeormEntity,
            GetPerCapitaIncomeForBpcAnalysisBenefitQueryResult,
          ),
        ) ?? [];

      const perCapitaIncomeForBpcAnalysisLegalProceeding =
        source.perCapitaIncomeForBpcAnalysisLegalProceeding?.map(
          (legalProceeding) =>
            this.mapper.map(
              legalProceeding,
              PerCapitaIncomeForBpcAnalysisLegalProceedingTypeormEntity,
              GetPerCapitaIncomeForBpcAnalysisLegalProceedingQueryResult,
            ),
        ) ?? [];

      return GetPerCapitaIncomeForBpcAnalysisWithRelationsQueryResult.build({
        id: new PerCapitaIncomeForBpcAnalysisId(source.id),
        perCapitaIncomeForBpcAnalysisResult,
        perCapitaIncomeForBpcAnalysisFamilyMember,
        perCapitaIncomeForBpcAnalysisDocument,
        perCapitaIncomeForBpcAnalysisBenefit,
        perCapitaIncomeForBpcAnalysisLegalProceeding,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt ?? null,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      PerCapitaIncomeForBpcAnalysisTypeormEntity,
      GetPerCapitaIncomeForBpcAnalysisWithRelationsQueryResult,
      mappingFunction,
    );
  }
}
