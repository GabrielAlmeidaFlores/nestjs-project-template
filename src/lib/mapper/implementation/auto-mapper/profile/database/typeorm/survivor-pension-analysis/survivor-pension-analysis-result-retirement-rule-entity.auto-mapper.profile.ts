import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { SurvivorPensionAnalysisResultRetirementRuleTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis-result-retirement-rule.typeorm.entity';
import { SurvivorPensionAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis-result.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { SurvivorPensionAnalysisResultId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-result/value-object/survivor-pension-analysis-result-id/survivor-pension-analysis-result-id.value-object';
import { SurvivorPensionAnalysisResultRetirementRuleEntity } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-result-retirement-rule/survivor-pension-analysis-result-retirement-rule.entity';
import { SurvivorPensionAnalysisResultRetirementRuleId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-result-retirement-rule/value-object/survivor-pension-analysis-result-retirement-rule-id/survivor-pension-analysis-result-retirement-rule-id.value-object';

@Injectable()
export class SurvivorPensionAnalysisResultRetirementRuleEntityAutoMapperProfile {
  protected readonly _type =
    SurvivorPensionAnalysisResultRetirementRuleEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    createMap(
      this.mapper,
      SurvivorPensionAnalysisResultRetirementRuleTypeormEntity,
      SurvivorPensionAnalysisResultRetirementRuleEntity,
      constructUsing(
        (
          source: SurvivorPensionAnalysisResultRetirementRuleTypeormEntity,
        ): SurvivorPensionAnalysisResultRetirementRuleEntity => {
          if (!source.survivorPensionAnalysisResult) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass:
                SurvivorPensionAnalysisResultRetirementRuleEntity.name,
              sourceClass:
                SurvivorPensionAnalysisResultRetirementRuleTypeormEntity.name,
            });
          }

          return new SurvivorPensionAnalysisResultRetirementRuleEntity({
            id: new SurvivorPensionAnalysisResultRetirementRuleId(source.id),
            survivorPensionAnalysisResultId:
              new SurvivorPensionAnalysisResultId(
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
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          });
        },
      ),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    createMap(
      this.mapper,
      SurvivorPensionAnalysisResultRetirementRuleEntity,
      SurvivorPensionAnalysisResultRetirementRuleTypeormEntity,
      constructUsing(
        (
          source: SurvivorPensionAnalysisResultRetirementRuleEntity,
        ): SurvivorPensionAnalysisResultRetirementRuleTypeormEntity =>
          SurvivorPensionAnalysisResultRetirementRuleTypeormEntity.build({
            id: source.id.toString(),
            ruleName: source.ruleName,
            isRequirementMet: source.isRequirementMet,
            entitlementDate: source.entitlementDate,
            estimatedRmi:
              source.estimatedRmi !== null
                ? source.estimatedRmi.toString()
                : null,
            isBestRmi: source.isBestRmi,
            isHighestClaimValue: source.isHighestClaimValue,
            detailedAnalysis: source.detailedAnalysis,
            survivorPensionAnalysisResult:
              SurvivorPensionAnalysisResultTypeormEntity.build({
                id: source.survivorPensionAnalysisResultId.toString(),
              } as SurvivorPensionAnalysisResultTypeormEntity),
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          }),
      ),
    );
  }
}
