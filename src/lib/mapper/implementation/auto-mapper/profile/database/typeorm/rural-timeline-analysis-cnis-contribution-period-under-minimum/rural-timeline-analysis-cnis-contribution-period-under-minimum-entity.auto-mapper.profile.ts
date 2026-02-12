import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { RuralTimelineAnalysisCnisContributionPeriodUnderMinimumTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-cnis-contribution-period-under-minimum.typeorm.entity';
import { RuralTimelineAnalysisCnisContributionPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-cnis-contribution-period.typeorm.entity';
import { RuralTimelineAnalysisCnisContributionPeriodEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/rural-timeline-analysis-cnis-contribution-period.entity';
import { RuralTimelineAnalysisCnisContributionPeriodUnderMinimumEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period-under-minimum/rural-timeline-analysis-cnis-contribution-period-under-minimum.entity';
import { RuralTimelineAnalysisCnisContributionPeriodUnderMinimumId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period-under-minimum/value-object/rural-timeline-analysis-cnis-contribution-period-under-minimum-id/rural-timeline-analysis-cnis-contribution-period-under-minimum-id.value-object';

@Injectable()
export class RuralTimelineAnalysisCnisContributionPeriodUnderMinimumEntityAutoMapperProfile {
  protected readonly _type =
    RuralTimelineAnalysisCnisContributionPeriodUnderMinimumEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: RuralTimelineAnalysisCnisContributionPeriodUnderMinimumTypeormEntity,
    ): RuralTimelineAnalysisCnisContributionPeriodUnderMinimumEntity => {
      const ruralTimelineCnisContributionPeriod = this.mapper.map(
        source.ruralTimelineCnisContributionPeriod,
        RuralTimelineAnalysisCnisContributionPeriodTypeormEntity,
        RuralTimelineAnalysisCnisContributionPeriodEntity,
      );

      return new RuralTimelineAnalysisCnisContributionPeriodUnderMinimumEntity({
        ...source,
        id: new RuralTimelineAnalysisCnisContributionPeriodUnderMinimumId(
          source.id,
        ),
        contributionAmount: new DecimalValue(source.contributionAmount),
        ruralTimelineCnisContributionPeriodId:
          ruralTimelineCnisContributionPeriod.id,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      RuralTimelineAnalysisCnisContributionPeriodUnderMinimumTypeormEntity,
      RuralTimelineAnalysisCnisContributionPeriodUnderMinimumEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: RuralTimelineAnalysisCnisContributionPeriodUnderMinimumEntity,
    ): RuralTimelineAnalysisCnisContributionPeriodUnderMinimumTypeormEntity => {
      const ormEntity =
        RuralTimelineAnalysisCnisContributionPeriodUnderMinimumTypeormEntity.build(
          {
            id: source.id.toString(),
            contributionDate: source.contributionDate,
            contributionAmount: source.contributionAmount.toString(),
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          },
        );

      ormEntity.ruralTimelineCnisContributionPeriod = {
        id: source.ruralTimelineCnisContributionPeriodId.toString(),
      } as unknown as RuralTimelineAnalysisCnisContributionPeriodTypeormEntity;

      return ormEntity;
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      RuralTimelineAnalysisCnisContributionPeriodUnderMinimumEntity,
      RuralTimelineAnalysisCnisContributionPeriodUnderMinimumTypeormEntity,
      mappingFunction,
    );
  }
}
