import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { DisabilityAssessmentForBpcAnalysisDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-assessment-for-bpc-analysis-document.entity';
import { GetDisabilityAssessmentForBpcAnalysisDocumentQueryResult } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/repository/disability-assessment-for-bpc-analysis/query/result/get-disability-assessment-for-bpc-analysis-document.query.result';

@Injectable()
export class GetDisabilityAssessmentForBpcAnalysisDocumentQueryResultAutoMapperProfile {
  protected readonly _type =
    GetDisabilityAssessmentForBpcAnalysisDocumentQueryResultAutoMapperProfile.name;

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
    ): GetDisabilityAssessmentForBpcAnalysisDocumentQueryResult => {
      return GetDisabilityAssessmentForBpcAnalysisDocumentQueryResult.build({
        ...source,
        id: new Guid(source.id),
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      DisabilityAssessmentForBpcAnalysisDocumentTypeormEntity,
      GetDisabilityAssessmentForBpcAnalysisDocumentQueryResult,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetDisabilityAssessmentForBpcAnalysisDocumentQueryResult,
    ): DisabilityAssessmentForBpcAnalysisDocumentTypeormEntity => {
      return DisabilityAssessmentForBpcAnalysisDocumentTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        disabilityAssessmentForBpcAnalysis: undefined,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetDisabilityAssessmentForBpcAnalysisDocumentQueryResult,
      DisabilityAssessmentForBpcAnalysisDocumentTypeormEntity,
      mappingFunction,
    );
  }
}
