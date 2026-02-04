import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { SpecialActivityDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-activity-documents.typeorm.entity';
import { SpecialActivityTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-activity.typeorm.entity';
import { SpecialActivityEntity } from '@module/customer/analysis-tool/domain/schema/entity/special-activity/special-activity-entity';
import { SpecialActivityDocumentEntity } from '@module/customer/analysis-tool/domain/schema/entity/special-activity-document/special-activity-document.entity';
import { SpecialActivityDocumentId } from '@module/customer/analysis-tool/domain/schema/entity/special-activity-document/value-object/special-activity-document-id.value-object';
import { GetSpecialActivityAnalysisDocumentQueryResult } from '@module/customer/analysis-tool/module/special-activity-analysis/domain/repository/special-activity-analysis-document/query/result/get-special-activity-analysis-document.query.result';

@Injectable()
export class SpecialActivityDocumentEntityAutoMapperProfile {
  protected readonly _type =
    SpecialActivityDocumentEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: SpecialActivityDocumentTypeormEntity,
    ): SpecialActivityDocumentEntity => {
      const specialActivity = this.mapper.map(
        source.specialActivity,
        SpecialActivityTypeormEntity,
        SpecialActivityEntity,
      );

      return new SpecialActivityDocumentEntity({
        ...source,
        id: new SpecialActivityDocumentId(source.id),
        specialActivity,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      SpecialActivityDocumentTypeormEntity,
      SpecialActivityDocumentEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: SpecialActivityDocumentEntity,
    ): SpecialActivityDocumentTypeormEntity => {
      const specialActivity = this.mapper.map(
        source.specialActivity,
        SpecialActivityEntity,
        SpecialActivityTypeormEntity,
      );

      return SpecialActivityDocumentTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        specialActivity,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      SpecialActivityDocumentEntity,
      SpecialActivityDocumentTypeormEntity,
      mappingFunction,
    );
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: SpecialActivityDocumentTypeormEntity,
    ): GetSpecialActivityAnalysisDocumentQueryResult => {
      return GetSpecialActivityAnalysisDocumentQueryResult.build({
        id: new SpecialActivityDocumentId(source.id),
        document: source.document,
        type: source.type,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToQueryResult);

    createMap(
      this.mapper,
      SpecialActivityDocumentTypeormEntity,
      GetSpecialActivityAnalysisDocumentQueryResult,
      mappingFunction,
    );
  }
}
