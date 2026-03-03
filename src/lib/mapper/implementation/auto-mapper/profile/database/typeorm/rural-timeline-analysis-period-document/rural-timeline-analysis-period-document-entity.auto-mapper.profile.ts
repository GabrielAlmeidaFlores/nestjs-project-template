import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { RuralTimelineAnalysisPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-period-document.typeorm.entity';
import { RuralTimelineAnalysisPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-period.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { RuralTimelineAnalysisPeriodId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period/value-object/rural-timeline-analysis-period-id/rural-timeline-analysis-period-id.value-object';
import { RuralTimelineAnalysisPeriodDocumentEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-document/rural-timeline-analysis-period-document.entity';
import { RuralTimelineAnalysisPeriodDocumentId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-document/value-object/rural-timeline-analysis-period-document-id/rural-timeline-analysis-period-document-id.value-object';

@Injectable()
export class RuralTimelineAnalysisPeriodDocumentEntityAutoMapperProfile {
  protected readonly _type =
    RuralTimelineAnalysisPeriodDocumentEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convert = (
      source: RuralTimelineAnalysisPeriodDocumentTypeormEntity,
    ): RuralTimelineAnalysisPeriodDocumentEntity => {
      const ruralTimelinePeriod =
        source.ruralTimelinePeriod ??
        this.throwMissingRelationForMapping(
          RuralTimelineAnalysisPeriodDocumentEntity.name,
          RuralTimelineAnalysisPeriodDocumentTypeormEntity.name,
        );
      const ruralTimelinePeriodId = new RuralTimelineAnalysisPeriodId(
        ruralTimelinePeriod.id,
      );

      return new RuralTimelineAnalysisPeriodDocumentEntity({
        id: new RuralTimelineAnalysisPeriodDocumentId(source.id),
        documentYear: source.documentYear ?? null,
        documentHolderType: source.documentHolderType ?? null,
        selfOwned: source.selfOwned ?? null,
        probatoryPurpose: source.probatoryPurpose ?? null,
        analyzedAt: source.analyzedAt ?? null,
        document: source.document,
        type: source.type,
        ruralTimelinePeriodId,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    const mappingFunction = constructUsing(convert);

    createMap(
      this.mapper,
      RuralTimelineAnalysisPeriodDocumentTypeormEntity,
      RuralTimelineAnalysisPeriodDocumentEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convert = (
      source: RuralTimelineAnalysisPeriodDocumentEntity,
    ): RuralTimelineAnalysisPeriodDocumentTypeormEntity => {
      const ormEntity = RuralTimelineAnalysisPeriodDocumentTypeormEntity.build({
        id: source.id.toString(),
        documentYear: source.documentYear,
        documentHolderType: source.documentHolderType,
        selfOwned: source.selfOwned,
        probatoryPurpose: source.probatoryPurpose,
        analyzedAt: source.analyzedAt,
        document: source.document,
        type: source.type,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });

      ormEntity.ruralTimelinePeriod = {
        id: source.ruralTimelinePeriodId.toString(),
      } as unknown as RuralTimelineAnalysisPeriodTypeormEntity;

      return ormEntity;
    };

    const mappingFunction = constructUsing(convert);

    createMap(
      this.mapper,
      RuralTimelineAnalysisPeriodDocumentEntity,
      RuralTimelineAnalysisPeriodDocumentTypeormEntity,
      mappingFunction,
    );
  }

  private throwMissingRelationForMapping(
    destinationClass: string,
    sourceClass: string,
  ): never {
    throw new IncompleteSourceDataForMappingError({
      destinationClass,
      sourceClass,
    });
  }
}
