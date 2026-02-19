import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { RuralTimelineAnalysisCnisContributionPeriodLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-cnis-contribution-period-legal-proceeding.typeorm.entity';
import { RuralTimelineAnalysisCnisContributionPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-cnis-contribution-period.typeorm.entity';
import { RuralTimelineAnalysisCnisContributionPeriodEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/rural-timeline-analysis-cnis-contribution-period.entity';
import { RuralTimelineAnalysisCnisContributionPeriodLegalProceedingEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period-legal-proceeding/rural-timeline-analysis-cnis-contribution-period-legal-proceeding.entity';
import { RuralTimelineAnalysisCnisContributionPeriodLegalProceedingId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period-legal-proceeding/value-object/rural-timeline-analysis-cnis-contribution-period-legal-proceeding-id/rural-timeline-analysis-cnis-contribution-period-legal-proceeding-id.value-object';

@Injectable()
export class RuralTimelineAnalysisCnisContributionPeriodLegalProceedingEntityAutoMapperProfile {
  protected readonly _type =
    RuralTimelineAnalysisCnisContributionPeriodLegalProceedingEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: RuralTimelineAnalysisCnisContributionPeriodLegalProceedingTypeormEntity,
    ): RuralTimelineAnalysisCnisContributionPeriodLegalProceedingEntity => {
      const ruralTimelineCnisContributionPeriod = this.mapper.map(
        source.ruralTimelineCnisContributionPeriod,
        RuralTimelineAnalysisCnisContributionPeriodTypeormEntity,
        RuralTimelineAnalysisCnisContributionPeriodEntity,
      );

      return new RuralTimelineAnalysisCnisContributionPeriodLegalProceedingEntity(
        {
          ...source,
          id: new RuralTimelineAnalysisCnisContributionPeriodLegalProceedingId(
            source.id,
          ),
          ruralTimelineCnisContributionPeriodId:
            ruralTimelineCnisContributionPeriod.id,
        },
      );
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      RuralTimelineAnalysisCnisContributionPeriodLegalProceedingTypeormEntity,
      RuralTimelineAnalysisCnisContributionPeriodLegalProceedingEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: RuralTimelineAnalysisCnisContributionPeriodLegalProceedingEntity,
    ): RuralTimelineAnalysisCnisContributionPeriodLegalProceedingTypeormEntity => {
      return RuralTimelineAnalysisCnisContributionPeriodLegalProceedingTypeormEntity.build(
        {
          id: source.id.toString(),
          legalProceedingNumber: source.legalProceedingNumber,
          createdAt: source.createdAt,
          updatedAt: source.updatedAt,
          deletedAt: source.deletedAt,
          ruralTimelineCnisContributionPeriod: {
            id: source.ruralTimelineCnisContributionPeriodId.toString(),
          } as unknown as RuralTimelineAnalysisCnisContributionPeriodTypeormEntity,
        },
      );
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      RuralTimelineAnalysisCnisContributionPeriodLegalProceedingEntity,
      RuralTimelineAnalysisCnisContributionPeriodLegalProceedingTypeormEntity,
      mappingFunction,
    );
  }
}
