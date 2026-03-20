import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DisabilityRetirementPlanningPeriodSpecialTimeTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-period-special-time.typeorm.entity';
import { DisabilityRetirementPlanningPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-period.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { DisabilityRetirementPlanningPeriodEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-period/disability-retirement-planning-period.entity';
import { DisabilityRetirementPlanningPeriodSpecialTimeEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-period-special-time/disability-retirement-planning-period-special-time.entity';
import { DisabilityRetirementPlanningPeriodSpecialTimeId } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-period-special-time/value-object/disability-retirement-planning-period-special-time-id.value-object';

@Injectable()
export class DisabilityRetirementPlanningPeriodSpecialTimeEntityAutoMapperProfile {
  protected readonly _type =
    DisabilityRetirementPlanningPeriodSpecialTimeEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: DisabilityRetirementPlanningPeriodSpecialTimeTypeormEntity,
    ): DisabilityRetirementPlanningPeriodSpecialTimeEntity => {
      if (!source.disabilityRetirementPlanningPeriod) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass:
            DisabilityRetirementPlanningPeriodSpecialTimeEntity.name,
          sourceClass:
            DisabilityRetirementPlanningPeriodSpecialTimeTypeormEntity.name,
        });
      }

      const disabilityRetirementPlanningPeriod = this.mapper.map(
        source.disabilityRetirementPlanningPeriod,
        DisabilityRetirementPlanningPeriodTypeormEntity,
        DisabilityRetirementPlanningPeriodEntity,
      );

      return new DisabilityRetirementPlanningPeriodSpecialTimeEntity({
        id: new DisabilityRetirementPlanningPeriodSpecialTimeId(source.id),
        startDate: source.startDate,
        endDate: source.endDate,
        specialPeriodType: source.specialPeriodType,
        disabilityRetirementPlanningPeriod,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      DisabilityRetirementPlanningPeriodSpecialTimeTypeormEntity,
      DisabilityRetirementPlanningPeriodSpecialTimeEntity,
      constructUsing(convertOrmEntityToDomainEntity),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: DisabilityRetirementPlanningPeriodSpecialTimeEntity,
    ): DisabilityRetirementPlanningPeriodSpecialTimeTypeormEntity => {
      const disabilityRetirementPlanningPeriod = this.mapper.map(
        source.disabilityRetirementPlanningPeriod,
        DisabilityRetirementPlanningPeriodEntity,
        DisabilityRetirementPlanningPeriodTypeormEntity,
      );

      return DisabilityRetirementPlanningPeriodSpecialTimeTypeormEntity.build({
        id: source.id.toString(),
        startDate: source.startDate,
        endDate: source.endDate,
        specialPeriodType: source.specialPeriodType,
        disabilityRetirementPlanningPeriod,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      DisabilityRetirementPlanningPeriodSpecialTimeEntity,
      DisabilityRetirementPlanningPeriodSpecialTimeTypeormEntity,
      constructUsing(convertDomainEntityToOrmEntity),
    );
  }
}
