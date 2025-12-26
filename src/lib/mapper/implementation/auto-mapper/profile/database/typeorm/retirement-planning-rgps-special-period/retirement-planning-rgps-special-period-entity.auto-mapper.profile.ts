import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { RetirementPlanningRgpsSpecialPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rgps-special-period.typeorm.entity';
import { RetirementPlanningRgpsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rgps.typeorm.entity';
import { RetirementPlanningRgpsSpecialPeriodEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-special-period/retirement-planning-rgps-special-period.entity';
import { RetirementPlanningRgpsSpecialPeriodId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-special-period/value-object/retirement-planning-rgps-special-period-id.value-object';
import { RetirementPlanningRgpsEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps/retirement-planning-rgps.entity';

@Injectable()
export class RetirementPlanningRgpsSpecialPeriodEntityAutoMapperProfile {
  protected readonly _type =
    RetirementPlanningRgpsSpecialPeriodEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: RetirementPlanningRgpsSpecialPeriodTypeormEntity,
    ): RetirementPlanningRgpsSpecialPeriodEntity => {
      const retirementPlanningRgps = this.mapper.map(
        source.retirementPlanningRgps,
        RetirementPlanningRgpsTypeormEntity,
        RetirementPlanningRgpsEntity,
      );

      return new RetirementPlanningRgpsSpecialPeriodEntity({
        ...source,
        id: new RetirementPlanningRgpsSpecialPeriodId(source.id),
        retirementPlanningRgps,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      RetirementPlanningRgpsSpecialPeriodTypeormEntity,
      RetirementPlanningRgpsSpecialPeriodEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: RetirementPlanningRgpsSpecialPeriodEntity,
    ): RetirementPlanningRgpsSpecialPeriodTypeormEntity => {
      const retirementPlanningRgps = this.mapper.map(
        source.retirementPlanningRgps,
        RetirementPlanningRgpsEntity,
        RetirementPlanningRgpsTypeormEntity,
      );

      return RetirementPlanningRgpsSpecialPeriodTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        retirementPlanningRgps,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      RetirementPlanningRgpsSpecialPeriodEntity,
      RetirementPlanningRgpsSpecialPeriodTypeormEntity,
      mappingFunction,
    );
  }
}
