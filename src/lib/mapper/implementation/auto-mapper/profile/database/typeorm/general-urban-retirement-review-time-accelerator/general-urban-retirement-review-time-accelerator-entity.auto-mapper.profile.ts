import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { GeneralUrbanRetirementReviewTimeAcceleratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-review-time-accelerator.typeorm.entity';
import { GeneralUrbanRetirementReviewTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-review.typeorm.entity';
import { GeneralUrbanRetirementReviewEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review/general-urban-retirement-review.entity';
import { GeneralUrbanRetirementReviewTimeAcceleratorEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-time-accelerator/general-urban-retirement-review-time-accelerator.entity';
import { GeneralUrbanRetirementReviewTimeAcceleratorId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-time-accelerator/value-object/general-urban-retirement-review-time-accelerator-id.value-object';

@Injectable()
export class GeneralUrbanRetirementReviewTimeAcceleratorEntityAutoMapperProfile {
  protected readonly _type =
    GeneralUrbanRetirementReviewTimeAcceleratorEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: GeneralUrbanRetirementReviewTimeAcceleratorTypeormEntity,
    ): GeneralUrbanRetirementReviewTimeAcceleratorEntity => {
      const generalUrbanRetirementReview =
        source.generalUrbanRetirementReview !== undefined &&
        source.generalUrbanRetirementReview !== null
          ? this.mapper.map(
              source.generalUrbanRetirementReview,
              GeneralUrbanRetirementReviewTypeormEntity,
              GeneralUrbanRetirementReviewEntity,
            )
          : null;

      return new GeneralUrbanRetirementReviewTimeAcceleratorEntity({
        ...source,
        id: new GeneralUrbanRetirementReviewTimeAcceleratorId(source.id),
        generalUrbanRetirementReview,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      GeneralUrbanRetirementReviewTimeAcceleratorTypeormEntity,
      GeneralUrbanRetirementReviewTimeAcceleratorEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GeneralUrbanRetirementReviewTimeAcceleratorEntity,
    ): GeneralUrbanRetirementReviewTimeAcceleratorTypeormEntity => {
      const generalUrbanRetirementReview =
        source.generalUrbanRetirementReview !== null
          ? this.mapper.map(
              source.generalUrbanRetirementReview,
              GeneralUrbanRetirementReviewEntity,
              GeneralUrbanRetirementReviewTypeormEntity,
            )
          : undefined;

      return GeneralUrbanRetirementReviewTimeAcceleratorTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        generalUrbanRetirementReview: generalUrbanRetirementReview ?? null,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GeneralUrbanRetirementReviewTimeAcceleratorEntity,
      GeneralUrbanRetirementReviewTimeAcceleratorTypeormEntity,
      mappingFunction,
    );
  }
}
