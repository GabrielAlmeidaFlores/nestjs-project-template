import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { BpcDisabilityGrantFamilyMemberDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-grant-family-member-document.typeorm.entity';
import { GetBpcDisabilityGrantFamilyMemberDocumentQueryResult } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/repository/bpc-disability-grant/query/result/get-bpc-disability-grant-family-member-document.query.result';
import { BpcDisabilityGrantFamilyMemberDocumentId } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-family-member-document/value-object/bpc-disability-grant-family-member-document-id/bpc-disability-grant-family-member-document-id.value-object';

@Injectable()
export class GetBpcDisabilityGrantFamilyMemberDocumentQueryResultAutoMapperProfile {
  protected readonly _type =
    GetBpcDisabilityGrantFamilyMemberDocumentQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: BpcDisabilityGrantFamilyMemberDocumentTypeormEntity,
    ): GetBpcDisabilityGrantFamilyMemberDocumentQueryResult => {
      return GetBpcDisabilityGrantFamilyMemberDocumentQueryResult.build({
        id: new BpcDisabilityGrantFamilyMemberDocumentId(source.id),
        document: source.document,
        type: source.type,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt ?? null,
      });
    };

    createMap(
      this.mapper,
      BpcDisabilityGrantFamilyMemberDocumentTypeormEntity,
      GetBpcDisabilityGrantFamilyMemberDocumentQueryResult,
      constructUsing(convertOrmEntityToQueryResult),
    );
  }
}
