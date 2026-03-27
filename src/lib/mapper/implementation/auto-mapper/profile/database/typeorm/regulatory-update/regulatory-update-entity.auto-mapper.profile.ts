import { constructUsing, createMap, Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { RegulatoryUpdateTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/regulatory-update.typeorm.entity';
import { GetRegulatoryUpdateQueryResult } from '@module/customer/regulatory-update/domain/repository/regulatory-update/query/result/get-regulatory-update.query.result';
import { RegulatoryUpdateEntity } from '@module/customer/regulatory-update/domain/schema/entity/regulatory-update/regulatory-update.entity';
import { RegulatoryUpdateId } from '@module/customer/regulatory-update/domain/schema/entity/regulatory-update/value-object/regulatory-update-id/regulatory-update-id.value-object';

@Injectable()
export class RegulatoryUpdateEntityAutoMapperProfile {
  protected readonly _type = RegulatoryUpdateEntityAutoMapperProfile.name;
  private readonly mainChangesSeparator: string;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.mainChangesSeparator = '\n';
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmToDomain();
    this.mapDomainToOrm();
    this.mapOrmToQueryResult();
  }

  private parseMainChanges(raw: string): string[] {
    if (raw === '') {
      return [];
    }
    return raw
      .split(this.mainChangesSeparator)
      .filter((item) => item.trim() !== '');
  }

  private serializeMainChanges(items: string[]): string {
    return items.join(this.mainChangesSeparator);
  }

  private mapOrmToDomain(): void {
    const convert = (
      source: RegulatoryUpdateTypeormEntity,
    ): RegulatoryUpdateEntity => {
      return new RegulatoryUpdateEntity({
        id: new RegulatoryUpdateId(source.id),
        title: source.title,
        summary: source.summary,
        mainChanges: this.parseMainChanges(source.mainChanges),
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
        mainChanges: this.serializeMainChanges(source.mainChanges),
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
        mainChanges: this.parseMainChanges(source.mainChanges),
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
