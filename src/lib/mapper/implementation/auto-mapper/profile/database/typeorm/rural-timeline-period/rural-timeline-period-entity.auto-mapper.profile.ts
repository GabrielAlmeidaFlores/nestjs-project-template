import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { RuralTimelinePeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-period.typeorm.entity';
import { RuralTimelineTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline.typeorm.entity';
import { RuralTimelineEntity } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline/rural-timeline.entity';
import { RuralTimelinePeriodEntity } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-period/rural-timeline-period.entity';
import { RuralTimelinePeriodId } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-period/value-object/rural-timeline-period-id/rural-timeline-period-id.value-object';
import { RuralTimelinePeriodPropertyId } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-period-property/value-object/rural-timeline-period-property-id/rural-timeline-period-property-id.value-object';
import { RuralTimelinePeriodResidenceId } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-period-residence/value-object/rural-timeline-period-residence-id/rural-timeline-period-residence-id.value-object';

@Injectable()
export class RuralTimelinePeriodEntityAutoMapperProfile {
  protected readonly _type = RuralTimelinePeriodEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: RuralTimelinePeriodTypeormEntity,
    ): RuralTimelinePeriodEntity => {
      const ruralTimeline = this.mapper.map(
        source.ruralTimeline,
        RuralTimelineTypeormEntity,
        RuralTimelineEntity,
      );

      return new RuralTimelinePeriodEntity({
        ...source,
        id: new RuralTimelinePeriodId(source.id),
        ruralTimelineId: ruralTimeline.id,
        ruralTimelinePeriodPropertyId: source.ruralTimelinePeriodProperty
          ? new RuralTimelinePeriodPropertyId(
              source.ruralTimelinePeriodProperty.id,
            )
          : null,
        ruralTimelinePeriodResidenceId: source.ruralTimelinePeriodResidence
          ? new RuralTimelinePeriodResidenceId(
              source.ruralTimelinePeriodResidence.id,
            )
          : null,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      RuralTimelinePeriodTypeormEntity,
      RuralTimelinePeriodEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: RuralTimelinePeriodEntity,
    ): RuralTimelinePeriodTypeormEntity => {
      return RuralTimelinePeriodTypeormEntity.build({
        ...source,
        id: source.id.toString(),
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      RuralTimelinePeriodEntity,
      RuralTimelinePeriodTypeormEntity,
      mappingFunction,
    );
  }
}
