import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { SpecialActivityResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-activity-result.typeorm.entity';
import { SpecialActivityResultId } from '@module/customer/analysis-tool/domain/schema/entity/special-activity-result/value-object/special-activity-result-id.value-object';
import { GetSpecialActivityAnalysisResultQueryResult } from '@module/customer/analysis-tool/module/special-activity-analysis/domain/repository/special-activity-analysis-result/query/result/get-special-activity-analysis-result.query.result';

@Injectable()
export class GetSpecialActivityAnalysisResultQueryResultAutoMapperProfile {
  protected readonly _type =
    GetSpecialActivityAnalysisResultQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: SpecialActivityResultTypeormEntity,
    ): GetSpecialActivityAnalysisResultQueryResult => {
      return GetSpecialActivityAnalysisResultQueryResult.build({
        id: new SpecialActivityResultId(source.id),
        specialActivityCompleteAnalysis: source.specialActivityCompleteAnalysis,
        specialActivitySimplifiedAnalysis:
          source.specialActivitySimplifiedAnalysis,
        specialActivityCompleteAnalysisDownload:
          source.specialActivityCompleteAnalysisDownload,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToQueryResult);

    createMap(
      this.mapper,
      SpecialActivityResultTypeormEntity,
      GetSpecialActivityAnalysisResultQueryResult,
      mappingFunction,
    );
  }
}
