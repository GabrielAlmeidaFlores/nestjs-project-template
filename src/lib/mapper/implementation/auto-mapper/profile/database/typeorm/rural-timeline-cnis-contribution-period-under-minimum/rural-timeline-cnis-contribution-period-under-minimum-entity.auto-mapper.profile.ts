import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { RuralTimelineCnisContributionPeriodUnderMinimumTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-cnis-contribution-period-under-minimum.typeorm.entity';
import { RuralTimelineCnisContributionPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-cnis-contribution-period.typeorm.entity';
import { RuralTimelineCnisContributionPeriodEntity } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-cnis-contribution-period/rural-timeline-cnis-contribution-period.entity';
import { RuralTimelineCnisContributionPeriodUnderMinimumEntity } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-cnis-contribution-period-under-minimum/rural-timeline-cnis-contribution-period-under-minimum.entity';
import { RuralTimelineCnisContributionPeriodUnderMinimumId } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-cnis-contribution-period-under-minimum/value-object/rural-timeline-cnis-contribution-period-under-minimum-id/rural-timeline-cnis-contribution-period-under-minimum-id.value-object';

@Injectable()
export class RuralTimelineCnisContributionPeriodUnderMinimumEntityAutoMapperProfile {
  protected readonly _type =
    RuralTimelineCnisContributionPeriodUnderMinimumEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: RuralTimelineCnisContributionPeriodUnderMinimumTypeormEntity,
    ): RuralTimelineCnisContributionPeriodUnderMinimumEntity => {
      const ruralTimelineCnisContributionPeriod = this.mapper.map(
        source.ruralTimelineCnisContributionPeriod,
        RuralTimelineCnisContributionPeriodTypeormEntity,
        RuralTimelineCnisContributionPeriodEntity,
      );

      return new RuralTimelineCnisContributionPeriodUnderMinimumEntity({
        ...source,
        id: new RuralTimelineCnisContributionPeriodUnderMinimumId(source.id),
        contributionAmount: new DecimalValue(source.contributionAmount),
        ruralTimelineCnisContributionPeriodId:
          ruralTimelineCnisContributionPeriod.id,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      RuralTimelineCnisContributionPeriodUnderMinimumTypeormEntity,
      RuralTimelineCnisContributionPeriodUnderMinimumEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: RuralTimelineCnisContributionPeriodUnderMinimumEntity,
    ): RuralTimelineCnisContributionPeriodUnderMinimumTypeormEntity => {
      return RuralTimelineCnisContributionPeriodUnderMinimumTypeormEntity.build(
        {
          ...source,
          id: source.id.toString(),
          contributionAmount: source.contributionAmount.toString(),
        },
      );
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      RuralTimelineCnisContributionPeriodUnderMinimumEntity,
      RuralTimelineCnisContributionPeriodUnderMinimumTypeormEntity,
      mappingFunction,
    );
  }
}
