import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { RetirementPlanningRgpsSpecialPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rgps-special-period.typeorm.entity';
import { GetRetirementPlanningRgpsSpecialPeriodQueryResult } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rgps-special-period/query/result/get-retirement-planning-rgps-special-period.query.result';
import { RetirementPlanningRgpsSpecialPeriodId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-special-period/value-object/retirement-planning-rgps-special-period-id.value-object';

@Injectable()
export class GetRetirementPlanningRgpsSpecialPeriodQueryResultAutoMapperProfile {
  protected readonly _type =
    GetRetirementPlanningRgpsSpecialPeriodQueryResultAutoMapperProfile.name;

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
    ): GetRetirementPlanningRgpsSpecialPeriodQueryResult => {
      return GetRetirementPlanningRgpsSpecialPeriodQueryResult.build({
        ...source,
        id: new RetirementPlanningRgpsSpecialPeriodId(source.id),
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      RetirementPlanningRgpsSpecialPeriodTypeormEntity,
      GetRetirementPlanningRgpsSpecialPeriodQueryResult,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetRetirementPlanningRgpsSpecialPeriodQueryResult,
    ): RetirementPlanningRgpsSpecialPeriodTypeormEntity => {
      return RetirementPlanningRgpsSpecialPeriodTypeormEntity.build({
        ...source,
        id: source.id.toString(),
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetRetirementPlanningRgpsSpecialPeriodQueryResult,
      RetirementPlanningRgpsSpecialPeriodTypeormEntity,
      mappingFunction,
    );
  }
}
