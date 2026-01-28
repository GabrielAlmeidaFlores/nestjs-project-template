import { createMap, forMember, mapFrom } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { RuralTimelineAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis.typeorm.entity';
import { GetRuralTimelineAnalysisWithRelationsQueryResult } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis/query/result/get-rural-timeline-analysis-with-relations.query.result';
import { RuralTimelineAnalysisId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/value-object/rural-timeline-analysis-id/rural-timeline-analysis-id.value-object';

import type { Mapper } from '@automapper/core';

@Injectable()
export class GetRuralTimelineAnalysisWithRelationsQueryResultAutoMapperProfile {
  protected readonly _type =
    GetRuralTimelineAnalysisWithRelationsQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMap(this.mapper);
  }

  private createMap(mapper: Mapper): void {
    createMap(
      mapper,
      RuralTimelineAnalysisTypeormEntity,
      GetRuralTimelineAnalysisWithRelationsQueryResult,
      forMember(
        (destination) => destination.id,
        mapFrom((source) => new RuralTimelineAnalysisId(source.id)),
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
