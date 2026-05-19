import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { RetirementPermanentDisabilityRejectionDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-rejection-document.typeorm.entity';
import { RetirementPermanentDisabilityRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-rejection.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { RetirementPermanentDisabilityRejectionId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection/value-object/retirement-permanent-disability-rejection-id/retirement-permanent-disability-rejection-id.value-object';
import { RetirementPermanentDisabilityRejectionDocumentEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-document/retirement-permanent-disability-rejection-document.entity';
import { RetirementPermanentDisabilityRejectionDocumentId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-document/value-object/retirement-permanent-disability-rejection-document-id/retirement-permanent-disability-rejection-document-id.value-object';

@Injectable()
export class RetirementPermanentDisabilityRejectionDocumentEntityAutoMapperProfile {
  protected readonly _type =
    RetirementPermanentDisabilityRejectionDocumentEntityAutoMapperProfile.name;

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
      RetirementPermanentDisabilityRejectionDocumentTypeormEntity,
      RetirementPermanentDisabilityRejectionDocumentEntity,
      constructUsing(
        (
          source: RetirementPermanentDisabilityRejectionDocumentTypeormEntity,
        ): RetirementPermanentDisabilityRejectionDocumentEntity => {
          if (!source.retirementPermanentDisabilityRejection) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass:
                RetirementPermanentDisabilityRejectionDocumentEntity.name,
              sourceClass:
                RetirementPermanentDisabilityRejectionDocumentTypeormEntity.name,
            });
          }

          return new RetirementPermanentDisabilityRejectionDocumentEntity({
            id: new RetirementPermanentDisabilityRejectionDocumentId(source.id),
            document: source.document,
            type: source.type,
            retirementPermanentDisabilityRejectionId:
              new RetirementPermanentDisabilityRejectionId(
                source.retirementPermanentDisabilityRejection.id,
              ),
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          });
        },
      ),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    createMap(
      this.mapper,
      RetirementPermanentDisabilityRejectionDocumentEntity,
      RetirementPermanentDisabilityRejectionDocumentTypeormEntity,
      constructUsing(
        (
          source: RetirementPermanentDisabilityRejectionDocumentEntity,
        ): RetirementPermanentDisabilityRejectionDocumentTypeormEntity =>
          RetirementPermanentDisabilityRejectionDocumentTypeormEntity.build({
            id: source.id.toString(),
            document: source.document,
            type: source.type,
            retirementPermanentDisabilityRejection:
              RetirementPermanentDisabilityRejectionTypeormEntity.build({
                id: source.retirementPermanentDisabilityRejectionId.toString(),
              } as RetirementPermanentDisabilityRejectionTypeormEntity),
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          }),
      ),
    );
  }
}
