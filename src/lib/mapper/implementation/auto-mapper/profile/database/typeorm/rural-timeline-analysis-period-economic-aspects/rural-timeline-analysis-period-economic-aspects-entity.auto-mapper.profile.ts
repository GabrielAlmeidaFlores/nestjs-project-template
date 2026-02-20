import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { RuralTimelineAnalysisPeriodEconomicAspectsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-period-economic-aspects.typeorm.entity';
import { RuralTimelineAnalysisPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-period.typeorm.entity';
import { RuralTimelineAnalysisPeriodEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period/rural-timeline-analysis-period.entity';
import { RuralTimelineAnalysisPeriodEconomicAspectsEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-economic-aspects/rural-timeline-analysis-period-economic-aspects.entity';
import { RuralTimelineAnalysisPeriodEconomicAspectsId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-economic-aspects/value-object/rural-timeline-analysis-period-economic-aspects-id/rural-timeline-analysis-period-economic-aspects-id.value-object';

@Injectable()
export class RuralTimelineAnalysisPeriodEconomicAspectsEntityAutoMapperProfile {
  protected readonly _type =
    RuralTimelineAnalysisPeriodEconomicAspectsEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: RuralTimelineAnalysisPeriodEconomicAspectsTypeormEntity,
    ): RuralTimelineAnalysisPeriodEconomicAspectsEntity => {
      const ruralTimelinePeriod = this.mapper.map(
        source.ruralTimelinePeriod,
        RuralTimelineAnalysisPeriodTypeormEntity,
        RuralTimelineAnalysisPeriodEntity,
      );

      return new RuralTimelineAnalysisPeriodEconomicAspectsEntity({
        id: new RuralTimelineAnalysisPeriodEconomicAspectsId(source.id),
        type: source.type,
        content: source.content ?? null,
        ruralTimelinePeriodId: ruralTimelinePeriod.id,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      RuralTimelineAnalysisPeriodEconomicAspectsTypeormEntity,
      RuralTimelineAnalysisPeriodEconomicAspectsEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: RuralTimelineAnalysisPeriodEconomicAspectsEntity,
    ): RuralTimelineAnalysisPeriodEconomicAspectsTypeormEntity => {
      const ormEntity =
        RuralTimelineAnalysisPeriodEconomicAspectsTypeormEntity.build({
          id: source.id.toString(),
          type: source.type,
          content: source.content,
          createdAt: source.createdAt,
          updatedAt: source.updatedAt,
          deletedAt: source.deletedAt,
        });

      ormEntity.ruralTimelinePeriod = {
        id: source.ruralTimelinePeriodId.toString(),
      } as unknown as RuralTimelineAnalysisPeriodTypeormEntity;

      return ormEntity;
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      RuralTimelineAnalysisPeriodEconomicAspectsEntity,
      RuralTimelineAnalysisPeriodEconomicAspectsTypeormEntity,
      mappingFunction,
    );
  }
}
