import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DisabilityAssessmentForBpcAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-assessment-for-bpc-analysis-result.entity';
import { GetDisabilityAssessmentForBpcAnalysisResultQueryResult } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/repository/disability-assessment-for-bpc-analysis-result/query/result/get-disability-assessment-for-bpc-analysis-result.query.result';
import { DisabilityAssessmentForBpcAnalysisResultId } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis-result/value-object/disability-assessment-for-bpc-analysis-result-id/disability-assessment-for-bpc-analysis-result-id.value-object';

@Injectable()
export class GetDisabilityAssessmentForBpcAnalysisResultQueryResultAutoMapperProfile {
  protected readonly _type =
    GetDisabilityAssessmentForBpcAnalysisResultQueryResultAutoMapperProfile.name;

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
    ): GetDisabilityAssessmentForBpcAnalysisResultQueryResult => {
      return GetDisabilityAssessmentForBpcAnalysisResultQueryResult.build({
        ...source,
        id: new DisabilityAssessmentForBpcAnalysisResultId(source.id),
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      DisabilityAssessmentForBpcAnalysisResultTypeormEntity,
      GetDisabilityAssessmentForBpcAnalysisResultQueryResult,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetDisabilityAssessmentForBpcAnalysisResultQueryResult,
    ): DisabilityAssessmentForBpcAnalysisResultTypeormEntity => {
      return DisabilityAssessmentForBpcAnalysisResultTypeormEntity.build({
        ...source,
        id: source.id.toString(),
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetDisabilityAssessmentForBpcAnalysisResultQueryResult,
      DisabilityAssessmentForBpcAnalysisResultTypeormEntity,
      mappingFunction,
    );
  }
}
