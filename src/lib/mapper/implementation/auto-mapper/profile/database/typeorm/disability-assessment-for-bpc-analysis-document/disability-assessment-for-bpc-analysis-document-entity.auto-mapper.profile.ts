import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DisabilityAssessmentForBpcAnalysisDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-assessment-for-bpc-analysis-document.entity';
import { DisabilityAssessmentForBpcAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-assessment-for-bpc-analysis.entity';
import { DisabilityAssessmentForBpcAnalysisEntity } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis/disability-assessment-for-bpc-analysis.entity';
import { DisabilityAssessmentForBpcAnalysisDocumentEntity } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis-document/disability-assessment-for-bpc-analysis-document.entity';
import { DisabilityAssessmentForBpcAnalysisDocumentId } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis-document/value-object/disability-assessment-for-bpc-analysis-document-id/disability-assessment-for-bpc-analysis-document-id.value-object';

@Injectable()
export class DisabilityAssessmentForBpcAnalysisDocumentEntityAutoMapperProfile {
  protected readonly _type =
    DisabilityAssessmentForBpcAnalysisDocumentEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: DisabilityAssessmentForBpcAnalysisDocumentTypeormEntity,
    ): DisabilityAssessmentForBpcAnalysisDocumentEntity => {
      const disabilityAssessmentForBpcAnalysis = this.mapper.map(
        source.disabilityAssessmentForBpcAnalysis,
        DisabilityAssessmentForBpcAnalysisTypeormEntity,
        DisabilityAssessmentForBpcAnalysisEntity,
      );

      return new DisabilityAssessmentForBpcAnalysisDocumentEntity({
        ...source,
        id: new DisabilityAssessmentForBpcAnalysisDocumentId(source.id),
        disabilityAssessmentForBpcAnalysis,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      DisabilityAssessmentForBpcAnalysisDocumentTypeormEntity,
      DisabilityAssessmentForBpcAnalysisDocumentEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: DisabilityAssessmentForBpcAnalysisDocumentEntity,
    ): DisabilityAssessmentForBpcAnalysisDocumentTypeormEntity => {
      const disabilityAssessmentForBpcAnalysis = this.mapper.map(
        source.disabilityAssessmentForBpcAnalysis,
        DisabilityAssessmentForBpcAnalysisEntity,
        DisabilityAssessmentForBpcAnalysisTypeormEntity,
      );

      return DisabilityAssessmentForBpcAnalysisDocumentTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        disabilityAssessmentForBpcAnalysis,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      DisabilityAssessmentForBpcAnalysisDocumentEntity,
      DisabilityAssessmentForBpcAnalysisDocumentTypeormEntity,
      mappingFunction,
    );
  }
}
