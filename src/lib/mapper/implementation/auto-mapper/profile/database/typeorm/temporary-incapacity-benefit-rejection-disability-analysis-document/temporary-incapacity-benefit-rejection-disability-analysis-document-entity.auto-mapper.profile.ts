import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { TemporaryIncapacityBenefitRejectionDisabilityAnalysisDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-rejection-disability-analysis-document.typeorm.entity';
import { TemporaryIncapacityBenefitRejectionDisabilityAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-rejection-disability-analysis.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { TemporaryIncapacityBenefitRejectionDisabilityAnalysisId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-disability-analysis/value-object/temporary-incapacity-benefit-rejection-disability-analysis-id.value-object';
import { TemporaryIncapacityBenefitRejectionDisabilityAnalysisDocumentEntity } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-disability-analysis-document/temporary-incapacity-benefit-rejection-disability-analysis-document.entity';
import { TemporaryIncapacityBenefitRejectionDisabilityAnalysisDocumentId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-disability-analysis-document/value-object/temporary-incapacity-benefit-rejection-disability-analysis-document-id.value-object';

@Injectable()
export class TemporaryIncapacityBenefitRejectionDisabilityAnalysisDocumentEntityAutoMapperProfile {
  protected readonly _type =
    TemporaryIncapacityBenefitRejectionDisabilityAnalysisDocumentEntityAutoMapperProfile.name;

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
      TemporaryIncapacityBenefitRejectionDisabilityAnalysisDocumentTypeormEntity,
      TemporaryIncapacityBenefitRejectionDisabilityAnalysisDocumentEntity,
      constructUsing(
        (
          source: TemporaryIncapacityBenefitRejectionDisabilityAnalysisDocumentTypeormEntity,
        ): TemporaryIncapacityBenefitRejectionDisabilityAnalysisDocumentEntity => {
          if (!source.disabilityAnalysis) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass:
                TemporaryIncapacityBenefitRejectionDisabilityAnalysisDocumentEntity.name,
              sourceClass:
                TemporaryIncapacityBenefitRejectionDisabilityAnalysisDocumentTypeormEntity.name,
            });
          }

          return new TemporaryIncapacityBenefitRejectionDisabilityAnalysisDocumentEntity(
            {
              id: new TemporaryIncapacityBenefitRejectionDisabilityAnalysisDocumentId(
                source.id,
              ),
              fileName: source.fileName,
              type: source.type,
              temporaryIncapacityBenefitRejectionDisabilityAnalysisId:
                new TemporaryIncapacityBenefitRejectionDisabilityAnalysisId(
                  source.disabilityAnalysis.id,
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
      TemporaryIncapacityBenefitRejectionDisabilityAnalysisDocumentEntity,
      TemporaryIncapacityBenefitRejectionDisabilityAnalysisDocumentTypeormEntity,
      constructUsing(
        (
          source: TemporaryIncapacityBenefitRejectionDisabilityAnalysisDocumentEntity,
        ): TemporaryIncapacityBenefitRejectionDisabilityAnalysisDocumentTypeormEntity =>
          TemporaryIncapacityBenefitRejectionDisabilityAnalysisDocumentTypeormEntity.build(
            {
              id: source.id.toString(),
              fileName: source.fileName,
              type: source.type,
              disabilityAnalysis:
                TemporaryIncapacityBenefitRejectionDisabilityAnalysisTypeormEntity.build(
                  {
                    id: source.temporaryIncapacityBenefitRejectionDisabilityAnalysisId.toString(),
                  } as TemporaryIncapacityBenefitRejectionDisabilityAnalysisTypeormEntity,
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
