import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { RuralTimelinePeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-period-document.typeorm.entity';
import { RuralTimelinePeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-period.typeorm.entity';
import { RuralTimelinePeriodEntity } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-period/rural-timeline-period.entity';
import { RuralTimelinePeriodDocumentEntity } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-period-document/rural-timeline-period-document.entity';
import { RuralTimelinePeriodDocumentId } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-period-document/value-object/rural-timeline-period-document-id/rural-timeline-period-document-id.value-object';

@Injectable()
export class RuralTimelinePeriodDocumentEntityAutoMapperProfile {
  protected readonly _type =
    RuralTimelinePeriodDocumentEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: RuralTimelinePeriodDocumentTypeormEntity,
    ): RuralTimelinePeriodDocumentEntity => {
      const ruralTimelinePeriod = this.mapper.map(
        source.ruralTimelinePeriod,
        RuralTimelinePeriodTypeormEntity,
        RuralTimelinePeriodEntity,
      );

      return new RuralTimelinePeriodDocumentEntity({
        ...source,
        id: new RuralTimelinePeriodDocumentId(source.id),
        ruralTimelinePeriodId: ruralTimelinePeriod.id,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      RuralTimelinePeriodDocumentTypeormEntity,
      RuralTimelinePeriodDocumentEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: RuralTimelinePeriodDocumentEntity,
    ): RuralTimelinePeriodDocumentTypeormEntity => {
      return RuralTimelinePeriodDocumentTypeormEntity.build({
        ...source,
        id: source.id.toString(),
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      RuralTimelinePeriodDocumentEntity,
      RuralTimelinePeriodDocumentTypeormEntity,
      mappingFunction,
    );
  }
}
