import { createMap, forMember, mapFrom } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { RuralTimelineAnalysisCnisContributionPeriodUnderMinimumTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-cnis-contribution-period-under-minimum.typeorm.entity';
import { RuralTimelineAnalysisCnisContributionPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-cnis-contribution-period.typeorm.entity';
import { RuralTimelineAnalysisPeriodPendingExitDateTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-period-pending-exit-date.typeorm.entity';
import { RuralTimelineCnisContributionPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-cnis-contribution-period-document.typeorm.entity';
import { RuralTimelineCnisContributionPeriodOverdueContributionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-cnis-contribution-period-overdue-contribution.typeorm.entity';
import { GetRuralTimelineAnalysisCnisContributionPeriodQueryResult } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-cnis-contribution-period/query/result/get-rural-timeline-analysis-cnis-contribution-period.query.result';
import { GetRuralTimelineAnalysisCnisContributionPeriodUnderMinimumQueryResult } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-cnis-contribution-period-under-minimum/query/result/get-rural-timeline-analysis-cnis-contribution-period-under-minimum.query.result';
import { GetRuralTimelineAnalysisPeriodPendingExitDateQueryResult } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-period-pending-exit-date/query/result/get-rural-timeline-analysis-period-pending-exit-date.query.result';
import { GetRuralTimelineCnisContributionPeriodOverdueContributionQueryResult } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-cnis-contribution-period-overdue-contribution/query/result/get-rural-timeline-cnis-contribution-period-overdue-contribution.query.result';
import { RuralTimelineAnalysisCnisContributionPeriodId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/value-object/rural-timeline-analysis-cnis-contribution-period-id/rural-timeline-analysis-cnis-contribution-period-id.value-object';
import { RuralTimelineCnisContributionPeriodDocumentEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-cnis-contribution-period-document/rural-timeline-cnis-contribution-period-document.entity';

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
        (destination) => destination.id,
        mapFrom(
          (source) =>
            new RuralTimelineAnalysisCnisContributionPeriodId(source.id),
        ),
      ),
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
        (destination) => destination.shouldConsiderPeriod,
        mapFrom((source) => source.shouldConsiderPeriod),
      ),
      forMember(
        (destination) => destination.shouldConsiderLastRemunerationAsExitDate,
        mapFrom((source) => source.shouldConsiderLastRemunerationAsExitDate),
      ),
      forMember(
        (destination) => destination.cnisDocument,
        mapFrom((source) => source.cnisDocument ?? null),
      ),
      forMember(
        (destination) => destination.impactAnalysis,
        mapFrom((source) => source.impactAnalysis ?? null),
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
      forMember(
        (destination) =>
          destination.ruralTimelineCnisContributionPeriodPendingExitDate,
        mapFrom((source) =>
          (source.ruralTimelineCnisContributionPeriodPendingExitDate ?? []).map(
            (pendingExit) =>
              mapper.map(
                pendingExit,
                RuralTimelineAnalysisPeriodPendingExitDateTypeormEntity,
                GetRuralTimelineAnalysisPeriodPendingExitDateQueryResult,
              ),
          ),
        ),
      ),
      forMember(
        (destination) =>
          destination.ruralTimelineCnisContributionPeriodOverdueContribution,
        mapFrom((source) =>
          (
            source.ruralTimelineCnisContributionPeriodOverdueContribution ?? []
          ).map((overdue) =>
            mapper.map(
              overdue,
              RuralTimelineCnisContributionPeriodOverdueContributionTypeormEntity,
              GetRuralTimelineCnisContributionPeriodOverdueContributionQueryResult,
            ),
          ),
        ),
      ),
      forMember(
        (destination) =>
          destination.ruralTimelineCnisContributionPeriodDocument,
        mapFrom((source) =>
          (source.ruralTimelineCnisContributionPeriodDocument ?? []).map(
            (doc) =>
              mapper.map(
                doc,
                RuralTimelineCnisContributionPeriodDocumentTypeormEntity,
                RuralTimelineCnisContributionPeriodDocumentEntity,
              ),
          ),
        ),
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
