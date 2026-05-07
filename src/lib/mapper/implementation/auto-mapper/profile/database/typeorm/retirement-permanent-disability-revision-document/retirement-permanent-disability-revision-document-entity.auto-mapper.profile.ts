import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { RetirementPermanentDisabilityRevisionDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-revision-document.typeorm.entity';
import { RetirementPermanentDisabilityRevisionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-revision.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { RetirementPermanentDisabilityRevisionDocumentEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-document/retirement-permanent-disability-revision-document.entity';
import { RetirementPermanentDisabilityRevisionDocumentId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-document/value-object/retirement-permanent-disability-revision-document-id.value-object';
import { RetirementPermanentDisabilityRevisionId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision/value-object/retirement-permanent-disability-revision-id.value-object';

@Injectable()
export class RetirementPermanentDisabilityRevisionDocumentEntityAutoMapperProfile {
  protected readonly _type =
    RetirementPermanentDisabilityRevisionDocumentEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convert = (
      source: RetirementPermanentDisabilityRevisionDocumentTypeormEntity,
    ): RetirementPermanentDisabilityRevisionDocumentEntity => {
      if (!source.retirementPermanentDisabilityRevision) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass:
            RetirementPermanentDisabilityRevisionDocumentEntity.name,
          sourceClass:
            RetirementPermanentDisabilityRevisionDocumentTypeormEntity.name,
        });
      }

      return new RetirementPermanentDisabilityRevisionDocumentEntity({
        id: new RetirementPermanentDisabilityRevisionDocumentId(source.id),
        document: source.document,
        type: source.type,
        retirementPermanentDisabilityRevision:
          new RetirementPermanentDisabilityRevisionId(
            source.retirementPermanentDisabilityRevision.id,
          ),
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      RetirementPermanentDisabilityRevisionDocumentTypeormEntity,
      RetirementPermanentDisabilityRevisionDocumentEntity,
      constructUsing(convert),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convert = (
      source: RetirementPermanentDisabilityRevisionDocumentEntity,
    ): RetirementPermanentDisabilityRevisionDocumentTypeormEntity => {
      return RetirementPermanentDisabilityRevisionDocumentTypeormEntity.build({
        id: source.id.toString(),
        document: source.document,
        type: source.type,
        retirementPermanentDisabilityRevision: {
          id: source.retirementPermanentDisabilityRevision.toString(),
        } as RetirementPermanentDisabilityRevisionTypeormEntity,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      RetirementPermanentDisabilityRevisionDocumentEntity,
      RetirementPermanentDisabilityRevisionDocumentTypeormEntity,
      constructUsing(convert),
    );
  }
}
