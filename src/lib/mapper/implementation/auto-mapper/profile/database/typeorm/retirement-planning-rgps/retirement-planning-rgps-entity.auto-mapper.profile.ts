import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { RetirementPlanningRgpsResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rgps-result.typeorm.entity';
import { RetirementPlanningRgpsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rgps.typeorm.entity';
import { RetirementPlanningRgpsResultEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-result/retirement-planning-rgps-result.entity';
import { RetirementPlanningRgpsEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps/retirement-planning-rgps.entity';
import { RetirementPlanningRgpsId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps/value-object/retirement-planning-rgps-id.value-object';

@Injectable()
export class RetirementPlanningRgpsEntityAutoMapperProfile {
  protected readonly _type = RetirementPlanningRgpsEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: RetirementPlanningRgpsTypeormEntity,
    ): RetirementPlanningRgpsEntity => {
      const retirementPlanningRgpsResult = this.mapper.map(
        source.retirementPlanningRgpsResult,
        RetirementPlanningRgpsResultTypeormEntity,
        RetirementPlanningRgpsResultEntity,
      );

      return new RetirementPlanningRgpsEntity({
        ...source,
        id: new RetirementPlanningRgpsId(source.id),
        retirementPlanningRgpsResult,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      RetirementPlanningRgpsTypeormEntity,
      RetirementPlanningRgpsEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: RetirementPlanningRgpsEntity,
    ): RetirementPlanningRgpsTypeormEntity => {
      const retirementPlanningRgpsResult = this.mapper.map(
        source.retirementPlanningRgpsResult,
        RetirementPlanningRgpsResultEntity,
        RetirementPlanningRgpsResultTypeormEntity,
      );

      return RetirementPlanningRgpsTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        retirementPlanningRgpsResult,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      RetirementPlanningRgpsEntity,
      RetirementPlanningRgpsTypeormEntity,
      mappingFunction,
    );
  }
}
