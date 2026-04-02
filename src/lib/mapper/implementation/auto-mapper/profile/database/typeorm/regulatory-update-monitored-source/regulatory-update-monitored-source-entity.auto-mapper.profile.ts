import { constructUsing, createMap, Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { RegulatoryUpdateMonitoredSourceTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/regulatory-update-monitored-source.typeorm.entity';
import { GetRegulatoryUpdateMonitoredSourceQueryResult } from '@module/customer/regulatory-update/domain/repository/regulatory-update-monitored-source/query/result/get-regulatory-update-monitored-source.query.result';
import { RegulatoryUpdateMonitoredSourceEntity } from '@module/customer/regulatory-update/domain/schema/entity/regulatory-update-monitored-source/regulatory-update-monitored-source.entity';
import { RegulatoryUpdateMonitoredSourceId } from '@module/customer/regulatory-update/domain/schema/entity/regulatory-update-monitored-source/value-object/regulatory-update-monitored-source-id/regulatory-update-monitored-source-id.value-object';

@Injectable()
export class RegulatoryUpdateMonitoredSourceEntityAutoMapperProfile {
  protected readonly _type =
    RegulatoryUpdateMonitoredSourceEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmToDomain();
    this.mapDomainToOrm();
    this.mapOrmToQueryResult();
  }

  private mapOrmToDomain(): void {
    const convert = (
      source: RegulatoryUpdateMonitoredSourceTypeormEntity,
    ): RegulatoryUpdateMonitoredSourceEntity => {
      return new RegulatoryUpdateMonitoredSourceEntity({
        id: new RegulatoryUpdateMonitoredSourceId(source.id),
        name: source.name,
        url: source.url,
        active: source.active,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      RegulatoryUpdateMonitoredSourceTypeormEntity,
      RegulatoryUpdateMonitoredSourceEntity,
      constructUsing(convert),
    );
  }

  private mapDomainToOrm(): void {
    const convert = (
      source: RegulatoryUpdateMonitoredSourceEntity,
    ): RegulatoryUpdateMonitoredSourceTypeormEntity => {
      return RegulatoryUpdateMonitoredSourceTypeormEntity.build({
        id: source.id.toString(),
        name: source.name,
        url: source.url,
        active: source.active,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      RegulatoryUpdateMonitoredSourceEntity,
      RegulatoryUpdateMonitoredSourceTypeormEntity,
      constructUsing(convert),
    );
  }

  private mapOrmToQueryResult(): void {
    const convert = (
      source: RegulatoryUpdateMonitoredSourceTypeormEntity,
    ): GetRegulatoryUpdateMonitoredSourceQueryResult => {
      return GetRegulatoryUpdateMonitoredSourceQueryResult.build({
        id: new RegulatoryUpdateMonitoredSourceId(source.id),
        name: source.name,
        url: source.url,
        active: source.active,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
      });
    };

    createMap(
      this.mapper,
      RegulatoryUpdateMonitoredSourceTypeormEntity,
      GetRegulatoryUpdateMonitoredSourceQueryResult,
      constructUsing(convert),
    );
  }
}
