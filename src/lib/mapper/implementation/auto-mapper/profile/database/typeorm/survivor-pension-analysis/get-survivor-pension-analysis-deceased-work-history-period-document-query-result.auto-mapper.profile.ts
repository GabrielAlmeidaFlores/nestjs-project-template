import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { SurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis-deceased-work-history-period-document.typeorm.entity';
import { GetSurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentQueryResult } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-deceased-work-history-period-document/query/result/get-survivor-pension-analysis-deceased-work-history-period-document.query.result';
import { SurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-work-history-period-document/value-object/survivor-pension-analysis-deceased-work-history-period-document-id/survivor-pension-analysis-deceased-work-history-period-document-id.value-object';

@Injectable()
export class GetSurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentQueryResultAutoMapperProfile {
  protected readonly _type =
    GetSurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: SurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentTypeormEntity,
    ): GetSurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentQueryResult => {
      return GetSurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentQueryResult.build(
        {
          id: new SurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentId(
            source.id,
          ),
          documentType: source.documentType,
          documentName: source.documentName,
          createdAt: source.createdAt,
          updatedAt: source.updatedAt,
        },
      );
    };

    const mappingFunction = constructUsing(convertOrmEntityToQueryResult);

    createMap(
      this.mapper,
      SurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentTypeormEntity,
      GetSurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentQueryResult,
      mappingFunction,
    );
  }
}
