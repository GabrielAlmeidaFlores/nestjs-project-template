import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { SurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis-deceased-work-history-period-document.typeorm.entity';
import { SurvivorPensionAnalysisDeceasedWorkHistoryPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis-deceased-work-history-period.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { GetSurvivorPensionAnalysisDeceasedWorkHistoryPeriodQueryResult } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-deceased-work-history-period/query/result/get-survivor-pension-analysis-deceased-work-history-period.query.result';
import { GetSurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentQueryResult } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-deceased-work-history-period-document/query/result/get-survivor-pension-analysis-deceased-work-history-period-document.query.result';
import { SurvivorPensionAnalysisDeceasedWorkHistoryId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-work-history/value-object/survivor-pension-analysis-deceased-work-history-id/survivor-pension-analysis-deceased-work-history-id.value-object';
import { SurvivorPensionAnalysisDeceasedWorkHistoryPeriodId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-work-history-period/value-object/survivor-pension-analysis-deceased-work-history-period-id/survivor-pension-analysis-deceased-work-history-period-id.value-object';

@Injectable()
export class GetSurvivorPensionAnalysisDeceasedWorkHistoryPeriodQueryResultAutoMapperProfile {
  protected readonly _type =
    GetSurvivorPensionAnalysisDeceasedWorkHistoryPeriodQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: SurvivorPensionAnalysisDeceasedWorkHistoryPeriodTypeormEntity,
    ): GetSurvivorPensionAnalysisDeceasedWorkHistoryPeriodQueryResult => {
      if (!source.deceasedWorkHistory) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass:
            GetSurvivorPensionAnalysisDeceasedWorkHistoryPeriodQueryResult.name,
          sourceClass:
            SurvivorPensionAnalysisDeceasedWorkHistoryPeriodTypeormEntity.name,
        });
      }

      const documents = (source.documents ?? []).map((doc) =>
        this.mapper.map(
          doc,
          SurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentTypeormEntity,
          GetSurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentQueryResult,
        ),
      );

      return GetSurvivorPensionAnalysisDeceasedWorkHistoryPeriodQueryResult.build(
        {
          id: new SurvivorPensionAnalysisDeceasedWorkHistoryPeriodId(source.id),
          survivorPensionAnalysisDeceasedWorkHistoryId:
            new SurvivorPensionAnalysisDeceasedWorkHistoryId(
              source.deceasedWorkHistory.id,
            ),
          startDate: source.startDate,
          endDate: source.endDate,
          specialPeriodStartDate: source.specialPeriodStartDate,
          specialPeriodEndDate: source.specialPeriodEndDate,
          specialTimeType: source.specialTimeType,
          jobTitle: source.jobTitle,
          careerName: source.careerName,
          serviceType: source.serviceType,
          department: source.department,
          documents,
          createdAt: source.createdAt,
          updatedAt: source.updatedAt,
        },
      );
    };

    const mappingFunction = constructUsing(convertOrmEntityToQueryResult);

    createMap(
      this.mapper,
      SurvivorPensionAnalysisDeceasedWorkHistoryPeriodTypeormEntity,
      GetSurvivorPensionAnalysisDeceasedWorkHistoryPeriodQueryResult,
      mappingFunction,
    );
  }
}
