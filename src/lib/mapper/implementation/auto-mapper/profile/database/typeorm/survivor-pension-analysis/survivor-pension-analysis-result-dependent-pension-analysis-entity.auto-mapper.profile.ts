import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { SurvivorPensionAnalysisResultDependentPensionAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis-result-dependent-pension-analysis.typeorm.entity';
import { SurvivorPensionAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis-result.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { SurvivorPensionAnalysisResultId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-result/value-object/survivor-pension-analysis-result-id/survivor-pension-analysis-result-id.value-object';
import { SurvivorPensionAnalysisResultDependentPensionAnalysisEntity } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-result-dependent-pension-analysis/survivor-pension-analysis-result-dependent-pension-analysis.entity';
import { SurvivorPensionAnalysisResultDependentPensionAnalysisId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-result-dependent-pension-analysis/value-object/survivor-pension-analysis-result-dependent-pension-analysis-id/survivor-pension-analysis-result-dependent-pension-analysis-id.value-object';

@Injectable()
export class SurvivorPensionAnalysisResultDependentPensionAnalysisEntityAutoMapperProfile {
  protected readonly _type =
    SurvivorPensionAnalysisResultDependentPensionAnalysisEntityAutoMapperProfile.name;

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
      SurvivorPensionAnalysisResultDependentPensionAnalysisTypeormEntity,
      SurvivorPensionAnalysisResultDependentPensionAnalysisEntity,
      constructUsing(
        (
          source: SurvivorPensionAnalysisResultDependentPensionAnalysisTypeormEntity,
        ): SurvivorPensionAnalysisResultDependentPensionAnalysisEntity => {
          if (!source.survivorPensionAnalysisResult) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass:
                SurvivorPensionAnalysisResultDependentPensionAnalysisEntity.name,
              sourceClass:
                SurvivorPensionAnalysisResultDependentPensionAnalysisTypeormEntity.name,
            });
          }

          return new SurvivorPensionAnalysisResultDependentPensionAnalysisEntity(
            {
              id: new SurvivorPensionAnalysisResultDependentPensionAnalysisId(
                source.id,
              ),
              survivorPensionAnalysisResultId:
                new SurvivorPensionAnalysisResultId(
                  source.survivorPensionAnalysisResult.id,
                ),
              dependentName: source.dependentName,
              dependencyDegree: source.dependencyDegree,
              isDependencyVerified: source.isDependencyVerified,
              pensionStartDate: source.pensionStartDate,
              estimatedPensionDuration: source.estimatedPensionDuration,
              createdAt: source.createdAt,
              updatedAt: source.updatedAt,
              deletedAt: source.deletedAt,
            },
          );
        },
      ),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    createMap(
      this.mapper,
      SurvivorPensionAnalysisResultDependentPensionAnalysisEntity,
      SurvivorPensionAnalysisResultDependentPensionAnalysisTypeormEntity,
      constructUsing(
        (
          source: SurvivorPensionAnalysisResultDependentPensionAnalysisEntity,
        ): SurvivorPensionAnalysisResultDependentPensionAnalysisTypeormEntity =>
          SurvivorPensionAnalysisResultDependentPensionAnalysisTypeormEntity.build(
            {
              id: source.id.toString(),
              dependentName: source.dependentName,
              dependencyDegree: source.dependencyDegree,
              isDependencyVerified: source.isDependencyVerified,
              pensionStartDate: source.pensionStartDate,
              estimatedPensionDuration: source.estimatedPensionDuration,
              survivorPensionAnalysisResult:
                SurvivorPensionAnalysisResultTypeormEntity.build({
                  id: source.survivorPensionAnalysisResultId.toString(),
                } as SurvivorPensionAnalysisResultTypeormEntity),
              createdAt: source.createdAt,
              updatedAt: source.updatedAt,
              deletedAt: source.deletedAt,
            },
          ),
      ),
    );
  }
}
