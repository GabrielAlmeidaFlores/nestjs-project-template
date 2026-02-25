import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { RuralTimelineAnalysisCnisContributionPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-cnis-contribution-period.typeorm.entity';
import { RuralTimelineAnalysisCnisContributionPeriodAdjustmentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-cnis-contribution-period-adjustment.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { RuralTimelineAnalysisCnisContributionPeriodId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/value-object/rural-timeline-analysis-cnis-contribution-period-id/rural-timeline-analysis-cnis-contribution-period-id.value-object';
import { RuralTimelineAnalysisCnisContributionPeriodAdjustmentEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period-adjustment/rural-timeline-analysis-cnis-contribution-period-adjustment.entity';
import { RuralTimelineAnalysisCnisContributionPeriodAdjustmentId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period-adjustment/value-object/rural-timeline-analysis-cnis-contribution-period-adjustment-id/rural-timeline-analysis-cnis-contribution-period-adjustment-id.value-object';

@Injectable()
export class RuralTimelineAnalysisCnisContributionPeriodAdjustmentEntityAutoMapperProfile {
  protected readonly _type =
    RuralTimelineAnalysisCnisContributionPeriodAdjustmentEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convert = (
      source: RuralTimelineAnalysisCnisContributionPeriodAdjustmentTypeormEntity,
    ): RuralTimelineAnalysisCnisContributionPeriodAdjustmentEntity => {
      if (source.ruralTimelineCnisContributionPeriod?.id === undefined) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass:
            RuralTimelineAnalysisCnisContributionPeriodAdjustmentEntity.name,
          sourceClass:
            RuralTimelineAnalysisCnisContributionPeriodAdjustmentTypeormEntity.name,
        });
      }

      return new RuralTimelineAnalysisCnisContributionPeriodAdjustmentEntity({
        id: new RuralTimelineAnalysisCnisContributionPeriodAdjustmentId(
          source.id,
        ),
        technicalObservation: source.technicalObservation,
        contributionTimeGainedYears: source.contributionTimeGainedYears,
        contributionTimeGainedMonths: source.contributionTimeGainedMonths,
        contributionTimeGainedDays: source.contributionTimeGainedDays,
        conventionalPeriodStartDate: source.conventionalPeriodStartDate,
        conventionalPeriodEndDate: source.conventionalPeriodEndDate,
        ruralTimelineCnisContributionPeriodId:
          new RuralTimelineAnalysisCnisContributionPeriodId(
            source.ruralTimelineCnisContributionPeriod.id,
          ),
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      RuralTimelineAnalysisCnisContributionPeriodAdjustmentTypeormEntity,
      RuralTimelineAnalysisCnisContributionPeriodAdjustmentEntity,
      constructUsing(convert),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convert = (
      source: RuralTimelineAnalysisCnisContributionPeriodAdjustmentEntity,
    ): RuralTimelineAnalysisCnisContributionPeriodAdjustmentTypeormEntity => {
      const ormEntity =
        RuralTimelineAnalysisCnisContributionPeriodAdjustmentTypeormEntity.build(
          {
            id: source.id.toString(),
            technicalObservation: source.technicalObservation,
            contributionTimeGainedYears: source.contributionTimeGainedYears,
            contributionTimeGainedMonths: source.contributionTimeGainedMonths,
            contributionTimeGainedDays: source.contributionTimeGainedDays,
            conventionalPeriodStartDate: source.conventionalPeriodStartDate,
            conventionalPeriodEndDate: source.conventionalPeriodEndDate,
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

    createMap(
      this.mapper,
      RuralTimelineAnalysisCnisContributionPeriodAdjustmentEntity,
      RuralTimelineAnalysisCnisContributionPeriodAdjustmentTypeormEntity,
      constructUsing(convert),
    );
  }
}
