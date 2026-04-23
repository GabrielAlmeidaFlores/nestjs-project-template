import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { BpcDisabilityDenialResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-denial-result.typeorm.entity';
import { GetBpcDisabilityDenialResultQueryResult } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/repository/bpc-disability-denial-result/query/result/get-bpc-disability-denial-result.query.result';
import { BpcDisabilityDenialResultId } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-result/value-object/bpc-disability-denial-result-id/bpc-disability-denial-result-id.value-object';

@Injectable()
export class GetBpcDisabilityDenialResultQueryResultAutoMapperProfile {
  protected readonly _type =
    GetBpcDisabilityDenialResultQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: BpcDisabilityDenialResultTypeormEntity,
    ): GetBpcDisabilityDenialResultQueryResult => {
      return GetBpcDisabilityDenialResultQueryResult.build({
        id: new BpcDisabilityDenialResultId(source.id),
        inssDecisionAnalysis: source.inssDecisionAnalysis,
        firstAnalysis: source.firstAnalysis,
        completeAnalysis: source.completeAnalysis,
        completeAnalysisDownload: source.completeAnalysisDownload,
        simplifiedAnalysis: source.simplifiedAnalysis,
        applicableRules: source.applicableRules,
        benefitSummaries: source.benefitSummaries,
        analysisDetailedText: source.analysisDetailedText,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt ?? null,
      });
    };

    createMap(
      this.mapper,
      BpcDisabilityDenialResultTypeormEntity,
      GetBpcDisabilityDenialResultQueryResult,
      constructUsing(convertOrmEntityToQueryResult),
    );
  }
}
