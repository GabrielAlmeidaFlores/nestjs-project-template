import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { GeneralUrbanRetirementReviewLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-review-legal-proceeding.typeorm.entity';
import { GeneralUrbanRetirementReviewTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-review.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { GeneralUrbanRetirementReviewEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review/general-urban-retirement-review.entity';
import { GeneralUrbanRetirementReviewLegalProceedingEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-legal-proceeding/general-urban-retirement-review-legal-proceeding.entity';
import { GeneralUrbanRetirementReviewLegalProceedingId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-legal-proceeding/value-object/general-urban-retirement-review-legal-proceeding-id.value-object';

@Injectable()
export class GeneralUrbanRetirementReviewLegalProceedingEntityAutoMapperProfile {
  protected readonly _type =
    GeneralUrbanRetirementReviewLegalProceedingEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: GeneralUrbanRetirementReviewLegalProceedingTypeormEntity,
    ): GeneralUrbanRetirementReviewLegalProceedingEntity => {
      if (!source.generalUrbanRetirementReview) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass:
            GeneralUrbanRetirementReviewLegalProceedingEntity.name,
          sourceClass:
            GeneralUrbanRetirementReviewLegalProceedingTypeormEntity.name,
        });
      }

      const generalUrbanRetirementReview = this.mapper.map(
        source.generalUrbanRetirementReview,
        GeneralUrbanRetirementReviewTypeormEntity,
        GeneralUrbanRetirementReviewEntity,
      );

      return new GeneralUrbanRetirementReviewLegalProceedingEntity({
        id: new GeneralUrbanRetirementReviewLegalProceedingId(source.id),
        legalProceedingNumber: source.legalProceedingNumber,
        generalUrbanRetirementReview,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      GeneralUrbanRetirementReviewLegalProceedingTypeormEntity,
      GeneralUrbanRetirementReviewLegalProceedingEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GeneralUrbanRetirementReviewLegalProceedingEntity,
    ): GeneralUrbanRetirementReviewLegalProceedingTypeormEntity => {
      const generalUrbanRetirementReview = this.mapper.map(
        source.generalUrbanRetirementReview,
        GeneralUrbanRetirementReviewEntity,
        GeneralUrbanRetirementReviewTypeormEntity,
      );

      return GeneralUrbanRetirementReviewLegalProceedingTypeormEntity.build({
        id: source.id.toString(),
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
        legalProceedingNumber: source.legalProceedingNumber,
        generalUrbanRetirementReview,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GeneralUrbanRetirementReviewLegalProceedingEntity,
      GeneralUrbanRetirementReviewLegalProceedingTypeormEntity,
      mappingFunction,
    );
  }
}
