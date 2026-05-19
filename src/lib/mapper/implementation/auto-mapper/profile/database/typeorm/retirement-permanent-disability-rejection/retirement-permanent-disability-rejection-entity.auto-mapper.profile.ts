import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { RetirementPermanentDisabilityRejectionIncapacityTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-rejection-incapacity.typeorm.entity';
import { RetirementPermanentDisabilityRejectionInsuredQualityTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-rejection-insured-quality.typeorm.entity';
import { RetirementPermanentDisabilityRejectionResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-rejection-result.typeorm.entity';
import { RetirementPermanentDisabilityRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-rejection.typeorm.entity';
import { RetirementPermanentDisabilityRejectionEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection/retirement-permanent-disability-rejection.entity';
import { RetirementPermanentDisabilityRejectionId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection/value-object/retirement-permanent-disability-rejection-id/retirement-permanent-disability-rejection-id.value-object';
import { RetirementPermanentDisabilityRejectionIncapacityId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-incapacity/value-object/retirement-permanent-disability-rejection-incapacity-id/retirement-permanent-disability-rejection-incapacity-id.value-object';
import { RetirementPermanentDisabilityRejectionInsuredQualityId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-insured-quality/value-object/retirement-permanent-disability-rejection-insured-quality-id/retirement-permanent-disability-rejection-insured-quality-id.value-object';
import { RetirementPermanentDisabilityRejectionResultId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-result/value-object/retirement-permanent-disability-rejection-result-id/retirement-permanent-disability-rejection-result-id.value-object';

@Injectable()
export class RetirementPermanentDisabilityRejectionEntityAutoMapperProfile {
  protected readonly _type =
    RetirementPermanentDisabilityRejectionEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convert = (
      source: RetirementPermanentDisabilityRejectionTypeormEntity,
    ): RetirementPermanentDisabilityRejectionEntity => {
      const resultId =
        source.retirementPermanentDisabilityRejectionResult !== null &&
        source.retirementPermanentDisabilityRejectionResult !== undefined
          ? new RetirementPermanentDisabilityRejectionResultId(
              source.retirementPermanentDisabilityRejectionResult.id,
            )
          : null;

      const incapacityId =
        source.retirementPermanentDisabilityRejectionIncapacity !== null &&
        source.retirementPermanentDisabilityRejectionIncapacity !== undefined
          ? new RetirementPermanentDisabilityRejectionIncapacityId(
              source.retirementPermanentDisabilityRejectionIncapacity.id,
            )
          : null;

      const insuredQualityId =
        source.retirementPermanentDisabilityRejectionInsuredQuality !== null &&
        source.retirementPermanentDisabilityRejectionInsuredQuality !==
          undefined
          ? new RetirementPermanentDisabilityRejectionInsuredQualityId(
              source.retirementPermanentDisabilityRejectionInsuredQuality.id,
            )
          : null;

      return new RetirementPermanentDisabilityRejectionEntity({
        id: new RetirementPermanentDisabilityRejectionId(source.id),
        analysisName: source.analysisName,
        requestEntryDate: source.requestEntryDate,
        denialDate: source.denialDate,
        category: source.category,
        retirementPermanentDisabilityRejectionResultId: resultId,
        retirementPermanentDisabilityRejectionIncapacityId: incapacityId,
        retirementPermanentDisabilityRejectionInsuredQualityId:
          insuredQualityId,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      RetirementPermanentDisabilityRejectionTypeormEntity,
      RetirementPermanentDisabilityRejectionEntity,
      constructUsing(convert),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convert = (
      source: RetirementPermanentDisabilityRejectionEntity,
    ): RetirementPermanentDisabilityRejectionTypeormEntity => {
      const retirementPermanentDisabilityRejectionResult =
        source.retirementPermanentDisabilityRejectionResultId !== null
          ? RetirementPermanentDisabilityRejectionResultTypeormEntity.build({
              id: source.retirementPermanentDisabilityRejectionResultId.toString(),
            } as RetirementPermanentDisabilityRejectionResultTypeormEntity)
          : undefined;

      const retirementPermanentDisabilityRejectionIncapacity =
        source.retirementPermanentDisabilityRejectionIncapacityId !== null
          ? RetirementPermanentDisabilityRejectionIncapacityTypeormEntity.build(
              {
                id: source.retirementPermanentDisabilityRejectionIncapacityId.toString(),
              } as RetirementPermanentDisabilityRejectionIncapacityTypeormEntity,
            )
          : undefined;

      const retirementPermanentDisabilityRejectionInsuredQuality =
        source.retirementPermanentDisabilityRejectionInsuredQualityId !== null
          ? RetirementPermanentDisabilityRejectionInsuredQualityTypeormEntity.build(
              {
                id: source.retirementPermanentDisabilityRejectionInsuredQualityId.toString(),
              } as RetirementPermanentDisabilityRejectionInsuredQualityTypeormEntity,
            )
          : undefined;

      return RetirementPermanentDisabilityRejectionTypeormEntity.build({
        id: source.id.toString(),
        analysisName: source.analysisName,
        requestEntryDate: source.requestEntryDate,
        denialDate: source.denialDate,
        category: source.category,
        retirementPermanentDisabilityRejectionResult:
          retirementPermanentDisabilityRejectionResult ?? null,
        retirementPermanentDisabilityRejectionIncapacity:
          retirementPermanentDisabilityRejectionIncapacity ?? null,
        retirementPermanentDisabilityRejectionInsuredQuality:
          retirementPermanentDisabilityRejectionInsuredQuality ?? null,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      RetirementPermanentDisabilityRejectionEntity,
      RetirementPermanentDisabilityRejectionTypeormEntity,
      constructUsing(convert),
    );
  }
}
