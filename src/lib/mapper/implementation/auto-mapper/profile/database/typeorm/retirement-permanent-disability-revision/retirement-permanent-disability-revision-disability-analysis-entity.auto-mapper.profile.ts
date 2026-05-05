import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { RetirementPermanentDisabilityRevisionDisabilityAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-revision-disability-analysis.typeorm.entity';
import { RetirementPermanentDisabilityRevisionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-revision.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { RetirementPermanentDisabilityRevisionId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision/value-object/retirement-permanent-disability-revision-id.value-object';
import { RetirementPermanentDisabilityRevisionDisabilityAnalysisEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-disability-analysis/retirement-permanent-disability-revision-disability-analysis.entity';
import { RetirementPermanentDisabilityRevisionDisabilityAnalysisId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-disability-analysis/value-object/retirement-permanent-disability-revision-disability-analysis-id.value-object';

@Injectable()
export class RetirementPermanentDisabilityRevisionDisabilityAnalysisEntityAutoMapperProfile {
  protected readonly _type =
    RetirementPermanentDisabilityRevisionDisabilityAnalysisEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convert = (
      source: RetirementPermanentDisabilityRevisionDisabilityAnalysisTypeormEntity,
    ): RetirementPermanentDisabilityRevisionDisabilityAnalysisEntity => {
      if (!source.retirementPermanentDisabilityRevision) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass:
            RetirementPermanentDisabilityRevisionDisabilityAnalysisEntity.name,
          sourceClass:
            RetirementPermanentDisabilityRevisionDisabilityAnalysisTypeormEntity.name,
        });
      }

      return new RetirementPermanentDisabilityRevisionDisabilityAnalysisEntity({
        id: new RetirementPermanentDisabilityRevisionDisabilityAnalysisId(
          source.id,
        ),
        retirementPermanentDisabilityRevisionId: new RetirementPermanentDisabilityRevisionId(
          source.retirementPermanentDisabilityRevision.id,
        ),
        estimatedIncapacityStartDate: source.estimatedIncapacityStartDate,
        medicalDescription: source.medicalDescription,
        isAccidentRelated: source.isAccidentRelated,
        accidentDescription: source.accidentDescription,
        isSevereDisease: source.isSevereDisease,
        severeDiseaseType: source.severeDiseaseType,
        severeDiseaseName: source.severeDiseaseName,
        diseaseStartDate: source.diseaseStartDate,
        needsPermanentAssistance: source.needsPermanentAssistance,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      RetirementPermanentDisabilityRevisionDisabilityAnalysisTypeormEntity,
      RetirementPermanentDisabilityRevisionDisabilityAnalysisEntity,
      constructUsing(convert),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convert = (
      source: RetirementPermanentDisabilityRevisionDisabilityAnalysisEntity,
    ): RetirementPermanentDisabilityRevisionDisabilityAnalysisTypeormEntity => {
      return RetirementPermanentDisabilityRevisionDisabilityAnalysisTypeormEntity.build(
        {
          id: source.id.toString(),
          estimatedIncapacityStartDate: source.estimatedIncapacityStartDate,
          medicalDescription: source.medicalDescription,
          isAccidentRelated: source.isAccidentRelated,
          accidentDescription: source.accidentDescription,
          isSevereDisease: source.isSevereDisease,
          severeDiseaseType: source.severeDiseaseType,
          severeDiseaseName: source.severeDiseaseName,
          diseaseStartDate: source.diseaseStartDate,
          needsPermanentAssistance: source.needsPermanentAssistance,
          retirementPermanentDisabilityRevision: {
            id: source.retirementPermanentDisabilityRevisionId.toString(),
          } as RetirementPermanentDisabilityRevisionTypeormEntity,
          createdAt: source.createdAt,
          updatedAt: source.updatedAt,
          deletedAt: source.deletedAt,
        },
      );
    };

    createMap(
      this.mapper,
      RetirementPermanentDisabilityRevisionDisabilityAnalysisEntity,
      RetirementPermanentDisabilityRevisionDisabilityAnalysisTypeormEntity,
      constructUsing(convert),
    );
  }
}
