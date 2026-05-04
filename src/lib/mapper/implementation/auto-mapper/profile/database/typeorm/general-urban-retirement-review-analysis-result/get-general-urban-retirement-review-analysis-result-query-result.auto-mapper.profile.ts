import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { GeneralUrbanRetirementReviewAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-review-analysis-result.typeorm.entity';
import { GeneralUrbanRetirementReviewTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-review.typeorm.entity';
import { GetGeneralUrbanRetirementReviewAnalysisResultQueryResult } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review-analysis-result/query/result/get-general-urban-retirement-review-analysis-result.query.result';
import { GeneralUrbanRetirementReviewEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review/general-urban-retirement-review.entity';
import { GeneralUrbanRetirementReviewAnalysisResultId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-analysis-result/value-object/general-urban-retirement-review-analysis-result-id.value-object';

@Injectable()
export class GetGeneralUrbanRetirementReviewAnalysisResultQueryResultAutoMapperProfile {
  protected readonly _type =
    GetGeneralUrbanRetirementReviewAnalysisResultQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
    this.mapQueryResultToOrmEntity();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: GeneralUrbanRetirementReviewAnalysisResultTypeormEntity,
    ): GetGeneralUrbanRetirementReviewAnalysisResultQueryResult => {
      const generalUrbanRetirementReview =
        source.generalUrbanRetirementReview !== undefined &&
        source.generalUrbanRetirementReview !== null
          ? this.mapper.map(
              source.generalUrbanRetirementReview,
              GeneralUrbanRetirementReviewTypeormEntity,
              GeneralUrbanRetirementReviewEntity,
            )
          : null;

      return GetGeneralUrbanRetirementReviewAnalysisResultQueryResult.build({
        ...source,
        id: new GeneralUrbanRetirementReviewAnalysisResultId(source.id),
        response: source.response,
        generalUrbanRetirementReview,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToQueryResult);

    createMap(
      this.mapper,
      GeneralUrbanRetirementReviewAnalysisResultTypeormEntity,
      GetGeneralUrbanRetirementReviewAnalysisResultQueryResult,
      mappingFunction,
    );
  }

  private mapQueryResultToOrmEntity(): void {
    const convertQueryResultToOrmEntity = (
      source: GetGeneralUrbanRetirementReviewAnalysisResultQueryResult,
    ): GeneralUrbanRetirementReviewAnalysisResultTypeormEntity => {
      return GeneralUrbanRetirementReviewAnalysisResultTypeormEntity.build({
        id: source.id.toString(),
        analysisType: source.analysisType ?? null,
        response: source.response ?? '',
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt ?? null,
      });
    };

    const mappingFunction = constructUsing(convertQueryResultToOrmEntity);

    createMap(
      this.mapper,
      GetGeneralUrbanRetirementReviewAnalysisResultQueryResult,
      GeneralUrbanRetirementReviewAnalysisResultTypeormEntity,
      mappingFunction,
    );
  }
}
