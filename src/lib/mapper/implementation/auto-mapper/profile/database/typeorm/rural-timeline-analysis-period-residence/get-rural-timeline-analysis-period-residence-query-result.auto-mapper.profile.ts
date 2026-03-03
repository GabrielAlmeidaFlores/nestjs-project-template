import { createMap, forMember, mapFrom } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { RuralTimelineAnalysisPeriodResidenceTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-period-residence.typeorm.entity';
import { GetRuralTimelineAnalysisPeriodResidenceQueryResult } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-period-residence/query/result/get-rural-timeline-analysis-period-residence.query.result';
import { RuralTimelineAnalysisPeriodResidenceId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-residence/value-object/rural-timeline-analysis-period-residence-id/rural-timeline-analysis-period-residence-id.value-object';

import type { Mapper } from '@automapper/core';

@Injectable()
export class GetRuralTimelineAnalysisPeriodResidenceQueryResultAutoMapperProfile {
  protected readonly _type =
    GetRuralTimelineAnalysisPeriodResidenceQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMap(this.mapper);
  }

  private createMap(mapper: Mapper): void {
    createMap(
      mapper,
      RuralTimelineAnalysisPeriodResidenceTypeormEntity,
      GetRuralTimelineAnalysisPeriodResidenceQueryResult,
      forMember(
        (destination) => destination.id,
        mapFrom(
          (source) => new RuralTimelineAnalysisPeriodResidenceId(source.id),
        ),
      ),
      forMember(
        (destination) => destination.city,
        mapFrom((source) => source.city),
      ),
      forMember(
        (destination) => destination.stateCode,
        mapFrom((source) => source.stateCode),
      ),
      forMember(
        (destination) => destination.distanceToPropertyKm,
        mapFrom((source) => new DecimalValue(source.distanceToPropertyKm)),
      ),
    );
  }
}
