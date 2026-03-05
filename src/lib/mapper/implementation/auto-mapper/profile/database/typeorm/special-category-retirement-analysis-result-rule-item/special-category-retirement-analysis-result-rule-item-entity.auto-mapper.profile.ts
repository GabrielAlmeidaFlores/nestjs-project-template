import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { SpecialCategoryRetirementAnalysisResultRuleItemTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-category-retirement-analysis-result-rule-item.typeorm.entity';
import { SpecialCategoryRetirementAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-category-retirement-analysis-result.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { GetSpecialCategoryRetirementAnalysisResultRuleItemQueryResult } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis-result-rule-item/query/result/get-special-category-retirement-analysis-result-rule-item.query.result';
import { SpecialCategoryRetirementAnalysisResultId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-result/value-object/special-category-retirement-analysis-result-id/special-category-retirement-analysis-result-id.value-object';
import { SpecialCategoryRetirementAnalysisResultRuleItemEntity } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-result-rule-item/special-category-retirement-analysis-result-rule-item.entity';
import { SpecialCategoryRetirementAnalysisResultRuleItemId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-result-rule-item/value-object/special-category-retirement-analysis-result-rule-item-id/special-category-retirement-analysis-result-rule-item-id.value-object';

@Injectable()
export class SpecialCategoryRetirementAnalysisResultRuleItemEntityAutoMapperProfile {
  protected readonly _type =
    SpecialCategoryRetirementAnalysisResultRuleItemEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convert = (
      source: SpecialCategoryRetirementAnalysisResultRuleItemTypeormEntity,
    ): SpecialCategoryRetirementAnalysisResultRuleItemEntity => {
      if (!source.specialCategoryRetirementAnalysisResult) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass:
            SpecialCategoryRetirementAnalysisResultRuleItemEntity.name,
          sourceClass:
            SpecialCategoryRetirementAnalysisResultRuleItemTypeormEntity.name,
        });
      }

      return new SpecialCategoryRetirementAnalysisResultRuleItemEntity({
        id: new SpecialCategoryRetirementAnalysisResultRuleItemId(source.id),
        specialCategoryRetirementAnalysisResultId:
          new SpecialCategoryRetirementAnalysisResultId(
            source.specialCategoryRetirementAnalysisResult.id,
          ),
        retirementModalityName: source.retirementModalityName,
        isRequirementMet: source.isRequirementMet,
        projectedRetirementDate: source.projectedRetirementDate,
        estimatedRmiAmount:
          source.estimatedRmiAmount !== null
            ? new DecimalValue(source.estimatedRmiAmount)
            : null,
        isBestFinancialOption: source.isBestFinancialOption,
        ruleDetailedExplanationText: source.ruleDetailedExplanationText,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      SpecialCategoryRetirementAnalysisResultRuleItemTypeormEntity,
      SpecialCategoryRetirementAnalysisResultRuleItemEntity,
      constructUsing(convert),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convert = (
      source: SpecialCategoryRetirementAnalysisResultRuleItemEntity,
    ): SpecialCategoryRetirementAnalysisResultRuleItemTypeormEntity => {
      return SpecialCategoryRetirementAnalysisResultRuleItemTypeormEntity.build(
        {
          id: source.id.toString(),
          specialCategoryRetirementAnalysisResult: {
            id: source.specialCategoryRetirementAnalysisResultId.toString(),
          } as unknown as SpecialCategoryRetirementAnalysisResultTypeormEntity,
          retirementModalityName: source.retirementModalityName,
          isRequirementMet: source.isRequirementMet,
          projectedRetirementDate: source.projectedRetirementDate,
          estimatedRmiAmount:
            source.estimatedRmiAmount !== null
              ? source.estimatedRmiAmount.toString()
              : null,
          isBestFinancialOption: source.isBestFinancialOption,
          ruleDetailedExplanationText: source.ruleDetailedExplanationText,
          createdAt: source.createdAt,
          updatedAt: source.updatedAt,
          deletedAt: source.deletedAt,
        },
      );
    };

    createMap(
      this.mapper,
      SpecialCategoryRetirementAnalysisResultRuleItemEntity,
      SpecialCategoryRetirementAnalysisResultRuleItemTypeormEntity,
      constructUsing(convert),
    );
  }

  private mapOrmEntityToQueryResult(): void {
    const convert = (
      source: SpecialCategoryRetirementAnalysisResultRuleItemTypeormEntity,
    ): GetSpecialCategoryRetirementAnalysisResultRuleItemQueryResult => {
      if (!source.specialCategoryRetirementAnalysisResult) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass:
            GetSpecialCategoryRetirementAnalysisResultRuleItemQueryResult.name,
          sourceClass:
            SpecialCategoryRetirementAnalysisResultRuleItemTypeormEntity.name,
        });
      }

      const result =
        new GetSpecialCategoryRetirementAnalysisResultRuleItemQueryResult();
      Object.assign(result, {
        specialCategoryRetirementAnalysisResultRuleItemId:
          new SpecialCategoryRetirementAnalysisResultRuleItemId(source.id),
        specialCategoryRetirementAnalysisResultId:
          new SpecialCategoryRetirementAnalysisResultId(
            source.specialCategoryRetirementAnalysisResult.id,
          ),
        retirementModalityName: source.retirementModalityName,
        isRequirementMet: source.isRequirementMet,
        projectedRetirementDate: source.projectedRetirementDate,
        estimatedRmiAmount:
          source.estimatedRmiAmount !== null
            ? new DecimalValue(source.estimatedRmiAmount)
            : null,
        isBestFinancialOption: source.isBestFinancialOption,
        ruleDetailedExplanationText: source.ruleDetailedExplanationText,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
      return result;
    };

    createMap(
      this.mapper,
      SpecialCategoryRetirementAnalysisResultRuleItemTypeormEntity,
      GetSpecialCategoryRetirementAnalysisResultRuleItemQueryResult,
      constructUsing(convert),
    );
  }
}
