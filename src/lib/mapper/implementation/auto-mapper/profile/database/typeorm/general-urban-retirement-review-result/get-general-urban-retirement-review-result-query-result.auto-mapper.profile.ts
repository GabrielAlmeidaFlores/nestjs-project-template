import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { GeneralUrbanRetirementReviewResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-review-result.typeorm.entity';
import { GetGeneralUrbanRetirementReviewResultQueryResult } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review-result/query/result/get-general-urban-retirement-review-result.query.result';
import { GeneralUrbanRetirementReviewResultId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-result/value-object/general-urban-retirement-review-result-id.value-object';

@Injectable()
export class GetGeneralUrbanRetirementReviewResultQueryResultAutoMapperProfile {
  protected readonly _type =
    GetGeneralUrbanRetirementReviewResultQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
    this.mapQueryResultToOrmEntity();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: GeneralUrbanRetirementReviewResultTypeormEntity,
    ): GetGeneralUrbanRetirementReviewResultQueryResult => {
      return GetGeneralUrbanRetirementReviewResultQueryResult.build({
        ...source,
        id: new GeneralUrbanRetirementReviewResultId(source.id),
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToQueryResult);

    createMap(
      this.mapper,
      GeneralUrbanRetirementReviewResultTypeormEntity,
      GetGeneralUrbanRetirementReviewResultQueryResult,
      mappingFunction,
    );
  }

  private mapQueryResultToOrmEntity(): void {
    const convertQueryResultToOrmEntity = (
      source: GetGeneralUrbanRetirementReviewResultQueryResult,
    ): GeneralUrbanRetirementReviewResultTypeormEntity => {
      return GeneralUrbanRetirementReviewResultTypeormEntity.build({
        ...source,
        id: source.id.toString(),
      });
    };

    const mappingFunction = constructUsing(convertQueryResultToOrmEntity);

    createMap(
      this.mapper,
      GetGeneralUrbanRetirementReviewResultQueryResult,
      GeneralUrbanRetirementReviewResultTypeormEntity,
      mappingFunction,
    );
  }
}
