import { constructUsing, createMap, Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { RegulatoryUpdateMainChangeTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/regulatory-update-main-change.typeorm.entity';
import { RegulatoryUpdateTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/regulatory-update.typeorm.entity';
import { GetRegulatoryUpdateQueryResult } from '@module/customer/regulatory-update/domain/repository/regulatory-update/query/result/get-regulatory-update.query.result';
import { RegulatoryUpdateEntity } from '@module/customer/regulatory-update/domain/schema/entity/regulatory-update/regulatory-update.entity';
import { RegulatoryUpdateId } from '@module/customer/regulatory-update/domain/schema/entity/regulatory-update/value-object/regulatory-update-id/regulatory-update-id.value-object';

@Injectable()
export class RegulatoryUpdateEntityAutoMapperProfile {
  protected readonly _type = RegulatoryUpdateEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmToDomain();
    this.mapDomainToOrm();
    this.mapOrmToQueryResult();
  }

  private toStringArray(mainChanges: RegulatoryUpdateMainChangeTypeormEntity[]): string[] {
    if (!mainChanges || mainChanges.length === 0) return [];
    return [...mainChanges]
      .sort((a, b) => a.order - b.order)
      .map((mc) => mc.description);
  }

  private toMainChangeEntities(descriptions: string[]): RegulatoryUpdateMainChangeTypeormEntity[] {
    return descriptions.map((description, index) => {
      const entity = new RegulatoryUpdateMainChangeTypeormEntity();
      entity.description = description;
      entity.order = index;
      return entity;
    });
  }

  private mapOrmToDomain(): void {
    const convert = (
      source: RegulatoryUpdateTypeormEntity,
    ): RegulatoryUpdateEntity => {
      return new RegulatoryUpdateEntity({
        id: new RegulatoryUpdateId(source.id),
        title: source.title,
        summary: source.summary,
        mainChanges: this.toStringArray(source.mainChanges),
        implementationStatus: source.implementationStatus,
        beneficiaryImpact: source.beneficiaryImpact,
        fullText: source.fullText,
        sourceUrl: source.sourceUrl,
        publishedAt: source.publishedAt,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      RegulatoryUpdateTypeormEntity,
      RegulatoryUpdateEntity,
      constructUsing(convert),
    );
  }

  private mapDomainToOrm(): void {
    const convert = (
      source: RegulatoryUpdateEntity,
    ): RegulatoryUpdateTypeormEntity => {
      return RegulatoryUpdateTypeormEntity.build({
        id: source.id.toString(),
        title: source.title,
        summary: source.summary,
        mainChanges: this.toMainChangeEntities(source.mainChanges),
        implementationStatus: source.implementationStatus,
        beneficiaryImpact: source.beneficiaryImpact,
        fullText: source.fullText,
        sourceUrl: source.sourceUrl,
        publishedAt: source.publishedAt,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      RegulatoryUpdateEntity,
      RegulatoryUpdateTypeormEntity,
      constructUsing(convert),
    );
  }

  private mapOrmToQueryResult(): void {
    const convert = (
      source: RegulatoryUpdateTypeormEntity,
    ): GetRegulatoryUpdateQueryResult => {
      return GetRegulatoryUpdateQueryResult.build({
        id: new RegulatoryUpdateId(source.id),
        title: source.title,
        summary: source.summary,
        mainChanges: this.toStringArray(source.mainChanges),
        implementationStatus: source.implementationStatus,
        beneficiaryImpact: source.beneficiaryImpact,
        fullText: source.fullText,
        sourceUrl: source.sourceUrl,
        publishedAt: source.publishedAt,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
      });
    };

    createMap(
      this.mapper,
      RegulatoryUpdateTypeormEntity,
      GetRegulatoryUpdateQueryResult,
      constructUsing(convert),
    );
  }
}
