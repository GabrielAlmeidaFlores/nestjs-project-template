import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { BpcElderlyCessationDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-cessation-document.typeorm.entity';
import { BpcElderlyCessationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-cessation.typeorm.entity';
import { BpcElderlyCessationEntity } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation/bpc-elderly-cessation.entity';
import { BpcElderlyCessationDocumentEntity } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-document/bpc-elderly-cessation-document.entity';
import { BpcElderlyCessationDocumentId } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-document/value-object/bpc-elderly-cessation-document-id/bpc-elderly-cessation-document-id.value-object';

@Injectable()
export class BpcElderlyCessationDocumentEntityAutoMapperProfile {
  protected readonly _type =
    BpcElderlyCessationDocumentEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: BpcElderlyCessationDocumentTypeormEntity,
    ): BpcElderlyCessationDocumentEntity => {
      const bpcElderlyCessation = this.mapper.map(
        source.bpcElderlyCessation,
        BpcElderlyCessationTypeormEntity,
        BpcElderlyCessationEntity,
      );

      return new BpcElderlyCessationDocumentEntity({
        id: new BpcElderlyCessationDocumentId(source.id),
        document: source.document,
        type: source.type,
        bpcElderlyCessation,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt ?? null,
      });
    };

    createMap(
      this.mapper,
      BpcElderlyCessationDocumentTypeormEntity,
      BpcElderlyCessationDocumentEntity,
      constructUsing(convertOrmEntityToDomainEntity),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: BpcElderlyCessationDocumentEntity,
    ): BpcElderlyCessationDocumentTypeormEntity => {
      const bpcElderlyCessation = this.mapper.map(
        source.bpcElderlyCessation,
        BpcElderlyCessationEntity,
        BpcElderlyCessationTypeormEntity,
      );

      return BpcElderlyCessationDocumentTypeormEntity.build({
        id: source.id.toString(),
        document: source.document,
        type: source.type,
        bpcElderlyCessation,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      BpcElderlyCessationDocumentEntity,
      BpcElderlyCessationDocumentTypeormEntity,
      constructUsing(convertDomainEntityToOrmEntity),
    );
  }
}
