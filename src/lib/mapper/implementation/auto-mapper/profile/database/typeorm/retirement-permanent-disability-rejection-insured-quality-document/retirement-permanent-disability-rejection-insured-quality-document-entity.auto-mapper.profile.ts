import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { RetirementPermanentDisabilityRejectionInsuredQualityDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-rejection-insured-quality-document.typeorm.entity';
import { RetirementPermanentDisabilityRejectionInsuredQualityTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-rejection-insured-quality.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { RetirementPermanentDisabilityRejectionInsuredQualityId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-insured-quality/value-object/retirement-permanent-disability-rejection-insured-quality-id/retirement-permanent-disability-rejection-insured-quality-id.value-object';
import { RetirementPermanentDisabilityRejectionInsuredQualityDocumentEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-insured-quality-document/retirement-permanent-disability-rejection-insured-quality-document.entity';
import { RetirementPermanentDisabilityRejectionInsuredQualityDocumentId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-insured-quality-document/value-object/retirement-permanent-disability-rejection-insured-quality-document-id/retirement-permanent-disability-rejection-insured-quality-document-id.value-object';

@Injectable()
export class RetirementPermanentDisabilityRejectionInsuredQualityDocumentEntityAutoMapperProfile {
  protected readonly _type =
    RetirementPermanentDisabilityRejectionInsuredQualityDocumentEntityAutoMapperProfile.name;

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
      RetirementPermanentDisabilityRejectionInsuredQualityDocumentTypeormEntity,
      RetirementPermanentDisabilityRejectionInsuredQualityDocumentEntity,
      constructUsing(
        (
          source: RetirementPermanentDisabilityRejectionInsuredQualityDocumentTypeormEntity,
        ): RetirementPermanentDisabilityRejectionInsuredQualityDocumentEntity => {
          if (!source.retirementPermanentDisabilityRejectionInsuredQuality) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass:
                RetirementPermanentDisabilityRejectionInsuredQualityDocumentEntity.name,
              sourceClass:
                RetirementPermanentDisabilityRejectionInsuredQualityDocumentTypeormEntity.name,
            });
          }

          return new RetirementPermanentDisabilityRejectionInsuredQualityDocumentEntity(
            {
              id: new RetirementPermanentDisabilityRejectionInsuredQualityDocumentId(
                source.id,
              ),
              document: source.document,
              type: source.type,
              retirementPermanentDisabilityRejectionInsuredQualityId:
                new RetirementPermanentDisabilityRejectionInsuredQualityId(
                  source.retirementPermanentDisabilityRejectionInsuredQuality
                    .id,
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
      RetirementPermanentDisabilityRejectionInsuredQualityDocumentEntity,
      RetirementPermanentDisabilityRejectionInsuredQualityDocumentTypeormEntity,
      constructUsing(
        (
          source: RetirementPermanentDisabilityRejectionInsuredQualityDocumentEntity,
        ): RetirementPermanentDisabilityRejectionInsuredQualityDocumentTypeormEntity =>
          RetirementPermanentDisabilityRejectionInsuredQualityDocumentTypeormEntity.build(
            {
              id: source.id.toString(),
              document: source.document,
              type: source.type,
              retirementPermanentDisabilityRejectionInsuredQuality:
                RetirementPermanentDisabilityRejectionInsuredQualityTypeormEntity.build(
                  {
                    id: source.retirementPermanentDisabilityRejectionInsuredQualityId.toString(),
                  } as RetirementPermanentDisabilityRejectionInsuredQualityTypeormEntity,
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
