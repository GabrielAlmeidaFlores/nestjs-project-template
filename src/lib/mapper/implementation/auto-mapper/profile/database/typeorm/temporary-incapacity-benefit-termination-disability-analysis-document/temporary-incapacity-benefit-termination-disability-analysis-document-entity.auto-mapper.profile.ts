import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { TemporaryIncapacityBenefitTerminationDisabilityAnalysisDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-termination-disability-analysis-document.typeorm.entity';
import { TemporaryIncapacityBenefitTerminationDisabilityAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-termination-disability-analysis.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { TemporaryIncapacityBenefitTerminationDisabilityAnalysisId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-disability-analysis/value-object/temporary-incapacity-benefit-termination-disability-analysis-id.value-object';
import { TemporaryIncapacityBenefitTerminationDisabilityAnalysisDocumentEntity } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-disability-analysis-document/temporary-incapacity-benefit-termination-disability-analysis-document.entity';
import { TemporaryIncapacityBenefitTerminationDisabilityAnalysisDocumentId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-disability-analysis-document/value-object/temporary-incapacity-benefit-termination-disability-analysis-document-id.value-object';

@Injectable()
export class TemporaryIncapacityBenefitTerminationDisabilityAnalysisDocumentEntityAutoMapperProfile {
  protected readonly _type =
    TemporaryIncapacityBenefitTerminationDisabilityAnalysisDocumentEntityAutoMapperProfile.name;

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
      TemporaryIncapacityBenefitTerminationDisabilityAnalysisDocumentTypeormEntity,
      TemporaryIncapacityBenefitTerminationDisabilityAnalysisDocumentEntity,
      constructUsing(
        (
          source: TemporaryIncapacityBenefitTerminationDisabilityAnalysisDocumentTypeormEntity,
        ): TemporaryIncapacityBenefitTerminationDisabilityAnalysisDocumentEntity => {
          if (!source.temporaryIncapacityBenefitTerminationDisabilityAnalysis) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass:
                TemporaryIncapacityBenefitTerminationDisabilityAnalysisDocumentEntity.name,
              sourceClass:
                TemporaryIncapacityBenefitTerminationDisabilityAnalysisDocumentTypeormEntity.name,
            });
          }

          return new TemporaryIncapacityBenefitTerminationDisabilityAnalysisDocumentEntity(
            {
              id: new TemporaryIncapacityBenefitTerminationDisabilityAnalysisDocumentId(
                source.id,
              ),
              fileName: source.fileName,
              type: source.type,
              temporaryIncapacityBenefitTerminationDisabilityAnalysisId:
                new TemporaryIncapacityBenefitTerminationDisabilityAnalysisId(
                  source.temporaryIncapacityBenefitTerminationDisabilityAnalysis
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
      TemporaryIncapacityBenefitTerminationDisabilityAnalysisDocumentEntity,
      TemporaryIncapacityBenefitTerminationDisabilityAnalysisDocumentTypeormEntity,
      constructUsing(
        (
          source: TemporaryIncapacityBenefitTerminationDisabilityAnalysisDocumentEntity,
        ): TemporaryIncapacityBenefitTerminationDisabilityAnalysisDocumentTypeormEntity =>
          TemporaryIncapacityBenefitTerminationDisabilityAnalysisDocumentTypeormEntity.build(
            {
              id: source.id.toString(),
              fileName: source.fileName,
              type: source.type,
              temporaryIncapacityBenefitTerminationDisabilityAnalysis:
                TemporaryIncapacityBenefitTerminationDisabilityAnalysisTypeormEntity.build(
                  {
                    id: source.temporaryIncapacityBenefitTerminationDisabilityAnalysisId.toString(),
                  } as TemporaryIncapacityBenefitTerminationDisabilityAnalysisTypeormEntity,
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
