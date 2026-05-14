import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { PermanentIncapacityBenefitTerminatedDisabilityAnalysisDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/permanent-incapacity-benefit-terminated-disability-analysis-document.typeorm.entity';
import { PermanentIncapacityBenefitTerminatedDisabilityAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/permanent-incapacity-benefit-terminated-disability-analysis.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { PermanentIncapacityBenefitTerminatedDisabilityAnalysisId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-disability-analysis/value-object/permanent-incapacity-benefit-terminated-disability-analysis-id.value-object';
import { PermanentIncapacityBenefitTerminatedDisabilityAnalysisDocumentEntity } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-disability-analysis-document/permanent-incapacity-benefit-terminated-disability-analysis-document.entity';
import { PermanentIncapacityBenefitTerminatedDisabilityAnalysisDocumentId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-disability-analysis-document/value-object/permanent-incapacity-benefit-terminated-disability-analysis-document-id.value-object';

@Injectable()
export class PermanentIncapacityBenefitTerminatedDisabilityAnalysisDocumentEntityAutoMapperProfile {
  protected readonly _type =
    PermanentIncapacityBenefitTerminatedDisabilityAnalysisDocumentEntityAutoMapperProfile.name;

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
      PermanentIncapacityBenefitTerminatedDisabilityAnalysisDocumentTypeormEntity,
      PermanentIncapacityBenefitTerminatedDisabilityAnalysisDocumentEntity,
      constructUsing(
        (
          source: PermanentIncapacityBenefitTerminatedDisabilityAnalysisDocumentTypeormEntity,
        ): PermanentIncapacityBenefitTerminatedDisabilityAnalysisDocumentEntity => {
          if (!source.permanentIncapacityBenefitTerminatedDisabilityAnalysis) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass:
                PermanentIncapacityBenefitTerminatedDisabilityAnalysisDocumentEntity.name,
              sourceClass:
                PermanentIncapacityBenefitTerminatedDisabilityAnalysisDocumentTypeormEntity.name,
            });
          }

          return new PermanentIncapacityBenefitTerminatedDisabilityAnalysisDocumentEntity(
            {
              id: new PermanentIncapacityBenefitTerminatedDisabilityAnalysisDocumentId(
                source.id,
              ),
              fileName: source.fileName,
              type: source.type,
              permanentIncapacityBenefitTerminatedDisabilityAnalysisId:
                new PermanentIncapacityBenefitTerminatedDisabilityAnalysisId(
                  source.permanentIncapacityBenefitTerminatedDisabilityAnalysis
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
      PermanentIncapacityBenefitTerminatedDisabilityAnalysisDocumentEntity,
      PermanentIncapacityBenefitTerminatedDisabilityAnalysisDocumentTypeormEntity,
      constructUsing(
        (
          source: PermanentIncapacityBenefitTerminatedDisabilityAnalysisDocumentEntity,
        ): PermanentIncapacityBenefitTerminatedDisabilityAnalysisDocumentTypeormEntity =>
          PermanentIncapacityBenefitTerminatedDisabilityAnalysisDocumentTypeormEntity.build(
            {
              id: source.id.toString(),
              fileName: source.fileName,
              type: source.type,
              permanentIncapacityBenefitTerminatedDisabilityAnalysis:
                PermanentIncapacityBenefitTerminatedDisabilityAnalysisTypeormEntity.build(
                  {
                    id: source.permanentIncapacityBenefitTerminatedDisabilityAnalysisId.toString(),
                  } as PermanentIncapacityBenefitTerminatedDisabilityAnalysisTypeormEntity,
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
