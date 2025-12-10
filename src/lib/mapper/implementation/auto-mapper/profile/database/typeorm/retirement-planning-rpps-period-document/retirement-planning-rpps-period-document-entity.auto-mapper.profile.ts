import { createMap, Mapper, constructUsing } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { RetirementPlanningRppsPeriodDisabilityTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rpps-period-disability.typeorm.entity';
import { RetirementPlanningRppsPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rpps-period-document.typeorm.entity';
import { RetirementPlanningRppsPeriodSpecialTimeTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rpps-period-special-time.typeorm.entity';
import { RetirementPlanningRppsPeriodDisabilityEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-period-disability/retirement-planning-rpps-period-disability.entity';
import { RetirementPlanningRppsPeriodDocumentEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-period-document/retirement-planning-rpps-period-document.entity';
import { RetirementPlanningRppsPeriodDocumentId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-period-document/value-object/retirement-planning-rpps-period-document-id.value-object';
import { RetirementPlanningRppsPeriodSpecialTimeEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-period-special-time/retirement-planning-rpps-period-special-time.entity';

@Injectable()
export class RetirementPlanningRppsPeriodDocumentEntityAutoMapperProfile {
  protected readonly _type =
    RetirementPlanningRppsPeriodDocumentEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: RetirementPlanningRppsPeriodDocumentTypeormEntity,
    ): RetirementPlanningRppsPeriodDocumentEntity => {
      const retirementPlanningRppsPeriodSpecialTime =
        source.retirementPlanningRppsPeriodSpecialTime
          ? this.mapper.map(
              source.retirementPlanningRppsPeriodSpecialTime,
              RetirementPlanningRppsPeriodSpecialTimeTypeormEntity,
              RetirementPlanningRppsPeriodSpecialTimeEntity,
            )
          : null;

      const retirementPlanningRppsPeriodDisability =
        source.retirementPlanningRppsPeriodDisability
          ? this.mapper.map(
              source.retirementPlanningRppsPeriodDisability,
              RetirementPlanningRppsPeriodDisabilityTypeormEntity,
              RetirementPlanningRppsPeriodDisabilityEntity,
            )
          : null;

      return new RetirementPlanningRppsPeriodDocumentEntity({
        ...source,
        id: new RetirementPlanningRppsPeriodDocumentId(source.id),
        retirementPlanningRppsPeriodSpecialTime,
        retirementPlanningRppsPeriodDisability,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      RetirementPlanningRppsPeriodDocumentTypeormEntity,
      RetirementPlanningRppsPeriodDocumentEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: RetirementPlanningRppsPeriodDocumentEntity,
    ): RetirementPlanningRppsPeriodDocumentTypeormEntity => {
      const retirementPlanningRppsPeriodSpecialTime =
        source.retirementPlanningRppsPeriodSpecialTime
          ? this.mapper.map(
              source.retirementPlanningRppsPeriodSpecialTime,
              RetirementPlanningRppsPeriodSpecialTimeEntity,
              RetirementPlanningRppsPeriodSpecialTimeTypeormEntity,
            )
          : undefined;

      const retirementPlanningRppsPeriodDisability =
        source.retirementPlanningRppsPeriodDisability
          ? this.mapper.map(
              source.retirementPlanningRppsPeriodDisability,
              RetirementPlanningRppsPeriodDisabilityEntity,
              RetirementPlanningRppsPeriodDisabilityTypeormEntity,
            )
          : undefined;

      return RetirementPlanningRppsPeriodDocumentTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        retirementPlanningRppsPeriodSpecialTime,
        retirementPlanningRppsPeriodDisability,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      RetirementPlanningRppsPeriodDocumentEntity,
      RetirementPlanningRppsPeriodDocumentTypeormEntity,
      mappingFunction,
    );
  }
}
