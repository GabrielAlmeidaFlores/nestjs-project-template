import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { RuralTimelineAnalysisPeriodResidenceTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-period-residence.typeorm.entity';
import { RuralTimelineAnalysisPeriodResidenceEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-residence/rural-timeline-analysis-period-residence.entity';
import { RuralTimelineAnalysisPeriodResidenceId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-residence/value-object/rural-timeline-analysis-period-residence-id/rural-timeline-analysis-period-residence-id.value-object';

@Injectable()
export class RuralTimelineAnalysisPeriodResidenceEntityAutoMapperProfile {
  protected readonly _type =
    RuralTimelineAnalysisPeriodResidenceEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: RuralTimelineAnalysisPeriodResidenceTypeormEntity,
    ): RuralTimelineAnalysisPeriodResidenceEntity => {
      return new RuralTimelineAnalysisPeriodResidenceEntity({
        id: new RuralTimelineAnalysisPeriodResidenceId(source.id),
        city: source.city,
        stateCode: source.stateCode,
        distanceToPropertyKm: new DecimalValue(source.distanceToPropertyKm),
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      RuralTimelineAnalysisPeriodResidenceTypeormEntity,
      RuralTimelineAnalysisPeriodResidenceEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: RuralTimelineAnalysisPeriodResidenceEntity,
    ): RuralTimelineAnalysisPeriodResidenceTypeormEntity => {
      return RuralTimelineAnalysisPeriodResidenceTypeormEntity.build({
        id: source.id.toString(),
        city: source.city,
        stateCode: source.stateCode,
        distanceToPropertyKm: source.distanceToPropertyKm.toString(),
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      RuralTimelineAnalysisPeriodResidenceEntity,
      RuralTimelineAnalysisPeriodResidenceTypeormEntity,
      mappingFunction,
    );
  }
}
