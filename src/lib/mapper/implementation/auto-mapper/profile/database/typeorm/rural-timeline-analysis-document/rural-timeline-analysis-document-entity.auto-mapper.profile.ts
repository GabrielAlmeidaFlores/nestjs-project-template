import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { RuralTimelineAnalysisDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-document.typeorm.entity';
import { RuralTimelineAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis.typeorm.entity';
import { RuralTimelineAnalysisEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/rural-timeline-analysis.entity';
import { RuralTimelineAnalysisDocumentEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-document/rural-timeline-analysis-document.entity';
import { RuralTimelineAnalysisDocumentId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-document/value-object/rural-timeline-analysis-document-id/rural-timeline-analysis-document-id.value-object';

@Injectable()
export class RuralTimelineAnalysisDocumentEntityAutoMapperProfile {
  protected readonly _type =
    RuralTimelineAnalysisDocumentEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: RuralTimelineAnalysisDocumentTypeormEntity,
    ): RuralTimelineAnalysisDocumentEntity => {
      const ruralTimeline = this.mapper.map(
        source.ruralTimeline,
        RuralTimelineAnalysisTypeormEntity,
        RuralTimelineAnalysisEntity,
      );

      return new RuralTimelineAnalysisDocumentEntity({
        id: new RuralTimelineAnalysisDocumentId(source.id),
        type: source.type,
        document: source.document,
        ruralTimelineId: ruralTimeline.id,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      RuralTimelineAnalysisDocumentTypeormEntity,
      RuralTimelineAnalysisDocumentEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: RuralTimelineAnalysisDocumentEntity,
    ): RuralTimelineAnalysisDocumentTypeormEntity => {
      const ormEntity = RuralTimelineAnalysisDocumentTypeormEntity.build({
        id: source.id.toString(),
        type: source.type,
        document: source.document,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });

      ormEntity.ruralTimeline = {
        id: source.ruralTimelineId.toString(),
      } as unknown as RuralTimelineAnalysisTypeormEntity;

      return ormEntity;
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      RuralTimelineAnalysisDocumentEntity,
      RuralTimelineAnalysisDocumentTypeormEntity,
      mappingFunction,
    );
  }
}
