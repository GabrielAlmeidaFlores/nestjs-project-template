import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { SpecialCategoryRetirementAnalysisWorkPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-category-retirement-analysis-work-period.typeorm.entity';
import { SpecialCategoryRetirementAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-category-retirement-analysis.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { GetSpecialCategoryRetirementAnalysisWorkPeriodQueryResult } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis-work-period/query/result/get-special-category-retirement-analysis-work-period.query.result';
import { SpecialCategoryRetirementAnalysisId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis/value-object/special-category-retirement-analysis-id/special-category-retirement-analysis-id.value-object';
import { SpecialCategoryRetirementAnalysisWorkPeriodEntity } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-work-period/special-category-retirement-analysis-work-period.entity';
import { SpecialCategoryRetirementAnalysisWorkPeriodId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-work-period/value-object/special-category-retirement-analysis-work-period-id/special-category-retirement-analysis-work-period-id.value-object';

@Injectable()
export class SpecialCategoryRetirementAnalysisWorkPeriodEntityAutoMapperProfile {
  protected readonly _type =
    SpecialCategoryRetirementAnalysisWorkPeriodEntityAutoMapperProfile.name;

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
      source: SpecialCategoryRetirementAnalysisWorkPeriodTypeormEntity,
    ): SpecialCategoryRetirementAnalysisWorkPeriodEntity => {
      if (!source.specialCategoryRetirementAnalysis) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass:
            SpecialCategoryRetirementAnalysisWorkPeriodEntity.name,
          sourceClass:
            SpecialCategoryRetirementAnalysisWorkPeriodTypeormEntity.name,
        });
      }

      return new SpecialCategoryRetirementAnalysisWorkPeriodEntity({
        id: new SpecialCategoryRetirementAnalysisWorkPeriodId(source.id),
        specialCategoryRetirementAnalysisId:
          new SpecialCategoryRetirementAnalysisId(
            source.specialCategoryRetirementAnalysis.id,
          ),
        publicServiceAdmissionDate: source.publicServiceAdmissionDate,
        publicServiceCareerStartDate: source.publicServiceCareerStartDate,
        workPeriodStartDate: source.workPeriodStartDate,
        workPeriodEndDate: source.workPeriodEndDate,
        jobPositionTitle: source.jobPositionTitle,
        careerPathName: source.careerPathName,
        publicServiceTypeCategory: source.publicServiceTypeCategory,
        specialTimeRegistrationType: source.specialTimeRegistrationType,
        effectiveSpecialWorkStartDate: source.effectiveSpecialWorkStartDate,
        effectiveSpecialWorkEndDate: source.effectiveSpecialWorkEndDate,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      SpecialCategoryRetirementAnalysisWorkPeriodTypeormEntity,
      SpecialCategoryRetirementAnalysisWorkPeriodEntity,
      constructUsing(convert),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convert = (
      source: SpecialCategoryRetirementAnalysisWorkPeriodEntity,
    ): SpecialCategoryRetirementAnalysisWorkPeriodTypeormEntity => {
      return SpecialCategoryRetirementAnalysisWorkPeriodTypeormEntity.build({
        id: source.id.toString(),
        specialCategoryRetirementAnalysis: {
          id: source.specialCategoryRetirementAnalysisId.toString(),
        } as unknown as SpecialCategoryRetirementAnalysisTypeormEntity,
        publicServiceAdmissionDate: source.publicServiceAdmissionDate,
        publicServiceCareerStartDate: source.publicServiceCareerStartDate,
        workPeriodStartDate: source.workPeriodStartDate,
        workPeriodEndDate: source.workPeriodEndDate,
        jobPositionTitle: source.jobPositionTitle,
        careerPathName: source.careerPathName,
        publicServiceTypeCategory: source.publicServiceTypeCategory,
        specialTimeRegistrationType: source.specialTimeRegistrationType,
        effectiveSpecialWorkStartDate: source.effectiveSpecialWorkStartDate,
        effectiveSpecialWorkEndDate: source.effectiveSpecialWorkEndDate,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      SpecialCategoryRetirementAnalysisWorkPeriodEntity,
      SpecialCategoryRetirementAnalysisWorkPeriodTypeormEntity,
      constructUsing(convert),
    );
  }

  private mapOrmEntityToQueryResult(): void {
    const convert = (
      source: SpecialCategoryRetirementAnalysisWorkPeriodTypeormEntity,
    ): GetSpecialCategoryRetirementAnalysisWorkPeriodQueryResult => {
      if (!source.specialCategoryRetirementAnalysis) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass:
            GetSpecialCategoryRetirementAnalysisWorkPeriodQueryResult.name,
          sourceClass:
            SpecialCategoryRetirementAnalysisWorkPeriodTypeormEntity.name,
        });
      }

      const result =
        new GetSpecialCategoryRetirementAnalysisWorkPeriodQueryResult();
      Object.assign(result, {
        specialCategoryRetirementAnalysisWorkPeriodId:
          new SpecialCategoryRetirementAnalysisWorkPeriodId(source.id),
        specialCategoryRetirementAnalysisId:
          new SpecialCategoryRetirementAnalysisId(
            source.specialCategoryRetirementAnalysis.id,
          ),
        publicServiceAdmissionDate: source.publicServiceAdmissionDate,
        publicServiceCareerStartDate: source.publicServiceCareerStartDate,
        workPeriodStartDate: source.workPeriodStartDate,
        workPeriodEndDate: source.workPeriodEndDate,
        jobPositionTitle: source.jobPositionTitle,
        careerPathName: source.careerPathName,
        publicServiceTypeCategory: source.publicServiceTypeCategory,
        specialTimeRegistrationType: source.specialTimeRegistrationType,
        effectiveSpecialWorkStartDate: source.effectiveSpecialWorkStartDate,
        effectiveSpecialWorkEndDate: source.effectiveSpecialWorkEndDate,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
      return result;
    };

    createMap(
      this.mapper,
      SpecialCategoryRetirementAnalysisWorkPeriodTypeormEntity,
      GetSpecialCategoryRetirementAnalysisWorkPeriodQueryResult,
      constructUsing(convert),
    );
  }
}
