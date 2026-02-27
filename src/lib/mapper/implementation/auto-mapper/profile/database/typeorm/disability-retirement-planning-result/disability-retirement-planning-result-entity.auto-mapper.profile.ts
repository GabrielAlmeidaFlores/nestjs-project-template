import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DisabilityRetirementPlanningResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-result.typeorm.entity';
import { DisabilityRetirementPlanningTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { DisabilityRetirementPlanningResultEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-result/disability-retirement-planning-result.entity';
import { DisabilityRetirementPlanningResultId } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-result/value-object/disability-retirement-planning-result-id.value-object';
import { DisabilityRetirementPlanningEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning/disability-retirement-planning.entity';

@Injectable()
export class DisabilityRetirementPlanningResultEntityAutoMapperProfile {
  protected readonly _type =
    DisabilityRetirementPlanningResultEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: DisabilityRetirementPlanningResultTypeormEntity,
    ): DisabilityRetirementPlanningResultEntity => {
      if (!source.disabilityRetirementPlanning) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass: DisabilityRetirementPlanningResultEntity.name,
          sourceClass: DisabilityRetirementPlanningResultTypeormEntity.name,
        });
      }

      const disabilityRetirementPlanning = this.mapper.map(
        source.disabilityRetirementPlanning,
        DisabilityRetirementPlanningTypeormEntity,
        DisabilityRetirementPlanningEntity,
      );

      return new DisabilityRetirementPlanningResultEntity({
        id: new DisabilityRetirementPlanningResultId(source.id),
        disabilityRetirementPlanning,
        disabilityRetirementPlanningCompleteAnalysis:
          source.disabilityRetirementPlanningCompleteAnalysis,
        disabilityRetirementPlanningSimplifiedAnalysis:
          source.disabilityRetirementPlanningSimplifiedAnalysis,
        disabilityRetirementPlanningCompleteAnalysisDownload:
          source.disabilityRetirementPlanningCompleteAnalysisDownload,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      DisabilityRetirementPlanningResultTypeormEntity,
      DisabilityRetirementPlanningResultEntity,
      constructUsing(convertOrmEntityToDomainEntity),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: DisabilityRetirementPlanningResultEntity,
    ): DisabilityRetirementPlanningResultTypeormEntity => {
      const disabilityRetirementPlanning = this.mapper.map(
        source.disabilityRetirementPlanning,
        DisabilityRetirementPlanningEntity,
        DisabilityRetirementPlanningTypeormEntity,
      );

      return DisabilityRetirementPlanningResultTypeormEntity.build({
        id: source.id.toString(),
        disabilityRetirementPlanning,
        disabilityRetirementPlanningCompleteAnalysis:
          source.disabilityRetirementPlanningCompleteAnalysis,
        disabilityRetirementPlanningSimplifiedAnalysis:
          source.disabilityRetirementPlanningSimplifiedAnalysis,
        disabilityRetirementPlanningCompleteAnalysisDownload:
          source.disabilityRetirementPlanningCompleteAnalysisDownload,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      DisabilityRetirementPlanningResultEntity,
      DisabilityRetirementPlanningResultTypeormEntity,
      constructUsing(convertDomainEntityToOrmEntity),
    );
  }
}
