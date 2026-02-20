import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { RuralTimelineAnalysisCnisContributionPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-cnis-contribution-period.typeorm.entity';
import { RuralTimelineAnalysisDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-document.typeorm.entity';
import { RuralTimelineAnalysisInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-inss-benefit.typeorm.entity';
import { RuralTimelineAnalysisLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-legal-proceeding.typeorm.entity';
import { RuralTimelineAnalysisPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-period.typeorm.entity';
import { RuralTimelineAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import {
  GetRuralTimelineAnalysisWithRelationsQueryResult,
  GetRuralTimelineAnalysisCnisContributionPeriodQueryResult,
  GetRuralTimelineAnalysisDocumentQueryResult,
  GetRuralTimelineAnalysisPeriodQueryResult,
} from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis/query/result/get-rural-timeline-analysis-with-relations.query.result';
import { GetRuralTimelineAnalysisInssBenefitQueryResult } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-inss-benefit/query/result/get-rural-timeline-analysis-inss-benefit.query.result';
import { GetRuralTimelineAnalysisLegalProceedingQueryResult } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-legal-proceeding/query/result/get-rural-timeline-analysis-legal-proceeding.query.result';
import { RuralTimelineAnalysisId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/value-object/rural-timeline-analysis-id/rural-timeline-analysis-id.value-object';

@Injectable()
export class GetRuralTimelineAnalysisWithRelationsQueryResultAutoMapperProfile {
  protected readonly _type =
    GetRuralTimelineAnalysisWithRelationsQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: RuralTimelineAnalysisTypeormEntity,
    ): GetRuralTimelineAnalysisWithRelationsQueryResult => {
      if (
        !source.ruralTimelineAnalysisInssBenefit ||
        !source.ruralTimelineAnalysisLegalProceeding
      ) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass:
            GetRuralTimelineAnalysisWithRelationsQueryResult.name,
          sourceClass: RuralTimelineAnalysisTypeormEntity.name,
        });
      }

      const ruralTimelineAnalysisInssBenefit = this.mapper.mapArray(
        source.ruralTimelineAnalysisInssBenefit,
        RuralTimelineAnalysisInssBenefitTypeormEntity,
        GetRuralTimelineAnalysisInssBenefitQueryResult,
      );

      const ruralTimelineAnalysisLegalProceeding = this.mapper.mapArray(
        source.ruralTimelineAnalysisLegalProceeding,
        RuralTimelineAnalysisLegalProceedingTypeormEntity,
        GetRuralTimelineAnalysisLegalProceedingQueryResult,
      );

      const ruralTimelineAnalysisPeriod = this.mapper.mapArray(
        source.ruralTimelinePeriod ?? [],
        RuralTimelineAnalysisPeriodTypeormEntity,
        GetRuralTimelineAnalysisPeriodQueryResult,
      );

      const ruralTimelineDocument = this.mapper.mapArray(
        source.ruralTimelineDocument ?? [],
        RuralTimelineAnalysisDocumentTypeormEntity,
        GetRuralTimelineAnalysisDocumentQueryResult,
      );

      const ruralTimelineCnisContributionPeriod = this.mapper.mapArray(
        source.ruralTimelineCnisContributionPeriod ?? [],
        RuralTimelineAnalysisCnisContributionPeriodTypeormEntity,
        GetRuralTimelineAnalysisCnisContributionPeriodQueryResult,
      );

      return GetRuralTimelineAnalysisWithRelationsQueryResult.build({
        id: new RuralTimelineAnalysisId(source.id),
        ruralTimelineCompleteAnalysis:
          source.ruralTimelineCompleteAnalysis ?? null,
        ruralTimelineSimplifiedAnalysis:
          source.ruralTimelineSimplifiedAnalysis ?? null,
        ruralTimelinePeriodDocumentAnalysis:
          source.ruralTimelinePeriodDocumentAnalysis ?? null,
        workRegime: source.workRegime,
        ruralTimelineAnalysisInssBenefit,
        ruralTimelineAnalysisLegalProceeding,
        ruralTimelineAnalysisPeriod,
        ruralTimelineDocument,
        ruralTimelineCnisContributionPeriod,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt ?? null,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      RuralTimelineAnalysisTypeormEntity,
      GetRuralTimelineAnalysisWithRelationsQueryResult,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetRuralTimelineAnalysisWithRelationsQueryResult,
    ): RuralTimelineAnalysisTypeormEntity => {
      const ruralTimelineAnalysisInssBenefit = this.mapper.mapArray(
        source.ruralTimelineAnalysisInssBenefit,
        GetRuralTimelineAnalysisInssBenefitQueryResult,
        RuralTimelineAnalysisInssBenefitTypeormEntity,
      );

      const ruralTimelineAnalysisLegalProceeding = this.mapper.mapArray(
        source.ruralTimelineAnalysisLegalProceeding,
        GetRuralTimelineAnalysisLegalProceedingQueryResult,
        RuralTimelineAnalysisLegalProceedingTypeormEntity,
      );

      const ruralTimelinePeriod = this.mapper.mapArray(
        source.ruralTimelineAnalysisPeriod,
        GetRuralTimelineAnalysisPeriodQueryResult,
        RuralTimelineAnalysisPeriodTypeormEntity,
      );

      const ruralTimelineDocument = this.mapper.mapArray(
        source.ruralTimelineDocument,
        GetRuralTimelineAnalysisDocumentQueryResult,
        RuralTimelineAnalysisDocumentTypeormEntity,
      );

      const ruralTimelineCnisContributionPeriod = this.mapper.mapArray(
        source.ruralTimelineCnisContributionPeriod,
        GetRuralTimelineAnalysisCnisContributionPeriodQueryResult,
        RuralTimelineAnalysisCnisContributionPeriodTypeormEntity,
      );

      return RuralTimelineAnalysisTypeormEntity.build({
        id: source.id.toString(),
        ruralTimelineCompleteAnalysis:
          source.ruralTimelineCompleteAnalysis ?? null,
        ruralTimelineSimplifiedAnalysis:
          source.ruralTimelineSimplifiedAnalysis ?? null,
        ruralTimelinePeriodDocumentAnalysis:
          source.ruralTimelinePeriodDocumentAnalysis ?? null,
        workRegime: source.workRegime,
        ruralTimelineAnalysisInssBenefit,
        ruralTimelineAnalysisLegalProceeding,
        ruralTimelinePeriod,
        ruralTimelineDocument,
        ruralTimelineCnisContributionPeriod,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt ?? null,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetRuralTimelineAnalysisWithRelationsQueryResult,
      RuralTimelineAnalysisTypeormEntity,
      mappingFunction,
    );
  }
}
