import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { RetirementPermanentDisabilityRejectionIncapacityTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-rejection-incapacity.typeorm.entity';
import { RetirementPermanentDisabilityRejectionIncapacityEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-incapacity/retirement-permanent-disability-rejection-incapacity.entity';
import { RetirementPermanentDisabilityRejectionIncapacityId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-incapacity/value-object/retirement-permanent-disability-rejection-incapacity-id/retirement-permanent-disability-rejection-incapacity-id.value-object';

@Injectable()
export class RetirementPermanentDisabilityRejectionIncapacityEntityAutoMapperProfile {
  protected readonly _type =
    RetirementPermanentDisabilityRejectionIncapacityEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    createMap(
      this.mapper,
      RetirementPermanentDisabilityRejectionIncapacityTypeormEntity,
      RetirementPermanentDisabilityRejectionIncapacityEntity,
      constructUsing(
        (
          source: RetirementPermanentDisabilityRejectionIncapacityTypeormEntity,
        ): RetirementPermanentDisabilityRejectionIncapacityEntity =>
          new RetirementPermanentDisabilityRejectionIncapacityEntity({
            id: new RetirementPermanentDisabilityRejectionIncapacityId(
              source.id,
            ),
            incapacityStartDate: source.incapacityStartDate,
            diseaseDescription: source.diseaseDescription,
            isIncapacityFromAccident: source.isIncapacityFromAccident,
            incapacitatingEventDescription:
              source.incapacitatingEventDescription,
            isIncapacityFromSeriousDisease:
              source.isIncapacityFromSeriousDisease,
            seriousDiseaseType: source.seriousDiseaseType,
            seriousDiseaseOtherDescription:
              source.seriousDiseaseOtherDescription,
            seriousDiseaseStartDate: source.seriousDiseaseStartDate,
            needsPermanentAssistance: source.needsPermanentAssistance,
            hasPreviousIncapacityBenefit: source.hasPreviousIncapacityBenefit,
            previousBenefitNumber: source.previousBenefitNumber,
            previousBenefitStartDate: source.previousBenefitStartDate,
            previousBenefitEndDate: source.previousBenefitEndDate,
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          }),
      ),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    createMap(
      this.mapper,
      RetirementPermanentDisabilityRejectionIncapacityEntity,
      RetirementPermanentDisabilityRejectionIncapacityTypeormEntity,
      constructUsing(
        (
          source: RetirementPermanentDisabilityRejectionIncapacityEntity,
        ): RetirementPermanentDisabilityRejectionIncapacityTypeormEntity =>
          RetirementPermanentDisabilityRejectionIncapacityTypeormEntity.build({
            id: source.id.toString(),
            incapacityStartDate: source.incapacityStartDate,
            diseaseDescription: source.diseaseDescription,
            isIncapacityFromAccident: source.isIncapacityFromAccident,
            incapacitatingEventDescription:
              source.incapacitatingEventDescription,
            isIncapacityFromSeriousDisease:
              source.isIncapacityFromSeriousDisease,
            seriousDiseaseType: source.seriousDiseaseType,
            seriousDiseaseOtherDescription:
              source.seriousDiseaseOtherDescription,
            seriousDiseaseStartDate: source.seriousDiseaseStartDate,
            needsPermanentAssistance: source.needsPermanentAssistance,
            hasPreviousIncapacityBenefit: source.hasPreviousIncapacityBenefit,
            previousBenefitNumber: source.previousBenefitNumber,
            previousBenefitStartDate: source.previousBenefitStartDate,
            previousBenefitEndDate: source.previousBenefitEndDate,
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          }),
      ),
    );
  }
}
