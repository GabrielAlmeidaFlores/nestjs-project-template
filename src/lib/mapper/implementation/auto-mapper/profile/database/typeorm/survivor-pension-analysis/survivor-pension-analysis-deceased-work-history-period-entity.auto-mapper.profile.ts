import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { SurvivorPensionAnalysisDeceasedWorkHistoryPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis-deceased-work-history-period.typeorm.entity';
import { SurvivorPensionAnalysisDeceasedWorkHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis-deceased-work-history.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { SurvivorPensionAnalysisDeceasedWorkHistoryId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-work-history/value-object/survivor-pension-analysis-deceased-work-history-id/survivor-pension-analysis-deceased-work-history-id.value-object';
import { SurvivorPensionAnalysisDeceasedWorkHistoryPeriodEntity } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-work-history-period/survivor-pension-analysis-deceased-work-history-period.entity';
import { SurvivorPensionAnalysisDeceasedWorkHistoryPeriodId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-work-history-period/value-object/survivor-pension-analysis-deceased-work-history-period-id/survivor-pension-analysis-deceased-work-history-period-id.value-object';

@Injectable()
export class SurvivorPensionAnalysisDeceasedWorkHistoryPeriodEntityAutoMapperProfile {
  protected readonly _type =
    SurvivorPensionAnalysisDeceasedWorkHistoryPeriodEntityAutoMapperProfile.name;

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
      SurvivorPensionAnalysisDeceasedWorkHistoryPeriodTypeormEntity,
      SurvivorPensionAnalysisDeceasedWorkHistoryPeriodEntity,
      constructUsing(
        (
          source: SurvivorPensionAnalysisDeceasedWorkHistoryPeriodTypeormEntity,
        ): SurvivorPensionAnalysisDeceasedWorkHistoryPeriodEntity => {
          if (!source.deceasedWorkHistory) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass:
                SurvivorPensionAnalysisDeceasedWorkHistoryPeriodEntity.name,
              sourceClass:
                SurvivorPensionAnalysisDeceasedWorkHistoryPeriodTypeormEntity.name,
            });
          }

          return new SurvivorPensionAnalysisDeceasedWorkHistoryPeriodEntity({
            id: new SurvivorPensionAnalysisDeceasedWorkHistoryPeriodId(
              source.id,
            ),
            survivorPensionAnalysisDeceasedWorkHistoryId:
              new SurvivorPensionAnalysisDeceasedWorkHistoryId(
                source.deceasedWorkHistory.id,
              ),
            startDate: source.startDate,
            endDate: source.endDate,
            specialPeriodStartDate: source.specialPeriodStartDate,
            specialPeriodEndDate: source.specialPeriodEndDate,
            specialTimeType: source.specialTimeType,
            jobTitle: source.jobTitle,
            careerName: source.careerName,
            serviceType: source.serviceType,
            department: source.department,
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
      SurvivorPensionAnalysisDeceasedWorkHistoryPeriodEntity,
      SurvivorPensionAnalysisDeceasedWorkHistoryPeriodTypeormEntity,
      constructUsing(
        (
          source: SurvivorPensionAnalysisDeceasedWorkHistoryPeriodEntity,
        ): SurvivorPensionAnalysisDeceasedWorkHistoryPeriodTypeormEntity =>
          SurvivorPensionAnalysisDeceasedWorkHistoryPeriodTypeormEntity.build({
            id: source.id.toString(),
            startDate: source.startDate,
            endDate: source.endDate,
            specialPeriodStartDate: source.specialPeriodStartDate,
            specialPeriodEndDate: source.specialPeriodEndDate,
            specialTimeType: source.specialTimeType,
            jobTitle: source.jobTitle,
            careerName: source.careerName,
            serviceType: source.serviceType,
            department: source.department,
            deceasedWorkHistory:
              SurvivorPensionAnalysisDeceasedWorkHistoryTypeormEntity.build({
                id: source.survivorPensionAnalysisDeceasedWorkHistoryId.toString(),
              } as SurvivorPensionAnalysisDeceasedWorkHistoryTypeormEntity),
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          }),
      ),
    );
  }
}
