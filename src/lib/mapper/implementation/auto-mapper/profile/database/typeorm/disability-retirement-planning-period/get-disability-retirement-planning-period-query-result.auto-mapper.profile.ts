import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DisabilityRetirementPlanningPeriodDisabilityTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-period-disability.typeorm.entity';
import { DisabilityRetirementPlanningPeriodSpecialTimeTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-period-special-time.typeorm.entity';
import { DisabilityRetirementPlanningPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-period.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { GetDisabilityRetirementPlanningPeriodDisabilityQueryResult, GetDisabilityRetirementPlanningPeriodQueryResult, GetDisabilityRetirementPlanningPeriodSpecialTimeQueryResult } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/repository/disability-retirement-planning/query/result/get-disability-retirement-planning-with-relations.query.result';

@Injectable()
export class GetDisabilityRetirementPlanningPeriodQueryResultAutoMapperProfile {
  protected readonly _type = GetDisabilityRetirementPlanningPeriodQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: DisabilityRetirementPlanningPeriodTypeormEntity,
    ): GetDisabilityRetirementPlanningPeriodQueryResult => {
      if (!source.disabilityRetirementPlanningPeriodDisability || !source.disabilityRetirementPlanningPeriodSpecialTime) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass: GetDisabilityRetirementPlanningPeriodQueryResult.name,
          sourceClass: DisabilityRetirementPlanningPeriodTypeormEntity.name,
        });
      }

      const disabilities = this.mapper.mapArray(
        source.disabilityRetirementPlanningPeriodDisability,
        DisabilityRetirementPlanningPeriodDisabilityTypeormEntity,
        GetDisabilityRetirementPlanningPeriodDisabilityQueryResult,
      );

      const specialTimes = this.mapper.mapArray(
        source.disabilityRetirementPlanningPeriodSpecialTime,
        DisabilityRetirementPlanningPeriodSpecialTimeTypeormEntity,
        GetDisabilityRetirementPlanningPeriodSpecialTimeQueryResult,
      );

      return GetDisabilityRetirementPlanningPeriodQueryResult.build({
        id: source.id,
        startDate: source.startDate,
        endDate: source.endDate,
        jobPosition: source.jobPosition,
        careerName: source.careerName,
        serviceType: source.serviceType,
        department: source.department,
        disabilities,
        specialTimes,
      });
    };

    createMap(
      this.mapper,
      DisabilityRetirementPlanningPeriodTypeormEntity,
      GetDisabilityRetirementPlanningPeriodQueryResult,
      constructUsing(convertOrmEntityToDomainEntity),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetDisabilityRetirementPlanningPeriodQueryResult,
    ): DisabilityRetirementPlanningPeriodTypeormEntity => {
      const disabilities = this.mapper.mapArray(
        source.disabilities,
        GetDisabilityRetirementPlanningPeriodDisabilityQueryResult,
        DisabilityRetirementPlanningPeriodDisabilityTypeormEntity,
      );

      const specialTimes = this.mapper.mapArray(
        source.specialTimes,
        GetDisabilityRetirementPlanningPeriodSpecialTimeQueryResult,
        DisabilityRetirementPlanningPeriodSpecialTimeTypeormEntity,
      );

      return DisabilityRetirementPlanningPeriodTypeormEntity.build({
        id: source.id,
        startDate: source.startDate,
        endDate: source.endDate,
        jobPosition: source.jobPosition,
        careerName: source.careerName,
        serviceType: source.serviceType,
        department: source.department,
        disabilityRetirementPlanningPeriodDisability: disabilities,
        disabilityRetirementPlanningPeriodSpecialTime: specialTimes,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      });
    };

    createMap(
      this.mapper,
      GetDisabilityRetirementPlanningPeriodQueryResult,
      DisabilityRetirementPlanningPeriodTypeormEntity,
      constructUsing(convertDomainEntityToOrmEntity),
    );
  }
}
