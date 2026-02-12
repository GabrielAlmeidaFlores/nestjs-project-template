import { createMap, forMember, mapFrom } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { RuralTimelineAnalysisCnisContributionPeriodUnderMinimumTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-cnis-contribution-period-under-minimum.typeorm.entity';
import { RuralTimelineAnalysisCnisContributionPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-cnis-contribution-period.typeorm.entity';
import {
  GetRuralTimelineAnalysisCnisContributionPeriodQueryResult,
  GetRuralTimelineAnalysisCnisContributionPeriodUnderMinimumQueryResult,
} from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis/query/result/get-rural-timeline-analysis-with-relations.query.result';

import type { Mapper } from '@automapper/core';

@Injectable()
export class GetRuralTimelineAnalysisCnisContributionPeriodQueryResultAutoMapperProfile {
  protected readonly _type =
    GetRuralTimelineAnalysisCnisContributionPeriodQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMap(this.mapper);
  }

  private createMap(mapper: Mapper): void {
    createMap(
      mapper,
      RuralTimelineAnalysisCnisContributionPeriodTypeormEntity,
      GetRuralTimelineAnalysisCnisContributionPeriodQueryResult,
      forMember(
        (destination) => destination.employmentRelationshipSource,
        mapFrom((source) => source.employmentRelationshipSource ?? null),
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
        (destination) => destination.category,
        mapFrom((source) => source.category ?? null),
      ),
      forMember(
        (destination) => destination.qualifyingPeriod,
        mapFrom((source) => source.qualifyingPeriod ?? null),
      ),
      forMember(
        (destination) => destination.status,
        mapFrom((source) => source.status ?? null),
      ),
      forMember(
        (destination) => destination.averageContributionAmount,
        mapFrom((source) =>
          source.averageContributionAmount !== null &&
          source.averageContributionAmount !== undefined
            ? new DecimalValue(source.averageContributionAmount)
            : null,
        ),
      ),
      forMember(
        (destination) => destination.contributionAdjustmentIntent,
        mapFrom((source) => source.contributionAdjustmentIntent),
      ),
      forMember(
        (destination) => destination.externalSupplementationIntent,
        mapFrom((source) => source.externalSupplementationIntent),
      ),
      forMember(
        (destination) =>
          destination.ruralTimelineCnisContributionPeriodUnderMinimum,
        mapFrom((source) =>
          (source.ruralTimelineCnisContributionPeriodUnderMinimum ?? []).map(
            (underMin) =>
              mapper.map(
                underMin,
                RuralTimelineAnalysisCnisContributionPeriodUnderMinimumTypeormEntity,
                GetRuralTimelineAnalysisCnisContributionPeriodUnderMinimumQueryResult,
              ),
          ),
        ),
      ),
    );
  }
}
