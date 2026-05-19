import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { GeneralUrbanRetirementReviewPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-review-period-document.typeorm.entity';
import { GeneralUrbanRetirementReviewPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-review-period.typeorm.entity';
import { GeneralUrbanRetirementReviewPeriodEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-period/general-urban-retirement-review-period.entity';
import { GeneralUrbanRetirementReviewPeriodDocumentEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-period-document/general-urban-retirement-review-period-document.entity';
import { GeneralUrbanRetirementReviewPeriodDocumentId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-period-document/value-object/general-urban-retirement-review-period-document-id.value-object';

@Injectable()
export class GeneralUrbanRetirementReviewPeriodDocumentEntityAutoMapperProfile {
  protected readonly _type =
    GeneralUrbanRetirementReviewPeriodDocumentEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: GeneralUrbanRetirementReviewPeriodDocumentTypeormEntity,
    ): GeneralUrbanRetirementReviewPeriodDocumentEntity => {
      const generalUrbanRetirementReviewPeriod =
        source.generalUrbanRetirementReviewPeriod !== undefined &&
        source.generalUrbanRetirementReviewPeriod !== null
          ? this.mapper.map(
              source.generalUrbanRetirementReviewPeriod,
              GeneralUrbanRetirementReviewPeriodTypeormEntity,
              GeneralUrbanRetirementReviewPeriodEntity,
            )
          : null;

      return new GeneralUrbanRetirementReviewPeriodDocumentEntity({
        ...source,
        id: new GeneralUrbanRetirementReviewPeriodDocumentId(source.id),
        generalUrbanRetirementReviewPeriod,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      GeneralUrbanRetirementReviewPeriodDocumentTypeormEntity,
      GeneralUrbanRetirementReviewPeriodDocumentEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GeneralUrbanRetirementReviewPeriodDocumentEntity,
    ): GeneralUrbanRetirementReviewPeriodDocumentTypeormEntity => {
      const generalUrbanRetirementReviewPeriod =
        source.generalUrbanRetirementReviewPeriod !== null
          ? this.mapper.map(
              source.generalUrbanRetirementReviewPeriod,
              GeneralUrbanRetirementReviewPeriodEntity,
              GeneralUrbanRetirementReviewPeriodTypeormEntity,
            )
          : undefined;

      return GeneralUrbanRetirementReviewPeriodDocumentTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        generalUrbanRetirementReviewPeriod:
          generalUrbanRetirementReviewPeriod ?? null,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GeneralUrbanRetirementReviewPeriodDocumentEntity,
      GeneralUrbanRetirementReviewPeriodDocumentTypeormEntity,
      mappingFunction,
    );
  }
}
