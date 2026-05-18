import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { RetirementPermanentDisabilityRejectionIncapacityDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-rejection-incapacity-document.typeorm.entity';
import { RetirementPermanentDisabilityRejectionIncapacityTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-rejection-incapacity.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { RetirementPermanentDisabilityRejectionIncapacityId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-incapacity/value-object/retirement-permanent-disability-rejection-incapacity-id/retirement-permanent-disability-rejection-incapacity-id.value-object';
import { RetirementPermanentDisabilityRejectionIncapacityDocumentEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-incapacity-document/retirement-permanent-disability-rejection-incapacity-document.entity';
import { RetirementPermanentDisabilityRejectionIncapacityDocumentId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-incapacity-document/value-object/retirement-permanent-disability-rejection-incapacity-document-id/retirement-permanent-disability-rejection-incapacity-document-id.value-object';

@Injectable()
export class RetirementPermanentDisabilityRejectionIncapacityDocumentEntityAutoMapperProfile {
  protected readonly _type =
    RetirementPermanentDisabilityRejectionIncapacityDocumentEntityAutoMapperProfile.name;

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
      RetirementPermanentDisabilityRejectionIncapacityDocumentTypeormEntity,
      RetirementPermanentDisabilityRejectionIncapacityDocumentEntity,
      constructUsing(
        (
          source: RetirementPermanentDisabilityRejectionIncapacityDocumentTypeormEntity,
        ): RetirementPermanentDisabilityRejectionIncapacityDocumentEntity => {
          if (!source.retirementPermanentDisabilityRejectionIncapacity) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass:
                RetirementPermanentDisabilityRejectionIncapacityDocumentEntity.name,
              sourceClass:
                RetirementPermanentDisabilityRejectionIncapacityDocumentTypeormEntity.name,
            });
          }

          return new RetirementPermanentDisabilityRejectionIncapacityDocumentEntity(
            {
              id: new RetirementPermanentDisabilityRejectionIncapacityDocumentId(
                source.id,
              ),
              document: source.document,
              type: source.type,
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
      RetirementPermanentDisabilityRejectionIncapacityDocumentEntity,
      RetirementPermanentDisabilityRejectionIncapacityDocumentTypeormEntity,
      constructUsing(
        (
          source: RetirementPermanentDisabilityRejectionIncapacityDocumentEntity,
        ): RetirementPermanentDisabilityRejectionIncapacityDocumentTypeormEntity =>
          RetirementPermanentDisabilityRejectionIncapacityDocumentTypeormEntity.build(
            {
              id: source.id.toString(),
              document: source.document,
              type: source.type,
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
