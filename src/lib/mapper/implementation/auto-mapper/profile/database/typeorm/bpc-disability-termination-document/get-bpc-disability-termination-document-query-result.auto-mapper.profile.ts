import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { BpcDisabilityTerminationDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-termination-document.typeorm.entity';
import { GetBpcDisabilityTerminationDocumentQueryResult } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/repository/bpc-disability-termination/query/result/get-bpc-disability-termination-document.query.result';
import { BpcDisabilityTerminationDocumentId } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-document/value-object/bpc-disability-termination-document-id/bpc-disability-termination-document-id.value-object';

@Injectable()
export class GetBpcDisabilityTerminationDocumentQueryResultAutoMapperProfile {
  protected readonly _type =
    GetBpcDisabilityTerminationDocumentQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: BpcDisabilityTerminationDocumentTypeormEntity,
    ): GetBpcDisabilityTerminationDocumentQueryResult => {
      return GetBpcDisabilityTerminationDocumentQueryResult.build({
        id: new BpcDisabilityTerminationDocumentId(source.id),
        document: source.document,
        name: source.name,
        type: source.type,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt ?? null,
      });
    };

    createMap(
      this.mapper,
      BpcDisabilityTerminationDocumentTypeormEntity,
      GetBpcDisabilityTerminationDocumentQueryResult,
      constructUsing(convertOrmEntityToQueryResult),
    );
  }
}
