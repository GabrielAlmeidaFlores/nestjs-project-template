import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { RetirementPlanningRgpsTimeAcceleratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rgps-time-accelerator.typeorm.entity';
import { GetRetirementPlanningRgpsTimeAcceleratorQueryResult } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/repository/retirement-planning-rgps-time-accelerator/query/result/get-retirement-planning-rgps-time-accelerator.query.result';
import { RetirementPlanningRgpsId } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps/value-object/retirement-planning-rgps-id.value-object';
import { RetirementPlanningRgpsTimeAcceleratorId } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps-time-accelerator/value-object/retirement-planning-rgps-time-accelerator-id.value-object';

@Injectable()
export class GetRetirementPlanningRgpsTimeAcceleratorQueryResultAutoMapperProfile {
  protected readonly _type =
    GetRetirementPlanningRgpsTimeAcceleratorQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: RetirementPlanningRgpsTimeAcceleratorTypeormEntity,
    ): GetRetirementPlanningRgpsTimeAcceleratorQueryResult => {
      const { retirementPlanningRgps, ...rest } = source;
      return GetRetirementPlanningRgpsTimeAcceleratorQueryResult.build({
        ...rest,
        id: new RetirementPlanningRgpsTimeAcceleratorId(source.id),
        retirementPlanningRgpsId:
          retirementPlanningRgps?.id != null
            ? new RetirementPlanningRgpsId(retirementPlanningRgps.id)
            : null,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      RetirementPlanningRgpsTimeAcceleratorTypeormEntity,
      GetRetirementPlanningRgpsTimeAcceleratorQueryResult,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetRetirementPlanningRgpsTimeAcceleratorQueryResult,
    ): RetirementPlanningRgpsTimeAcceleratorTypeormEntity => {
      const { retirementPlanningRgpsId: _retirementPlanningRgpsId, ...rest } =
        source;
      return RetirementPlanningRgpsTimeAcceleratorTypeormEntity.build({
        ...rest,
        id: source.id.toString(),
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetRetirementPlanningRgpsTimeAcceleratorQueryResult,
      RetirementPlanningRgpsTimeAcceleratorTypeormEntity,
      mappingFunction,
    );
  }
}
