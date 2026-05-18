import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { GeneralUrbanRetirementReviewPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-review-period.typeorm.entity';
import { GetGeneralUrbanRetirementReviewPeriodQueryResult } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review-period/query/result/get-general-urban-retirement-review-period.query.result';
import { GeneralUrbanRetirementReviewPeriodId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-period/value-object/general-urban-retirement-review-period-id.value-object';

@Injectable()
export class GetGeneralUrbanRetirementReviewPeriodQueryResultAutoMapperProfile {
  protected readonly _type =
    GetGeneralUrbanRetirementReviewPeriodQueryResultAutoMapperProfile.name;

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
    ): GetGeneralUrbanRetirementReviewPeriodQueryResult => {
      const contributionAverage =
        source.contributionAverage !== null
          ? new DecimalValue(source.contributionAverage)
          : null;

      return GetGeneralUrbanRetirementReviewPeriodQueryResult.build({
        ...source,
        id: new GeneralUrbanRetirementReviewPeriodId(source.id),
        contributionAverage,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToQueryResult);

    createMap(
      this.mapper,
      GeneralUrbanRetirementReviewPeriodTypeormEntity,
      GetGeneralUrbanRetirementReviewPeriodQueryResult,
      mappingFunction,
    );
  }

  private mapQueryResultToOrmEntity(): void {
    const convertQueryResultToOrmEntity = (
      source: GetGeneralUrbanRetirementReviewPeriodQueryResult,
    ): GeneralUrbanRetirementReviewPeriodTypeormEntity => {
      const contributionAverage =
        source.contributionAverage !== null
          ? source.contributionAverage.toString()
          : null;

      return GeneralUrbanRetirementReviewPeriodTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        contributionAverage,
      });
    };

    const mappingFunction = constructUsing(convertQueryResultToOrmEntity);

    createMap(
      this.mapper,
      GetGeneralUrbanRetirementReviewPeriodQueryResult,
      GeneralUrbanRetirementReviewPeriodTypeormEntity,
      mappingFunction,
    );
  }
}
