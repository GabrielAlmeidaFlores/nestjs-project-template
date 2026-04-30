import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { RuralOrHybridRetirementAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-analysis-result.typeorm.entity';
import { RuralOrHybridRetirementAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-analysis.typeorm.entity';
import { RuralOrHybridRetirementAnalysisEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis/rural-or-hybrid-retirement-analysis.entity';
import { RuralOrHybridRetirementAnalysisId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis/value-object/rural-or-hybrid-retirement-analysis-id.value-object';
import { RuralOrHybridRetirementAnalysisResultId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-result/value-object/rural-or-hybrid-retirement-analysis-result-id.value-object';

@Injectable()
export class RuralOrHybridRetirementAnalysisEntityAutoMapperProfile {
  protected readonly _type =
    RuralOrHybridRetirementAnalysisEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: RuralOrHybridRetirementAnalysisTypeormEntity,
    ): RuralOrHybridRetirementAnalysisEntity => {
      const ruralOrHybridRetirementAnalysisResultId =
        source.ruralOrHybridRetirementAnalysisResult !== undefined &&
        source.ruralOrHybridRetirementAnalysisResult !== null
          ? new RuralOrHybridRetirementAnalysisResultId(
              source.ruralOrHybridRetirementAnalysisResult.id,
            )
          : null;

      return new RuralOrHybridRetirementAnalysisEntity({
        id: new RuralOrHybridRetirementAnalysisId(source.id),
        analysisName: source.analysisName,
        activityType: source.activityType,
        requestedBenefit: source.requestedBenefit,
        ruralOrHybridRetirementAnalysisResultId,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      RuralOrHybridRetirementAnalysisTypeormEntity,
      RuralOrHybridRetirementAnalysisEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: RuralOrHybridRetirementAnalysisEntity,
    ): RuralOrHybridRetirementAnalysisTypeormEntity => {
      const ruralOrHybridRetirementAnalysisResult =
        source.ruralOrHybridRetirementAnalysisResultId !== null
          ? ({
              id: source.ruralOrHybridRetirementAnalysisResultId.toString(),
            } as RuralOrHybridRetirementAnalysisResultTypeormEntity)
          : null;

      return RuralOrHybridRetirementAnalysisTypeormEntity.build({
        id: source.id.toString(),
        analysisName: source.analysisName,
        activityType: source.activityType,
        requestedBenefit: source.requestedBenefit,
        ruralOrHybridRetirementAnalysisResult,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      RuralOrHybridRetirementAnalysisEntity,
      RuralOrHybridRetirementAnalysisTypeormEntity,
      mappingFunction,
    );
  }
}
