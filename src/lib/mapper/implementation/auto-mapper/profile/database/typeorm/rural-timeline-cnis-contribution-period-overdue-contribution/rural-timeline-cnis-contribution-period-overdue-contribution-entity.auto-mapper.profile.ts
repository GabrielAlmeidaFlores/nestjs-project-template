import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { RuralTimelineAnalysisCnisContributionPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-cnis-contribution-period.typeorm.entity';
import { RuralTimelineCnisContributionPeriodOverdueContributionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-cnis-contribution-period-overdue-contribution.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { RuralTimelineAnalysisCnisContributionPeriodId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/value-object/rural-timeline-analysis-cnis-contribution-period-id/rural-timeline-analysis-cnis-contribution-period-id.value-object';
import { RuralTimelineCnisContributionPeriodOverdueContributionEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-cnis-contribution-period-overdue-contribution/rural-timeline-cnis-contribution-period-overdue-contribution.entity';
import { RuralTimelineCnisContributionPeriodOverdueContributionId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-cnis-contribution-period-overdue-contribution/value-object/rural-timeline-cnis-contribution-period-overdue-contribution-id/rural-timeline-cnis-contribution-period-overdue-contribution-id.value-object';

@Injectable()
export class RuralTimelineCnisContributionPeriodOverdueContributionEntityAutoMapperProfile {
  protected readonly _type =
    RuralTimelineCnisContributionPeriodOverdueContributionEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: RuralTimelineCnisContributionPeriodOverdueContributionTypeormEntity,
    ): RuralTimelineCnisContributionPeriodOverdueContributionEntity => {
      if (source.ruralTimelineCnisContributionPeriod?.id === undefined) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass:
            RuralTimelineCnisContributionPeriodOverdueContributionEntity.name,
          sourceClass:
            RuralTimelineCnisContributionPeriodOverdueContributionTypeormEntity.name,
        });
      }

      return new RuralTimelineCnisContributionPeriodOverdueContributionEntity({
        id: new RuralTimelineCnisContributionPeriodOverdueContributionId(
          source.id,
        ),
        overdueDate: source.overdueDate,
        paymentDate: source.paymentDate,
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
      RuralTimelineCnisContributionPeriodOverdueContributionTypeormEntity,
      RuralTimelineCnisContributionPeriodOverdueContributionEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: RuralTimelineCnisContributionPeriodOverdueContributionEntity,
    ): RuralTimelineCnisContributionPeriodOverdueContributionTypeormEntity => {
      const ormEntity =
        RuralTimelineCnisContributionPeriodOverdueContributionTypeormEntity.build(
          {
            id: source.id.toString(),
            overdueDate: source.overdueDate,
            paymentDate: source.paymentDate,
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
      RuralTimelineCnisContributionPeriodOverdueContributionEntity,
      RuralTimelineCnisContributionPeriodOverdueContributionTypeormEntity,
      mappingFunction,
    );
  }
}
