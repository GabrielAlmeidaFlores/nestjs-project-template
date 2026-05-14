import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { RetirementPermanentDisabilityRejectionInsuredQualityTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-rejection-insured-quality.typeorm.entity';
import { RetirementPermanentDisabilityRejectionInsuredQualityEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-insured-quality/retirement-permanent-disability-rejection-insured-quality.entity';
import { RetirementPermanentDisabilityRejectionInsuredQualityId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-insured-quality/value-object/retirement-permanent-disability-rejection-insured-quality-id/retirement-permanent-disability-rejection-insured-quality-id.value-object';

@Injectable()
export class RetirementPermanentDisabilityRejectionInsuredQualityEntityAutoMapperProfile {
  protected readonly _type =
    RetirementPermanentDisabilityRejectionInsuredQualityEntityAutoMapperProfile.name;

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
      RetirementPermanentDisabilityRejectionInsuredQualityTypeormEntity,
      RetirementPermanentDisabilityRejectionInsuredQualityEntity,
      constructUsing(
        (
          source: RetirementPermanentDisabilityRejectionInsuredQualityTypeormEntity,
        ): RetirementPermanentDisabilityRejectionInsuredQualityEntity =>
          new RetirementPermanentDisabilityRejectionInsuredQualityEntity({
            id: new RetirementPermanentDisabilityRejectionInsuredQualityId(
              source.id,
            ),
            isInvoluntaryUnemployed: source.isInvoluntaryUnemployed,
            intendsToProveInvoluntaryUnemployment:
              source.intendsToProveInvoluntaryUnemployment,
            isRuralInsuredAtGeneratingFact:
              source.isRuralInsuredAtGeneratingFact,
            ruralInsuredStartDate: source.ruralInsuredStartDate,
            ruralInsuredEndDate: source.ruralInsuredEndDate,
            ruralInsuredDescription: source.ruralInsuredDescription,
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
      RetirementPermanentDisabilityRejectionInsuredQualityEntity,
      RetirementPermanentDisabilityRejectionInsuredQualityTypeormEntity,
      constructUsing(
        (
          source: RetirementPermanentDisabilityRejectionInsuredQualityEntity,
        ): RetirementPermanentDisabilityRejectionInsuredQualityTypeormEntity =>
          RetirementPermanentDisabilityRejectionInsuredQualityTypeormEntity.build(
            {
              id: source.id.toString(),
              isInvoluntaryUnemployed: source.isInvoluntaryUnemployed,
              intendsToProveInvoluntaryUnemployment:
                source.intendsToProveInvoluntaryUnemployment,
              isRuralInsuredAtGeneratingFact:
                source.isRuralInsuredAtGeneratingFact,
              ruralInsuredStartDate: source.ruralInsuredStartDate,
              ruralInsuredEndDate: source.ruralInsuredEndDate,
              ruralInsuredDescription: source.ruralInsuredDescription,
              createdAt: source.createdAt,
              updatedAt: source.updatedAt,
              deletedAt: source.deletedAt,
            },
          ),
      ),
    );
  }
}
