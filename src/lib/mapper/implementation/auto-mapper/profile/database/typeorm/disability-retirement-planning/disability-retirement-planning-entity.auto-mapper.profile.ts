import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DisabilityRetirementPlanningTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning.typeorm.entity';
import { DisabilityRetirementPlanningEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning/disability-retirement-planning.entity';
import { DisabilityRetirementPlanningId } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning/value-object/disability-retirement-planning-id.value-object';

@Injectable()
export class DisabilityRetirementPlanningEntityAutoMapperProfile {
  protected readonly _type =
    DisabilityRetirementPlanningEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: DisabilityRetirementPlanningTypeormEntity,
    ): DisabilityRetirementPlanningEntity => {
      return new DisabilityRetirementPlanningEntity({
        id: new DisabilityRetirementPlanningId(source.id),
        currentPosition: source.currentPosition,
        federativeEntity: source.federativeEntity,
        state: source.state,
        municipality: source.municipality,
        publicServiceStartDate: source.publicServiceStartDate,
        careerStartDate: source.careerStartDate,
        analysisName: source.analysisName,
        longTimeDisability: source.longTimeDisability,
        administrativeProcessAnalysis: source.administrativeProcessAnalysis,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      DisabilityRetirementPlanningTypeormEntity,
      DisabilityRetirementPlanningEntity,
      constructUsing(convertOrmEntityToDomainEntity),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: DisabilityRetirementPlanningEntity,
    ): DisabilityRetirementPlanningTypeormEntity => {
      return DisabilityRetirementPlanningTypeormEntity.build({
        id: source.id.toString(),
        currentPosition: source.currentPosition,
        federativeEntity: source.federativeEntity,
        state: source.state,
        municipality: source.municipality,
        publicServiceStartDate: source.publicServiceStartDate,
        careerStartDate: source.careerStartDate,
        analysisName: source.analysisName,
        longTimeDisability: source.longTimeDisability,
        administrativeProcessAnalysis: source.administrativeProcessAnalysis,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      DisabilityRetirementPlanningEntity,
      DisabilityRetirementPlanningTypeormEntity,
      constructUsing(convertDomainEntityToOrmEntity),
    );
  }
}
