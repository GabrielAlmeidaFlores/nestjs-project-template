import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { RuralTimelineDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-document.typeorm.entity';
import { RuralTimelineTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline.typeorm.entity';
import { RuralTimelineEntity } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline/rural-timeline.entity';
import { RuralTimelineDocumentEntity } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-document/rural-timeline-document.entity';
import { RuralTimelineDocumentId } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-document/value-object/rural-timeline-document-id/rural-timeline-document-id.value-object';

@Injectable()
export class RuralTimelineDocumentEntityAutoMapperProfile {
  protected readonly _type = RuralTimelineDocumentEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: RuralTimelineDocumentTypeormEntity,
    ): RuralTimelineDocumentEntity => {
      const ruralTimeline = this.mapper.map(
        source.ruralTimeline,
        RuralTimelineTypeormEntity,
        RuralTimelineEntity,
      );

      return new RuralTimelineDocumentEntity({
        ...source,
        id: new RuralTimelineDocumentId(source.id),
        ruralTimelineId: ruralTimeline.id,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      RuralTimelineDocumentTypeormEntity,
      RuralTimelineDocumentEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: RuralTimelineDocumentEntity,
    ): RuralTimelineDocumentTypeormEntity => {
      return RuralTimelineDocumentTypeormEntity.build({
        ...source,
        id: source.id.toString(),
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      RuralTimelineDocumentEntity,
      RuralTimelineDocumentTypeormEntity,
      mappingFunction,
    );
  }
}
