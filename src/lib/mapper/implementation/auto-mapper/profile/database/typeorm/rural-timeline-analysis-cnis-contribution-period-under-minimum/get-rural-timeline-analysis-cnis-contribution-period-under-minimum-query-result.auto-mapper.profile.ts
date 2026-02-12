import { createMap, forMember, mapFrom } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { RuralTimelineAnalysisCnisContributionPeriodUnderMinimumTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-cnis-contribution-period-under-minimum.typeorm.entity';
import { GetRuralTimelineAnalysisCnisContributionPeriodUnderMinimumQueryResult } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis/query/result/get-rural-timeline-analysis-with-relations.query.result';

import type { Mapper } from '@automapper/core';

@Injectable()
export class GetRuralTimelineAnalysisCnisContributionPeriodUnderMinimumQueryResultAutoMapperProfile {
  protected readonly _type =
    GetRuralTimelineAnalysisCnisContributionPeriodUnderMinimumQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMap(this.mapper);
  }

  private createMap(mapper: Mapper): void {
    createMap(
      mapper,
      RuralTimelineAnalysisCnisContributionPeriodUnderMinimumTypeormEntity,
      GetRuralTimelineAnalysisCnisContributionPeriodUnderMinimumQueryResult,
      forMember(
        (destination) => destination.contributionDate,
        mapFrom((source) => source.contributionDate),
      ),
      forMember(
        (destination) => destination.contributionAmount,
        mapFrom((source) => new DecimalValue(source.contributionAmount)),
      ),
    );
  }
}
