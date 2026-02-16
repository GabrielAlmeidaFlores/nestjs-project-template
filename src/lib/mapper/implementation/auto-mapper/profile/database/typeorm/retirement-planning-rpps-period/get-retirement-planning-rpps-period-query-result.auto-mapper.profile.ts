import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { RetirementPlanningRppsPeriodDisabilityTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rpps-period-disability.typeorm.entity';
import { RetirementPlanningRppsPeriodSpecialTimeTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rpps-period-special-time.typeorm.entity';
import { RetirementPlanningRppsPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rpps-period.typeorm.entity';
import { GetRetirementPlanningRppsPeriodQueryResult } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/repository/retirement-planning-rpps-period/query/result/get-retirement-planning-rpps-period.query.result';
import { GetRetirementPlanningRppsPeriodDisabilityQueryResult } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/repository/retirement-planning-rpps-period-disability/query/result/get-retirement-planning-rpps-period-disability.query.result';
import { GetRetirementPlanningRppsPeriodSpecialTimeQueryResult } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/repository/retirement-planning-rpps-period-special-time/query/result/get-retirement-planning-rpps-period-special-time.query.result';
import { RetirementPlanningRppsPeriodId } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-period/value-object/retirement-planning-rpps-period-id.value-object';

@Injectable()
export class GetRetirementPlanningRppsPeriodQueryResultAutoMapperProfile {
  protected readonly _type =
    GetRetirementPlanningRppsPeriodQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: RetirementPlanningRppsPeriodTypeormEntity,
    ): GetRetirementPlanningRppsPeriodQueryResult => {
      const specialTimePeriod = source.specialTimePeriod
        ? this.mapper.map(
            source.specialTimePeriod,
            RetirementPlanningRppsPeriodSpecialTimeTypeormEntity,
            GetRetirementPlanningRppsPeriodSpecialTimeQueryResult,
          )
        : null;

      const disabilityPeriod = source.disabilityPeriod
        ? this.mapper.map(
            source.disabilityPeriod,
            RetirementPlanningRppsPeriodDisabilityTypeormEntity,
            GetRetirementPlanningRppsPeriodDisabilityQueryResult,
          )
        : null;

      return GetRetirementPlanningRppsPeriodQueryResult.build({
        ...source,
        id: new RetirementPlanningRppsPeriodId(source.id),
        specialTimePeriod,
        disabilityPeriod,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      RetirementPlanningRppsPeriodTypeormEntity,
      GetRetirementPlanningRppsPeriodQueryResult,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetRetirementPlanningRppsPeriodQueryResult,
    ): RetirementPlanningRppsPeriodTypeormEntity => {
      const specialTimePeriod = source.specialTimePeriod
        ? this.mapper.map(
            source.specialTimePeriod,
            GetRetirementPlanningRppsPeriodSpecialTimeQueryResult,
            RetirementPlanningRppsPeriodSpecialTimeTypeormEntity,
          )
        : undefined;

      const disabilityPeriod = source.disabilityPeriod
        ? this.mapper.map(
            source.disabilityPeriod,
            GetRetirementPlanningRppsPeriodDisabilityQueryResult,
            RetirementPlanningRppsPeriodDisabilityTypeormEntity,
          )
        : undefined;

      return RetirementPlanningRppsPeriodTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        specialTimePeriod,
        disabilityPeriod,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetRetirementPlanningRppsPeriodQueryResult,
      RetirementPlanningRppsPeriodTypeormEntity,
      mappingFunction,
    );
  }
}
