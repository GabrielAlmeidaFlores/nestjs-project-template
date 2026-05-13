import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { RetirementPermanentDisabilityRevisionDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-revision-document.typeorm.entity';
import { GetRetirementPermanentDisabilityRevisionDocumentQueryResult } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/repository/retirement-permanent-disability-revision-document/query/result/get-retirement-permanent-disability-revision-document.query.result';
import { RetirementPermanentDisabilityRevisionDocumentId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-document/value-object/retirement-permanent-disability-revision-document-id.value-object';

@Injectable()
export class GetRetirementPermanentDisabilityRevisionDocumentQueryResultAutoMapperProfile {
  protected readonly _type =
    GetRetirementPermanentDisabilityRevisionDocumentQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: RetirementPermanentDisabilityRevisionDocumentTypeormEntity,
    ): GetRetirementPermanentDisabilityRevisionDocumentQueryResult => {
      return GetRetirementPermanentDisabilityRevisionDocumentQueryResult.build({
        id: new RetirementPermanentDisabilityRevisionDocumentId(source.id),
        document: source.document,
        type: source.type,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      RetirementPermanentDisabilityRevisionDocumentTypeormEntity,
      GetRetirementPermanentDisabilityRevisionDocumentQueryResult,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetRetirementPermanentDisabilityRevisionDocumentQueryResult,
    ): RetirementPermanentDisabilityRevisionDocumentTypeormEntity => {
      return RetirementPermanentDisabilityRevisionDocumentTypeormEntity.build({
        id: source.id.toString(),
        document: source.document,
        type: source.type,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt ?? null,
        retirementPermanentDisabilityRevision: undefined,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetRetirementPermanentDisabilityRevisionDocumentQueryResult,
      RetirementPermanentDisabilityRevisionDocumentTypeormEntity,
      mappingFunction,
    );
  }
}
