import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { SurvivorPensionAnalysisResultRetirementRuleTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis-result-retirement-rule.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { GetSurvivorPensionAnalysisResultRetirementRuleQueryResult } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-result-retirement-rule/query/result/get-survivor-pension-analysis-result-retirement-rule.query.result';
import { SurvivorPensionAnalysisResultId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-result/value-object/survivor-pension-analysis-result-id/survivor-pension-analysis-result-id.value-object';
import { SurvivorPensionAnalysisResultRetirementRuleId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-result-retirement-rule/value-object/survivor-pension-analysis-result-retirement-rule-id/survivor-pension-analysis-result-retirement-rule-id.value-object';

@Injectable()
export class GetSurvivorPensionAnalysisResultRetirementRuleQueryResultAutoMapperProfile {
  protected readonly _type =
    GetSurvivorPensionAnalysisResultRetirementRuleQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: SurvivorPensionAnalysisResultRetirementRuleTypeormEntity,
    ): GetSurvivorPensionAnalysisResultRetirementRuleQueryResult => {
      if (!source.survivorPensionAnalysisResult) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass:
            GetSurvivorPensionAnalysisResultRetirementRuleQueryResult.name,
          sourceClass:
            SurvivorPensionAnalysisResultRetirementRuleTypeormEntity.name,
        });
      }

      return GetSurvivorPensionAnalysisResultRetirementRuleQueryResult.build({
        id: new SurvivorPensionAnalysisResultRetirementRuleId(source.id),
        survivorPensionAnalysisResultId: new SurvivorPensionAnalysisResultId(
          source.survivorPensionAnalysisResult.id,
        ),
        ruleName: source.ruleName,
        isRequirementMet: source.isRequirementMet,
        entitlementDate: source.entitlementDate,
        estimatedRmi:
          source.estimatedRmi !== null
            ? new DecimalValue(source.estimatedRmi)
            : null,
        isBestRmi: source.isBestRmi,
        isHighestClaimValue: source.isHighestClaimValue,
        detailedAnalysis: source.detailedAnalysis,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToQueryResult);

    createMap(
      this.mapper,
      SurvivorPensionAnalysisResultRetirementRuleTypeormEntity,
      GetSurvivorPensionAnalysisResultRetirementRuleQueryResult,
      mappingFunction,
    );
  }
}
