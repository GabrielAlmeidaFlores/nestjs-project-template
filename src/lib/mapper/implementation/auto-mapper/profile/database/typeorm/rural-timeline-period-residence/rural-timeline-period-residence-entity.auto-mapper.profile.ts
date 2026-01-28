import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { RuralTimelinePeriodResidenceTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-period-residence.typeorm.entity';
import { RuralTimelinePeriodResidenceEntity } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-period-residence/rural-timeline-period-residence.entity';
import { RuralTimelinePeriodResidenceId } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-period-residence/value-object/rural-timeline-period-residence-id/rural-timeline-period-residence-id.value-object';

@Injectable()
export class RuralTimelinePeriodResidenceEntityAutoMapperProfile {
  protected readonly _type =
    RuralTimelinePeriodResidenceEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: RuralTimelinePeriodResidenceTypeormEntity,
    ): RuralTimelinePeriodResidenceEntity => {
      return new RuralTimelinePeriodResidenceEntity({
        ...source,
        id: new RuralTimelinePeriodResidenceId(source.id),
        distanceToPropertyKm: new DecimalValue(source.distanceToPropertyKm),
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      RuralTimelinePeriodResidenceTypeormEntity,
      RuralTimelinePeriodResidenceEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: RuralTimelinePeriodResidenceEntity,
    ): RuralTimelinePeriodResidenceTypeormEntity => {
      return RuralTimelinePeriodResidenceTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        distanceToPropertyKm: source.distanceToPropertyKm.toString(),
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      RuralTimelinePeriodResidenceEntity,
      RuralTimelinePeriodResidenceTypeormEntity,
      mappingFunction,
    );
  }
}
