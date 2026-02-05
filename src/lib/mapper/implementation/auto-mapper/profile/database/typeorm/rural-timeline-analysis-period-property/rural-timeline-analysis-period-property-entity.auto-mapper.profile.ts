import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { RuralTimelineAnalysisPeriodPropertyTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-period-property.typeorm.entity';
import { RuralTimelineAnalysisPeriodPropertyEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-property/rural-timeline-analysis-period-property.entity';
import { RuralTimelineAnalysisPeriodPropertyId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-property/value-object/rural-timeline-analysis-period-property-id/rural-timeline-analysis-period-property-id.value-object';

@Injectable()
export class RuralTimelineAnalysisPeriodPropertyEntityAutoMapperProfile {
  protected readonly _type =
    RuralTimelineAnalysisPeriodPropertyEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: RuralTimelineAnalysisPeriodPropertyTypeormEntity,
    ): RuralTimelineAnalysisPeriodPropertyEntity => {
      return new RuralTimelineAnalysisPeriodPropertyEntity({
        ...source,
        id: new RuralTimelineAnalysisPeriodPropertyId(source.id),
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      RuralTimelineAnalysisPeriodPropertyTypeormEntity,
      RuralTimelineAnalysisPeriodPropertyEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: RuralTimelineAnalysisPeriodPropertyEntity,
    ): RuralTimelineAnalysisPeriodPropertyTypeormEntity => {
      return RuralTimelineAnalysisPeriodPropertyTypeormEntity.build({
        ...source,
        id: source.id.toString(),
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      RuralTimelineAnalysisPeriodPropertyEntity,
      RuralTimelineAnalysisPeriodPropertyTypeormEntity,
      mappingFunction,
    );
  }
}
