import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { OrganizationMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-member.typeorm.entity';
import { PerCapitaIncomeForBpcAnalysisDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/per-capita-income-for-bpc-analysis-document.typeorm.entity';
import { PerCapitaIncomeForBpcAnalysisFamilyMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/per-capita-income-for-bpc-analysis-family-member.typeorm.entity';
import { PerCapitaIncomeForBpcAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/per-capita-income-for-bpc-analysis-result.typeorm.entity';
import { PerCapitaIncomeForBpcAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/per-capita-income-for-bpc-analysis.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { GetOrganizationMemberWithCustomerRelationQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member-with-customer-relation.query.result';
import { GetPerCapitaIncomeForBpcAnalysisWithRelationsQueryResult } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/repository/per-capita-income-for-bpc-analysis/query/result/get-per-capita-income-for-bpc-analysis-with-relations.query.result';
import { PerCapitaIncomeForBpcAnalysisId } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis/value-object/per-capita-income-for-bpc-analysis-id/per-capita-income-for-bpc-analysis-id.value-object';
import { PerCapitaIncomeForBpcAnalysisDocumentEntity } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-document/per-capita-income-for-bpc-analysis-document.entity';
import { PerCapitaIncomeForBpcAnalysisFamilyMemberEntity } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-family-member/per-capita-income-for-bpc-analysis-family-member.entity';
import { PerCapitaIncomeForBpcAnalysisResultEntity } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-result/per-capita-income-for-bpc-analysis-result.entity';

@Injectable()
export class GetPerCapitaIncomeForBpcAnalysisWithRelationsQueryResultAutoMapperProfile {
  protected readonly _type =
    GetPerCapitaIncomeForBpcAnalysisWithRelationsQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: PerCapitaIncomeForBpcAnalysisTypeormEntity,
    ): GetPerCapitaIncomeForBpcAnalysisWithRelationsQueryResult => {
      if (!source.createdBy || !source.updatedBy) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass:
            GetPerCapitaIncomeForBpcAnalysisWithRelationsQueryResult.name,
          sourceClass: PerCapitaIncomeForBpcAnalysisTypeormEntity.name,
        });
      }

      const perCapitaIncomeForBpcAnalysisResult =
        source.perCapitaIncomeForBpcAnalysisResult
          ? this.mapper.map(
              source.perCapitaIncomeForBpcAnalysisResult,
              PerCapitaIncomeForBpcAnalysisResultTypeormEntity,
              PerCapitaIncomeForBpcAnalysisResultEntity,
            )
          : null;

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

      const perCapitaIncomeForBpcAnalysisFamilyMember = this.mapper.mapArray(
        source.perCapitaIncomeForBpcAnalysisFamilyMember ?? [],
        PerCapitaIncomeForBpcAnalysisFamilyMemberTypeormEntity,
        PerCapitaIncomeForBpcAnalysisFamilyMemberEntity,
      );

      const perCapitaIncomeForBpcAnalysisDocument = this.mapper.mapArray(
        source.perCapitaIncomeForBpcAnalysisDocument ?? [],
        PerCapitaIncomeForBpcAnalysisDocumentTypeormEntity,
        PerCapitaIncomeForBpcAnalysisDocumentEntity,
      );

      return GetPerCapitaIncomeForBpcAnalysisWithRelationsQueryResult.build({
        ...source,
        id: new PerCapitaIncomeForBpcAnalysisId(source.id),
        perCapitaIncomeForBpcAnalysisResult,
        createdBy,
        updatedBy,
        perCapitaIncomeForBpcAnalysisFamilyMember,
        perCapitaIncomeForBpcAnalysisDocument,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      PerCapitaIncomeForBpcAnalysisTypeormEntity,
      GetPerCapitaIncomeForBpcAnalysisWithRelationsQueryResult,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetPerCapitaIncomeForBpcAnalysisWithRelationsQueryResult,
    ): PerCapitaIncomeForBpcAnalysisTypeormEntity => {
      const perCapitaIncomeForBpcAnalysisResult =
        source.perCapitaIncomeForBpcAnalysisResult
          ? this.mapper.map(
              source.perCapitaIncomeForBpcAnalysisResult,
              PerCapitaIncomeForBpcAnalysisResultEntity,
              PerCapitaIncomeForBpcAnalysisResultTypeormEntity,
            )
          : undefined;

      const createdBy = this.mapper.map(
        source.createdBy,
        GetOrganizationMemberWithCustomerRelationQueryResult,
        OrganizationMemberTypeormEntity,
      );

      const updatedBy = this.mapper.map(
        source.updatedBy,
        GetOrganizationMemberWithCustomerRelationQueryResult,
        OrganizationMemberTypeormEntity,
      );

      const perCapitaIncomeForBpcAnalysisFamilyMember = this.mapper.mapArray(
        source.perCapitaIncomeForBpcAnalysisFamilyMember,
        PerCapitaIncomeForBpcAnalysisFamilyMemberEntity,
        PerCapitaIncomeForBpcAnalysisFamilyMemberTypeormEntity,
      );

      const perCapitaIncomeForBpcAnalysisDocument = this.mapper.mapArray(
        source.perCapitaIncomeForBpcAnalysisDocument,
        PerCapitaIncomeForBpcAnalysisDocumentEntity,
        PerCapitaIncomeForBpcAnalysisDocumentTypeormEntity,
      );

      return Object.assign(new PerCapitaIncomeForBpcAnalysisTypeormEntity(), {
        ...source,
        id: source.id.toString(),
        perCapitaIncomeForBpcAnalysisResult,
        createdBy,
        updatedBy,
        perCapitaIncomeForBpcAnalysisFamilyMember,
        perCapitaIncomeForBpcAnalysisDocument,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetPerCapitaIncomeForBpcAnalysisWithRelationsQueryResult,
      PerCapitaIncomeForBpcAnalysisTypeormEntity,
      mappingFunction,
    );
  }
}
