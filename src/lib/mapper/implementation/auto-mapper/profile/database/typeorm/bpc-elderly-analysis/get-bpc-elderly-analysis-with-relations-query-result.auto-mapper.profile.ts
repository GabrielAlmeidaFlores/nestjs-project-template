import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { BpcElderlyAnalysisDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-analysis-document.typeorm.entity';
import { BpcElderlyAnalysisFamilyMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-analysis-family-member.typeorm.entity';
import { BpcElderlyAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-analysis-result.typeorm.entity';
import { BpcElderlyAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-analysis.typeorm.entity';
import { OrganizationMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-member.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { GetOrganizationMemberWithCustomerRelationQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member-with-customer-relation.query.result';
import { GetBpcElderlyAnalysisDocumentQueryResult } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/repository/bpc-elderly-analysis/query/result/get-bpc-elderly-analysis-document.query.result';
import { GetBpcElderlyAnalysisFamilyMemberQueryResult } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/repository/bpc-elderly-analysis/query/result/get-bpc-elderly-analysis-family-member.query.result';
import { GetBpcElderlyAnalysisWithRelationsQueryResult } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/repository/bpc-elderly-analysis/query/result/get-bpc-elderly-analysis-with-relations.query.result';
import { GetBpcElderlyAnalysisResultQueryResult } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/repository/bpc-elderly-analysis-result/query/result/get-bpc-elderly-analysis-result.query.result';
import { BpcElderlyAnalysisId } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis/value-object/bpc-elderly-analysis-id/bpc-elderly-analysis-id.value-object';

@Injectable()
export class GetBpcElderlyAnalysisWithRelationsQueryResultAutoMapperProfile {
  protected readonly _type =
    GetBpcElderlyAnalysisWithRelationsQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: BpcElderlyAnalysisTypeormEntity,
    ): GetBpcElderlyAnalysisWithRelationsQueryResult => {
      if (!source.createdBy || !source.updatedBy) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass: GetBpcElderlyAnalysisWithRelationsQueryResult.name,
          sourceClass: BpcElderlyAnalysisTypeormEntity.name,
        });
      }

      const bpcElderlyAnalysisResult = source.bpcElderlyAnalysisResult
        ? this.mapper.map(
            source.bpcElderlyAnalysisResult,
            BpcElderlyAnalysisResultTypeormEntity,
            GetBpcElderlyAnalysisResultQueryResult,
          )
        : null;

      const bpcElderlyAnalysisFamilyMember =
        source.bpcElderlyAnalysisFamilyMember?.map((member) =>
          this.mapper.map(
            member,
            BpcElderlyAnalysisFamilyMemberTypeormEntity,
            GetBpcElderlyAnalysisFamilyMemberQueryResult,
          ),
        ) ?? [];

      const bpcElderlyAnalysisDocument =
        source.bpcElderlyAnalysisDocument?.map((doc) =>
          this.mapper.map(
            doc,
            BpcElderlyAnalysisDocumentTypeormEntity,
            GetBpcElderlyAnalysisDocumentQueryResult,
          ),
        ) ?? [];

      const createdBy = this.mapper.map(
        source.createdBy,
        OrganizationMemberTypeormEntity,
        GetOrganizationMemberWithCustomerRelationQueryResult,
      );

      const updatedBy = this.mapper.map(
        source.updatedBy,
        OrganizationMemberTypeormEntity,
        GetOrganizationMemberWithCustomerRelationQueryResult,
      );

      return GetBpcElderlyAnalysisWithRelationsQueryResult.build({
        id: new BpcElderlyAnalysisId(source.id),
        bpcElderlyAnalysisResult,
        bpcElderlyAnalysisFamilyMember,
        bpcElderlyAnalysisDocument,
        createdBy,
        updatedBy,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt ?? null,
      });
    };

    createMap(
      this.mapper,
      BpcElderlyAnalysisTypeormEntity,
      GetBpcElderlyAnalysisWithRelationsQueryResult,
      constructUsing(convertOrmEntityToQueryResult),
    );
  }
}
