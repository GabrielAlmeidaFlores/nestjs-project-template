import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { BpcElderlyAnalysisDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-analysis-document.typeorm.entity';
import { GetBpcElderlyAnalysisDocumentQueryResult } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/repository/bpc-elderly-analysis/query/result/get-bpc-elderly-analysis-document.query.result';
import { BpcElderlyAnalysisDocumentId } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-document/value-object/bpc-elderly-analysis-document-id/bpc-elderly-analysis-document-id.value-object';

@Injectable()
export class GetBpcElderlyAnalysisDocumentQueryResultAutoMapperProfile {
  protected readonly _type =
    GetBpcElderlyAnalysisDocumentQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: BpcElderlyAnalysisDocumentTypeormEntity,
    ): GetBpcElderlyAnalysisDocumentQueryResult => {
      return GetBpcElderlyAnalysisDocumentQueryResult.build({
        id: new BpcElderlyAnalysisDocumentId(source.id),
        document: source.document,
        type: source.type,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt ?? null,
      });
    };

    createMap(
      this.mapper,
      BpcElderlyAnalysisDocumentTypeormEntity,
      GetBpcElderlyAnalysisDocumentQueryResult,
      constructUsing(convertOrmEntityToQueryResult),
    );
  }
}
