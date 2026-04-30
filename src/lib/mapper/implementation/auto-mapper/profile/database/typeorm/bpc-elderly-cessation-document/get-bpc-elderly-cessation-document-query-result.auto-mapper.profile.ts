import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { BpcElderlyCessationDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-cessation-document.typeorm.entity';
import { GetBpcElderlyCessationDocumentQueryResult } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/repository/bpc-elderly-cessation/query/result/get-bpc-elderly-cessation-document.query.result';
import { BpcElderlyCessationDocumentId } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-document/value-object/bpc-elderly-cessation-document-id/bpc-elderly-cessation-document-id.value-object';

@Injectable()
export class GetBpcElderlyCessationDocumentQueryResultAutoMapperProfile {
  protected readonly _type =
    GetBpcElderlyCessationDocumentQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: BpcElderlyCessationDocumentTypeormEntity,
    ): GetBpcElderlyCessationDocumentQueryResult => {
      return GetBpcElderlyCessationDocumentQueryResult.build({
        id: new BpcElderlyCessationDocumentId(source.id),
        document: source.document,
        type: source.type,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt ?? null,
      });
    };

    createMap(
      this.mapper,
      BpcElderlyCessationDocumentTypeormEntity,
      GetBpcElderlyCessationDocumentQueryResult,
      constructUsing(convertOrmEntityToQueryResult),
    );
  }
}
