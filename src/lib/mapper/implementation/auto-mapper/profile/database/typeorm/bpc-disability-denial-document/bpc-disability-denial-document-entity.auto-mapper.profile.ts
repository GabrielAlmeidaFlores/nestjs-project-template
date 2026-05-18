import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { BpcDisabilityDenialDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-denial-document.typeorm.entity';
import { BpcDisabilityDenialTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-denial.typeorm.entity';
import { BpcDisabilityDenialEntity } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial/bpc-disability-denial.entity';
import { BpcDisabilityDenialDocumentEntity } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-document/bpc-disability-denial-document.entity';
import { BpcDisabilityDenialDocumentId } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-document/value-object/bpc-disability-denial-document-id/bpc-disability-denial-document-id.value-object';

@Injectable()
export class BpcDisabilityDenialDocumentEntityAutoMapperProfile {
  protected readonly _type =
    BpcDisabilityDenialDocumentEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: BpcDisabilityDenialDocumentTypeormEntity,
    ): BpcDisabilityDenialDocumentEntity => {
      const bpcDisabilityDenial = this.mapper.map(
        source.bpcDisabilityDenial,
        BpcDisabilityDenialTypeormEntity,
        BpcDisabilityDenialEntity,
      );

      return new BpcDisabilityDenialDocumentEntity({
        id: new BpcDisabilityDenialDocumentId(source.id),
        document: source.document,
        type: source.type,
        bpcDisabilityDenial,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt ?? null,
      });
    };

    createMap(
      this.mapper,
      BpcDisabilityDenialDocumentTypeormEntity,
      BpcDisabilityDenialDocumentEntity,
      constructUsing(convertOrmEntityToDomainEntity),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: BpcDisabilityDenialDocumentEntity,
    ): BpcDisabilityDenialDocumentTypeormEntity => {
      const bpcDisabilityDenial = this.mapper.map(
        source.bpcDisabilityDenial,
        BpcDisabilityDenialEntity,
        BpcDisabilityDenialTypeormEntity,
      );

      return BpcDisabilityDenialDocumentTypeormEntity.build({
        id: source.id.toString(),
        document: source.document,
        type: source.type,
        bpcDisabilityDenial,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      BpcDisabilityDenialDocumentEntity,
      BpcDisabilityDenialDocumentTypeormEntity,
      constructUsing(convertDomainEntityToOrmEntity),
    );
  }
}
