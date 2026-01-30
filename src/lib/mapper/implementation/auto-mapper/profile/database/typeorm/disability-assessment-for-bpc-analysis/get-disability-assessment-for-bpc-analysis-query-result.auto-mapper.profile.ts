import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DisabilityAssessmentForBpcAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-assessment-for-bpc-analysis.entity';
import { GetDisabilityAssessmentForBpcAnalysisQueryResult } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/repository/disability-assessment-for-bpc-analysis/query/result/get-disability-assessment-for-bpc-analysis.query.result';
import { DisabilityAssessmentForBpcAnalysisId } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis/value-object/disability-assessment-for-bpc-analysis-id/disability-assessment-for-bpc-analysis-id.value-object';

@Injectable()
export class GetDisabilityAssessmentForBpcAnalysisQueryResultAutoMapperProfile {
  protected readonly _type =
    GetDisabilityAssessmentForBpcAnalysisQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: DisabilityAssessmentForBpcAnalysisTypeormEntity,
    ): GetDisabilityAssessmentForBpcAnalysisQueryResult => {
      return GetDisabilityAssessmentForBpcAnalysisQueryResult.build({
        ...source,
        id: new DisabilityAssessmentForBpcAnalysisId(source.id),
        disabilityAssessmentForBpcAnalysisDocument:
          source.disabilityAssessmentForBpcAnalysisDocument ?? [],
        disabilityAssessmentForBpcAnalysisResult:
          source.disabilityAssessmentForBpcAnalysisResult ?? null,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      DisabilityAssessmentForBpcAnalysisTypeormEntity,
      GetDisabilityAssessmentForBpcAnalysisQueryResult,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetDisabilityAssessmentForBpcAnalysisQueryResult,
    ): DisabilityAssessmentForBpcAnalysisTypeormEntity => {
      return DisabilityAssessmentForBpcAnalysisTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        disabilityAssessmentForBpcAnalysisResult: undefined,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetDisabilityAssessmentForBpcAnalysisQueryResult,
      DisabilityAssessmentForBpcAnalysisTypeormEntity,
      mappingFunction,
    );
  }
}
