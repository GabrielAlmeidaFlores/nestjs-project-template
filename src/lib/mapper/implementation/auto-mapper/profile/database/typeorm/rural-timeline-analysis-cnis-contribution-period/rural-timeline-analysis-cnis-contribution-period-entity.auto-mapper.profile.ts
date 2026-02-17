import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { RuralTimelineAnalysisCnisContributionPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-cnis-contribution-period.typeorm.entity';
import { RuralTimelineAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis.typeorm.entity';
import { RuralTimelineAnalysisId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/value-object/rural-timeline-analysis-id/rural-timeline-analysis-id.value-object';
import { RuralTimelineAnalysisCnisContributionPeriodEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/rural-timeline-analysis-cnis-contribution-period.entity';
import { RuralTimelineAnalysisCnisContributionPeriodId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/value-object/rural-timeline-analysis-cnis-contribution-period-id/rural-timeline-analysis-cnis-contribution-period-id.value-object';

@Injectable()
export class RuralTimelineAnalysisCnisContributionPeriodEntityAutoMapperProfile {
  protected readonly _type =
    RuralTimelineAnalysisCnisContributionPeriodEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: RuralTimelineAnalysisCnisContributionPeriodTypeormEntity,
    ): RuralTimelineAnalysisCnisContributionPeriodEntity => {
      return new RuralTimelineAnalysisCnisContributionPeriodEntity({
        ...source,
        id: new RuralTimelineAnalysisCnisContributionPeriodId(source.id),
        ruralTimelineId:
          source.ruralTimeline?.id !== undefined
            ? new RuralTimelineAnalysisId(source.ruralTimeline.id)
            : null,
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
      RuralTimelineAnalysisCnisContributionPeriodTypeormEntity,
      RuralTimelineAnalysisCnisContributionPeriodEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: RuralTimelineAnalysisCnisContributionPeriodEntity,
    ): RuralTimelineAnalysisCnisContributionPeriodTypeormEntity => {
      const ormEntity =
        RuralTimelineAnalysisCnisContributionPeriodTypeormEntity.build({
          id: source.id.toString(),
          employmentRelationshipSource: source.employmentRelationshipSource,
          startDate: source.startDate,
          endDate: source.endDate,
          category: source.category,
          qualifyingPeriod: source.qualifyingPeriod,
          status: source.status,
          averageContributionAmount: source.averageContributionAmount
            ? source.averageContributionAmount.toString()
            : null,
          contributionAdjustmentIntent: source.contributionAdjustmentIntent,
          externalSupplementationIntent: source.externalSupplementationIntent,
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
      RuralTimelineAnalysisCnisContributionPeriodEntity,
      RuralTimelineAnalysisCnisContributionPeriodTypeormEntity,
      mappingFunction,
    );
  }
}
