import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DisabilityAssessmentForBpcAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-assessment-for-bpc-analysis-result.entity';
import { DisabilityAssessmentForBpcAnalysisResultEntity } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis-result/disability-assessment-for-bpc-analysis-result.entity';
import { DisabilityAssessmentForBpcAnalysisResultId } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis-result/value-object/disability-assessment-for-bpc-analysis-result-id/disability-assessment-for-bpc-analysis-result-id.value-object';

@Injectable()
export class DisabilityAssessmentForBpcAnalysisResultEntityAutoMapperProfile {
  protected readonly _type =
    DisabilityAssessmentForBpcAnalysisResultEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: DisabilityAssessmentForBpcAnalysisResultTypeormEntity,
    ): DisabilityAssessmentForBpcAnalysisResultEntity => {
      return new DisabilityAssessmentForBpcAnalysisResultEntity({
        ...source,
        id: new DisabilityAssessmentForBpcAnalysisResultId(source.id),
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      DisabilityAssessmentForBpcAnalysisResultTypeormEntity,
      DisabilityAssessmentForBpcAnalysisResultEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: DisabilityAssessmentForBpcAnalysisResultEntity,
    ): DisabilityAssessmentForBpcAnalysisResultTypeormEntity => {
      return DisabilityAssessmentForBpcAnalysisResultTypeormEntity.build({
        ...source,
        id: source.id.toString(),
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      DisabilityAssessmentForBpcAnalysisResultEntity,
      DisabilityAssessmentForBpcAnalysisResultTypeormEntity,
      mappingFunction,
    );
  }
}
