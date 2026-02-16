import { createMap, Mapper, constructUsing } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { RetirementPlanningRppsPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rpps-period.typeorm.entity';
import { RetirementPlanningRppsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rpps.typeorm.entity';
import { RetirementPlanningRppsEntity } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps/retirement-planning-rpps-entity';
import { RetirementPlanningRppsPeriodEntity } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-period/retirement-planning-rpps-period.entity';
import { RetirementPlanningRppsPeriodId } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-period/value-object/retirement-planning-rpps-period-id.value-object';

@Injectable()
export class RetirementPlanningRppsPeriodEntityAutoMapperProfile {
  protected readonly _type =
    RetirementPlanningRppsPeriodEntityAutoMapperProfile.name;

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
    ): RetirementPlanningRppsPeriodEntity => {
      const retirementPlanningRpps = this.mapper.map(
        source.retirementPlanningRpps,
        RetirementPlanningRppsTypeormEntity,
        RetirementPlanningRppsEntity,
      );

      return new RetirementPlanningRppsPeriodEntity({
        ...source,
        id: new RetirementPlanningRppsPeriodId(source.id),
        retirementPlanningRpps,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      RetirementPlanningRppsPeriodTypeormEntity,
      RetirementPlanningRppsPeriodEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: RetirementPlanningRppsPeriodEntity,
    ): RetirementPlanningRppsPeriodTypeormEntity => {
      const retirementPlanningRpps = this.mapper.map(
        source.retirementPlanningRpps,
        RetirementPlanningRppsEntity,
        RetirementPlanningRppsTypeormEntity,
      );

      return RetirementPlanningRppsPeriodTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        retirementPlanningRpps,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      RetirementPlanningRppsPeriodEntity,
      RetirementPlanningRppsPeriodTypeormEntity,
      mappingFunction,
    );
  }
}
