import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { SpecialCategoryRetirementAnalysisRemunerationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-category-retirement-analysis-remuneration.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { GetSpecialCategoryRetirementAnalysisRemunerationQueryResult } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis-remuneration/query/result/get-special-category-retirement-analysis-remuneration.query.result';
import { SpecialCategoryRetirementAnalysisRemunerationEntity } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-remuneration/special-category-retirement-analysis-remuneration.entity';
import { SpecialCategoryRetirementAnalysisRemunerationId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-remuneration/value-object/special-category-retirement-analysis-remuneration-id/special-category-retirement-analysis-remuneration-id.value-object';
import { SpecialCategoryRetirementAnalysisId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis/value-object/special-category-retirement-analysis-id/special-category-retirement-analysis-id.value-object';

@Injectable()
export class SpecialCategoryRetirementAnalysisRemunerationEntityAutoMapperProfile {
  protected readonly _type = SpecialCategoryRetirementAnalysisRemunerationEntityAutoMapperProfile.name;

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
      source: SpecialCategoryRetirementAnalysisRemunerationTypeormEntity,
    ): SpecialCategoryRetirementAnalysisRemunerationEntity => {
      if (!source.specialCategoryRetirementAnalysis) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass: SpecialCategoryRetirementAnalysisRemunerationEntity.name,
          sourceClass: SpecialCategoryRetirementAnalysisRemunerationTypeormEntity.name,
        });
      }

      return new SpecialCategoryRetirementAnalysisRemunerationEntity({
        id: new SpecialCategoryRetirementAnalysisRemunerationId(source.id),
        specialCategoryRetirementAnalysisId: new SpecialCategoryRetirementAnalysisId(source.specialCategoryRetirementAnalysis.id),
        remunerationReferenceMonthYear: source.remunerationReferenceMonthYear,
        remunerationGrossAmount: source.remunerationGrossAmount,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      SpecialCategoryRetirementAnalysisRemunerationTypeormEntity,
      SpecialCategoryRetirementAnalysisRemunerationEntity,
      constructUsing(convert),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convert = (
      source: SpecialCategoryRetirementAnalysisRemunerationEntity,
    ): SpecialCategoryRetirementAnalysisRemunerationTypeormEntity => {
      return SpecialCategoryRetirementAnalysisRemunerationTypeormEntity.build({
        id: source.id.toString(),
        specialCategoryRetirementAnalysis: { id: source.specialCategoryRetirementAnalysisId.toString() } as any,
        remunerationReferenceMonthYear: source.remunerationReferenceMonthYear,
        remunerationGrossAmount: source.remunerationGrossAmount,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      SpecialCategoryRetirementAnalysisRemunerationEntity,
      SpecialCategoryRetirementAnalysisRemunerationTypeormEntity,
      constructUsing(convert),
    );
  }

  private mapOrmEntityToQueryResult(): void {
    const convert = (
      source: SpecialCategoryRetirementAnalysisRemunerationTypeormEntity,
    ): GetSpecialCategoryRetirementAnalysisRemunerationQueryResult => {
      if (!source.specialCategoryRetirementAnalysis) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass: GetSpecialCategoryRetirementAnalysisRemunerationQueryResult.name,
          sourceClass: SpecialCategoryRetirementAnalysisRemunerationTypeormEntity.name,
        });
      }

      const result = new GetSpecialCategoryRetirementAnalysisRemunerationQueryResult();
      Object.assign(result, {
        specialCategoryRetirementAnalysisRemunerationId: new SpecialCategoryRetirementAnalysisRemunerationId(source.id),
        specialCategoryRetirementAnalysisId: new SpecialCategoryRetirementAnalysisId(source.specialCategoryRetirementAnalysis.id),
        remunerationReferenceMonthYear: source.remunerationReferenceMonthYear,
        remunerationGrossAmount: source.remunerationGrossAmount,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
      return result;
    };

    createMap(
      this.mapper,
      SpecialCategoryRetirementAnalysisRemunerationTypeormEntity,
      GetSpecialCategoryRetirementAnalysisRemunerationQueryResult,
      constructUsing(convert),
    );
  }
}
