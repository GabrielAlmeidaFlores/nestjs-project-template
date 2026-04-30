import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-terminated-disability-analysis-document.typeorm.entity';
import { TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-terminated-disability-analysis.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-disability-analysis/value-object/temporary-disability-benefits-terminated-disability-analysis-id.value-object';
import { TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisDocumentEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-disability-analysis-document/temporary-disability-benefits-terminated-disability-analysis-document.entity';
import { TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisDocumentId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-disability-analysis-document/value-object/temporary-disability-benefits-terminated-disability-analysis-document-id.value-object';

@Injectable()
export class TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisDocumentEntityAutoMapperProfile {
  protected readonly _type =
    TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisDocumentEntityAutoMapperProfile.name;

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
      TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisDocumentTypeormEntity,
      TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisDocumentEntity,
      constructUsing(
        (
          source: TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisDocumentTypeormEntity,
        ): TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisDocumentEntity => {
          if (!source.temporaryDisabilityBenefitsTerminatedDisabilityAnalysis) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass:
                TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisDocumentEntity.name,
              sourceClass:
                TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisDocumentTypeormEntity.name,
            });
          }

          return new TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisDocumentEntity(
            {
              id: new TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisDocumentId(
                source.id,
              ),
              fileName: source.fileName,
              type: source.type,
              temporaryDisabilityBenefitsTerminatedDisabilityAnalysisId:
                new TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisId(
                  source.temporaryDisabilityBenefitsTerminatedDisabilityAnalysis
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
      TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisDocumentEntity,
      TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisDocumentTypeormEntity,
      constructUsing(
        (
          source: TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisDocumentEntity,
        ): TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisDocumentTypeormEntity =>
          TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisDocumentTypeormEntity.build(
            {
              id: source.id.toString(),
              fileName: source.fileName,
              type: source.type,
              temporaryDisabilityBenefitsTerminatedDisabilityAnalysis:
                TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisTypeormEntity.build(
                  {
                    id: source.temporaryDisabilityBenefitsTerminatedDisabilityAnalysisId.toString(),
                  } as TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisTypeormEntity,
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
