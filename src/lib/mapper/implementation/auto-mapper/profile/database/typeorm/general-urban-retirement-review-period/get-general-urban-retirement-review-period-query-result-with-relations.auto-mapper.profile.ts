import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { GeneralUrbanRetirementReviewPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-review-period.typeorm.entity';
import { GeneralUrbanRetirementReviewTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-review.typeorm.entity';
import { GetGeneralUrbanRetirementReviewPeriodWithRelationsQueryResult } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review-period/query/result/get-general-urban-retirement-review-period-with-relations.query.result';
import { GeneralUrbanRetirementReviewEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review/general-urban-retirement-review.entity';
import { GeneralUrbanRetirementReviewPeriodId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-period/value-object/general-urban-retirement-review-period-id.value-object';

@Injectable()
export class GetGeneralUrbanRetirementReviewPeriodQueryResultWithRelationsAutoMapperProfile {
  protected readonly _type =
    GetGeneralUrbanRetirementReviewPeriodQueryResultWithRelationsAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
    this.mapQueryResultToOrmEntity();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: GeneralUrbanRetirementReviewPeriodTypeormEntity,
    ): GetGeneralUrbanRetirementReviewPeriodWithRelationsQueryResult => {
      const generalUrbanRetirementReview =
        source.generalUrbanRetirementReview !== undefined &&
        source.generalUrbanRetirementReview !== null
          ? this.mapper.map(
              source.generalUrbanRetirementReview,
              GeneralUrbanRetirementReviewTypeormEntity,
              GeneralUrbanRetirementReviewEntity,
            )
          : null;

      const contributionAverage =
        source.contributionAverage !== null
          ? new DecimalValue(source.contributionAverage)
          : null;

      return GetGeneralUrbanRetirementReviewPeriodWithRelationsQueryResult.build(
        {
          ...source,
          id: new GeneralUrbanRetirementReviewPeriodId(source.id),
          contributionAverage,
          generalUrbanRetirementReview,
        },
      );
    };

    const mappingFunction = constructUsing(convertOrmEntityToQueryResult);

    createMap(
      this.mapper,
      GeneralUrbanRetirementReviewPeriodTypeormEntity,
      GetGeneralUrbanRetirementReviewPeriodWithRelationsQueryResult,
      mappingFunction,
    );
  }

  private mapQueryResultToOrmEntity(): void {
    const convertQueryResultToOrmEntity = (
      source: GetGeneralUrbanRetirementReviewPeriodWithRelationsQueryResult,
    ): GeneralUrbanRetirementReviewPeriodTypeormEntity => {
      const generalUrbanRetirementReview =
        source.generalUrbanRetirementReview !== null
          ? this.mapper.map(
              source.generalUrbanRetirementReview,
              GeneralUrbanRetirementReviewEntity,
              GeneralUrbanRetirementReviewTypeormEntity,
            )
          : undefined;

      const contributionAverage =
        source.contributionAverage !== null
          ? source.contributionAverage.toString()
          : null;

      return GeneralUrbanRetirementReviewPeriodTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        contributionAverage,
        generalUrbanRetirementReview: generalUrbanRetirementReview ?? null,
      });
    };

    const mappingFunction = constructUsing(convertQueryResultToOrmEntity);

    createMap(
      this.mapper,
      GetGeneralUrbanRetirementReviewPeriodWithRelationsQueryResult,
      GeneralUrbanRetirementReviewPeriodTypeormEntity,
      mappingFunction,
    );
  }
}
