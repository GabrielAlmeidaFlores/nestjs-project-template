import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DisabilityRetirementPlanningDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-document.typeorm.entity';
import { DisabilityRetirementPlanningTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { DisabilityRetirementPlanningEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning/disability-retirement-planning.entity';
import { DisabilityRetirementPlanningDocumentEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-document/disability-retirement-planning-document.entity';
import { DisabilityRetirementPlanningDocumentId } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-document/value-object/disability-retirement-planning-document-id.value-object';

@Injectable()
export class DisabilityRetirementPlanningDocumentEntityAutoMapperProfile {
  protected readonly _type =
    DisabilityRetirementPlanningDocumentEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: DisabilityRetirementPlanningDocumentTypeormEntity,
    ): DisabilityRetirementPlanningDocumentEntity => {
      if (!source.disabilityRetirementPlanning) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass: DisabilityRetirementPlanningDocumentEntity.name,
          sourceClass: DisabilityRetirementPlanningDocumentTypeormEntity.name,
        });
      }

      const disabilityRetirementPlanning = this.mapper.map(
        source.disabilityRetirementPlanning,
        DisabilityRetirementPlanningTypeormEntity,
        DisabilityRetirementPlanningEntity,
      );

      return new DisabilityRetirementPlanningDocumentEntity({
        id: new DisabilityRetirementPlanningDocumentId(source.id),
        document: source.document,
        type: source.type,
        disabilityRetirementPlanning,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      DisabilityRetirementPlanningDocumentTypeormEntity,
      DisabilityRetirementPlanningDocumentEntity,
      constructUsing(convertOrmEntityToDomainEntity),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: DisabilityRetirementPlanningDocumentEntity,
    ): DisabilityRetirementPlanningDocumentTypeormEntity => {
      const disabilityRetirementPlanning = this.mapper.map(
        source.disabilityRetirementPlanning,
        DisabilityRetirementPlanningEntity,
        DisabilityRetirementPlanningTypeormEntity,
      );

      return DisabilityRetirementPlanningDocumentTypeormEntity.build({
        id: source.id.toString(),
        document: source.document,
        type: source.type,
        disabilityRetirementPlanning,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      DisabilityRetirementPlanningDocumentEntity,
      DisabilityRetirementPlanningDocumentTypeormEntity,
      constructUsing(convertDomainEntityToOrmEntity),
    );
  }
}
