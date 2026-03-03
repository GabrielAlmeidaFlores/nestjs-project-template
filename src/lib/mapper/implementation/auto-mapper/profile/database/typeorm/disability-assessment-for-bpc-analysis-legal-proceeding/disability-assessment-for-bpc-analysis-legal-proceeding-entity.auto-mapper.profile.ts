import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DisabilityAssessmentForBpcAnalysisLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-assessment-for-bpc-analysis-legal-proceeding.entity';
import { DisabilityAssessmentForBpcAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-assessment-for-bpc-analysis.entity';
import { DisabilityAssessmentForBpcAnalysisEntity } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis/disability-assessment-for-bpc-analysis.entity';
import { DisabilityAssessmentForBpcAnalysisLegalProceedingEntity } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis-legal-proceeding/disability-assessment-for-bpc-analysis-legal-proceeding.entity';
import { DisabilityAssessmentForBpcAnalysisLegalProceedingId } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis-legal-proceeding/value-object/disability-assessment-for-bpc-analysis-legal-proceeding-id/disability-assessment-for-bpc-analysis-legal-proceeding-id.value-object';

@Injectable()
export class DisabilityAssessmentForBpcAnalysisLegalProceedingEntityAutoMapperProfile {
  protected readonly _type =
    DisabilityAssessmentForBpcAnalysisLegalProceedingEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: DisabilityAssessmentForBpcAnalysisLegalProceedingTypeormEntity,
    ): DisabilityAssessmentForBpcAnalysisLegalProceedingEntity => {
      const disabilityAssessmentForBpcAnalysis = this.mapper.map(
        source.disabilityAssessmentForBpcAnalysis,
        DisabilityAssessmentForBpcAnalysisTypeormEntity,
        DisabilityAssessmentForBpcAnalysisEntity,
      );

      return new DisabilityAssessmentForBpcAnalysisLegalProceedingEntity({
        ...source,
        id: new DisabilityAssessmentForBpcAnalysisLegalProceedingId(source.id),
        disabilityAssessmentForBpcAnalysis,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      DisabilityAssessmentForBpcAnalysisLegalProceedingTypeormEntity,
      DisabilityAssessmentForBpcAnalysisLegalProceedingEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: DisabilityAssessmentForBpcAnalysisLegalProceedingEntity,
    ): DisabilityAssessmentForBpcAnalysisLegalProceedingTypeormEntity => {
      const disabilityAssessmentForBpcAnalysis = this.mapper.map(
        source.disabilityAssessmentForBpcAnalysis,
        DisabilityAssessmentForBpcAnalysisEntity,
        DisabilityAssessmentForBpcAnalysisTypeormEntity,
      );

      return DisabilityAssessmentForBpcAnalysisLegalProceedingTypeormEntity.build(
        {
          ...source,
          id: source.id.toString(),
          disabilityAssessmentForBpcAnalysis,
        },
      );
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      DisabilityAssessmentForBpcAnalysisLegalProceedingEntity,
      DisabilityAssessmentForBpcAnalysisLegalProceedingTypeormEntity,
      mappingFunction,
    );
  }
}
