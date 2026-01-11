import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';

import { RetirementPlanningRgpsLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rgps-legal-proceeding.typeorm.entity';
import { RetirementPlanningRgpsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rgps.typeorm.entity';
import { RetirementPlanningRgpsEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps/retirement-planning-rgps.entity';
import { RetirementPlanningRgpsLegalProceedingEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-legal-proceeding/retirement-planning-rgps-legal-proceeding.entity';
import { RetirementPlanningRgpsLegalProceedingId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-legal-proceeding/value-object/retirement-planning-rgps-legal-proceeding-id.value-object';

export class RetirementPlanningRgpsLegalProceedingEntityAutoMapperProfile {
  protected readonly _type =
    RetirementPlanningRgpsLegalProceedingEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: RetirementPlanningRgpsLegalProceedingTypeormEntity,
    ): RetirementPlanningRgpsLegalProceedingEntity => {
      const retirementPlanningRgps = this.mapper.map(
        source.retirementPlanningRgps,
        RetirementPlanningRgpsTypeormEntity,
        RetirementPlanningRgpsEntity,
      );

      return new RetirementPlanningRgpsLegalProceedingEntity({
        ...source,
        id: new RetirementPlanningRgpsLegalProceedingId(source.id),
        retirementPlanningRgps,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      RetirementPlanningRgpsLegalProceedingTypeormEntity,
      RetirementPlanningRgpsLegalProceedingEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: RetirementPlanningRgpsLegalProceedingEntity,
    ): RetirementPlanningRgpsLegalProceedingTypeormEntity => {
      const retirementPlanningRgps = this.mapper.map(
        source.retirementPlanningRgps,
        RetirementPlanningRgpsEntity,
        RetirementPlanningRgpsTypeormEntity,
      );

      return RetirementPlanningRgpsLegalProceedingTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        retirementPlanningRgps,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      RetirementPlanningRgpsLegalProceedingEntity,
      RetirementPlanningRgpsLegalProceedingTypeormEntity,
      mappingFunction,
    );
  }
}
