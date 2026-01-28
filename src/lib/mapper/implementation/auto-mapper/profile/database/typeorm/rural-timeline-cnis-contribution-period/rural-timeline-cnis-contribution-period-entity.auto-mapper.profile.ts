import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { RuralTimelineCnisContributionPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-cnis-contribution-period.typeorm.entity';
import { RuralTimelineTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline.typeorm.entity';
import { RuralTimelineEntity } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline/rural-timeline.entity';
import { RuralTimelineCnisContributionPeriodEntity } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-cnis-contribution-period/rural-timeline-cnis-contribution-period.entity';
import { RuralTimelineCnisContributionPeriodId } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-cnis-contribution-period/value-object/rural-timeline-cnis-contribution-period-id/rural-timeline-cnis-contribution-period-id.value-object';

@Injectable()
export class RuralTimelineCnisContributionPeriodEntityAutoMapperProfile {
  protected readonly _type =
    RuralTimelineCnisContributionPeriodEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: RuralTimelineCnisContributionPeriodTypeormEntity,
    ): RuralTimelineCnisContributionPeriodEntity => {
      const ruralTimeline = source.ruralTimeline
        ? this.mapper.map(
            source.ruralTimeline,
            RuralTimelineTypeormEntity,
            RuralTimelineEntity,
          )
        : null;

      return new RuralTimelineCnisContributionPeriodEntity({
        ...source,
        id: new RuralTimelineCnisContributionPeriodId(source.id),
        ruralTimelineId: ruralTimeline?.id ?? null,
        averageContributionAmount:
          source.averageContributionAmount !== null &&
          source.averageContributionAmount !== undefined
            ? new DecimalValue(source.averageContributionAmount)
            : null,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      RuralTimelineCnisContributionPeriodTypeormEntity,
      RuralTimelineCnisContributionPeriodEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: RuralTimelineCnisContributionPeriodEntity,
    ): RuralTimelineCnisContributionPeriodTypeormEntity => {
      return RuralTimelineCnisContributionPeriodTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        averageContributionAmount: source.averageContributionAmount
          ? source.averageContributionAmount.toString()
          : null,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      RuralTimelineCnisContributionPeriodEntity,
      RuralTimelineCnisContributionPeriodTypeormEntity,
      mappingFunction,
    );
  }
}
