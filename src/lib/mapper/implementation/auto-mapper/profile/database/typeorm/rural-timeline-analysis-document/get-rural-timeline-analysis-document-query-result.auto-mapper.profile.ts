import { createMap, forMember, mapFrom } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { RuralTimelineAnalysisDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-document.typeorm.entity';
import { GetRuralTimelineAnalysisDocumentQueryResult } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-document/query/result/get-rural-timeline-analysis-document.query.result';
import { RuralTimelineAnalysisDocumentId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-document/value-object/rural-timeline-analysis-document-id/rural-timeline-analysis-document-id.value-object';

import type { Mapper } from '@automapper/core';

@Injectable()
export class GetRuralTimelineAnalysisDocumentQueryResultAutoMapperProfile {
  protected readonly _type =
    GetRuralTimelineAnalysisDocumentQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMap(this.mapper);
  }

  private createMap(mapper: Mapper): void {
    createMap(
      mapper,
      RuralTimelineAnalysisDocumentTypeormEntity,
      GetRuralTimelineAnalysisDocumentQueryResult,
      forMember(
        (destination) => destination.id,
        mapFrom((source) => new RuralTimelineAnalysisDocumentId(source.id)),
      ),
      forMember(
        (destination) => destination.type,
        mapFrom((source) => source.type),
      ),
      forMember(
        (destination) => destination.document,
        mapFrom((source) => source.document),
      ),
    );
  }
}
