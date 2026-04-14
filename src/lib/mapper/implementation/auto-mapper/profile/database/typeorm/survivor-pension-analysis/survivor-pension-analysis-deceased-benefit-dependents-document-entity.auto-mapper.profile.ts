import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { SurvivorPensionAnalysisDeceasedBenefitDependentsDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis-deceased-benefit-dependents-document.typeorm.entity';
import { SurvivorPensionAnalysisDeceasedBenefitDependentsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis-deceased-benefit-dependents.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { SurvivorPensionAnalysisDeceasedBenefitDependentsId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-benefit-dependents/value-object/survivor-pension-analysis-deceased-benefit-dependents-id/survivor-pension-analysis-deceased-benefit-dependents-id.value-object';
import { SurvivorPensionAnalysisDeceasedBenefitDependentsDocumentEntity } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-benefit-dependents-document/survivor-pension-analysis-deceased-benefit-dependents-document.entity';
import { SurvivorPensionAnalysisDeceasedBenefitDependentsDocumentId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-benefit-dependents-document/value-object/survivor-pension-analysis-deceased-benefit-dependents-document-id/survivor-pension-analysis-deceased-benefit-dependents-document-id.value-object';

@Injectable()
export class SurvivorPensionAnalysisDeceasedBenefitDependentsDocumentEntityAutoMapperProfile {
  protected readonly _type =
    SurvivorPensionAnalysisDeceasedBenefitDependentsDocumentEntityAutoMapperProfile.name;

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
      SurvivorPensionAnalysisDeceasedBenefitDependentsDocumentTypeormEntity,
      SurvivorPensionAnalysisDeceasedBenefitDependentsDocumentEntity,
      constructUsing(
        (
          source: SurvivorPensionAnalysisDeceasedBenefitDependentsDocumentTypeormEntity,
        ): SurvivorPensionAnalysisDeceasedBenefitDependentsDocumentEntity => {
          if (!source.deceasedBenefitDependents) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass:
                SurvivorPensionAnalysisDeceasedBenefitDependentsDocumentEntity.name,
              sourceClass:
                SurvivorPensionAnalysisDeceasedBenefitDependentsDocumentTypeormEntity.name,
            });
          }

          return new SurvivorPensionAnalysisDeceasedBenefitDependentsDocumentEntity(
            {
              id: new SurvivorPensionAnalysisDeceasedBenefitDependentsDocumentId(
                source.id,
              ),
              documentType: source.documentType,
              documentName: source.documentName,
              survivorPensionAnalysisDeceasedBenefitDependentsId:
                new SurvivorPensionAnalysisDeceasedBenefitDependentsId(
                  source.deceasedBenefitDependents.id,
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
      SurvivorPensionAnalysisDeceasedBenefitDependentsDocumentEntity,
      SurvivorPensionAnalysisDeceasedBenefitDependentsDocumentTypeormEntity,
      constructUsing(
        (
          source: SurvivorPensionAnalysisDeceasedBenefitDependentsDocumentEntity,
        ): SurvivorPensionAnalysisDeceasedBenefitDependentsDocumentTypeormEntity =>
          SurvivorPensionAnalysisDeceasedBenefitDependentsDocumentTypeormEntity.build(
            {
              id: source.id.toString(),
              documentType: source.documentType,
              documentName: source.documentName,
              deceasedBenefitDependents:
                SurvivorPensionAnalysisDeceasedBenefitDependentsTypeormEntity.build(
                  {
                    id: source.survivorPensionAnalysisDeceasedBenefitDependentsId.toString(),
                  } as SurvivorPensionAnalysisDeceasedBenefitDependentsTypeormEntity,
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
