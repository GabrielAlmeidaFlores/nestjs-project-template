import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { BpcDisabilityGrantDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-grant-document.typeorm.entity';
import { GetBpcDisabilityGrantDocumentQueryResult } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/repository/bpc-disability-grant/query/result/get-bpc-disability-grant-document.query.result';
import { BpcDisabilityGrantDocumentId } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-document/value-object/bpc-disability-grant-document-id/bpc-disability-grant-document-id.value-object';

@Injectable()
export class GetBpcDisabilityGrantDocumentQueryResultAutoMapperProfile {
  protected readonly _type =
    GetBpcDisabilityGrantDocumentQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: BpcDisabilityGrantDocumentTypeormEntity,
    ): GetBpcDisabilityGrantDocumentQueryResult => {
      return GetBpcDisabilityGrantDocumentQueryResult.build({
        id: new BpcDisabilityGrantDocumentId(source.id),
        document: source.document,
        type: source.type,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt ?? null,
      });
    };

    createMap(
      this.mapper,
      BpcDisabilityGrantDocumentTypeormEntity,
      GetBpcDisabilityGrantDocumentQueryResult,
      constructUsing(convertOrmEntityToQueryResult),
    );
  }
}
