import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { RetirementPlanningRgpsInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rgps-inss-benefit.typeorm.entity';
import { RetirementPlanningRgpsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rgps.typeorm.entity';
import { RetirementPlanningRgpsInssBenefitEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-benefit/retirement-planning-rgps-inss-benefit.entity';
import { RetirementPlanningRgpsInssBenefitId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-benefit/value-object/retirement-planning-rgps-inss-benefit-id.value-object';
import { RetirementPlanningRgpsEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps/retirement-planning-rgps.entity';

@Injectable()
export class RetirementPlanningRgpsInssBenefitEntityAutoMapperProfile {
  protected readonly _type =
    RetirementPlanningRgpsInssBenefitEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: RetirementPlanningRgpsInssBenefitTypeormEntity,
    ): RetirementPlanningRgpsInssBenefitEntity => {
      const retirementPlanningRgps = this.mapper.map(
        source.retirementPlanningRgps,
        RetirementPlanningRgpsTypeormEntity,
        RetirementPlanningRgpsEntity,
      );

      return new RetirementPlanningRgpsInssBenefitEntity({
        ...source,
        id: new RetirementPlanningRgpsInssBenefitId(source.id),
        retirementPlanningRgps,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      RetirementPlanningRgpsInssBenefitTypeormEntity,
      RetirementPlanningRgpsInssBenefitEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: RetirementPlanningRgpsInssBenefitEntity,
    ): RetirementPlanningRgpsInssBenefitTypeormEntity => {
      const retirementPlanningRgps = this.mapper.map(
        source.retirementPlanningRgps,
        RetirementPlanningRgpsEntity,
        RetirementPlanningRgpsTypeormEntity,
      );

      return RetirementPlanningRgpsInssBenefitTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        retirementPlanningRgps,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      RetirementPlanningRgpsInssBenefitEntity,
      RetirementPlanningRgpsInssBenefitTypeormEntity,
      mappingFunction,
    );
  }
}
