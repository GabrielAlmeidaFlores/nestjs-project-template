import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { RuralTimelineAnalysisLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-legal-proceeding.typeorm.entity';
import { RuralTimelineAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis.typeorm.entity';
import { RuralTimelineAnalysisEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/rural-timeline-analysis.entity';
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
      const ruralTimelineAnalysis = this.mapper.map(
        source.ruralTimelineAnalysis,
        RuralTimelineAnalysisTypeormEntity,
        RuralTimelineAnalysisEntity,
      );

      return new RuralTimelineAnalysisLegalProceedingEntity({
        id: new RuralTimelineAnalysisLegalProceedingId(source.id),
        legalProceedingNumber: source.legalProceedingNumber,
        ruralTimelineAnalysis,
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
      const ruralTimelineAnalysis = this.mapper.map(
        source.ruralTimelineAnalysis,
        RuralTimelineAnalysisEntity,
        RuralTimelineAnalysisTypeormEntity,
      );

      return RuralTimelineAnalysisLegalProceedingTypeormEntity.build({
        id: source.id.toString(),
        legalProceedingNumber: source.legalProceedingNumber,
        ruralTimelineAnalysis,
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
