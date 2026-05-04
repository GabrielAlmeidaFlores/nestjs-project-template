import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { BpcDisabilityTerminationResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-termination-result.typeorm.entity';
import { GetBpcDisabilityTerminationResultQueryResult } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/repository/bpc-disability-termination-result/query/result/get-bpc-disability-termination-result.query.result';
import { BpcDisabilityTerminationResultId } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-result/value-object/bpc-disability-termination-result-id/bpc-disability-termination-result-id.value-object';

@Injectable()
export class GetBpcDisabilityTerminationResultQueryResultAutoMapperProfile {
  protected readonly _type =
    GetBpcDisabilityTerminationResultQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: BpcDisabilityTerminationResultTypeormEntity,
    ): GetBpcDisabilityTerminationResultQueryResult => {
      return GetBpcDisabilityTerminationResultQueryResult.build({
        id: new BpcDisabilityTerminationResultId(source.id),
        inssDecisionAnalysis: source.inssDecisionAnalysis,
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
      BpcDisabilityTerminationResultTypeormEntity,
      GetBpcDisabilityTerminationResultQueryResult,
      constructUsing(convertOrmEntityToQueryResult),
    );
  }
}
