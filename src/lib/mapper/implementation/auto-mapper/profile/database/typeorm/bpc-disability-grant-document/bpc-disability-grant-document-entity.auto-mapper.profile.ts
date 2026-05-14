import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { BpcDisabilityGrantDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-grant-document.typeorm.entity';
import { BpcDisabilityGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-grant.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { BpcDisabilityGrantId } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant/value-object/bpc-disability-grant-id/bpc-disability-grant-id.value-object';
import { BpcDisabilityGrantDocumentEntity } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-document/bpc-disability-grant-document.entity';
import { BpcDisabilityGrantDocumentId } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-document/value-object/bpc-disability-grant-document-id/bpc-disability-grant-document-id.value-object';

@Injectable()
export class BpcDisabilityGrantDocumentEntityAutoMapperProfile {
  protected readonly _type =
    BpcDisabilityGrantDocumentEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: BpcDisabilityGrantDocumentTypeormEntity,
    ): BpcDisabilityGrantDocumentEntity => {
      if (!source.BpcDisabilityGrant) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass: BpcDisabilityGrantDocumentEntity.name,
          sourceClass: BpcDisabilityGrantDocumentTypeormEntity.name,
        });
      }

      return new BpcDisabilityGrantDocumentEntity({
        id: new BpcDisabilityGrantDocumentId(source.id),
        document: source.document,
        type: source.type,
        BpcDisabilityGrantId: new BpcDisabilityGrantId(
          source.BpcDisabilityGrant.id,
        ),
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt ?? null,
      });
    };

    createMap(
      this.mapper,
      BpcDisabilityGrantDocumentTypeormEntity,
      BpcDisabilityGrantDocumentEntity,
      constructUsing(convertOrmEntityToDomainEntity),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: BpcDisabilityGrantDocumentEntity,
    ): BpcDisabilityGrantDocumentTypeormEntity => {
      return BpcDisabilityGrantDocumentTypeormEntity.build({
        id: source.id.toString(),
        document: source.document,
        type: source.type,
        BpcDisabilityGrant: {
          id: source.BpcDisabilityGrantId.toString(),
        } as BpcDisabilityGrantTypeormEntity,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      BpcDisabilityGrantDocumentEntity,
      BpcDisabilityGrantDocumentTypeormEntity,
      constructUsing(convertDomainEntityToOrmEntity),
    );
  }
}
