import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DisabilityAssessmentForBpcAnalysisBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-assessment-for-bpc-analysis-benefit.entity';
import { DisabilityAssessmentForBpcAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-assessment-for-bpc-analysis.entity';
import { DisabilityAssessmentForBpcAnalysisEntity } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis/disability-assessment-for-bpc-analysis.entity';
import { DisabilityAssessmentForBpcAnalysisBenefitEntity } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis-benefit/disability-assessment-for-bpc-analysis-benefit.entity';
import { DisabilityAssessmentForBpcAnalysisBenefitId } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis-benefit/value-object/disability-assessment-for-bpc-analysis-benefit-id/disability-assessment-for-bpc-analysis-benefit-id.value-object';

@Injectable()
export class DisabilityAssessmentForBpcAnalysisBenefitEntityAutoMapperProfile {
  protected readonly _type =
    DisabilityAssessmentForBpcAnalysisBenefitEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: DisabilityAssessmentForBpcAnalysisBenefitTypeormEntity,
    ): DisabilityAssessmentForBpcAnalysisBenefitEntity => {
      const disabilityAssessmentForBpcAnalysis = this.mapper.map(
        source.disabilityAssessmentForBpcAnalysis,
        DisabilityAssessmentForBpcAnalysisTypeormEntity,
        DisabilityAssessmentForBpcAnalysisEntity,
      );

      return new DisabilityAssessmentForBpcAnalysisBenefitEntity({
        ...source,
        id: new DisabilityAssessmentForBpcAnalysisBenefitId(source.id),
        disabilityAssessmentForBpcAnalysis,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      DisabilityAssessmentForBpcAnalysisBenefitTypeormEntity,
      DisabilityAssessmentForBpcAnalysisBenefitEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: DisabilityAssessmentForBpcAnalysisBenefitEntity,
    ): DisabilityAssessmentForBpcAnalysisBenefitTypeormEntity => {
      const disabilityAssessmentForBpcAnalysis = this.mapper.map(
        source.disabilityAssessmentForBpcAnalysis,
        DisabilityAssessmentForBpcAnalysisEntity,
        DisabilityAssessmentForBpcAnalysisTypeormEntity,
      );

      return DisabilityAssessmentForBpcAnalysisBenefitTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        disabilityAssessmentForBpcAnalysis,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      DisabilityAssessmentForBpcAnalysisBenefitEntity,
      DisabilityAssessmentForBpcAnalysisBenefitTypeormEntity,
      mappingFunction,
    );
  }
}
