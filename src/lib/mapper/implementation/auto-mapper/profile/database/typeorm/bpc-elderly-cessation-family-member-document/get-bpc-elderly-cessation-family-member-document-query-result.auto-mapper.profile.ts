import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { BpcElderlyCessationFamilyMemberDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-cessation-family-member-document.typeorm.entity';
import { GetBpcElderlyCessationFamilyMemberDocumentQueryResult } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/repository/bpc-elderly-cessation/query/result/get-bpc-elderly-cessation-family-member-document.query.result';
import { BpcElderlyCessationFamilyMemberDocumentId } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-family-member-document/value-object/bpc-elderly-cessation-family-member-document-id/bpc-elderly-cessation-family-member-document-id.value-object';

@Injectable()
export class GetBpcElderlyCessationFamilyMemberDocumentQueryResultAutoMapperProfile {
  protected readonly _type =
    GetBpcElderlyCessationFamilyMemberDocumentQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: BpcElderlyCessationFamilyMemberDocumentTypeormEntity,
    ): GetBpcElderlyCessationFamilyMemberDocumentQueryResult => {
      return GetBpcElderlyCessationFamilyMemberDocumentQueryResult.build({
        id: new BpcElderlyCessationFamilyMemberDocumentId(source.id),
        document: source.document,
        type: source.type,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt ?? null,
      });
    };

    createMap(
      this.mapper,
      BpcElderlyCessationFamilyMemberDocumentTypeormEntity,
      GetBpcElderlyCessationFamilyMemberDocumentQueryResult,
      constructUsing(convertOrmEntityToQueryResult),
    );
  }
}
