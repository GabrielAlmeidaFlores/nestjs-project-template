import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { GeneralUrbanRetirementReviewAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-review-analysis-result.typeorm.entity';
import { GeneralUrbanRetirementReviewTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-review.typeorm.entity';
import { GeneralUrbanRetirementReviewEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review/general-urban-retirement-review.entity';
import { GeneralUrbanRetirementReviewAnalysisResultEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-analysis-result/general-urban-retirement-review-analysis-result.entity';
import { GeneralUrbanRetirementReviewAnalysisResultId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-analysis-result/value-object/general-urban-retirement-review-analysis-result-id.value-object';

@Injectable()
export class GeneralUrbanRetirementReviewAnalysisResultEntityAutoMapperProfile {
  protected readonly _type =
    GeneralUrbanRetirementReviewAnalysisResultEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: GeneralUrbanRetirementReviewAnalysisResultTypeormEntity,
    ): GeneralUrbanRetirementReviewAnalysisResultEntity => {
      if (!source.generalUrbanRetirementReview) {
        throw new Error(
          'generalUrbanRetirementReview is required for GeneralUrbanRetirementReviewAnalysisResultEntity',
        );
      }

      const generalUrbanRetirementReview = this.mapper.map(
        source.generalUrbanRetirementReview,
        GeneralUrbanRetirementReviewTypeormEntity,
        GeneralUrbanRetirementReviewEntity,
      );

      return new GeneralUrbanRetirementReviewAnalysisResultEntity({
        ...source,
        id: new GeneralUrbanRetirementReviewAnalysisResultId(source.id),
        generalUrbanRetirementReview,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      GeneralUrbanRetirementReviewAnalysisResultTypeormEntity,
      GeneralUrbanRetirementReviewAnalysisResultEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GeneralUrbanRetirementReviewAnalysisResultEntity,
    ): GeneralUrbanRetirementReviewAnalysisResultTypeormEntity => {
      const generalUrbanRetirementReview = this.mapper.map(
        source.generalUrbanRetirementReview,
        GeneralUrbanRetirementReviewEntity,
        GeneralUrbanRetirementReviewTypeormEntity,
      );

      return GeneralUrbanRetirementReviewAnalysisResultTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        generalUrbanRetirementReview,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GeneralUrbanRetirementReviewAnalysisResultEntity,
      GeneralUrbanRetirementReviewAnalysisResultTypeormEntity,
      mappingFunction,
    );
  }
}
