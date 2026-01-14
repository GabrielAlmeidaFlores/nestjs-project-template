import { createMap, Mapper, constructUsing } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { CidTenTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/cid-ten.typeorm.entity';
import { RetirementPlanningRppsPeriodDisabilityTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rpps-period-disability.typeorm.entity';
import { RetirementPlanningRppsPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rpps-period.typeorm.entity';
import { CidTenEntity } from '@module/customer/analysis-tool/domain/schema/entity/cid-ten/cid-ten-entity';
import { RetirementPlanningRppsPeriodEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-period/retirement-planning-rpps-period.entity';
import { RetirementPlanningRppsPeriodDisabilityEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-period-disability/retirement-planning-rpps-period-disability.entity';
import { RetirementPlanningRppsPeriodDisabilityId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-period-disability/value-object/retirement-planning-rpps-period-disability-id.value-object';

@Injectable()
export class RetirementPlanningRppsPeriodDisabilityEntityAutoMapperProfile {
  protected readonly _type =
    RetirementPlanningRppsPeriodDisabilityEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: RetirementPlanningRppsPeriodDisabilityTypeormEntity,
    ): RetirementPlanningRppsPeriodDisabilityEntity => {
      const cidTen = this.mapper.map(
        source.cid,
        CidTenTypeormEntity,
        CidTenEntity,
      );

      const retirementPlanningRppsPeriod = this.mapper.map(
        source.retirementPlanningRppsPeriod,
        RetirementPlanningRppsPeriodTypeormEntity,
        RetirementPlanningRppsPeriodEntity,
      );

      return new RetirementPlanningRppsPeriodDisabilityEntity({
        ...source,
        id: new RetirementPlanningRppsPeriodDisabilityId(source.id),
        cidTen,
        retirementPlanningRppsPeriod,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      RetirementPlanningRppsPeriodDisabilityTypeormEntity,
      RetirementPlanningRppsPeriodDisabilityEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: RetirementPlanningRppsPeriodDisabilityEntity,
    ): RetirementPlanningRppsPeriodDisabilityTypeormEntity => {
      const cid = this.mapper.map(
        source.cidTen,
        CidTenEntity,
        CidTenTypeormEntity,
      );

      const retirementPlanningRppsPeriod = this.mapper.map(
        source.retirementPlanningRppsPeriod,
        RetirementPlanningRppsPeriodEntity,
        RetirementPlanningRppsPeriodTypeormEntity,
      );

      return RetirementPlanningRppsPeriodDisabilityTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        cid,
        retirementPlanningRppsPeriod,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      RetirementPlanningRppsPeriodDisabilityEntity,
      RetirementPlanningRppsPeriodDisabilityTypeormEntity,
      mappingFunction,
    );
  }
}
