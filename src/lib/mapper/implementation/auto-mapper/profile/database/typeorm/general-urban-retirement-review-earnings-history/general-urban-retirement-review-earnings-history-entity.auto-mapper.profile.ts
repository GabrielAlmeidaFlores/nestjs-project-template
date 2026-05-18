import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { GeneralUrbanRetirementReviewEarningsHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-review-earnings-history.typeorm.entity';
import { GeneralUrbanRetirementReviewPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-review-period.typeorm.entity';
import { GeneralUrbanRetirementReviewTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-review.typeorm.entity';
import { GeneralUrbanRetirementReviewEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review/general-urban-retirement-review.entity';
import { GeneralUrbanRetirementReviewEarningsHistoryEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-earnings-history/general-urban-retirement-review-earnings-history.entity';
import { GeneralUrbanRetirementReviewEarningsHistoryId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-earnings-history/value-object/general-urban-retirement-review-earnings-history-id.value-object';
import { GeneralUrbanRetirementReviewPeriodEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-period/general-urban-retirement-review-period.entity';

@Injectable()
export class GeneralUrbanRetirementReviewEarningsHistoryEntityAutoMapperProfile {
  protected readonly _type =
    GeneralUrbanRetirementReviewEarningsHistoryEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: GeneralUrbanRetirementReviewEarningsHistoryTypeormEntity,
    ): GeneralUrbanRetirementReviewEarningsHistoryEntity => {
      const generalUrbanRetirementReview =
        source.generalUrbanRetirementReview !== undefined &&
        source.generalUrbanRetirementReview !== null
          ? this.mapper.map(
              source.generalUrbanRetirementReview,
              GeneralUrbanRetirementReviewTypeormEntity,
              GeneralUrbanRetirementReviewEntity,
            )
          : null;

      const generalUrbanRetirementReviewPeriod =
        source.generalUrbanRetirementReviewPeriod !== undefined &&
        source.generalUrbanRetirementReviewPeriod !== null
          ? this.mapper.map(
              source.generalUrbanRetirementReviewPeriod,
              GeneralUrbanRetirementReviewPeriodTypeormEntity,
              GeneralUrbanRetirementReviewPeriodEntity,
            )
          : null;

      return new GeneralUrbanRetirementReviewEarningsHistoryEntity({
        ...source,
        id: new GeneralUrbanRetirementReviewEarningsHistoryId(source.id),
        generalUrbanRetirementReview,
        generalUrbanRetirementReviewPeriod,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      GeneralUrbanRetirementReviewEarningsHistoryTypeormEntity,
      GeneralUrbanRetirementReviewEarningsHistoryEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GeneralUrbanRetirementReviewEarningsHistoryEntity,
    ): GeneralUrbanRetirementReviewEarningsHistoryTypeormEntity => {
      const generalUrbanRetirementReview =
        source.generalUrbanRetirementReview !== null
          ? this.mapper.map(
              source.generalUrbanRetirementReview,
              GeneralUrbanRetirementReviewEntity,
              GeneralUrbanRetirementReviewTypeormEntity,
            )
          : undefined;

      const generalUrbanRetirementReviewPeriod =
        source.generalUrbanRetirementReviewPeriod !== null
          ? this.mapper.map(
              source.generalUrbanRetirementReviewPeriod,
              GeneralUrbanRetirementReviewPeriodEntity,
              GeneralUrbanRetirementReviewPeriodTypeormEntity,
            )
          : undefined;

      return GeneralUrbanRetirementReviewEarningsHistoryTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        generalUrbanRetirementReview: generalUrbanRetirementReview ?? null,
        generalUrbanRetirementReviewPeriod:
          generalUrbanRetirementReviewPeriod ?? null,
        deletedAt: null,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GeneralUrbanRetirementReviewEarningsHistoryEntity,
      GeneralUrbanRetirementReviewEarningsHistoryTypeormEntity,
      mappingFunction,
    );
  }
}
