import { createMap, forMember, mapFrom } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { RuralTimelineAnalysisPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-period-document.typeorm.entity';
import { GetRuralTimelineAnalysisPeriodDocumentQueryResult } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis/query/result/get-rural-timeline-analysis-with-relations.query.result';
import { RuralTimelineAnalysisPeriodDocumentId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-document/value-object/rural-timeline-analysis-period-document-id/rural-timeline-analysis-period-document-id.value-object';

import type { Mapper } from '@automapper/core';

@Injectable()
export class GetRuralTimelineAnalysisPeriodDocumentQueryResultAutoMapperProfile {
  protected readonly _type =
    GetRuralTimelineAnalysisPeriodDocumentQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMap(this.mapper);
  }

  private createMap(mapper: Mapper): void {
    createMap(
      mapper,
      RuralTimelineAnalysisPeriodDocumentTypeormEntity,
      GetRuralTimelineAnalysisPeriodDocumentQueryResult,
      forMember(
        (destination) => destination.id,
        mapFrom(
          (source) => new RuralTimelineAnalysisPeriodDocumentId(source.id),
        ),
      ),
      forMember(
        (destination) => destination.documentYear,
        mapFrom((source) => source.documentYear ?? null),
      ),
      forMember(
        (destination) => destination.documentHolderType,
        mapFrom((source) => source.documentHolderType ?? null),
      ),
      forMember(
        (destination) => destination.selfOwned,
        mapFrom((source) => source.selfOwned ?? null),
      ),
      forMember(
        (destination) => destination.probatoryPurpose,
        mapFrom((source) => source.probatoryPurpose ?? null),
      ),
      forMember(
        (destination) => destination.document,
        mapFrom((source) => source.document),
      ),
      forMember(
        (destination) => destination.type,
        mapFrom((source) => source.type),
      ),
    );
  }
}
