import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { RuralTimelineAnalysisCnisContributionPeriodLateContributionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-cnis-contribution-period-late-contribution.typeorm.entity';
import { RuralTimelineAnalysisCnisContributionPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-cnis-contribution-period.typeorm.entity';
import { RuralTimelineAnalysisCnisContributionPeriodEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/rural-timeline-analysis-cnis-contribution-period.entity';
import { RuralTimelineAnalysisCnisContributionPeriodLateContributionEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period-late-contribution/rural-timeline-analysis-cnis-contribution-period-late-contribution.entity';
import { RuralTimelineAnalysisCnisContributionPeriodLateContributionId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period-late-contribution/value-object/rural-timeline-analysis-cnis-contribution-period-late-contribution-id/rural-timeline-analysis-cnis-contribution-period-late-contribution-id.value-object';

@Injectable()
export class RuralTimelineAnalysisCnisContributionPeriodLateContributionEntityAutoMapperProfile {
  protected readonly _type =
    RuralTimelineAnalysisCnisContributionPeriodLateContributionEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: RuralTimelineAnalysisCnisContributionPeriodLateContributionTypeormEntity,
    ): RuralTimelineAnalysisCnisContributionPeriodLateContributionEntity => {
      const ruralTimelineAnalysisCnisContributionPeriod = this.mapper.map(
        source.ruralTimelineAnalysisCnisContributionPeriod,
        RuralTimelineAnalysisCnisContributionPeriodTypeormEntity,
        RuralTimelineAnalysisCnisContributionPeriodEntity,
      );

      return new RuralTimelineAnalysisCnisContributionPeriodLateContributionEntity(
        {
          ...source,
          id: new RuralTimelineAnalysisCnisContributionPeriodLateContributionId(
            source.id,
          ),
          ruralTimelineAnalysisCnisContributionPeriodId:
            ruralTimelineAnalysisCnisContributionPeriod.id,
        },
      );
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      RuralTimelineAnalysisCnisContributionPeriodLateContributionTypeormEntity,
      RuralTimelineAnalysisCnisContributionPeriodLateContributionEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: RuralTimelineAnalysisCnisContributionPeriodLateContributionEntity,
    ): RuralTimelineAnalysisCnisContributionPeriodLateContributionTypeormEntity => {
      const ormEntity =
        RuralTimelineAnalysisCnisContributionPeriodLateContributionTypeormEntity.build(
          {
            id: source.id.toString(),
            originalContributionDate: source.originalContributionDate,
            actualPaymentDate: source.actualPaymentDate,
            impactAnalysis: source.impactAnalysis,
            analyzedAt: source.analyzedAt,
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          },
        );

      ormEntity.ruralTimelineAnalysisCnisContributionPeriod = {
        id: source.ruralTimelineAnalysisCnisContributionPeriodId.toString(),
      } as unknown as RuralTimelineAnalysisCnisContributionPeriodTypeormEntity;

      return ormEntity;
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      RuralTimelineAnalysisCnisContributionPeriodLateContributionEntity,
      RuralTimelineAnalysisCnisContributionPeriodLateContributionTypeormEntity,
      mappingFunction,
    );
  }
}
