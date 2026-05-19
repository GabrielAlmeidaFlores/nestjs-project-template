import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { GeneralUrbanRetirementReviewResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-review-result.typeorm.entity';
import { GeneralUrbanRetirementReviewTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-review.typeorm.entity';
import { GetGeneralUrbanRetirementReviewQueryResult } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review/query/result/get-general-urban-retirement-review-query.result';
import { GeneralUrbanRetirementReviewId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review/value-object/general-urban-retirement-review-id.value-object';
import { GeneralUrbanRetirementReviewResultEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-result/general-urban-retirement-review-result.entity';

@Injectable()
export class GetGeneralUrbanRetirementReviewQueryResultAutoMapperProfile {
  protected readonly _type =
    GetGeneralUrbanRetirementReviewQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: GeneralUrbanRetirementReviewTypeormEntity,
    ): GetGeneralUrbanRetirementReviewQueryResult => {
      const generalUrbanRetirementReviewResult =
        source.generalUrbanRetirementReviewResult !== undefined
          ? this.mapper.map(
              source.generalUrbanRetirementReviewResult,
              GeneralUrbanRetirementReviewResultTypeormEntity,
              GeneralUrbanRetirementReviewResultEntity,
            )
          : null;

      return GetGeneralUrbanRetirementReviewQueryResult.build({
        ...source,
        id: new GeneralUrbanRetirementReviewId(source.id),
        generalUrbanRetirementReviewResult,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      GeneralUrbanRetirementReviewTypeormEntity,
      GetGeneralUrbanRetirementReviewQueryResult,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetGeneralUrbanRetirementReviewQueryResult,
    ): GeneralUrbanRetirementReviewTypeormEntity => {
      const generalUrbanRetirementReviewResult =
        source.generalUrbanRetirementReviewResult !== null
          ? this.mapper.map(
              source.generalUrbanRetirementReviewResult,
              GeneralUrbanRetirementReviewResultEntity,
              GeneralUrbanRetirementReviewResultTypeormEntity,
            )
          : undefined;

      return GeneralUrbanRetirementReviewTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        generalUrbanRetirementReviewResult,
        analysisName: source.analysisName ?? null,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetGeneralUrbanRetirementReviewQueryResult,
      GeneralUrbanRetirementReviewTypeormEntity,
      mappingFunction,
    );
  }
}
