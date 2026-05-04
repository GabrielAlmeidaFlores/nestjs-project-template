import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { GeneralUrbanRetirementReviewInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-review-inss-benefit.typeorm.entity';
import { GeneralUrbanRetirementReviewTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-review.typeorm.entity';
import { GeneralUrbanRetirementReviewEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review/general-urban-retirement-review.entity';
import { GeneralUrbanRetirementReviewInssBenefitEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-inss-benefit/general-urban-retirement-review-inss-benefit.entity';
import { GeneralUrbanRetirementReviewInssBenefitId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-inss-benefit/value-object/general-urban-retirement-review-inss-benefit-id.value-object';

@Injectable()
export class GeneralUrbanRetirementReviewInssBenefitEntityAutoMapperProfile {
  protected readonly _type =
    GeneralUrbanRetirementReviewInssBenefitEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: GeneralUrbanRetirementReviewInssBenefitTypeormEntity,
    ): GeneralUrbanRetirementReviewInssBenefitEntity => {
      if (!source.generalUrbanRetirementReview) {
        throw new Error(
          'generalUrbanRetirementReview is required for GeneralUrbanRetirementReviewInssBenefitEntity',
        );
      }

      const generalUrbanRetirementReview = this.mapper.map(
        source.generalUrbanRetirementReview,
        GeneralUrbanRetirementReviewTypeormEntity,
        GeneralUrbanRetirementReviewEntity,
      );

      return new GeneralUrbanRetirementReviewInssBenefitEntity({
        ...source,
        id: new GeneralUrbanRetirementReviewInssBenefitId(source.id),
        generalUrbanRetirementReview,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      GeneralUrbanRetirementReviewInssBenefitTypeormEntity,
      GeneralUrbanRetirementReviewInssBenefitEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GeneralUrbanRetirementReviewInssBenefitEntity,
    ): GeneralUrbanRetirementReviewInssBenefitTypeormEntity => {
      const generalUrbanRetirementReview = this.mapper.map(
        source.generalUrbanRetirementReview,
        GeneralUrbanRetirementReviewEntity,
        GeneralUrbanRetirementReviewTypeormEntity,
      );

      return GeneralUrbanRetirementReviewInssBenefitTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        generalUrbanRetirementReview,
      } as GeneralUrbanRetirementReviewInssBenefitTypeormEntity);
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GeneralUrbanRetirementReviewInssBenefitEntity,
      GeneralUrbanRetirementReviewInssBenefitTypeormEntity,
      mappingFunction,
    );
  }
}
