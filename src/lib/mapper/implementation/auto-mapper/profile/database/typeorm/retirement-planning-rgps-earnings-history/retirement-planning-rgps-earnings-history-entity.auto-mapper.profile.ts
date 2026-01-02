import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { RetirementPlanningRgpsEarningsHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rgps-earnings-history.typeorm.entity';
import { RetirementPlanningRgpsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rgps.typeorm.entity';
import { RetirementPlanningRgpsEarningsHistoryEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-earnings-history/retirement-planning-rgps-earnings-history.entity';
import { RetirementPlanningRgpsEarningsHistoryId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-earnings-history/value-object/retirement-planning-rgps-earnings-history-id.value-object';
import { RetirementPlanningRgpsEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps/retirement-planning-rgps.entity';

@Injectable()
export class RetirementPlanningRgpsEarningsHistoryEntityAutoMapperProfile {
  protected readonly _type =
    RetirementPlanningRgpsEarningsHistoryEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: RetirementPlanningRgpsEarningsHistoryTypeormEntity,
    ): RetirementPlanningRgpsEarningsHistoryEntity => {
      const retirementPlanningRgps = this.mapper.map(
        source.retirementPlanningRgps,
        RetirementPlanningRgpsTypeormEntity,
        RetirementPlanningRgpsEntity,
      );

      return new RetirementPlanningRgpsEarningsHistoryEntity({
        ...source,
        id: new RetirementPlanningRgpsEarningsHistoryId(source.id),
        retirementPlanningRgps,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      RetirementPlanningRgpsEarningsHistoryTypeormEntity,
      RetirementPlanningRgpsEarningsHistoryEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: RetirementPlanningRgpsEarningsHistoryEntity,
    ): RetirementPlanningRgpsEarningsHistoryTypeormEntity => {
      const retirementPlanningRgps = this.mapper.map(
        source.retirementPlanningRgps,
        RetirementPlanningRgpsEntity,
        RetirementPlanningRgpsTypeormEntity,
      );

      return RetirementPlanningRgpsEarningsHistoryTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        retirementPlanningRgps,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      RetirementPlanningRgpsEarningsHistoryEntity,
      RetirementPlanningRgpsEarningsHistoryTypeormEntity,
      mappingFunction,
    );
  }
}
