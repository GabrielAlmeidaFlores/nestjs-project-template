import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { RuralTimelineAnalysisCnisContributionPeriodMissingEndDateTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-cnis-contribution-period-missing-end-date.typeorm.entity';
import { RuralTimelineAnalysisCnisContributionPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-cnis-contribution-period.typeorm.entity';
import { RuralTimelineAnalysisCnisContributionPeriodEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/rural-timeline-analysis-cnis-contribution-period.entity';
import { RuralTimelineAnalysisCnisContributionPeriodMissingEndDateEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period-missing-end-date/rural-timeline-analysis-cnis-contribution-period-missing-end-date.entity';
import { RuralTimelineAnalysisCnisContributionPeriodMissingEndDateId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period-missing-end-date/value-object/rural-timeline-analysis-cnis-contribution-period-missing-end-date-id/rural-timeline-analysis-cnis-contribution-period-missing-end-date-id.value-object';

@Injectable()
export class RuralTimelineAnalysisCnisContributionPeriodMissingEndDateEntityAutoMapperProfile {
  protected readonly _type =
    RuralTimelineAnalysisCnisContributionPeriodMissingEndDateEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: RuralTimelineAnalysisCnisContributionPeriodMissingEndDateTypeormEntity,
    ): RuralTimelineAnalysisCnisContributionPeriodMissingEndDateEntity => {
      const ruralTimelineAnalysisCnisContributionPeriod = this.mapper.map(
        source.ruralTimelineAnalysisCnisContributionPeriod,
        RuralTimelineAnalysisCnisContributionPeriodTypeormEntity,
        RuralTimelineAnalysisCnisContributionPeriodEntity,
      );

      return new RuralTimelineAnalysisCnisContributionPeriodMissingEndDateEntity(
        {
          ...source,
          id: new RuralTimelineAnalysisCnisContributionPeriodMissingEndDateId(
            source.id,
          ),
          actualRemunerationAmount: new DecimalValue(
            source.actualRemunerationAmount,
          ),
          ruralTimelineAnalysisCnisContributionPeriodId:
            ruralTimelineAnalysisCnisContributionPeriod.id,
        },
      );
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      RuralTimelineAnalysisCnisContributionPeriodMissingEndDateTypeormEntity,
      RuralTimelineAnalysisCnisContributionPeriodMissingEndDateEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: RuralTimelineAnalysisCnisContributionPeriodMissingEndDateEntity,
    ): RuralTimelineAnalysisCnisContributionPeriodMissingEndDateTypeormEntity => {
      const ormEntity =
        RuralTimelineAnalysisCnisContributionPeriodMissingEndDateTypeormEntity.build(
          {
            id: source.id.toString(),
            missingEndDate: source.missingEndDate,
            actualRemunerationAmount:
              source.actualRemunerationAmount.toString(),
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
      RuralTimelineAnalysisCnisContributionPeriodMissingEndDateEntity,
      RuralTimelineAnalysisCnisContributionPeriodMissingEndDateTypeormEntity,
      mappingFunction,
    );
  }
}
