import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { RuralTimelineAnalysisCnisContributionPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-cnis-contribution-period.typeorm.entity';
import { RuralTimelineAnalysisPeriodPendingExitDateTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-period-pending-exit-date.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { RuralTimelineAnalysisCnisContributionPeriodId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/value-object/rural-timeline-analysis-cnis-contribution-period-id/rural-timeline-analysis-cnis-contribution-period-id.value-object';
import { RuralTimelineAnalysisPeriodPendingExitDateEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-pending-exit-date/rural-timeline-analysis-period-pending-exit-date.entity';
import { RuralTimelineAnalysisPeriodPendingExitDateId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-pending-exit-date/value-object/rural-timeline-analysis-period-pending-exit-date-id/rural-timeline-analysis-period-pending-exit-date-id.value-object';

@Injectable()
export class RuralTimelineAnalysisPeriodPendingExitDateEntityAutoMapperProfile {
  protected readonly _type =
    RuralTimelineAnalysisPeriodPendingExitDateEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: RuralTimelineAnalysisPeriodPendingExitDateTypeormEntity,
    ): RuralTimelineAnalysisPeriodPendingExitDateEntity => {
      if (!source.ruralTimelineCnisContributionPeriod?.id) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass:
            RuralTimelineAnalysisPeriodPendingExitDateEntity.name,
          sourceClass:
            RuralTimelineAnalysisPeriodPendingExitDateTypeormEntity.name,
        });
      }

      return new RuralTimelineAnalysisPeriodPendingExitDateEntity({
        id: new RuralTimelineAnalysisPeriodPendingExitDateId(source.id),
        pendingDate: source.pendingDate,
        pendingAmount: new DecimalValue(source.pendingAmount),
        ruralTimelineCnisContributionPeriodId:
          new RuralTimelineAnalysisCnisContributionPeriodId(
            source.ruralTimelineCnisContributionPeriod.id,
          ),
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      RuralTimelineAnalysisPeriodPendingExitDateTypeormEntity,
      RuralTimelineAnalysisPeriodPendingExitDateEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: RuralTimelineAnalysisPeriodPendingExitDateEntity,
    ): RuralTimelineAnalysisPeriodPendingExitDateTypeormEntity => {
      const ormEntity =
        RuralTimelineAnalysisPeriodPendingExitDateTypeormEntity.build({
          id: source.id.toString(),
          pendingDate: source.pendingDate,
          pendingAmount: source.pendingAmount.toString(),
          createdAt: source.createdAt,
          updatedAt: source.updatedAt,
          deletedAt: source.deletedAt,
        });

      ormEntity.ruralTimelineCnisContributionPeriod = {
        id: source.ruralTimelineCnisContributionPeriodId.toString(),
      } as unknown as RuralTimelineAnalysisCnisContributionPeriodTypeormEntity;

      return ormEntity;
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      RuralTimelineAnalysisPeriodPendingExitDateEntity,
      RuralTimelineAnalysisPeriodPendingExitDateTypeormEntity,
      mappingFunction,
    );
  }
}
