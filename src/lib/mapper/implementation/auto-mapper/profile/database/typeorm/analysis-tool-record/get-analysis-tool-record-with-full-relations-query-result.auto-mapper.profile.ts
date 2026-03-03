import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { AnalysisToolClientTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-client.typeorm.entity';
import { AnalysisToolRecordTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-record.typeorm.entity';
import { OrganizationMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-member.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { GetOrganizationMemberWithCustomerAndOrganizationRelationsQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member-with-customer-and-organization-relations.query.result';
import { GetAnalysisToolClientWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/result/get-analysis-tool-client-with-relations.query.result';
import { GetAnalysisToolRecordWithFullRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/result/get-analysis-tool-record-with-full-relations.query.result';
import { AnalysisToolRecordCode } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/value-object/analysis-tool-record-code/analysis-tool-record-code.value-object';
import { AnalysisToolRecordId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/value-object/analysis-tool-record-id/analysis-tool-record-id.value-objects';

@Injectable()
export class GetAnalysisToolRecordWithFullRelationsQueryResultAutoMapperProfile {
  protected readonly _type =
    GetAnalysisToolRecordWithFullRelationsQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToQueryResult(): void {
    const convert = (
      source: AnalysisToolRecordTypeormEntity,
    ): GetAnalysisToolRecordWithFullRelationsQueryResult => {
      if (!source.createdBy || !source.updatedBy) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass:
            GetAnalysisToolRecordWithFullRelationsQueryResult.name,
          sourceClass: AnalysisToolRecordTypeormEntity.name,
        });
      }

      return GetAnalysisToolRecordWithFullRelationsQueryResult.build({
        id: new AnalysisToolRecordId(source.id),
        status: source.status,
        code: new AnalysisToolRecordCode(source.code),
        type: source.type,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
        createdBy: this.mapper.map(
          source.createdBy,
          OrganizationMemberTypeormEntity,
          GetOrganizationMemberWithCustomerAndOrganizationRelationsQueryResult,
        ),
        updatedBy: this.mapper.map(
          source.updatedBy,
          OrganizationMemberTypeormEntity,
          GetOrganizationMemberWithCustomerAndOrganizationRelationsQueryResult,
        ),
        analysisToolClient: source.analysisToolClient
          ? this.mapper.map(
              source.analysisToolClient,
              AnalysisToolClientTypeormEntity,
              GetAnalysisToolClientWithRelationsQueryResult,
            )
          : null,
      });
    };

    createMap(
      this.mapper,
      AnalysisToolRecordTypeormEntity,
      GetAnalysisToolRecordWithFullRelationsQueryResult,
      constructUsing(convert),
    );
  }
}
