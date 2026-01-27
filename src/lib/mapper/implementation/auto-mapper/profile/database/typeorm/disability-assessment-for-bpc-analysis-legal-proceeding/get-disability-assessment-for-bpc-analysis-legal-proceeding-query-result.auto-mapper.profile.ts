import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { DisabilityAssessmentForBpcAnalysisLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-assessment-for-bpc-analysis-legal-proceeding.entity';
import { GetDisabilityAssessmentForBpcAnalysisLegalProceedingQueryResult } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/repository/disability-assessment-for-bpc-analysis/query/result/get-disability-assessment-for-bpc-analysis-legal-proceeding.query.result';

@Injectable()
export class GetDisabilityAssessmentForBpcAnalysisLegalProceedingQueryResultAutoMapperProfile {
  protected readonly _type =
    GetDisabilityAssessmentForBpcAnalysisLegalProceedingQueryResultAutoMapperProfile.name;

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
    ): GetDisabilityAssessmentForBpcAnalysisLegalProceedingQueryResult => {
      return GetDisabilityAssessmentForBpcAnalysisLegalProceedingQueryResult.build(
        {
          ...source,
          id: new Guid(source.id),
        },
      );
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      DisabilityAssessmentForBpcAnalysisLegalProceedingTypeormEntity,
      GetDisabilityAssessmentForBpcAnalysisLegalProceedingQueryResult,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetDisabilityAssessmentForBpcAnalysisLegalProceedingQueryResult,
    ): DisabilityAssessmentForBpcAnalysisLegalProceedingTypeormEntity => {
      return DisabilityAssessmentForBpcAnalysisLegalProceedingTypeormEntity.build(
        {
          ...source,
          id: source.id.toString(),
          disabilityAssessmentForBpcAnalysis: undefined,
        },
      );
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetDisabilityAssessmentForBpcAnalysisLegalProceedingQueryResult,
      DisabilityAssessmentForBpcAnalysisLegalProceedingTypeormEntity,
      mappingFunction,
    );
  }
}
