import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { BpcDisabilityTerminationDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-termination-document.typeorm.entity';
import { BpcDisabilityTerminationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-termination.typeorm.entity';
import { BpcDisabilityTerminationEntity } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination/bpc-disability-termination.entity';
import { BpcDisabilityTerminationDocumentEntity } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-document/bpc-disability-termination-document.entity';
import { BpcDisabilityTerminationDocumentId } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-document/value-object/bpc-disability-termination-document-id/bpc-disability-termination-document-id.value-object';

@Injectable()
export class BpcDisabilityTerminationDocumentEntityAutoMapperProfile {
  protected readonly _type =
    BpcDisabilityTerminationDocumentEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: BpcDisabilityTerminationDocumentTypeormEntity,
    ): BpcDisabilityTerminationDocumentEntity => {
      const bpcDisabilityTermination = this.mapper.map(
        source.bpcDisabilityTermination,
        BpcDisabilityTerminationTypeormEntity,
        BpcDisabilityTerminationEntity,
      );

      return new BpcDisabilityTerminationDocumentEntity({
        id: new BpcDisabilityTerminationDocumentId(source.id),
        document: source.document,
        name: source.name,
        type: source.type,
        bpcDisabilityTermination,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt ?? null,
      });
    };

    createMap(
      this.mapper,
      BpcDisabilityTerminationDocumentTypeormEntity,
      BpcDisabilityTerminationDocumentEntity,
      constructUsing(convertOrmEntityToDomainEntity),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: BpcDisabilityTerminationDocumentEntity,
    ): BpcDisabilityTerminationDocumentTypeormEntity => {
      const bpcDisabilityTermination = this.mapper.map(
        source.bpcDisabilityTermination,
        BpcDisabilityTerminationEntity,
        BpcDisabilityTerminationTypeormEntity,
      );

      return BpcDisabilityTerminationDocumentTypeormEntity.build({
        id: source.id.toString(),
        document: source.document,
        name: source.name,
        type: source.type,
        bpcDisabilityTermination,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      BpcDisabilityTerminationDocumentEntity,
      BpcDisabilityTerminationDocumentTypeormEntity,
      constructUsing(convertDomainEntityToOrmEntity),
    );
  }
}
