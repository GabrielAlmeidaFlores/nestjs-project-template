import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { SpecialCategoryRetirementAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-category-retirement-analysis-result.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { GetSpecialCategoryRetirementAnalysisResultQueryResult } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis-result/query/result/get-special-category-retirement-analysis-result.query.result';
import { SpecialCategoryRetirementAnalysisId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis/value-object/special-category-retirement-analysis-id/special-category-retirement-analysis-id.value-object';
import { SpecialCategoryRetirementAnalysisResultEntity } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-result/special-category-retirement-analysis-result.entity';
import { SpecialCategoryRetirementAnalysisResultId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-result/value-object/special-category-retirement-analysis-result-id/special-category-retirement-analysis-result-id.value-object';

@Injectable()
export class SpecialCategoryRetirementAnalysisResultEntityAutoMapperProfile {
  protected readonly _type =
    SpecialCategoryRetirementAnalysisResultEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convert = (
      source: SpecialCategoryRetirementAnalysisResultTypeormEntity,
    ): SpecialCategoryRetirementAnalysisResultEntity => {
      if (!source.specialCategoryRetirementAnalysis) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass: SpecialCategoryRetirementAnalysisResultEntity.name,
          sourceClass:
            SpecialCategoryRetirementAnalysisResultTypeormEntity.name,
        });
      }

      return new SpecialCategoryRetirementAnalysisResultEntity({
        id: new SpecialCategoryRetirementAnalysisResultId(source.id),
        specialCategoryRetirementAnalysisId:
          new SpecialCategoryRetirementAnalysisId(
            source.specialCategoryRetirementAnalysis.id,
          ),
        simplifiedAnalysisSummaryText: source.simplifiedAnalysisSummaryText,
        fullAnalysisConclusionText: source.fullAnalysisConclusionText,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      SpecialCategoryRetirementAnalysisResultTypeormEntity,
      SpecialCategoryRetirementAnalysisResultEntity,
      constructUsing(convert),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convert = (
      source: SpecialCategoryRetirementAnalysisResultEntity,
    ): SpecialCategoryRetirementAnalysisResultTypeormEntity => {
      return SpecialCategoryRetirementAnalysisResultTypeormEntity.build({
        id: source.id.toString(),
        specialCategoryRetirementAnalysis: {
          id: source.specialCategoryRetirementAnalysisId.toString(),
        } as any,
        simplifiedAnalysisSummaryText: source.simplifiedAnalysisSummaryText,
        fullAnalysisConclusionText: source.fullAnalysisConclusionText,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      SpecialCategoryRetirementAnalysisResultEntity,
      SpecialCategoryRetirementAnalysisResultTypeormEntity,
      constructUsing(convert),
    );
  }

  private mapOrmEntityToQueryResult(): void {
    const convert = (
      source: SpecialCategoryRetirementAnalysisResultTypeormEntity,
    ): GetSpecialCategoryRetirementAnalysisResultQueryResult => {
      if (!source.specialCategoryRetirementAnalysis) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass:
            GetSpecialCategoryRetirementAnalysisResultQueryResult.name,
          sourceClass:
            SpecialCategoryRetirementAnalysisResultTypeormEntity.name,
        });
      }

      const result =
        new GetSpecialCategoryRetirementAnalysisResultQueryResult();
      Object.assign(result, {
        specialCategoryRetirementAnalysisResultId:
          new SpecialCategoryRetirementAnalysisResultId(source.id),
        specialCategoryRetirementAnalysisId:
          new SpecialCategoryRetirementAnalysisId(
            source.specialCategoryRetirementAnalysis.id,
          ),
        simplifiedAnalysisSummaryText: source.simplifiedAnalysisSummaryText,
        fullAnalysisConclusionText: source.fullAnalysisConclusionText,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
      return result;
    };

    createMap(
      this.mapper,
      SpecialCategoryRetirementAnalysisResultTypeormEntity,
      GetSpecialCategoryRetirementAnalysisResultQueryResult,
      constructUsing(convert),
    );
  }
}
