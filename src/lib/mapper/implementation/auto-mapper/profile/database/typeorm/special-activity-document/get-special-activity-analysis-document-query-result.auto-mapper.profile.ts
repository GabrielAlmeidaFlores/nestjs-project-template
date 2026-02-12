import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { SpecialActivityDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-activity-documents.typeorm.entity';
import { SpecialActivityDocumentId } from '@module/customer/analysis-tool/domain/schema/entity/special-activity-document/value-object/special-activity-document-id.value-object';
import { GetSpecialActivityAnalysisDocumentQueryResult } from '@module/customer/analysis-tool/module/special-activity-analysis/domain/repository/special-activity-analysis-document/query/result/get-special-activity-analysis-document.query.result';

@Injectable()
export class GetSpecialActivityAnalysisDocumentQueryResultAutoMapperProfile {
  protected readonly _type =
    GetSpecialActivityAnalysisDocumentQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
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
