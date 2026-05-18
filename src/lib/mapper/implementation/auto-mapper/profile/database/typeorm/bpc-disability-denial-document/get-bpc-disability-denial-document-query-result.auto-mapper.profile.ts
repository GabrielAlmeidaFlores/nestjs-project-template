import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { BpcDisabilityDenialDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-denial-document.typeorm.entity';
import { GetBpcDisabilityDenialDocumentQueryResult } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/repository/bpc-disability-denial/query/result/get-bpc-disability-denial-document.query.result';
import { BpcDisabilityDenialDocumentId } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-document/value-object/bpc-disability-denial-document-id/bpc-disability-denial-document-id.value-object';

@Injectable()
export class GetBpcDisabilityDenialDocumentQueryResultAutoMapperProfile {
  protected readonly _type =
    GetBpcDisabilityDenialDocumentQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: BpcDisabilityDenialDocumentTypeormEntity,
    ): GetBpcDisabilityDenialDocumentQueryResult => {
      return GetBpcDisabilityDenialDocumentQueryResult.build({
        id: new BpcDisabilityDenialDocumentId(source.id),
        document: source.document,
        type: source.type,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt ?? null,
      });
    };

    createMap(
      this.mapper,
      BpcDisabilityDenialDocumentTypeormEntity,
      GetBpcDisabilityDenialDocumentQueryResult,
      constructUsing(convertOrmEntityToQueryResult),
    );
  }
}
