import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { AnalysisToolClientTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-client.typeorm.entity';
import { CnisFastAnalysisInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/cnis-fast-analysis-inss-benefit.typeorm.entity';
import { CnisFastAnalysisLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/cnis-fast-analysis-legal-proceeding.typeorm.entity';
import { CnisFastAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/cnis-fast-analysis-result.typeorm.entity';
import { CnisFastAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/cnis-fast-analysis.typeorm.entity';
import { OrganizationMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-member.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { GetOrganizationMemberWithCustomerRelationQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member-with-customer-relation.query.result';
import { GetAnalysisToolClientWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/result/get-analysis-tool-client-with-relations.query.result';
import { GetCnisFastAnalysisWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/cnis-fast-analysis/query/result/get-cnis-fast-analysis-with-relations.query.result';
import { GetCnisFastAnalysisInssBenefitQueryResult } from '@module/customer/analysis-tool/domain/repository/cnis-fast-analysis-inss-benefit/query/result/get-cnis-fast-analysis-inss-benefit.query.result';
import { GetCnisFastAnalysisLegalProceedingQueryResult } from '@module/customer/analysis-tool/domain/repository/cnis-fast-analysis-legal-proceeding/query/result/get-cnis-fast-analysis-legal-proceeding.query.result';
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
        !source.cnisFastAnalysisInssBenefit ||
        !source.cnisFastAnalysisLegalProceeding
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

      const cnisFastAnalysisInssBenefit = this.mapper.mapArray(
        source.cnisFastAnalysisInssBenefit,
        CnisFastAnalysisInssBenefitTypeormEntity,
        GetCnisFastAnalysisInssBenefitQueryResult,
      );

      const cnisFastAnalysisLegalProceeding = this.mapper.mapArray(
        source.cnisFastAnalysisLegalProceeding,
        CnisFastAnalysisLegalProceedingTypeormEntity,
        GetCnisFastAnalysisLegalProceedingQueryResult,
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
        cnisFastAnalysisInssBenefit,
        cnisFastAnalysisLegalProceeding,
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

      const cnisFastAnalysisInssBenefit = this.mapper.mapArray(
        source.cnisFastAnalysisInssBenefit,
        GetCnisFastAnalysisInssBenefitQueryResult,
        CnisFastAnalysisInssBenefitTypeormEntity,
      );

      const cnisFastAnalysisLegalProceeding = this.mapper.mapArray(
        source.cnisFastAnalysisLegalProceeding,
        GetCnisFastAnalysisLegalProceedingQueryResult,
        CnisFastAnalysisLegalProceedingTypeormEntity,
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
        cnisFastAnalysisInssBenefit,
        cnisFastAnalysisLegalProceeding,
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
