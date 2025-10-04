import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { AnalysisToolClientInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-client-inss-benefit.typeorm.entity';
import { AnalysisToolClientLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-client-legal-proceeding.typeorm.entity';
import { AnalysisToolClientTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-client.typeorm.entity';
import { CnisFastAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/cnis-fast-analysis-result.typeorm.entity';
import { CnisFastAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/cnis-fast-analysis.typeorm.entity';
import { OrganizationMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-member.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { GetOrganizationMemberWithCustomerRelationQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member-with-customer-relation.query.result';
import { GetAnalysisToolClientWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/result/get-analysis-tool-client-with-relations.query.result';
import { GetAnalysisToolClientInssBenefitQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client-inss-benefit/query/result/get-analysis-tool-client-inss-benefit.query.result';
import { GetAnalysisToolClientLegalProceedingQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client-legal-proceeding/query/result/get-analysis-tool-client-legal-proceeding.query.result';
import { GetCnisFastAnalysisWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/cnis-fast-analysis/query/result/get-cnis-fast-analysis-with-relations.query.result';
import { GetCnisFastAnalysisResultQueryResult } from '@module/customer/analysis-tool/domain/repository/cnis-fast-analysis-result/query/result/get-cnis-fast-analysis-result.query.result';
import { CnisFastAnalysisId } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis/value-object/cnis-fast-analysis-id/cnis-fast-analysis-id.value-object';

@Injectable()
export class GetCnisFastAnalysisWithRelationsQueryResultAutoMapperProfile {
  protected readonly _type =
    GetCnisFastAnalysisWithRelationsQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: CnisFastAnalysisTypeormEntity,
    ): GetCnisFastAnalysisWithRelationsQueryResult => {
      if (
        !source.analysisToolClientInssBenefit ||
        !source.analysisToolClientLegalProceeding
      ) {
        throw new IncompleteSourceDataForMappingError({
          destinyClass: GetCnisFastAnalysisWithRelationsQueryResult.name,
          sourceClass: CnisFastAnalysisTypeormEntity.name,
        });
      }

      const analysisToolClient = this.mapper.map(
        source.analysisToolClient,
        AnalysisToolClientTypeormEntity,
        GetAnalysisToolClientWithRelationsQueryResult,
      );

      const cnisFastAnalysisResult = this.mapper.map(
        source.cnisFastAnalysisResult,
        CnisFastAnalysisResultTypeormEntity,
        GetCnisFastAnalysisResultQueryResult,
      );

      const analysisToolClientInssBenefit = this.mapper.mapArray(
        source.analysisToolClientInssBenefit,
        AnalysisToolClientInssBenefitTypeormEntity,
        GetAnalysisToolClientInssBenefitQueryResult,
      );

      const analysisToolClientLegalProceeding = this.mapper.mapArray(
        source.analysisToolClientLegalProceeding,
        AnalysisToolClientLegalProceedingTypeormEntity,
        GetAnalysisToolClientLegalProceedingQueryResult,
      );

      const updatedBy = this.mapper.map(
        source.updatedBy,
        OrganizationMemberTypeormEntity,
        GetOrganizationMemberWithCustomerRelationQueryResult,
      );

      const createdBy = this.mapper.map(
        source.updatedBy,
        OrganizationMemberTypeormEntity,
        GetOrganizationMemberWithCustomerRelationQueryResult,
      );

      return GetCnisFastAnalysisWithRelationsQueryResult.build({
        ...source,
        id: new CnisFastAnalysisId(source.id),
        analysisToolClient,
        cnisFastAnalysisResult,
        analysisToolClientInssBenefit,
        analysisToolClientLegalProceeding,
        createdBy,
        updatedBy,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      CnisFastAnalysisTypeormEntity,
      GetCnisFastAnalysisWithRelationsQueryResult,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetCnisFastAnalysisWithRelationsQueryResult,
    ): CnisFastAnalysisTypeormEntity => {
      const analysisToolClient = this.mapper.map(
        source.analysisToolClient,
        GetAnalysisToolClientWithRelationsQueryResult,
        AnalysisToolClientTypeormEntity,
      );

      const cnisFastAnalysisResult = this.mapper.map(
        source.cnisFastAnalysisResult,
        GetCnisFastAnalysisResultQueryResult,
        CnisFastAnalysisResultTypeormEntity,
      );

      const analysisToolClientInssBenefit = this.mapper.mapArray(
        source.analysisToolClientInssBenefit,
        GetAnalysisToolClientInssBenefitQueryResult,
        AnalysisToolClientInssBenefitTypeormEntity,
      );

      const analysisToolClientLegalProceeding = this.mapper.mapArray(
        source.analysisToolClientLegalProceeding,
        GetAnalysisToolClientLegalProceedingQueryResult,
        AnalysisToolClientLegalProceedingTypeormEntity,
      );

      const updatedBy = this.mapper.map(
        source.updatedBy,
        GetOrganizationMemberWithCustomerRelationQueryResult,
        OrganizationMemberTypeormEntity,
      );

      const createdBy = this.mapper.map(
        source.updatedBy,
        GetOrganizationMemberWithCustomerRelationQueryResult,
        OrganizationMemberTypeormEntity,
      );

      return CnisFastAnalysisTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        analysisToolClient,
        cnisFastAnalysisResult,
        analysisToolClientInssBenefit,
        analysisToolClientLegalProceeding,
        createdBy,
        updatedBy,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetCnisFastAnalysisWithRelationsQueryResult,
      CnisFastAnalysisTypeormEntity,
      mappingFunction,
    );
  }
}
