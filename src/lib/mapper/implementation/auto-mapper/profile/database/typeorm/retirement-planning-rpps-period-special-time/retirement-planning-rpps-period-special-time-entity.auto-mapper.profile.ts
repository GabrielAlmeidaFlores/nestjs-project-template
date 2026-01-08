import { createMap, Mapper, constructUsing } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { RetirementPlanningRppsPeriodSpecialTimeTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rpps-period-special-time.typeorm.entity';
import { RetirementPlanningRppsPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rpps-period.typeorm.entity';
import { RetirementPlanningRppsPeriodEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-period/retirement-planning-rpps-period.entity';
import { RetirementPlanningRppsPeriodSpecialTimeEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-period-special-time/retirement-planning-rpps-period-special-time.entity';
import { RetirementPlanningRppsPeriodSpecialTimeId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-period-special-time/value-object/retirement-planning-rpps-period-special-time-id.value-object';

@Injectable()
export class RetirementPlanningRppsPeriodSpecialTimeEntityAutoMapperProfile {
  protected readonly _type =
    RetirementPlanningRppsPeriodSpecialTimeEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: RetirementPlanningRppsPeriodSpecialTimeTypeormEntity,
    ): RetirementPlanningRppsPeriodSpecialTimeEntity => {
      const retirementPlanningRppsPeriod = this.mapper.map(
        source.retirementPlanningRppsPeriod,
        RetirementPlanningRppsPeriodTypeormEntity,
        RetirementPlanningRppsPeriodEntity,
      );

      return new RetirementPlanningRppsPeriodSpecialTimeEntity({
        ...source,
        id: new RetirementPlanningRppsPeriodSpecialTimeId(source.id),
        retirementPlanningRppsPeriod,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      RetirementPlanningRppsPeriodSpecialTimeTypeormEntity,
      RetirementPlanningRppsPeriodSpecialTimeEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: RetirementPlanningRppsPeriodSpecialTimeEntity,
    ): RetirementPlanningRppsPeriodSpecialTimeTypeormEntity => {
      const retirementPlanningRppsPeriod = this.mapper.map(
        source.retirementPlanningRppsPeriod,
        RetirementPlanningRppsPeriodEntity,
        RetirementPlanningRppsPeriodTypeormEntity,
      );

      return RetirementPlanningRppsPeriodSpecialTimeTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        retirementPlanningRppsPeriod,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      RetirementPlanningRppsPeriodSpecialTimeEntity,
      RetirementPlanningRppsPeriodSpecialTimeTypeormEntity,
      mappingFunction,
    );
  }
}
