import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { BpcElderlyCessationResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-cessation-result.typeorm.entity';
import { GetBpcElderlyCessationResultQueryResult } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/repository/bpc-elderly-cessation-result/query/result/get-bpc-elderly-cessation-result.query.result';
import { BpcElderlyCessationResultId } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-result/value-object/bpc-elderly-cessation-result-id/bpc-elderly-cessation-result-id.value-object';

@Injectable()
export class GetBpcElderlyCessationResultQueryResultAutoMapperProfile {
  protected readonly _type =
    GetBpcElderlyCessationResultQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: BpcElderlyCessationResultTypeormEntity,
    ): GetBpcElderlyCessationResultQueryResult => {
      return GetBpcElderlyCessationResultQueryResult.build({
        id: new BpcElderlyCessationResultId(source.id),
        inssDecisionAnalysis: source.inssDecisionAnalysis,
        firstAnalysis: source.firstAnalysis,
        completeAnalysis: source.completeAnalysis,
        completeAnalysisDownload: source.completeAnalysisDownload,
        simplifiedAnalysis: source.simplifiedAnalysis,
        applicableRules: source.applicableRules,
        benefitSummaries: source.benefitSummaries,
        analysisDetailedText: source.analysisDetailedText,
        diagnosis: source.diagnosis,
        totalHouseholdIncome:
          source.totalHouseholdIncome !== null
            ? Number(source.totalHouseholdIncome)
            : null,
        perCapitaIncome:
          source.perCapitaIncome !== null
            ? Number(source.perCapitaIncome)
            : null,
        legalRequirementsMet: source.legalRequirementsMet,
        perCapitaIncomeBelowQuarterMinimumWage:
          source.perCapitaIncomeBelowQuarterMinimumWage,
        ageEqualOrAbove65Years: source.ageEqualOrAbove65Years,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt ?? null,
      });
    };

    createMap(
      this.mapper,
      BpcElderlyCessationResultTypeormEntity,
      GetBpcElderlyCessationResultQueryResult,
      constructUsing(convertOrmEntityToQueryResult),
    );
  }
}
