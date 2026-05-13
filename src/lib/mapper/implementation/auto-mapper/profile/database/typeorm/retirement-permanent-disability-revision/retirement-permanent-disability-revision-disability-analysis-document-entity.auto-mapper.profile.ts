import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { RetirementPermanentDisabilityRevisionDisabilityAnalysisDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-revision-disability-analysis-document.typeorm.entity';
import { RetirementPermanentDisabilityRevisionDisabilityAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-revision-disability-analysis.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { RetirementPermanentDisabilityRevisionDisabilityAnalysisId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-disability-analysis/value-object/retirement-permanent-disability-revision-disability-analysis-id.value-object';
import { RetirementPermanentDisabilityRevisionDisabilityAnalysisDocumentEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-disability-analysis-document/retirement-permanent-disability-revision-disability-analysis-document.entity';
import { RetirementPermanentDisabilityRevisionDisabilityAnalysisDocumentId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-disability-analysis-document/value-object/retirement-permanent-disability-revision-disability-analysis-document-id.value-object';

@Injectable()
export class RetirementPermanentDisabilityRevisionDisabilityAnalysisDocumentEntityAutoMapperProfile {
  protected readonly _type =
    RetirementPermanentDisabilityRevisionDisabilityAnalysisDocumentEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convert = (
      source: RetirementPermanentDisabilityRevisionDisabilityAnalysisDocumentTypeormEntity,
    ): RetirementPermanentDisabilityRevisionDisabilityAnalysisDocumentEntity => {
      if (!source.retirementPermanentDisabilityRevisionDisabilityAnalysis) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass:
            RetirementPermanentDisabilityRevisionDisabilityAnalysisDocumentEntity.name,
          sourceClass:
            RetirementPermanentDisabilityRevisionDisabilityAnalysisDocumentTypeormEntity.name,
        });
      }

      return new RetirementPermanentDisabilityRevisionDisabilityAnalysisDocumentEntity(
        {
          id: new RetirementPermanentDisabilityRevisionDisabilityAnalysisDocumentId(
            source.id,
          ),
          retirementPermanentDisabilityRevisionDisabilityAnalysisId:
            new RetirementPermanentDisabilityRevisionDisabilityAnalysisId(
              source.retirementPermanentDisabilityRevisionDisabilityAnalysis.id,
            ),
          fileName: source.fileName,
          type: source.type,
          createdAt: source.createdAt,
          updatedAt: source.updatedAt,
          deletedAt: source.deletedAt,
        },
      );
    };

    createMap(
      this.mapper,
      RetirementPermanentDisabilityRevisionDisabilityAnalysisDocumentTypeormEntity,
      RetirementPermanentDisabilityRevisionDisabilityAnalysisDocumentEntity,
      constructUsing(convert),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convert = (
      source: RetirementPermanentDisabilityRevisionDisabilityAnalysisDocumentEntity,
    ): RetirementPermanentDisabilityRevisionDisabilityAnalysisDocumentTypeormEntity => {
      return RetirementPermanentDisabilityRevisionDisabilityAnalysisDocumentTypeormEntity.build(
        {
          id: source.id.toString(),
          fileName: source.fileName,
          type: source.type,
          retirementPermanentDisabilityRevisionDisabilityAnalysis: {
            id: source.retirementPermanentDisabilityRevisionDisabilityAnalysisId.toString(),
          } as RetirementPermanentDisabilityRevisionDisabilityAnalysisTypeormEntity,
          createdAt: source.createdAt,
          updatedAt: source.updatedAt,
          deletedAt: source.deletedAt,
        },
      );
    };

    createMap(
      this.mapper,
      RetirementPermanentDisabilityRevisionDisabilityAnalysisDocumentEntity,
      RetirementPermanentDisabilityRevisionDisabilityAnalysisDocumentTypeormEntity,
      constructUsing(convert),
    );
  }
}
