import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { SurvivorPensionAnalysisDeceasedWorkHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis-deceased-work-history.typeorm.entity';
import { SurvivorPensionAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { SurvivorPensionAnalysisId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis/value-object/survivor-pension-analysis-id/survivor-pension-analysis-id.value-object';
import { SurvivorPensionAnalysisDeceasedWorkHistoryEntity } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-work-history/survivor-pension-analysis-deceased-work-history.entity';
import { SurvivorPensionAnalysisDeceasedWorkHistoryId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-work-history/value-object/survivor-pension-analysis-deceased-work-history-id/survivor-pension-analysis-deceased-work-history-id.value-object';

@Injectable()
export class SurvivorPensionAnalysisDeceasedWorkHistoryEntityAutoMapperProfile {
  protected readonly _type =
    SurvivorPensionAnalysisDeceasedWorkHistoryEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: SurvivorPensionAnalysisDeceasedWorkHistoryTypeormEntity,
    ): SurvivorPensionAnalysisDeceasedWorkHistoryEntity => {
      if (!source.survivorPensionAnalysis) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass:
            SurvivorPensionAnalysisDeceasedWorkHistoryEntity.name,
          sourceClass:
            SurvivorPensionAnalysisDeceasedWorkHistoryTypeormEntity.name,
        });
      }

      return new SurvivorPensionAnalysisDeceasedWorkHistoryEntity({
        id: new SurvivorPensionAnalysisDeceasedWorkHistoryId(source.id),
        survivorPensionAnalysisId: new SurvivorPensionAnalysisId(
          source.survivorPensionAnalysis.id,
        ),
        startDate: source.startDate,
        endDate: source.endDate,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      SurvivorPensionAnalysisDeceasedWorkHistoryTypeormEntity,
      SurvivorPensionAnalysisDeceasedWorkHistoryEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: SurvivorPensionAnalysisDeceasedWorkHistoryEntity,
    ): SurvivorPensionAnalysisDeceasedWorkHistoryTypeormEntity => {
      return SurvivorPensionAnalysisDeceasedWorkHistoryTypeormEntity.build({
        id: source.id.toString(),
        startDate: source.startDate,
        endDate: source.endDate,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
        survivorPensionAnalysis: SurvivorPensionAnalysisTypeormEntity.build({
          id: source.survivorPensionAnalysisId.toString(),
        } as SurvivorPensionAnalysisTypeormEntity),
        periods: undefined,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      SurvivorPensionAnalysisDeceasedWorkHistoryEntity,
      SurvivorPensionAnalysisDeceasedWorkHistoryTypeormEntity,
      mappingFunction,
    );
  }
}
