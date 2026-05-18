import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { BpcDisabilityDenialFamilyMemberDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-denial-family-member-document.typeorm.entity';
import { GetBpcDisabilityDenialFamilyMemberDocumentQueryResult } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/repository/bpc-disability-denial/query/result/get-bpc-disability-denial-family-member-document.query.result';
import { BpcDisabilityDenialFamilyMemberDocumentId } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-family-member-document/value-object/bpc-disability-denial-family-member-document-id/bpc-disability-denial-family-member-document-id.value-object';

@Injectable()
export class GetBpcDisabilityDenialFamilyMemberDocumentQueryResultAutoMapperProfile {
  protected readonly _type =
    GetBpcDisabilityDenialFamilyMemberDocumentQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: BpcDisabilityDenialFamilyMemberDocumentTypeormEntity,
    ): GetBpcDisabilityDenialFamilyMemberDocumentQueryResult => {
      return GetBpcDisabilityDenialFamilyMemberDocumentQueryResult.build({
        id: new BpcDisabilityDenialFamilyMemberDocumentId(source.id),
        document: source.document,
        type: source.type,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt ?? null,
      });
    };

    createMap(
      this.mapper,
      BpcDisabilityDenialFamilyMemberDocumentTypeormEntity,
      GetBpcDisabilityDenialFamilyMemberDocumentQueryResult,
      constructUsing(convertOrmEntityToQueryResult),
    );
  }
}
