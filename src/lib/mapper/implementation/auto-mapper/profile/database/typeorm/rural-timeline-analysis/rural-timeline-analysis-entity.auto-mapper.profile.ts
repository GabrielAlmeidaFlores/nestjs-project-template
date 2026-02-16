import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { RuralTimelineAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { RuralTimelineAnalysisEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/rural-timeline-analysis.entity';
import { RuralTimelineAnalysisId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/value-object/rural-timeline-analysis-id/rural-timeline-analysis-id.value-object';

@Injectable()
export class RuralTimelineAnalysisEntityAutoMapperProfile {
  protected readonly _type = RuralTimelineAnalysisEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: RuralTimelineAnalysisTypeormEntity,
    ): RuralTimelineAnalysisEntity => {
      if (!source.analysisToolRecord?.analysisToolClient) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass: RuralTimelineAnalysisEntity.name,
          sourceClass: RuralTimelineAnalysisTypeormEntity.name,
        });
      }

      return new RuralTimelineAnalysisEntity({
        ...source,
        id: new RuralTimelineAnalysisId(source.id),
        analysisToolClientId: new AnalysisToolClientId(
          source.analysisToolRecord.analysisToolClient.id,
        ),
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      RuralTimelineAnalysisTypeormEntity,
      RuralTimelineAnalysisEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: RuralTimelineAnalysisEntity,
    ): RuralTimelineAnalysisTypeormEntity => {
      return RuralTimelineAnalysisTypeormEntity.build({
        ...source,
        id: source.id.toString(),
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      RuralTimelineAnalysisEntity,
      RuralTimelineAnalysisTypeormEntity,
      mappingFunction,
    );
  }
}
