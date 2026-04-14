import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { SurvivorPensionAnalysisResultDependentPensionAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis-result-dependent-pension-analysis.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { GetSurvivorPensionAnalysisResultDependentPensionAnalysisQueryResult } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-result-dependent-pension-analysis/query/result/get-survivor-pension-analysis-result-dependent-pension-analysis.query.result';
import { SurvivorPensionAnalysisResultId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-result/value-object/survivor-pension-analysis-result-id/survivor-pension-analysis-result-id.value-object';
import { SurvivorPensionAnalysisResultDependentPensionAnalysisId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-result-dependent-pension-analysis/value-object/survivor-pension-analysis-result-dependent-pension-analysis-id/survivor-pension-analysis-result-dependent-pension-analysis-id.value-object';

@Injectable()
export class GetSurvivorPensionAnalysisResultDependentPensionAnalysisQueryResultAutoMapperProfile {
  protected readonly _type =
    GetSurvivorPensionAnalysisResultDependentPensionAnalysisQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: SurvivorPensionAnalysisResultDependentPensionAnalysisTypeormEntity,
    ): GetSurvivorPensionAnalysisResultDependentPensionAnalysisQueryResult => {
      if (!source.survivorPensionAnalysisResult) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass:
            GetSurvivorPensionAnalysisResultDependentPensionAnalysisQueryResult.name,
          sourceClass:
            SurvivorPensionAnalysisResultDependentPensionAnalysisTypeormEntity.name,
        });
      }

      return GetSurvivorPensionAnalysisResultDependentPensionAnalysisQueryResult.build(
        {
          id: new SurvivorPensionAnalysisResultDependentPensionAnalysisId(
            source.id,
          ),
          survivorPensionAnalysisResultId: new SurvivorPensionAnalysisResultId(
            source.survivorPensionAnalysisResult.id,
          ),
          dependentName: source.dependentName,
          dependencyDegree: source.dependencyDegree,
          isDependencyVerified: source.isDependencyVerified,
          pensionStartDate: source.pensionStartDate,
          estimatedPensionDuration: source.estimatedPensionDuration,
          createdAt: source.createdAt,
          updatedAt: source.updatedAt,
        },
      );
    };

    const mappingFunction = constructUsing(convertOrmEntityToQueryResult);

    createMap(
      this.mapper,
      SurvivorPensionAnalysisResultDependentPensionAnalysisTypeormEntity,
      GetSurvivorPensionAnalysisResultDependentPensionAnalysisQueryResult,
      mappingFunction,
    );
  }
}
