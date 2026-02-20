import { createMap, forMember, mapFrom } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { RuralTimelineAnalysisPeriodPendingExitDateTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-period-pending-exit-date.typeorm.entity';
import { GetRuralTimelineAnalysisPeriodPendingExitDateQueryResult } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis/query/result/get-rural-timeline-analysis-with-relations.query.result';

import type { Mapper } from '@automapper/core';

@Injectable()
export class GetRuralTimelineAnalysisPeriodPendingExitDateQueryResultAutoMapperProfile {
  protected readonly _type =
    GetRuralTimelineAnalysisPeriodPendingExitDateQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMap(this.mapper);
  }

  private createMap(mapper: Mapper): void {
    createMap(
      mapper,
      RuralTimelineAnalysisPeriodPendingExitDateTypeormEntity,
      GetRuralTimelineAnalysisPeriodPendingExitDateQueryResult,
      forMember(
        (destination) => destination.pendingDate,
        mapFrom((source) => source.pendingDate),
      ),
      forMember(
        (destination) => destination.pendingAmount,
        mapFrom((source) => new DecimalValue(source.pendingAmount)),
      ),
    );
  }
}
