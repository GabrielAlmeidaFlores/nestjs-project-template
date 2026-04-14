import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { BpcElderlyAnalysisDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-analysis-document.typeorm.entity';
import { BpcElderlyAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-analysis.typeorm.entity';
import { BpcElderlyAnalysisDocumentEntity } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-document/bpc-elderly-analysis-document.entity';
import { BpcElderlyAnalysisDocumentId } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-document/value-object/bpc-elderly-analysis-document-id/bpc-elderly-analysis-document-id.value-object';
import { BpcElderlyAnalysisEntity } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis/bpc-elderly-analysis.entity';

@Injectable()
export class BpcElderlyAnalysisDocumentEntityAutoMapperProfile {
  protected readonly _type =
    BpcElderlyAnalysisDocumentEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: BpcElderlyAnalysisDocumentTypeormEntity,
    ): BpcElderlyAnalysisDocumentEntity => {
      const bpcElderlyAnalysis = this.mapper.map(
        source.bpcElderlyAnalysis,
        BpcElderlyAnalysisTypeormEntity,
        BpcElderlyAnalysisEntity,
      );

      return new BpcElderlyAnalysisDocumentEntity({
        id: new BpcElderlyAnalysisDocumentId(source.id),
        document: source.document,
        type: source.type,
        bpcElderlyAnalysis,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt ?? null,
      });
    };

    createMap(
      this.mapper,
      BpcElderlyAnalysisDocumentTypeormEntity,
      BpcElderlyAnalysisDocumentEntity,
      constructUsing(convertOrmEntityToDomainEntity),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: BpcElderlyAnalysisDocumentEntity,
    ): BpcElderlyAnalysisDocumentTypeormEntity => {
      const bpcElderlyAnalysis = this.mapper.map(
        source.bpcElderlyAnalysis,
        BpcElderlyAnalysisEntity,
        BpcElderlyAnalysisTypeormEntity,
      );

      return BpcElderlyAnalysisDocumentTypeormEntity.build({
        id: source.id.toString(),
        document: source.document,
        type: source.type,
        bpcElderlyAnalysis,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      BpcElderlyAnalysisDocumentEntity,
      BpcElderlyAnalysisDocumentTypeormEntity,
      constructUsing(convertDomainEntityToOrmEntity),
    );
  }
}
