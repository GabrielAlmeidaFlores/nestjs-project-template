import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { SurvivorPensionAnalysisDeceasedBenefitDependentsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis-deceased-benefit-dependents.typeorm.entity';
import { SurvivorPensionAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { SurvivorPensionAnalysisId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis/value-object/survivor-pension-analysis-id/survivor-pension-analysis-id.value-object';
import { SurvivorPensionAnalysisDeceasedBenefitDependentsEntity } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-benefit-dependents/survivor-pension-analysis-deceased-benefit-dependents.entity';
import { SurvivorPensionAnalysisDeceasedBenefitDependentsId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-benefit-dependents/value-object/survivor-pension-analysis-deceased-benefit-dependents-id/survivor-pension-analysis-deceased-benefit-dependents-id.value-object';

@Injectable()
export class SurvivorPensionAnalysisDeceasedBenefitDependentsEntityAutoMapperProfile {
  protected readonly _type =
    SurvivorPensionAnalysisDeceasedBenefitDependentsEntityAutoMapperProfile.name;

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
      SurvivorPensionAnalysisDeceasedBenefitDependentsTypeormEntity,
      SurvivorPensionAnalysisDeceasedBenefitDependentsEntity,
      constructUsing(
        (
          source: SurvivorPensionAnalysisDeceasedBenefitDependentsTypeormEntity,
        ): SurvivorPensionAnalysisDeceasedBenefitDependentsEntity => {
          if (!source.survivorPensionAnalysis) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass:
                SurvivorPensionAnalysisDeceasedBenefitDependentsEntity.name,
              sourceClass:
                SurvivorPensionAnalysisDeceasedBenefitDependentsTypeormEntity.name,
            });
          }

          return new SurvivorPensionAnalysisDeceasedBenefitDependentsEntity({
            id: new SurvivorPensionAnalysisDeceasedBenefitDependentsId(
              source.id,
            ),
            survivorPensionAnalysisId: new SurvivorPensionAnalysisId(
              source.survivorPensionAnalysis.id,
            ),
            dependentFullName: source.dependentFullName,
            dependencyClassificationLevel: source.dependencyClassificationLevel,
            type: source.type,
            gender: source.gender,
            dateOfBirth: source.dateOfBirth,
            hasDisabilityOrInvalidity: source.hasDisabilityOrInvalidity,
            unionCommencementDate: source.unionCommencementDate,
            createdAt: source.createdAt,
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
      SurvivorPensionAnalysisDeceasedBenefitDependentsEntity,
      SurvivorPensionAnalysisDeceasedBenefitDependentsTypeormEntity,
      constructUsing(
        (
          source: SurvivorPensionAnalysisDeceasedBenefitDependentsEntity,
        ): SurvivorPensionAnalysisDeceasedBenefitDependentsTypeormEntity =>
          SurvivorPensionAnalysisDeceasedBenefitDependentsTypeormEntity.build({
            id: source.id.toString(),
            dependentFullName: source.dependentFullName,
            dependencyClassificationLevel: source.dependencyClassificationLevel,
            type: source.type,
            gender: source.gender,
            dateOfBirth: source.dateOfBirth,
            hasDisabilityOrInvalidity: source.hasDisabilityOrInvalidity,
            unionCommencementDate: source.unionCommencementDate,
            survivorPensionAnalysis: SurvivorPensionAnalysisTypeormEntity.build(
              {
                id: source.survivorPensionAnalysisId.toString(),
              } as SurvivorPensionAnalysisTypeormEntity,
            ),
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          }),
      ),
    );
  }
}
