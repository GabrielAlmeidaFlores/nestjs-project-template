import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { BpcElderlyAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-analysis-result.typeorm.entity';
import { GetBpcElderlyAnalysisResultQueryResult } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/repository/bpc-elderly-analysis-result/query/result/get-bpc-elderly-analysis-result.query.result';
import { BpcElderlyAnalysisResultId } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-result/value-object/bpc-elderly-analysis-result-id/bpc-elderly-analysis-result-id.value-object';

@Injectable()
export class GetBpcElderlyAnalysisResultQueryResultAutoMapperProfile {
  protected readonly _type =
    GetBpcElderlyAnalysisResultQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: BpcElderlyAnalysisResultTypeormEntity,
    ): GetBpcElderlyAnalysisResultQueryResult => {
      return GetBpcElderlyAnalysisResultQueryResult.build({
        id: new BpcElderlyAnalysisResultId(source.id),
        completeAnalysis: source.completeAnalysis,
        completeAnalysisDownload: source.completeAnalysisDownload,
        simplifiedAnalysis: source.simplifiedAnalysis,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt ?? null,
      });
    };

    createMap(
      this.mapper,
      BpcElderlyAnalysisResultTypeormEntity,
      GetBpcElderlyAnalysisResultQueryResult,
      constructUsing(convertOrmEntityToQueryResult),
    );
  }
}
