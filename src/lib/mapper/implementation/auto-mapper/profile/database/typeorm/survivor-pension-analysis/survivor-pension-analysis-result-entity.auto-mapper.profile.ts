import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { SurvivorPensionAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis-result.typeorm.entity';
import { SurvivorPensionAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { SurvivorPensionAnalysisId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis/value-object/survivor-pension-analysis-id/survivor-pension-analysis-id.value-object';
import { SurvivorPensionAnalysisResultEntity } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-result/survivor-pension-analysis-result.entity';
import { SurvivorPensionAnalysisResultId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-result/value-object/survivor-pension-analysis-result-id/survivor-pension-analysis-result-id.value-object';

@Injectable()
export class SurvivorPensionAnalysisResultEntityAutoMapperProfile {
  protected readonly _type =
    SurvivorPensionAnalysisResultEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: SurvivorPensionAnalysisResultTypeormEntity,
    ): SurvivorPensionAnalysisResultEntity => {
      if (!source.survivorPensionAnalysis) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass: SurvivorPensionAnalysisResultEntity.name,
          sourceClass: SurvivorPensionAnalysisResultTypeormEntity.name,
        });
      }

      return new SurvivorPensionAnalysisResultEntity({
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
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      SurvivorPensionAnalysisResultTypeormEntity,
      SurvivorPensionAnalysisResultEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: SurvivorPensionAnalysisResultEntity,
    ): SurvivorPensionAnalysisResultTypeormEntity => {
      return SurvivorPensionAnalysisResultTypeormEntity.build({
        id: source.id.toString(),
        isInsuredStatusConfirmed: source.isInsuredStatusConfirmed,
        insuredStatusSummary: source.insuredStatusSummary,
        isRetirementRightConfirmed: source.isRetirementRightConfirmed,
        retirementRightSummary: source.retirementRightSummary,
        completeAnalysis: source.completeAnalysis,
        simplifiedAnalysis: source.simplifiedAnalysis,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
        survivorPensionAnalysis: SurvivorPensionAnalysisTypeormEntity.build({
          id: source.survivorPensionAnalysisId.toString(),
        } as SurvivorPensionAnalysisTypeormEntity),
        retirementRules: undefined,
        dependentPensionAnalyses: undefined,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      SurvivorPensionAnalysisResultEntity,
      SurvivorPensionAnalysisResultTypeormEntity,
      mappingFunction,
    );
  }
}
