import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { SurvivorPensionAnalysisResultDependentPensionAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis-result-dependent-pension-analysis.typeorm.entity';
import { SurvivorPensionAnalysisResultRetirementRuleTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis-result-retirement-rule.typeorm.entity';
import { SurvivorPensionAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis-result.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { GetSurvivorPensionAnalysisResultQueryResult } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-result/query/result/get-survivor-pension-analysis-result.query.result';
import { GetSurvivorPensionAnalysisResultDependentPensionAnalysisQueryResult } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-result-dependent-pension-analysis/query/result/get-survivor-pension-analysis-result-dependent-pension-analysis.query.result';
import { GetSurvivorPensionAnalysisResultRetirementRuleQueryResult } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-result-retirement-rule/query/result/get-survivor-pension-analysis-result-retirement-rule.query.result';
import { SurvivorPensionAnalysisId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis/value-object/survivor-pension-analysis-id/survivor-pension-analysis-id.value-object';
import { SurvivorPensionAnalysisResultId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-result/value-object/survivor-pension-analysis-result-id/survivor-pension-analysis-result-id.value-object';

@Injectable()
export class GetSurvivorPensionAnalysisResultQueryResultAutoMapperProfile {
  protected readonly _type =
    GetSurvivorPensionAnalysisResultQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: SurvivorPensionAnalysisResultTypeormEntity,
    ): GetSurvivorPensionAnalysisResultQueryResult => {
      if (!source.survivorPensionAnalysis) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass: GetSurvivorPensionAnalysisResultQueryResult.name,
          sourceClass: SurvivorPensionAnalysisResultTypeormEntity.name,
        });
      }

      const retirementRules = (source.retirementRules ?? []).map((rule) =>
        this.mapper.map(
          rule,
          SurvivorPensionAnalysisResultRetirementRuleTypeormEntity,
          GetSurvivorPensionAnalysisResultRetirementRuleQueryResult,
        ),
      );

      const dependentPensionAnalyses = (
        source.dependentPensionAnalyses ?? []
      ).map((analysis) =>
        this.mapper.map(
          analysis,
          SurvivorPensionAnalysisResultDependentPensionAnalysisTypeormEntity,
          GetSurvivorPensionAnalysisResultDependentPensionAnalysisQueryResult,
        ),
      );

      return GetSurvivorPensionAnalysisResultQueryResult.build({
        id: new SurvivorPensionAnalysisResultId(source.id),
        survivorPensionAnalysisId: new SurvivorPensionAnalysisId(
          source.survivorPensionAnalysis.id,
        ),
        isInsuredStatusConfirmed: source.isInsuredStatusConfirmed,
        insuredStatusSummary: source.insuredStatusSummary,
        isRetirementRightConfirmed: source.isRetirementRightConfirmed,
        retirementRightSummary: source.retirementRightSummary,
        completeAnalysis: source.completeAnalysis,
        simplifiedAnalysis: source.simplifiedAnalysis,
        retirementRules,
        dependentPensionAnalyses,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToQueryResult);

    createMap(
      this.mapper,
      SurvivorPensionAnalysisResultTypeormEntity,
      GetSurvivorPensionAnalysisResultQueryResult,
      mappingFunction,
    );
  }
}
