import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DisabilityRetirementPlanningRemunerationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-remuneration.typeorm.entity';
import { DisabilityRetirementPlanningTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { DisabilityRetirementPlanningRemunerationEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-remuneration/disability-retirement-planning-remuneration.entity';
import { DisabilityRetirementPlanningRemunerationId } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-remuneration/value-object/disability-retirement-planning-remuneration-id.value-object';
import { DisabilityRetirementPlanningEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning/disability-retirement-planning.entity';

@Injectable()
export class DisabilityRetirementPlanningRemunerationEntityAutoMapperProfile {
  protected readonly _type = DisabilityRetirementPlanningRemunerationEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: DisabilityRetirementPlanningRemunerationTypeormEntity,
    ): DisabilityRetirementPlanningRemunerationEntity => {
      if (!source.disabilityRetirementPlanning) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass: DisabilityRetirementPlanningRemunerationEntity.name,
          sourceClass: DisabilityRetirementPlanningRemunerationTypeormEntity.name,
        });
      }

      const disabilityRetirementPlanning = this.mapper.map(
        source.disabilityRetirementPlanning,
        DisabilityRetirementPlanningTypeormEntity,
        DisabilityRetirementPlanningEntity,
      );

      return new DisabilityRetirementPlanningRemunerationEntity({
        id: new DisabilityRetirementPlanningRemunerationId(source.id),
        remunerationDate: source.remunerationDate,
        remunerationAmount: parseFloat(source.remunerationAmount),
        disabilityRetirementPlanning,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      DisabilityRetirementPlanningRemunerationTypeormEntity,
      DisabilityRetirementPlanningRemunerationEntity,
      constructUsing(convertOrmEntityToDomainEntity),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: DisabilityRetirementPlanningRemunerationEntity,
    ): DisabilityRetirementPlanningRemunerationTypeormEntity => {
      const disabilityRetirementPlanning = this.mapper.map(
        source.disabilityRetirementPlanning,
        DisabilityRetirementPlanningEntity,
        DisabilityRetirementPlanningTypeormEntity,
      );

      return DisabilityRetirementPlanningRemunerationTypeormEntity.build({
        id: source.id.toString(),
        remunerationDate: source.remunerationDate,
        remunerationAmount: String(source.remunerationAmount),
        disabilityRetirementPlanning,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      DisabilityRetirementPlanningRemunerationEntity,
      DisabilityRetirementPlanningRemunerationTypeormEntity,
      constructUsing(convertDomainEntityToOrmEntity),
    );
  }
}
