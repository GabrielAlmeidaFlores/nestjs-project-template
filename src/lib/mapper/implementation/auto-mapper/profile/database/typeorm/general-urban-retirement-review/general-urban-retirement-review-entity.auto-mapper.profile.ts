import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { GeneralUrbanRetirementReviewResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-review-result.typeorm.entity';
import { GeneralUrbanRetirementReviewTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-review.typeorm.entity';
import { GeneralUrbanRetirementReviewEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review/general-urban-retirement-review.entity';
import { GeneralUrbanRetirementReviewId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review/value-object/general-urban-retirement-review-id.value-object';
import { GeneralUrbanRetirementReviewResultEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-result/general-urban-retirement-review-result.entity';

@Injectable()
export class GeneralUrbanRetirementReviewEntityAutoMapperProfile {
  protected readonly _type =
    GeneralUrbanRetirementReviewEntityAutoMapperProfile.name;

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
    ): GeneralUrbanRetirementReviewEntity => {
      const generalUrbanRetirementReviewResult =
        source.generalUrbanRetirementReviewResult !== undefined
          ? this.mapper.map(
              source.generalUrbanRetirementReviewResult,
              GeneralUrbanRetirementReviewResultTypeormEntity,
              GeneralUrbanRetirementReviewResultEntity,
            )
          : null;

      return new GeneralUrbanRetirementReviewEntity({
        ...source,
        id: new GeneralUrbanRetirementReviewId(source.id),
        generalUrbanRetirementReviewResult,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      GeneralUrbanRetirementReviewTypeormEntity,
      GeneralUrbanRetirementReviewEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GeneralUrbanRetirementReviewEntity,
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
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GeneralUrbanRetirementReviewEntity,
      GeneralUrbanRetirementReviewTypeormEntity,
      mappingFunction,
    );
  }
}
