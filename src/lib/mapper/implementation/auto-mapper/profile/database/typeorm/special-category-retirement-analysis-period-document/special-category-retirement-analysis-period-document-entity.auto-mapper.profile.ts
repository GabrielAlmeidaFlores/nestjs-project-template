import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { SpecialCategoryRetirementAnalysisPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-category-retirement-analysis-period-document.typeorm.entity';
import { SpecialCategoryRetirementAnalysisWorkPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-category-retirement-analysis-work-period.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { GetSpecialCategoryRetirementAnalysisPeriodDocumentQueryResult } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis-period-document/query/result/get-special-category-retirement-analysis-period-document.query.result';
import { SpecialCategoryRetirementAnalysisPeriodDocumentEntity } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-period-document/special-category-retirement-analysis-period-document.entity';
import { SpecialCategoryRetirementAnalysisPeriodDocumentId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-period-document/value-object/special-category-retirement-analysis-period-document-id/special-category-retirement-analysis-period-document-id.value-object';
import { SpecialCategoryRetirementAnalysisWorkPeriodId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-work-period/value-object/special-category-retirement-analysis-work-period-id/special-category-retirement-analysis-work-period-id.value-object';

@Injectable()
export class SpecialCategoryRetirementAnalysisPeriodDocumentEntityAutoMapperProfile {
  protected readonly _type =
    SpecialCategoryRetirementAnalysisPeriodDocumentEntityAutoMapperProfile.name;

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
      source: SpecialCategoryRetirementAnalysisPeriodDocumentTypeormEntity,
    ): SpecialCategoryRetirementAnalysisPeriodDocumentEntity => {
      if (!source.specialCategoryRetirementAnalysisWorkPeriod) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass:
            SpecialCategoryRetirementAnalysisPeriodDocumentEntity.name,
          sourceClass:
            SpecialCategoryRetirementAnalysisPeriodDocumentTypeormEntity.name,
        });
      }

      return new SpecialCategoryRetirementAnalysisPeriodDocumentEntity({
        id: new SpecialCategoryRetirementAnalysisPeriodDocumentId(source.id),
        specialCategoryRetirementAnalysisWorkPeriodId:
          new SpecialCategoryRetirementAnalysisWorkPeriodId(
            source.specialCategoryRetirementAnalysisWorkPeriod.id,
          ),
        storedFileExternalName: source.storedFileExternalName,
        originalFileUploadName: source.originalFileUploadName,
        retirementDocumentTypeCategory: source.retirementDocumentTypeCategory,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      SpecialCategoryRetirementAnalysisPeriodDocumentTypeormEntity,
      SpecialCategoryRetirementAnalysisPeriodDocumentEntity,
      constructUsing(convert),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convert = (
      source: SpecialCategoryRetirementAnalysisPeriodDocumentEntity,
    ): SpecialCategoryRetirementAnalysisPeriodDocumentTypeormEntity => {
      return SpecialCategoryRetirementAnalysisPeriodDocumentTypeormEntity.build(
        {
          id: source.id.toString(),
          specialCategoryRetirementAnalysisWorkPeriod: {
            id: source.specialCategoryRetirementAnalysisWorkPeriodId.toString(),
          } as unknown as SpecialCategoryRetirementAnalysisWorkPeriodTypeormEntity,
          storedFileExternalName: source.storedFileExternalName,
          originalFileUploadName: source.originalFileUploadName,
          retirementDocumentTypeCategory: source.retirementDocumentTypeCategory,
          createdAt: source.createdAt,
          updatedAt: source.updatedAt,
          deletedAt: source.deletedAt,
        },
      );
    };

    createMap(
      this.mapper,
      SpecialCategoryRetirementAnalysisPeriodDocumentEntity,
      SpecialCategoryRetirementAnalysisPeriodDocumentTypeormEntity,
      constructUsing(convert),
    );
  }

  private mapOrmEntityToQueryResult(): void {
    const convert = (
      source: SpecialCategoryRetirementAnalysisPeriodDocumentTypeormEntity,
    ): GetSpecialCategoryRetirementAnalysisPeriodDocumentQueryResult => {
      if (!source.specialCategoryRetirementAnalysisWorkPeriod) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass:
            GetSpecialCategoryRetirementAnalysisPeriodDocumentQueryResult.name,
          sourceClass:
            SpecialCategoryRetirementAnalysisPeriodDocumentTypeormEntity.name,
        });
      }

      const result =
        new GetSpecialCategoryRetirementAnalysisPeriodDocumentQueryResult();
      Object.assign(result, {
        specialCategoryRetirementAnalysisPeriodDocumentId:
          new SpecialCategoryRetirementAnalysisPeriodDocumentId(source.id),
        specialCategoryRetirementAnalysisWorkPeriodId:
          new SpecialCategoryRetirementAnalysisWorkPeriodId(
            source.specialCategoryRetirementAnalysisWorkPeriod.id,
          ),
        storedFileExternalName: source.storedFileExternalName,
        originalFileUploadName: source.originalFileUploadName,
        retirementDocumentTypeCategory: source.retirementDocumentTypeCategory,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
      return result;
    };

    createMap(
      this.mapper,
      SpecialCategoryRetirementAnalysisPeriodDocumentTypeormEntity,
      GetSpecialCategoryRetirementAnalysisPeriodDocumentQueryResult,
      constructUsing(convert),
    );
  }
}
