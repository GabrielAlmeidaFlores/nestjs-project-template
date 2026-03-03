import { createMap, forMember, mapFrom } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { RuralTimelineCnisContributionPeriodOverdueContributionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-cnis-contribution-period-overdue-contribution.typeorm.entity';
import { GetRuralTimelineCnisContributionPeriodOverdueContributionQueryResult } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-cnis-contribution-period-overdue-contribution/query/result/get-rural-timeline-cnis-contribution-period-overdue-contribution.query.result';

import type { Mapper } from '@automapper/core';

@Injectable()
export class GetRuralTimelineCnisContributionPeriodOverdueContributionQueryResultAutoMapperProfile {
  protected readonly _type =
    GetRuralTimelineCnisContributionPeriodOverdueContributionQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMap(this.mapper);
  }

  private createMap(mapper: Mapper): void {
    createMap(
      mapper,
      RuralTimelineCnisContributionPeriodOverdueContributionTypeormEntity,
      GetRuralTimelineCnisContributionPeriodOverdueContributionQueryResult,
      forMember(
        (destination) => destination.overdueDate,
        mapFrom((source) => source.overdueDate),
      ),
      forMember(
        (destination) => destination.paymentDate,
        mapFrom((source) => source.paymentDate),
      ),
    );
  }
}
