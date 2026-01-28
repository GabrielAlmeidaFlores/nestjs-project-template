import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { RuralTimelinePeriodPropertyTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-period-property.typeorm.entity';
import { RuralTimelinePeriodPropertyEntity } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-period-property/rural-timeline-period-property.entity';
import { RuralTimelinePeriodPropertyId } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-period-property/value-object/rural-timeline-period-property-id/rural-timeline-period-property-id.value-object';

@Injectable()
export class RuralTimelinePeriodPropertyEntityAutoMapperProfile {
  protected readonly _type =
    RuralTimelinePeriodPropertyEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: RuralTimelinePeriodPropertyTypeormEntity,
    ): RuralTimelinePeriodPropertyEntity => {
      return new RuralTimelinePeriodPropertyEntity({
        ...source,
        id: new RuralTimelinePeriodPropertyId(source.id),
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      RuralTimelinePeriodPropertyTypeormEntity,
      RuralTimelinePeriodPropertyEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: RuralTimelinePeriodPropertyEntity,
    ): RuralTimelinePeriodPropertyTypeormEntity => {
      return RuralTimelinePeriodPropertyTypeormEntity.build({
        ...source,
        id: source.id.toString(),
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      RuralTimelinePeriodPropertyEntity,
      RuralTimelinePeriodPropertyTypeormEntity,
      mappingFunction,
    );
  }
}
