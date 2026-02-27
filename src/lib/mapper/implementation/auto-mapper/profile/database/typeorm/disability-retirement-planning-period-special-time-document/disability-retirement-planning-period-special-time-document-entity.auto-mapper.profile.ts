import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DisabilityRetirementPlanningPeriodSpecialTimeDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-period-special-time-document.typeorm.entity';
import { DisabilityRetirementPlanningPeriodSpecialTimeTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-period-special-time.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { DisabilityRetirementPlanningPeriodSpecialTimeDocumentEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-period-special-time-document/disability-retirement-planning-period-special-time-document.entity';
import { DisabilityRetirementPlanningPeriodSpecialTimeDocumentId } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-period-special-time-document/value-object/disability-retirement-planning-period-special-time-document-id.value-object';
import { DisabilityRetirementPlanningPeriodSpecialTimeEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-period-special-time/disability-retirement-planning-period-special-time.entity';

@Injectable()
export class DisabilityRetirementPlanningPeriodSpecialTimeDocumentEntityAutoMapperProfile {
  protected readonly _type = DisabilityRetirementPlanningPeriodSpecialTimeDocumentEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: DisabilityRetirementPlanningPeriodSpecialTimeDocumentTypeormEntity,
    ): DisabilityRetirementPlanningPeriodSpecialTimeDocumentEntity => {
      if (!source.disabilityRetirementPlanningPeriodSpecialTime) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass: DisabilityRetirementPlanningPeriodSpecialTimeDocumentEntity.name,
          sourceClass: DisabilityRetirementPlanningPeriodSpecialTimeDocumentTypeormEntity.name,
        });
      }

      const disabilityRetirementPlanningPeriodSpecialTime = this.mapper.map(
        source.disabilityRetirementPlanningPeriodSpecialTime,
        DisabilityRetirementPlanningPeriodSpecialTimeTypeormEntity,
        DisabilityRetirementPlanningPeriodSpecialTimeEntity,
      );

      return new DisabilityRetirementPlanningPeriodSpecialTimeDocumentEntity({
        id: new DisabilityRetirementPlanningPeriodSpecialTimeDocumentId(source.id),
        document: source.document,
        disabilityRetirementPlanningPeriodSpecialTime,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      DisabilityRetirementPlanningPeriodSpecialTimeDocumentTypeormEntity,
      DisabilityRetirementPlanningPeriodSpecialTimeDocumentEntity,
      constructUsing(convertOrmEntityToDomainEntity),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: DisabilityRetirementPlanningPeriodSpecialTimeDocumentEntity,
    ): DisabilityRetirementPlanningPeriodSpecialTimeDocumentTypeormEntity => {
      const disabilityRetirementPlanningPeriodSpecialTime = this.mapper.map(
        source.disabilityRetirementPlanningPeriodSpecialTime,
        DisabilityRetirementPlanningPeriodSpecialTimeEntity,
        DisabilityRetirementPlanningPeriodSpecialTimeTypeormEntity,
      );

      return DisabilityRetirementPlanningPeriodSpecialTimeDocumentTypeormEntity.build({
        id: source.id.toString(),
        document: source.document,
        disabilityRetirementPlanningPeriodSpecialTime,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      DisabilityRetirementPlanningPeriodSpecialTimeDocumentEntity,
      DisabilityRetirementPlanningPeriodSpecialTimeDocumentTypeormEntity,
      constructUsing(convertDomainEntityToOrmEntity),
    );
  }
}
