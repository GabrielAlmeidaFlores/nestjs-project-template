import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { RuralTimelineAnalysisPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-period-document.typeorm.entity';
import { RuralTimelineAnalysisPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-period.typeorm.entity';
import { RuralTimelineAnalysisPeriodEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period/rural-timeline-analysis-period.entity';
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
    const convertOrmEntityToDomainEntity = (
      source: RuralTimelineAnalysisPeriodDocumentTypeormEntity,
    ): RuralTimelineAnalysisPeriodDocumentEntity => {
      const ruralTimelinePeriod = this.mapper.map(
        source.ruralTimelinePeriod,
        RuralTimelineAnalysisPeriodTypeormEntity,
        RuralTimelineAnalysisPeriodEntity,
      );

      return new RuralTimelineAnalysisPeriodDocumentEntity({
        id: new RuralTimelineAnalysisPeriodDocumentId(source.id),
        documentYear: source.documentYear ?? null,
        documentHolderType: source.documentHolderType ?? null,
        selfOwned: source.selfOwned ?? null,
        probatoryPurpose: source.probatoryPurpose ?? null,
        document: source.document,
        type: source.type,
        ruralTimelinePeriodId: ruralTimelinePeriod.id,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      RuralTimelineAnalysisPeriodDocumentTypeormEntity,
      RuralTimelineAnalysisPeriodDocumentEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: RuralTimelineAnalysisPeriodDocumentEntity,
    ): RuralTimelineAnalysisPeriodDocumentTypeormEntity => {
      const ormEntity = RuralTimelineAnalysisPeriodDocumentTypeormEntity.build({
        id: source.id.toString(),
        documentYear: source.documentYear,
        documentHolderType: source.documentHolderType,
        selfOwned: source.selfOwned,
        probatoryPurpose: source.probatoryPurpose,
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

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      RuralTimelineAnalysisPeriodDocumentEntity,
      RuralTimelineAnalysisPeriodDocumentTypeormEntity,
      mappingFunction,
    );
  }
}
