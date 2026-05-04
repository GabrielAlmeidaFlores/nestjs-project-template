import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { BpcDisabilityTerminationFamilyMemberDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-termination-family-member-document.typeorm.entity';
import { GetBpcDisabilityTerminationFamilyMemberDocumentQueryResult } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/repository/bpc-disability-termination/query/result/get-bpc-disability-termination-family-member-document.query.result';
import { BpcDisabilityTerminationFamilyMemberDocumentId } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-family-member-document/value-object/bpc-disability-termination-family-member-document-id/bpc-disability-termination-family-member-document-id.value-object';

@Injectable()
export class GetBpcDisabilityTerminationFamilyMemberDocumentQueryResultAutoMapperProfile {
  protected readonly _type =
    GetBpcDisabilityTerminationFamilyMemberDocumentQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: BpcDisabilityTerminationFamilyMemberDocumentTypeormEntity,
    ): GetBpcDisabilityTerminationFamilyMemberDocumentQueryResult => {
      return GetBpcDisabilityTerminationFamilyMemberDocumentQueryResult.build({
        id: new BpcDisabilityTerminationFamilyMemberDocumentId(source.id),
        document: source.document,
        type: source.type,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt ?? null,
      });
    };

    createMap(
      this.mapper,
      BpcDisabilityTerminationFamilyMemberDocumentTypeormEntity,
      GetBpcDisabilityTerminationFamilyMemberDocumentQueryResult,
      constructUsing(convertOrmEntityToQueryResult),
    );
  }
}
