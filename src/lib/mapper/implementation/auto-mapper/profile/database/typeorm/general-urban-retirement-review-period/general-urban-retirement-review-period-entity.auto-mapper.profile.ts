import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { GeneralUrbanRetirementReviewPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-review-period.typeorm.entity';
import { GeneralUrbanRetirementReviewTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-review.typeorm.entity';
import { GeneralUrbanRetirementReviewEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review/general-urban-retirement-review.entity';
import { GeneralUrbanRetirementReviewPeriodEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-period/general-urban-retirement-review-period.entity';
import { GeneralUrbanRetirementReviewPeriodId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-period/value-object/general-urban-retirement-review-period-id.value-object';

@Injectable()
export class GeneralUrbanRetirementReviewPeriodEntityAutoMapperProfile {
  protected readonly _type =
    GeneralUrbanRetirementReviewPeriodEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: GeneralUrbanRetirementReviewPeriodTypeormEntity,
    ): GeneralUrbanRetirementReviewPeriodEntity => {
      const generalUrbanRetirementReview =
        source.generalUrbanRetirementReview !== undefined &&
        source.generalUrbanRetirementReview !== null
          ? this.mapper.map(
              source.generalUrbanRetirementReview,
              GeneralUrbanRetirementReviewTypeormEntity,
              GeneralUrbanRetirementReviewEntity,
            )
          : null;

      const contributionAverage =
        source.contributionAverage !== null
          ? new DecimalValue(source.contributionAverage)
          : null;

      return new GeneralUrbanRetirementReviewPeriodEntity({
        id: new GeneralUrbanRetirementReviewPeriodId(source.id),
        periodName: source.periodName,
        periodStart: source.periodStart,
        periodEnd: source.periodEnd,
        category: source.category,
        isPendency: source.isPendency,
        reasonPendency: source.reasonPendency,
        competenceBelowTheMinimum: source.competenceBelowTheMinimum,
        contributionAverage,
        typeOfContribution: source.typeOfContribution,
        generalUrbanRetirementReview,
        status: source.status,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      GeneralUrbanRetirementReviewPeriodTypeormEntity,
      GeneralUrbanRetirementReviewPeriodEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GeneralUrbanRetirementReviewPeriodEntity,
    ): GeneralUrbanRetirementReviewPeriodTypeormEntity => {
      const generalUrbanRetirementReview =
        source.generalUrbanRetirementReview !== null
          ? this.mapper.map(
              source.generalUrbanRetirementReview,
              GeneralUrbanRetirementReviewEntity,
              GeneralUrbanRetirementReviewTypeormEntity,
            )
          : null;

      const contributionAverage =
        source.contributionAverage !== null
          ? source.contributionAverage.toString()
          : null;

      return GeneralUrbanRetirementReviewPeriodTypeormEntity.build({
        id: source.id.toString(),
        periodName: source.periodName,
        periodStart: source.periodStart,
        periodEnd: source.periodEnd,
        category: source.category,
        isPendency: source.isPendency,
        reasonPendency: source.reasonPendency,
        competenceBelowTheMinimum: source.competenceBelowTheMinimum,
        contributionAverage,
        typeOfContribution: source.typeOfContribution,
        generalUrbanRetirementReview,
        status: source.status,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GeneralUrbanRetirementReviewPeriodEntity,
      GeneralUrbanRetirementReviewPeriodTypeormEntity,
      mappingFunction,
    );
  }
}
