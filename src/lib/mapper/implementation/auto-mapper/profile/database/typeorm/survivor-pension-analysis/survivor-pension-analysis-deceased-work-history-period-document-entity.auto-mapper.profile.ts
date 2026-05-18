import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { SurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis-deceased-work-history-period-document.typeorm.entity';
import { SurvivorPensionAnalysisDeceasedWorkHistoryPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis-deceased-work-history-period.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { SurvivorPensionAnalysisDeceasedWorkHistoryPeriodId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-work-history-period/value-object/survivor-pension-analysis-deceased-work-history-period-id/survivor-pension-analysis-deceased-work-history-period-id.value-object';
import { SurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentEntity } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-work-history-period-document/survivor-pension-analysis-deceased-work-history-period-document.entity';
import { SurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-work-history-period-document/value-object/survivor-pension-analysis-deceased-work-history-period-document-id/survivor-pension-analysis-deceased-work-history-period-document-id.value-object';

@Injectable()
export class SurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentEntityAutoMapperProfile {
  protected readonly _type =
    SurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentEntityAutoMapperProfile.name;

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
      SurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentTypeormEntity,
      SurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentEntity,
      constructUsing(
        (
          source: SurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentTypeormEntity,
        ): SurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentEntity => {
          if (!source.deceasedWorkHistoryPeriod) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass:
                SurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentEntity.name,
              sourceClass:
                SurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentTypeormEntity.name,
            });
          }

          return new SurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentEntity(
            {
              id: new SurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentId(
                source.id,
              ),
              documentType: source.documentType,
              documentName: source.documentName,
              survivorPensionAnalysisDeceasedWorkHistoryPeriodId:
                new SurvivorPensionAnalysisDeceasedWorkHistoryPeriodId(
                  source.deceasedWorkHistoryPeriod.id,
                ),
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
      SurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentEntity,
      SurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentTypeormEntity,
      constructUsing(
        (
          source: SurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentEntity,
        ): SurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentTypeormEntity =>
          SurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentTypeormEntity.build(
            {
              id: source.id.toString(),
              documentType: source.documentType,
              documentName: source.documentName,
              deceasedWorkHistoryPeriod:
                SurvivorPensionAnalysisDeceasedWorkHistoryPeriodTypeormEntity.build(
                  {
                    id: source.survivorPensionAnalysisDeceasedWorkHistoryPeriodId.toString(),
                  } as SurvivorPensionAnalysisDeceasedWorkHistoryPeriodTypeormEntity,
                ),
              createdAt: source.createdAt,
              updatedAt: source.updatedAt,
              deletedAt: source.deletedAt,
            },
          ),
      ),
    );
  }
}
