import { createMap, forMember, mapFrom } from '@automapper/core';

import { RuralTimelineTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline.typeorm.entity';
import { GetRuralTimelineWithRelationsQueryResult } from '@module/customer/analysis-tool/module/rural-timeline/domain/repository/rural-timeline/query/result/get-rural-timeline-with-relations.query.result';
import { RuralTimelineId } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline/value-object/rural-timeline-id/rural-timeline-id.value-object';

import type { Mapper } from '@automapper/core';

export class GetRuralTimelineWithRelationsQueryResultAutoMapperProfile {
  protected readonly _type =
    GetRuralTimelineWithRelationsQueryResultAutoMapperProfile.name;

  public constructor(mapper: Mapper) {
    this.createMap(mapper);
  }

  private createMap(mapper: Mapper): void {
    createMap(
      mapper,
      RuralTimelineTypeormEntity,
      GetRuralTimelineWithRelationsQueryResult,
      forMember(
        (destination) => destination.id,
        mapFrom((source) => new RuralTimelineId(source.id)),
      ),
      forMember(
        (destination) => destination.ruralTimelineAnalysis,
        mapFrom((source) => source.ruralTimelineAnalysis ?? null),
      ),
      forMember(
        (destination) => destination.ruralTimelinePeriodDocumentAnalysis,
        mapFrom((source) => source.ruralTimelinePeriodDocumentAnalysis ?? null),
      ),
      forMember(
        (destination) => destination.workRegime,
        mapFrom((source) => source.workRegime),
      ),
      forMember(
        (destination) => destination.createdAt,
        mapFrom((source) => source.createdAt),
      ),
      forMember(
        (destination) => destination.updatedAt,
        mapFrom((source) => source.updatedAt),
      ),
      forMember(
        (destination) => destination.deletedAt,
        mapFrom((source) => source.deletedAt ?? null),
      ),
    );
  }
}
