import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { GeneralUrbanRetirementReviewInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-review-inss-benefit.typeorm.entity';
import { GeneralUrbanRetirementReviewLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-review-legal-proceeding.typeorm.entity';
import { GeneralUrbanRetirementReviewPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-review-period.typeorm.entity';
import { GeneralUrbanRetirementReviewResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-review-result.typeorm.entity';
import { GeneralUrbanRetirementReviewTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-review.typeorm.entity';
import { GetGeneralUrbanRetirementReviewWithRelationsQueryResult } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review/query/result/get-general-urban-retirement-review-with-relations.query.result';
import { GeneralUrbanRetirementReviewEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review/general-urban-retirement-review.entity';
import { GeneralUrbanRetirementReviewId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review/value-object/general-urban-retirement-review-id.value-object';
import { GeneralUrbanRetirementReviewInssBenefitEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-inss-benefit/general-urban-retirement-review-inss-benefit.entity';
import { GeneralUrbanRetirementReviewInssBenefitId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-inss-benefit/value-object/general-urban-retirement-review-inss-benefit-id.value-object';
import { GeneralUrbanRetirementReviewLegalProceedingEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-legal-proceeding/general-urban-retirement-review-legal-proceeding.entity';
import { GeneralUrbanRetirementReviewLegalProceedingId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-legal-proceeding/value-object/general-urban-retirement-review-legal-proceeding-id.value-object';
import { GeneralUrbanRetirementReviewPeriodEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-period/general-urban-retirement-review-period.entity';
import { GeneralUrbanRetirementReviewResultEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-result/general-urban-retirement-review-result.entity';

@Injectable()
export class GetGeneralUrbanRetirementReviewWithRelationsQueryResultAutoMapperProfile {
  protected readonly _type =
    GetGeneralUrbanRetirementReviewWithRelationsQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
    this.mapQueryResultToOrmEntity();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: GeneralUrbanRetirementReviewTypeormEntity,
    ): GetGeneralUrbanRetirementReviewWithRelationsQueryResult => {
      const generalUrbanRetirementReviewResult =
        source.generalUrbanRetirementReviewResult !== undefined
          ? this.mapper.map(
              source.generalUrbanRetirementReviewResult,
              GeneralUrbanRetirementReviewResultTypeormEntity,
              GeneralUrbanRetirementReviewResultEntity,
            )
          : null;

      const grantEntity = this.mapper.map(
        source,
        GeneralUrbanRetirementReviewTypeormEntity,
        GeneralUrbanRetirementReviewEntity,
      );

      const generalUrbanRetirementReviewPeriod = this.mapper.mapArray(
        source.generalUrbanRetirementReviewPeriod ?? [],
        GeneralUrbanRetirementReviewPeriodTypeormEntity,
        GeneralUrbanRetirementReviewPeriodEntity,
      );

      const generalUrbanRetirementReviewBenefit = (
        source.generalUrbanRetirementReviewBenefit ?? []
      ).map(
        (b) =>
          new GeneralUrbanRetirementReviewInssBenefitEntity({
            id: new GeneralUrbanRetirementReviewInssBenefitId(b.id),
            inssBenefitNumber: b.inssBenefitNumber,
            generalUrbanRetirementReview: grantEntity,
          }),
      );

      const generalUrbanRetirementReviewLegalProceeding = (
        source.generalUrbanRetirementReviewLegalProceeding ?? []
      ).map(
        (lp) =>
          new GeneralUrbanRetirementReviewLegalProceedingEntity({
            id: new GeneralUrbanRetirementReviewLegalProceedingId(lp.id),
            legalProceedingNumber: lp.legalProceedingNumber,
            generalUrbanRetirementReview: grantEntity,
          }),
      );

      return GetGeneralUrbanRetirementReviewWithRelationsQueryResult.build({
        ...source,
        id: new GeneralUrbanRetirementReviewId(source.id),
        generalUrbanRetirementReviewResult,
        generalUrbanRetirementReviewPeriod,
        generalUrbanRetirementReviewBenefit,
        generalUrbanRetirementReviewLegalProceeding,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToQueryResult);

    createMap(
      this.mapper,
      GeneralUrbanRetirementReviewTypeormEntity,
      GetGeneralUrbanRetirementReviewWithRelationsQueryResult,
      mappingFunction,
    );
  }

  private mapQueryResultToOrmEntity(): void {
    const convertQueryResultToOrmEntity = (
      source: GetGeneralUrbanRetirementReviewWithRelationsQueryResult,
    ): GeneralUrbanRetirementReviewTypeormEntity => {
      const generalUrbanRetirementReviewResult =
        source.generalUrbanRetirementReviewResult !== null
          ? this.mapper.map(
              source.generalUrbanRetirementReviewResult,
              GeneralUrbanRetirementReviewResultEntity,
              GeneralUrbanRetirementReviewResultTypeormEntity,
            )
          : undefined;

      const generalUrbanRetirementReviewPeriod = this.mapper.mapArray(
        source.generalUrbanRetirementReviewPeriod ?? [],
        GeneralUrbanRetirementReviewPeriodEntity,
        GeneralUrbanRetirementReviewPeriodTypeormEntity,
      );

      const generalUrbanRetirementReviewBenefit = this.mapper.mapArray(
        source.generalUrbanRetirementReviewBenefit ?? [],
        GeneralUrbanRetirementReviewInssBenefitEntity,
        GeneralUrbanRetirementReviewInssBenefitTypeormEntity,
      );

      const generalUrbanRetirementReviewLegalProceeding = this.mapper.mapArray(
        source.generalUrbanRetirementReviewLegalProceeding ?? [],
        GeneralUrbanRetirementReviewLegalProceedingEntity,
        GeneralUrbanRetirementReviewLegalProceedingTypeormEntity,
      );

      return GeneralUrbanRetirementReviewTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        generalUrbanRetirementReviewResult,
        generalUrbanRetirementReviewPeriod,
        generalUrbanRetirementReviewBenefit,
        generalUrbanRetirementReviewLegalProceeding,
      } as GeneralUrbanRetirementReviewTypeormEntity);
    };

    const mappingFunction = constructUsing(convertQueryResultToOrmEntity);

    createMap(
      this.mapper,
      GetGeneralUrbanRetirementReviewWithRelationsQueryResult,
      GeneralUrbanRetirementReviewTypeormEntity,
      mappingFunction,
    );
  }
}
