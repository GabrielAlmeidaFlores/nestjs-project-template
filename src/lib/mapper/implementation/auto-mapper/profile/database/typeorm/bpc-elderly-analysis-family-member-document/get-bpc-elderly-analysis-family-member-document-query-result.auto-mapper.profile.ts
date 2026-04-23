import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { BpcElderlyAnalysisFamilyMemberDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-analysis-family-member-document.typeorm.entity';
import { GetBpcElderlyAnalysisFamilyMemberDocumentQueryResult } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/repository/bpc-elderly-analysis/query/result/get-bpc-elderly-analysis-family-member-document.query.result';
import { BpcElderlyAnalysisFamilyMemberDocumentId } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-family-member-document/value-object/bpc-elderly-analysis-family-member-document-id/bpc-elderly-analysis-family-member-document-id.value-object';

@Injectable()
export class GetBpcElderlyAnalysisFamilyMemberDocumentQueryResultAutoMapperProfile {
  protected readonly _type =
    GetBpcElderlyAnalysisFamilyMemberDocumentQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: BpcElderlyAnalysisFamilyMemberDocumentTypeormEntity,
    ): GetBpcElderlyAnalysisFamilyMemberDocumentQueryResult => {
      return GetBpcElderlyAnalysisFamilyMemberDocumentQueryResult.build({
        id: new BpcElderlyAnalysisFamilyMemberDocumentId(source.id),
        document: source.document,
        type: source.type,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt ?? null,
      });
    };

    createMap(
      this.mapper,
      BpcElderlyAnalysisFamilyMemberDocumentTypeormEntity,
      GetBpcElderlyAnalysisFamilyMemberDocumentQueryResult,
      constructUsing(convertOrmEntityToQueryResult),
    );
  }
}
