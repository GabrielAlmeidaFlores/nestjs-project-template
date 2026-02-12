import { createMap, forMember, mapFrom } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { RuralTimelineAnalysisPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-period-document.typeorm.entity';
import { RuralTimelineAnalysisPeriodEconomicAspectsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-period-economic-aspects.typeorm.entity';
import { RuralTimelineAnalysisPeriodFamilyGroupMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-period-family-group-member.typeorm.entity';
import { RuralTimelineAnalysisPeriodPropertyTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-period-property.typeorm.entity';
import { RuralTimelineAnalysisPeriodResidenceTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-period-residence.typeorm.entity';
import { RuralTimelineAnalysisPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-period.typeorm.entity';
import {
  GetRuralTimelineAnalysisPeriodQueryResult,
  GetRuralTimelineAnalysisPeriodDocumentQueryResult,
  GetRuralTimelineAnalysisPeriodResidenceQueryResult,
  GetRuralTimelineAnalysisPeriodPropertyQueryResult,
  GetRuralTimelineAnalysisPeriodEconomicAspectsQueryResult,
  GetRuralTimelineAnalysisPeriodFamilyGroupMemberQueryResult,
} from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis/query/result/get-rural-timeline-analysis-with-relations.query.result';
import { RuralTimelineAnalysisPeriodId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period/value-object/rural-timeline-analysis-period-id/rural-timeline-analysis-period-id.value-object';

import type { Mapper } from '@automapper/core';

@Injectable()
export class GetRuralTimelineAnalysisPeriodQueryResultAutoMapperProfile {
  protected readonly _type =
    GetRuralTimelineAnalysisPeriodQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMap(this.mapper);
  }

  private createMap(mapper: Mapper): void {
    createMap(
      mapper,
      RuralTimelineAnalysisPeriodTypeormEntity,
      GetRuralTimelineAnalysisPeriodQueryResult,
      forMember(
        (destination) => destination.id,
        mapFrom((source) => new RuralTimelineAnalysisPeriodId(source.id)),
      ),
      forMember(
        (destination) => destination.startDate,
        mapFrom((source) => source.startDate ?? null),
      ),
      forMember(
        (destination) => destination.endDate,
        mapFrom((source) => source.endDate ?? null),
      ),
      forMember(
        (destination) => destination.workerType,
        mapFrom((source) => source.workerType ?? null),
      ),
      forMember(
        (destination) => destination.workRegimeType,
        mapFrom((source) => source.workRegimeType ?? null),
      ),
      forMember(
        (destination) => destination.productionDestination,
        mapFrom((source) => source.productionDestination ?? null),
      ),
      forMember(
        (destination) => destination.documentAnalysis,
        mapFrom((source) => source.documentAnalysis ?? null),
      ),
      forMember(
        (destination) => destination.ruralTimelineAnalysisPeriodDocument,
        mapFrom((source) =>
          (source.ruralTimelinePeriodDocument ?? []).map((doc) =>
            mapper.map(
              doc,
              RuralTimelineAnalysisPeriodDocumentTypeormEntity,
              GetRuralTimelineAnalysisPeriodDocumentQueryResult,
            ),
          ),
        ),
      ),
      forMember(
        (destination) => destination.ruralTimelineAnalysisPeriodResidence,
        mapFrom((source) =>
          source.ruralTimelinePeriodResidence
            ? mapper.map(
                source.ruralTimelinePeriodResidence,
                RuralTimelineAnalysisPeriodResidenceTypeormEntity,
                GetRuralTimelineAnalysisPeriodResidenceQueryResult,
              )
            : null,
        ),
      ),
      forMember(
        (destination) => destination.ruralTimelineAnalysisPeriodProperty,
        mapFrom((source) =>
          source.ruralTimelinePeriodProperty
            ? mapper.map(
                source.ruralTimelinePeriodProperty,
                RuralTimelineAnalysisPeriodPropertyTypeormEntity,
                GetRuralTimelineAnalysisPeriodPropertyQueryResult,
              )
            : null,
        ),
      ),
      forMember(
        (destination) => destination.ruralTimelineAnalysisPeriodEconomicAspects,
        mapFrom((source) =>
          (source.ruralTimelinePeriodEconomicAspects ?? []).map((aspect) =>
            mapper.map(
              aspect,
              RuralTimelineAnalysisPeriodEconomicAspectsTypeormEntity,
              GetRuralTimelineAnalysisPeriodEconomicAspectsQueryResult,
            ),
          ),
        ),
      ),
      forMember(
        (destination) =>
          destination.ruralTimelineAnalysisPeriodFamilyGroupMember,
        mapFrom((source) =>
          (source.ruralTimelinePeriodFamilyGroupMember ?? []).map((member) =>
            mapper.map(
              member,
              RuralTimelineAnalysisPeriodFamilyGroupMemberTypeormEntity,
              GetRuralTimelineAnalysisPeriodFamilyGroupMemberQueryResult,
            ),
          ),
        ),
      ),
    );
  }
}
