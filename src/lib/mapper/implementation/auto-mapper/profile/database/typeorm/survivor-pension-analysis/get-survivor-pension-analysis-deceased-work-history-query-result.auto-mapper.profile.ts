import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { SurvivorPensionAnalysisDeceasedWorkHistoryPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis-deceased-work-history-period.typeorm.entity';
import { SurvivorPensionAnalysisDeceasedWorkHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis-deceased-work-history.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { GetSurvivorPensionAnalysisDeceasedWorkHistoryQueryResult } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-deceased-work-history/query/result/get-survivor-pension-analysis-deceased-work-history.query.result';
import { GetSurvivorPensionAnalysisDeceasedWorkHistoryPeriodQueryResult } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-deceased-work-history-period/query/result/get-survivor-pension-analysis-deceased-work-history-period.query.result';
import { SurvivorPensionAnalysisId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis/value-object/survivor-pension-analysis-id/survivor-pension-analysis-id.value-object';
import { SurvivorPensionAnalysisDeceasedWorkHistoryId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-work-history/value-object/survivor-pension-analysis-deceased-work-history-id/survivor-pension-analysis-deceased-work-history-id.value-object';

@Injectable()
export class GetSurvivorPensionAnalysisDeceasedWorkHistoryQueryResultAutoMapperProfile {
  protected readonly _type =
    GetSurvivorPensionAnalysisDeceasedWorkHistoryQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: SurvivorPensionAnalysisDeceasedWorkHistoryTypeormEntity,
    ): GetSurvivorPensionAnalysisDeceasedWorkHistoryQueryResult => {
      if (!source.survivorPensionAnalysis) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass:
            GetSurvivorPensionAnalysisDeceasedWorkHistoryQueryResult.name,
          sourceClass:
            SurvivorPensionAnalysisDeceasedWorkHistoryTypeormEntity.name,
        });
      }

      const periods = (source.periods ?? []).map((period) =>
        this.mapper.map(
          period,
          SurvivorPensionAnalysisDeceasedWorkHistoryPeriodTypeormEntity,
          GetSurvivorPensionAnalysisDeceasedWorkHistoryPeriodQueryResult,
        ),
      );

      return GetSurvivorPensionAnalysisDeceasedWorkHistoryQueryResult.build({
        id: new SurvivorPensionAnalysisDeceasedWorkHistoryId(source.id),
        survivorPensionAnalysisId: new SurvivorPensionAnalysisId(
          source.survivorPensionAnalysis.id,
        ),
        startDate: source.startDate,
        endDate: source.endDate,
        periods,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToQueryResult);

    createMap(
      this.mapper,
      SurvivorPensionAnalysisDeceasedWorkHistoryTypeormEntity,
      GetSurvivorPensionAnalysisDeceasedWorkHistoryQueryResult,
      mappingFunction,
    );
  }
}
