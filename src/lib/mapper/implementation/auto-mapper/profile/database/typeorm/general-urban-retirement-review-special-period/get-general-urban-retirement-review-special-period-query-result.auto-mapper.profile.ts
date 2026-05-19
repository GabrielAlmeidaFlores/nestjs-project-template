import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { GeneralUrbanRetirementReviewSpecialPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-review-special-period.typeorm.entity';
import { GetGeneralUrbanRetirementReviewSpecialPeriodQueryResult } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review-special-period/query/result/get-general-urban-retirement-review-special-period.query.result';
import { GeneralUrbanRetirementReviewSpecialPeriodId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-special-period/value-object/general-urban-retirement-review-special-period-id.value-object';

@Injectable()
export class GetGeneralUrbanRetirementReviewSpecialPeriodQueryResultAutoMapperProfile {
  protected readonly _type =
    GetGeneralUrbanRetirementReviewSpecialPeriodQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
    this.mapQueryResultToOrmEntity();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: GeneralUrbanRetirementReviewSpecialPeriodTypeormEntity,
    ): GetGeneralUrbanRetirementReviewSpecialPeriodQueryResult => {
      return GetGeneralUrbanRetirementReviewSpecialPeriodQueryResult.build({
        ...source,
        id: new GeneralUrbanRetirementReviewSpecialPeriodId(source.id),
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToQueryResult);

    createMap(
      this.mapper,
      GeneralUrbanRetirementReviewSpecialPeriodTypeormEntity,
      GetGeneralUrbanRetirementReviewSpecialPeriodQueryResult,
      mappingFunction,
    );
  }

  private mapQueryResultToOrmEntity(): void {
    const convertQueryResultToOrmEntity = (
      source: GetGeneralUrbanRetirementReviewSpecialPeriodQueryResult,
    ): GeneralUrbanRetirementReviewSpecialPeriodTypeormEntity => {
      return GeneralUrbanRetirementReviewSpecialPeriodTypeormEntity.build({
        ...source,
        id: source.id.toString(),
      });
    };

    const mappingFunction = constructUsing(convertQueryResultToOrmEntity);

    createMap(
      this.mapper,
      GetGeneralUrbanRetirementReviewSpecialPeriodQueryResult,
      GeneralUrbanRetirementReviewSpecialPeriodTypeormEntity,
      mappingFunction,
    );
  }
}
