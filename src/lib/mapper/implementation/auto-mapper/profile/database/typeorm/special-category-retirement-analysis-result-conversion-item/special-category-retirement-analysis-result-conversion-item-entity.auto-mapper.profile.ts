import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { SpecialCategoryRetirementAnalysisResultConversionItemTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-category-retirement-analysis-result-conversion-item.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { GetSpecialCategoryRetirementAnalysisResultConversionItemQueryResult } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis-result-conversion-item/query/result/get-special-category-retirement-analysis-result-conversion-item.query.result';
import { SpecialCategoryRetirementAnalysisResultConversionItemEntity } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-result-conversion-item/special-category-retirement-analysis-result-conversion-item.entity';
import { SpecialCategoryRetirementAnalysisResultConversionItemId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-result-conversion-item/value-object/special-category-retirement-analysis-result-conversion-item-id/special-category-retirement-analysis-result-conversion-item-id.value-object';
import { SpecialCategoryRetirementAnalysisResultId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-result/value-object/special-category-retirement-analysis-result-id/special-category-retirement-analysis-result-id.value-object';

@Injectable()
export class SpecialCategoryRetirementAnalysisResultConversionItemEntityAutoMapperProfile {
  protected readonly _type = SpecialCategoryRetirementAnalysisResultConversionItemEntityAutoMapperProfile.name;

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
      source: SpecialCategoryRetirementAnalysisResultConversionItemTypeormEntity,
    ): SpecialCategoryRetirementAnalysisResultConversionItemEntity => {
      if (!source.analysisResult) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass: SpecialCategoryRetirementAnalysisResultConversionItemEntity.name,
          sourceClass: SpecialCategoryRetirementAnalysisResultConversionItemTypeormEntity.name,
        });
      }

      return new SpecialCategoryRetirementAnalysisResultConversionItemEntity({
        id: new SpecialCategoryRetirementAnalysisResultConversionItemId(source.id),
        specialCategoryRetirementAnalysisResultId: new SpecialCategoryRetirementAnalysisResultId(source.analysisResult.id),
        originJobTitleDescription: source.originJobTitleDescription,
        periodDateRangeText: source.periodDateRangeText,
        harmfulExposureAgentsText: source.harmfulExposureAgentsText,
        specialTimeDurationText: source.specialTimeDurationText,
        convertedTimeDurationText: source.convertedTimeDurationText,
        conversionFactorValue: source.conversionFactorValue,
        recognitionStatusEnum: source.recognitionStatusEnum,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      SpecialCategoryRetirementAnalysisResultConversionItemTypeormEntity,
      SpecialCategoryRetirementAnalysisResultConversionItemEntity,
      constructUsing(convert),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convert = (
      source: SpecialCategoryRetirementAnalysisResultConversionItemEntity,
    ): SpecialCategoryRetirementAnalysisResultConversionItemTypeormEntity => {
      return SpecialCategoryRetirementAnalysisResultConversionItemTypeormEntity.build({
        id: source.id.toString(),
        analysisResult: { id: source.specialCategoryRetirementAnalysisResultId.toString() } as any,
        originJobTitleDescription: source.originJobTitleDescription,
        periodDateRangeText: source.periodDateRangeText,
        harmfulExposureAgentsText: source.harmfulExposureAgentsText,
        specialTimeDurationText: source.specialTimeDurationText,
        convertedTimeDurationText: source.convertedTimeDurationText,
        conversionFactorValue: source.conversionFactorValue,
        recognitionStatusEnum: source.recognitionStatusEnum,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      SpecialCategoryRetirementAnalysisResultConversionItemEntity,
      SpecialCategoryRetirementAnalysisResultConversionItemTypeormEntity,
      constructUsing(convert),
    );
  }

  private mapOrmEntityToQueryResult(): void {
    const convert = (
      source: SpecialCategoryRetirementAnalysisResultConversionItemTypeormEntity,
    ): GetSpecialCategoryRetirementAnalysisResultConversionItemQueryResult => {
      if (!source.analysisResult) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass: GetSpecialCategoryRetirementAnalysisResultConversionItemQueryResult.name,
          sourceClass: SpecialCategoryRetirementAnalysisResultConversionItemTypeormEntity.name,
        });
      }

      const result = new GetSpecialCategoryRetirementAnalysisResultConversionItemQueryResult();
      Object.assign(result, {
        specialCategoryRetirementAnalysisResultConversionItemId: new SpecialCategoryRetirementAnalysisResultConversionItemId(source.id),
        specialCategoryRetirementAnalysisResultId: new SpecialCategoryRetirementAnalysisResultId(source.analysisResult.id),
        originJobTitleDescription: source.originJobTitleDescription,
        periodDateRangeText: source.periodDateRangeText,
        harmfulExposureAgentsText: source.harmfulExposureAgentsText,
        specialTimeDurationText: source.specialTimeDurationText,
        convertedTimeDurationText: source.convertedTimeDurationText,
        conversionFactorValue: source.conversionFactorValue,
        recognitionStatusEnum: source.recognitionStatusEnum,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
      return result;
    };

    createMap(
      this.mapper,
      SpecialCategoryRetirementAnalysisResultConversionItemTypeormEntity,
      GetSpecialCategoryRetirementAnalysisResultConversionItemQueryResult,
      constructUsing(convert),
    );
  }
}
