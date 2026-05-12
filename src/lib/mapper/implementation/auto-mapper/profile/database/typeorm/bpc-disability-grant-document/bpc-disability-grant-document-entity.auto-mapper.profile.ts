import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { BpcDisabilityGrantDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-grant-document.typeorm.entity';
import { BpcDisabilityGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-grant.typeorm.entity';
import { BpcDisabilityGrantEntity } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant/bpc-disability-grant.entity';
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
      const BpcDisabilityGrant = this.mapper.map(
        source.BpcDisabilityGrant,
        BpcDisabilityGrantTypeormEntity,
        BpcDisabilityGrantEntity,
      );

      return new BpcDisabilityGrantDocumentEntity({
        id: new BpcDisabilityGrantDocumentId(source.id),
        document: source.document,
        type: source.type,
        BpcDisabilityGrant,
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
      const BpcDisabilityGrant = this.mapper.map(
        source.BpcDisabilityGrant,
        BpcDisabilityGrantEntity,
        BpcDisabilityGrantTypeormEntity,
      );

      return BpcDisabilityGrantDocumentTypeormEntity.build({
        id: source.id.toString(),
        document: source.document,
        type: source.type,
        BpcDisabilityGrant,
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
