import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { RetirementPlanningRgpsPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rgps-period.typeorm.entity';
import { GetRetirementPlanningRgpsPeriodQueryResult } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rgps-period/query/result/get-retirement-planning-rgps-period-query.result';
import { RetirementPlanningRgpsPeriodId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-period/value-object/retirement-planning-rgps-period-id.value-object';

@Injectable()
export class GetRetirementPlanningRgpsPeriodQueryResultAutoMapperProfile {
  protected readonly _type =
    GetRetirementPlanningRgpsPeriodQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: RetirementPlanningRgpsPeriodTypeormEntity,
    ): GetRetirementPlanningRgpsPeriodQueryResult => {
      return GetRetirementPlanningRgpsPeriodQueryResult.build({
        ...source,
        id: new RetirementPlanningRgpsPeriodId(source.id),
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      RetirementPlanningRgpsPeriodTypeormEntity,
      GetRetirementPlanningRgpsPeriodQueryResult,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetRetirementPlanningRgpsPeriodQueryResult,
    ): RetirementPlanningRgpsPeriodTypeormEntity => {
      return RetirementPlanningRgpsPeriodTypeormEntity.build({
        ...source,
        id: source.id.toString(),
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetRetirementPlanningRgpsPeriodQueryResult,
      RetirementPlanningRgpsPeriodTypeormEntity,
      mappingFunction,
    );
  }
}
