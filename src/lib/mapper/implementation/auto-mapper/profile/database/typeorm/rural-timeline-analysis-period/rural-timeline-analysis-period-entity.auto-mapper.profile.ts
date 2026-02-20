import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { RuralTimelineAnalysisPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-period.typeorm.entity';
import { RuralTimelineAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis.typeorm.entity';
import { RuralTimelineAnalysisEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/rural-timeline-analysis.entity';
import { RuralTimelineAnalysisPeriodEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period/rural-timeline-analysis-period.entity';
import { RuralTimelineAnalysisPeriodId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period/value-object/rural-timeline-analysis-period-id/rural-timeline-analysis-period-id.value-object';
import { RuralTimelineAnalysisPeriodPropertyId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-property/value-object/rural-timeline-analysis-period-property-id/rural-timeline-analysis-period-property-id.value-object';
import { RuralTimelineAnalysisPeriodResidenceId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-residence/value-object/rural-timeline-analysis-period-residence-id/rural-timeline-analysis-period-residence-id.value-object';

@Injectable()
export class RuralTimelineAnalysisPeriodEntityAutoMapperProfile {
  protected readonly _type =
    RuralTimelineAnalysisPeriodEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: RuralTimelineAnalysisPeriodTypeormEntity,
    ): RuralTimelineAnalysisPeriodEntity => {
      const ruralTimeline = this.mapper.map(
        source.ruralTimeline,
        RuralTimelineAnalysisTypeormEntity,
        RuralTimelineAnalysisEntity,
      );

      return new RuralTimelineAnalysisPeriodEntity({
        id: new RuralTimelineAnalysisPeriodId(source.id),
        startDate: source.startDate ?? null,
        endDate: source.endDate ?? null,
        workerType: source.workerType ?? null,
        workRegimeType: source.workRegimeType ?? null,
        productionDestination: source.productionDestination ?? null,
        documentAnalysis: source.documentAnalysis ?? null,
        ruralTimelineId: ruralTimeline.id,
        ruralTimelinePeriodPropertyId: source.ruralTimelinePeriodProperty
          ? new RuralTimelineAnalysisPeriodPropertyId(
              source.ruralTimelinePeriodProperty.id,
            )
          : null,
        ruralTimelinePeriodResidenceId: source.ruralTimelinePeriodResidence
          ? new RuralTimelineAnalysisPeriodResidenceId(
              source.ruralTimelinePeriodResidence.id,
            )
          : null,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      RuralTimelineAnalysisPeriodTypeormEntity,
      RuralTimelineAnalysisPeriodEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: RuralTimelineAnalysisPeriodEntity,
    ): RuralTimelineAnalysisPeriodTypeormEntity => {
      const ormEntity = RuralTimelineAnalysisPeriodTypeormEntity.build({
        id: source.id.toString(),
        startDate: source.startDate,
        endDate: source.endDate,
        workerType: source.workerType,
        workRegimeType: source.workRegimeType,
        productionDestination: source.productionDestination,
        documentAnalysis: source.documentAnalysis,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });

      if (source.ruralTimelineId) {
        ormEntity.ruralTimeline = {
          id: source.ruralTimelineId.toString(),
        } as unknown as RuralTimelineAnalysisTypeormEntity;
      }

      return ormEntity;
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      RuralTimelineAnalysisPeriodEntity,
      RuralTimelineAnalysisPeriodTypeormEntity,
      mappingFunction,
    );
  }
}
