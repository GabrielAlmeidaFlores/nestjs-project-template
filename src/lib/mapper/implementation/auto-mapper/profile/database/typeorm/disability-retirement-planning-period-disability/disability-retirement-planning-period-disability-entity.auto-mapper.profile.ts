import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DisabilityRetirementPlanningPeriodDisabilityTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-period-disability.typeorm.entity';
import { DisabilityRetirementPlanningPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-period.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { DisabilityRetirementPlanningPeriodDisabilityEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-period-disability/disability-retirement-planning-period-disability.entity';
import { DisabilityRetirementPlanningPeriodDisabilityId } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-period-disability/value-object/disability-retirement-planning-period-disability-id.value-object';
import { DisabilityRetirementPlanningPeriodEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-period/disability-retirement-planning-period.entity';

@Injectable()
export class DisabilityRetirementPlanningPeriodDisabilityEntityAutoMapperProfile {
  protected readonly _type = DisabilityRetirementPlanningPeriodDisabilityEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: DisabilityRetirementPlanningPeriodDisabilityTypeormEntity,
    ): DisabilityRetirementPlanningPeriodDisabilityEntity => {
      if (!source.disabilityRetirementPlanningPeriod) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass: DisabilityRetirementPlanningPeriodDisabilityEntity.name,
          sourceClass: DisabilityRetirementPlanningPeriodDisabilityTypeormEntity.name,
        });
      }

      const disabilityRetirementPlanningPeriod = this.mapper.map(
        source.disabilityRetirementPlanningPeriod,
        DisabilityRetirementPlanningPeriodTypeormEntity,
        DisabilityRetirementPlanningPeriodEntity,
      );

      return new DisabilityRetirementPlanningPeriodDisabilityEntity({
        id: new DisabilityRetirementPlanningPeriodDisabilityId(source.id),
        disabilityRetirementPlanningPeriod,
        startDate: source.startDate,
        endDate: source.endDate,
        disabilityDegree: source.disabilityDegree,
        cidTenId: source.cidTen?.id ?? null,
        disabilityType: source.disabilityType,
        disabilityDescription: source.disabilityDescription,
        activityImpact: source.activityImpact,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      DisabilityRetirementPlanningPeriodDisabilityTypeormEntity,
      DisabilityRetirementPlanningPeriodDisabilityEntity,
      constructUsing(convertOrmEntityToDomainEntity),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: DisabilityRetirementPlanningPeriodDisabilityEntity,
    ): DisabilityRetirementPlanningPeriodDisabilityTypeormEntity => {
      const disabilityRetirementPlanningPeriod = this.mapper.map(
        source.disabilityRetirementPlanningPeriod,
        DisabilityRetirementPlanningPeriodEntity,
        DisabilityRetirementPlanningPeriodTypeormEntity,
      );

      return DisabilityRetirementPlanningPeriodDisabilityTypeormEntity.build({
        id: source.id.toString(),
        startDate: source.startDate,
        endDate: source.endDate,
        disabilityDegree: source.disabilityDegree,
        disabilityType: source.disabilityType,
        disabilityDescription: source.disabilityDescription,
        activityImpact: source.activityImpact,
        disabilityRetirementPlanningPeriod,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      DisabilityRetirementPlanningPeriodDisabilityEntity,
      DisabilityRetirementPlanningPeriodDisabilityTypeormEntity,
      constructUsing(convertDomainEntityToOrmEntity),
    );
  }
}
