import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { RetirementPermanentDisabilityRejectionIncapacityPreviousBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-rejection-incapacity-previous-benefit.typeorm.entity';
import { RetirementPermanentDisabilityRejectionIncapacityTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-rejection-incapacity.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { RetirementPermanentDisabilityRejectionIncapacityId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-incapacity/value-object/retirement-permanent-disability-rejection-incapacity-id/retirement-permanent-disability-rejection-incapacity-id.value-object';
import { RetirementPermanentDisabilityRejectionIncapacityPreviousBenefitEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-incapacity-previous-benefit/retirement-permanent-disability-rejection-incapacity-previous-benefit.entity';
import { RetirementPermanentDisabilityRejectionIncapacityPreviousBenefitId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-incapacity-previous-benefit/value-object/retirement-permanent-disability-rejection-incapacity-previous-benefit-id/retirement-permanent-disability-rejection-incapacity-previous-benefit-id.value-object';

@Injectable()
export class RetirementPermanentDisabilityRejectionIncapacityPreviousBenefitEntityAutoMapperProfile {
  protected readonly _type =
    RetirementPermanentDisabilityRejectionIncapacityPreviousBenefitEntityAutoMapperProfile.name;

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
      RetirementPermanentDisabilityRejectionIncapacityPreviousBenefitTypeormEntity,
      RetirementPermanentDisabilityRejectionIncapacityPreviousBenefitEntity,
      constructUsing(
        (
          source: RetirementPermanentDisabilityRejectionIncapacityPreviousBenefitTypeormEntity,
        ): RetirementPermanentDisabilityRejectionIncapacityPreviousBenefitEntity => {
          if (!source.retirementPermanentDisabilityRejectionIncapacity) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass:
                RetirementPermanentDisabilityRejectionIncapacityPreviousBenefitEntity.name,
              sourceClass:
                RetirementPermanentDisabilityRejectionIncapacityPreviousBenefitTypeormEntity.name,
            });
          }

          return new RetirementPermanentDisabilityRejectionIncapacityPreviousBenefitEntity(
            {
              id: new RetirementPermanentDisabilityRejectionIncapacityPreviousBenefitId(
                source.id,
              ),
              benefitNumber: source.benefitNumber,
              startDate: source.startDate,
              endDate: source.endDate,
              retirementPermanentDisabilityRejectionIncapacityId:
                new RetirementPermanentDisabilityRejectionIncapacityId(
                  source.retirementPermanentDisabilityRejectionIncapacity.id,
                ),
              createdAt: source.createdAt,
              updatedAt: source.updatedAt,
              deletedAt: source.deletedAt,
            },
          );
        },
      ),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    createMap(
      this.mapper,
      RetirementPermanentDisabilityRejectionIncapacityPreviousBenefitEntity,
      RetirementPermanentDisabilityRejectionIncapacityPreviousBenefitTypeormEntity,
      constructUsing(
        (
          source: RetirementPermanentDisabilityRejectionIncapacityPreviousBenefitEntity,
        ): RetirementPermanentDisabilityRejectionIncapacityPreviousBenefitTypeormEntity =>
          RetirementPermanentDisabilityRejectionIncapacityPreviousBenefitTypeormEntity.build(
            {
              id: source.id.toString(),
              benefitNumber: source.benefitNumber,
              startDate: source.startDate,
              endDate: source.endDate,
              retirementPermanentDisabilityRejectionIncapacity:
                RetirementPermanentDisabilityRejectionIncapacityTypeormEntity.build(
                  {
                    id: source.retirementPermanentDisabilityRejectionIncapacityId.toString(),
                  } as RetirementPermanentDisabilityRejectionIncapacityTypeormEntity,
                ),
              createdAt: source.createdAt,
              updatedAt: source.updatedAt,
              deletedAt: source.deletedAt,
            },
          ),
      ),
    );
  }
}
