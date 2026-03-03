import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { RuralTimelineAnalysisLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-legal-proceeding.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { RuralTimelineAnalysisId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/value-object/rural-timeline-analysis-id/rural-timeline-analysis-id.value-object';
import { RuralTimelineAnalysisLegalProceedingEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-legal-proceeding/rural-timeline-analysis-legal-proceeding.entity';
import { RuralTimelineAnalysisLegalProceedingId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-legal-proceeding/value-object/rural-timeline-analysis-legal-proceeding-id/rural-timeline-analysis-legal-proceeding-id.value-object';

@Injectable()
export class RuralTimelineAnalysisLegalProceedingEntityAutoMapperProfile {
  protected readonly _type =
    RuralTimelineAnalysisLegalProceedingEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: RuralTimelineAnalysisLegalProceedingTypeormEntity,
    ): RuralTimelineAnalysisLegalProceedingEntity => {
      if (!source.ruralTimelineAnalysis) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass: RuralTimelineAnalysisLegalProceedingEntity.name,
          sourceClass: RuralTimelineAnalysisLegalProceedingTypeormEntity.name,
        });
      }

      return new RuralTimelineAnalysisLegalProceedingEntity({
        id: new RuralTimelineAnalysisLegalProceedingId(source.id),
        legalProceedingNumber: source.legalProceedingNumber,
        ruralTimelineAnalysisId: new RuralTimelineAnalysisId(
          source.ruralTimelineAnalysis.id,
        ),
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      RuralTimelineAnalysisLegalProceedingTypeormEntity,
      RuralTimelineAnalysisLegalProceedingEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: RuralTimelineAnalysisLegalProceedingEntity,
    ): RuralTimelineAnalysisLegalProceedingTypeormEntity => {
      return RuralTimelineAnalysisLegalProceedingTypeormEntity.build({
        id: source.id.toString(),
        legalProceedingNumber: source.legalProceedingNumber,
        ruralTimelineAnalysis: undefined,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      RuralTimelineAnalysisLegalProceedingEntity,
      RuralTimelineAnalysisLegalProceedingTypeormEntity,
      mappingFunction,
    );
  }
}
