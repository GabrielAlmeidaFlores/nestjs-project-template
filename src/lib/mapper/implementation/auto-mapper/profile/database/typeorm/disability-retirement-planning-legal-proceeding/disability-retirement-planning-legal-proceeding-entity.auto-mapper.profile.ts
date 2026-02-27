import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DisabilityRetirementPlanningLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-legal-proceeding.typeorm.entity';
import { DisabilityRetirementPlanningTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { DisabilityRetirementPlanningLegalProceedingEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-legal-proceeding/disability-retirement-planning-legal-proceeding.entity';
import { DisabilityRetirementPlanningLegalProceedingId } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-legal-proceeding/value-object/disability-retirement-planning-legal-proceeding-id.value-object';
import { DisabilityRetirementPlanningEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning/disability-retirement-planning.entity';

@Injectable()
export class DisabilityRetirementPlanningLegalProceedingEntityAutoMapperProfile {
  protected readonly _type =
    DisabilityRetirementPlanningLegalProceedingEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: DisabilityRetirementPlanningLegalProceedingTypeormEntity,
    ): DisabilityRetirementPlanningLegalProceedingEntity => {
      if (!source.disabilityRetirementPlanning) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass:
            DisabilityRetirementPlanningLegalProceedingEntity.name,
          sourceClass:
            DisabilityRetirementPlanningLegalProceedingTypeormEntity.name,
        });
      }

      const disabilityRetirementPlanning = this.mapper.map(
        source.disabilityRetirementPlanning,
        DisabilityRetirementPlanningTypeormEntity,
        DisabilityRetirementPlanningEntity,
      );

      return new DisabilityRetirementPlanningLegalProceedingEntity({
        id: new DisabilityRetirementPlanningLegalProceedingId(source.id),
        legalProceedingNumber: source.legalProceedingNumber,
        disabilityRetirementPlanning,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      DisabilityRetirementPlanningLegalProceedingTypeormEntity,
      DisabilityRetirementPlanningLegalProceedingEntity,
      constructUsing(convertOrmEntityToDomainEntity),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: DisabilityRetirementPlanningLegalProceedingEntity,
    ): DisabilityRetirementPlanningLegalProceedingTypeormEntity => {
      const disabilityRetirementPlanning = this.mapper.map(
        source.disabilityRetirementPlanning,
        DisabilityRetirementPlanningEntity,
        DisabilityRetirementPlanningTypeormEntity,
      );

      return DisabilityRetirementPlanningLegalProceedingTypeormEntity.build({
        id: source.id.toString(),
        legalProceedingNumber: source.legalProceedingNumber,
        disabilityRetirementPlanning,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      DisabilityRetirementPlanningLegalProceedingEntity,
      DisabilityRetirementPlanningLegalProceedingTypeormEntity,
      constructUsing(convertDomainEntityToOrmEntity),
    );
  }
}
