import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { GeneralUrbanRetirementReviewTimeAcceleratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-review-time-accelerator.typeorm.entity';
import { GetGeneralUrbanRetirementReviewTimeAcceleratorQueryResult } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review-time-accelerator/query/result/get-general-urban-retirement-review-time-accelerator.query.result';
import { GeneralUrbanRetirementReviewTimeAcceleratorId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-time-accelerator/value-object/general-urban-retirement-review-time-accelerator-id.value-object';

@Injectable()
export class GetGeneralUrbanRetirementReviewTimeAcceleratorQueryResultAutoMapperProfile {
  protected readonly _type =
    GetGeneralUrbanRetirementReviewTimeAcceleratorQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
    this.mapQueryResultToOrmEntity();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: GeneralUrbanRetirementReviewTimeAcceleratorTypeormEntity,
    ): GetGeneralUrbanRetirementReviewTimeAcceleratorQueryResult => {
      return GetGeneralUrbanRetirementReviewTimeAcceleratorQueryResult.build({
        ...source,
        id: new GeneralUrbanRetirementReviewTimeAcceleratorId(source.id),
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToQueryResult);

    createMap(
      this.mapper,
      GeneralUrbanRetirementReviewTimeAcceleratorTypeormEntity,
      GetGeneralUrbanRetirementReviewTimeAcceleratorQueryResult,
      mappingFunction,
    );
  }

  private mapQueryResultToOrmEntity(): void {
    const convertQueryResultToOrmEntity = (
      source: GetGeneralUrbanRetirementReviewTimeAcceleratorQueryResult,
    ): GeneralUrbanRetirementReviewTimeAcceleratorTypeormEntity => {
      return GeneralUrbanRetirementReviewTimeAcceleratorTypeormEntity.build({
        ...source,
        id: source.id.toString(),
      });
    };

    const mappingFunction = constructUsing(convertQueryResultToOrmEntity);

    createMap(
      this.mapper,
      GetGeneralUrbanRetirementReviewTimeAcceleratorQueryResult,
      GeneralUrbanRetirementReviewTimeAcceleratorTypeormEntity,
      mappingFunction,
    );
  }
}
