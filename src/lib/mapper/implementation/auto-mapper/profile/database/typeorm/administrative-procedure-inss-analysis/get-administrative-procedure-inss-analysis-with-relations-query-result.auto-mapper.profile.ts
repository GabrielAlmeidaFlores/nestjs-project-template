import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { AdministrativeProcedureInssAnalysisBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/administrative-procedure-inss-analysis-benefit.entity';
import { AdministrativeProcedureInssAnalysisDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/administrative-procedure-inss-analysis-document.entity';
import { AdministrativeProcedureInssAnalysisLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/administrative-procedure-inss-analysis-legal-proceeding.entity';
import { AdministrativeProcedureInssAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/administrative-procedure-inss-analysis-result.entity';
import { AdministrativeProcedureInssAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/administrative-procedure-inss-analysis.entity';
import { OrganizationMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-member.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { GetOrganizationMemberWithCustomerRelationQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member-with-customer-relation.query.result';
import { GetAdministrativeProcedureInssAnalysisBenefitQueryResult } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/repository/administrative-procedure-inss-analysis/query/result/get-administrative-procedure-inss-analysis-benefit.query.result';
import { GetAdministrativeProcedureInssAnalysisDocumentQueryResult } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/repository/administrative-procedure-inss-analysis/query/result/get-administrative-procedure-inss-analysis-document.query.result';
import { GetAdministrativeProcedureInssAnalysisLegalProceedingQueryResult } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/repository/administrative-procedure-inss-analysis/query/result/get-administrative-procedure-inss-analysis-legal-proceeding.query.result';
import { GetAdministrativeProcedureInssAnalysisWithRelationsQueryResult } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/repository/administrative-procedure-inss-analysis/query/result/get-administrative-procedure-inss-analysis-with-relations.query.result';
import { GetAdministrativeProcedureInssAnalysisResultQueryResult } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/repository/administrative-procedure-inss-analysis-result/query/result/get-administrative-procedure-inss-analysis-result.query.result';
import { AdministrativeProcedureInssAnalysisId } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/schema/entity/administrative-procedure-inss-analysis/value-object/administrative-procedure-inss-analysis-id/administrative-procedure-inss-analysis-id.value-object';

@Injectable()
export class GetAdministrativeProcedureInssAnalysisWithRelationsQueryResultAutoMapperProfile {
  protected readonly _type =
    GetAdministrativeProcedureInssAnalysisWithRelationsQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: AdministrativeProcedureInssAnalysisTypeormEntity,
    ): GetAdministrativeProcedureInssAnalysisWithRelationsQueryResult => {
      if (
        source.administrativeProcedureInssAnalysisBenefit === undefined ||
        source.administrativeProcedureInssAnalysisLegalProceeding ===
          undefined ||
        source.administrativeProcedureInssAnalysisDocument === undefined
      ) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass:
            GetAdministrativeProcedureInssAnalysisWithRelationsQueryResult.name,
          sourceClass: AdministrativeProcedureInssAnalysisTypeormEntity.name,
        });
      }

      const administrativeProcedureInssAnalysisResult = this.mapper.map(
        source.administrativeProcedureInssAnalysisResult,
        AdministrativeProcedureInssAnalysisResultTypeormEntity,
        GetAdministrativeProcedureInssAnalysisResultQueryResult,
      );

      const updatedBy = this.mapper.map(
        source.updatedBy,
        OrganizationMemberTypeormEntity,
        GetOrganizationMemberWithCustomerRelationQueryResult,
      );

      const createdBy = this.mapper.map(
        source.createdBy,
        OrganizationMemberTypeormEntity,
        GetOrganizationMemberWithCustomerRelationQueryResult,
      );

      const administrativeProcedureInssAnalysisBenefit = this.mapper.mapArray(
        source.administrativeProcedureInssAnalysisBenefit,
        AdministrativeProcedureInssAnalysisBenefitTypeormEntity,
        GetAdministrativeProcedureInssAnalysisBenefitQueryResult,
      );

      const administrativeProcedureInssAnalysisLegalProceeding =
        this.mapper.mapArray(
          source.administrativeProcedureInssAnalysisLegalProceeding,
          AdministrativeProcedureInssAnalysisLegalProceedingTypeormEntity,
          GetAdministrativeProcedureInssAnalysisLegalProceedingQueryResult,
        );

      const administrativeProcedureInssAnalysisDocument = this.mapper.mapArray(
        source.administrativeProcedureInssAnalysisDocument,
        AdministrativeProcedureInssAnalysisDocumentTypeormEntity,
        GetAdministrativeProcedureInssAnalysisDocumentQueryResult,
      );

      return GetAdministrativeProcedureInssAnalysisWithRelationsQueryResult.build(
        {
          ...source,
          id: new AdministrativeProcedureInssAnalysisId(source.id),
          administrativeProcedureInssAnalysisResult,
          createdBy,
          updatedBy,
          administrativeProcedureInssAnalysisLegalProceeding,
          administrativeProcedureInssAnalysisBenefit,
          administrativeProcedureInssAnalysisDocument,
        },
      );
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      AdministrativeProcedureInssAnalysisTypeormEntity,
      GetAdministrativeProcedureInssAnalysisWithRelationsQueryResult,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetAdministrativeProcedureInssAnalysisWithRelationsQueryResult,
    ): AdministrativeProcedureInssAnalysisTypeormEntity => {
      const administrativeProcedureInssAnalysisResult = this.mapper.map(
        source.administrativeProcedureInssAnalysisResult,
        GetAdministrativeProcedureInssAnalysisResultQueryResult,
        AdministrativeProcedureInssAnalysisResultTypeormEntity,
      );

      const updatedBy = this.mapper.map(
        source.updatedBy,
        GetOrganizationMemberWithCustomerRelationQueryResult,
        OrganizationMemberTypeormEntity,
      );

      const createdBy = this.mapper.map(
        source.createdBy,
        GetOrganizationMemberWithCustomerRelationQueryResult,
        OrganizationMemberTypeormEntity,
      );

      const administrativeProcedureInssAnalysisBenefit = this.mapper.mapArray(
        source.administrativeProcedureInssAnalysisBenefit,
        GetAdministrativeProcedureInssAnalysisBenefitQueryResult,
        AdministrativeProcedureInssAnalysisBenefitTypeormEntity,
      );

      const administrativeProcedureInssAnalysisLegalProceeding =
        this.mapper.mapArray(
          source.administrativeProcedureInssAnalysisLegalProceeding,
          GetAdministrativeProcedureInssAnalysisLegalProceedingQueryResult,
          AdministrativeProcedureInssAnalysisLegalProceedingTypeormEntity,
        );

      const administrativeProcedureInssAnalysisDocument = this.mapper.mapArray(
        source.administrativeProcedureInssAnalysisDocument,
        GetAdministrativeProcedureInssAnalysisDocumentQueryResult,
        AdministrativeProcedureInssAnalysisDocumentTypeormEntity,
      );

      return AdministrativeProcedureInssAnalysisTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        administrativeProcedureInssAnalysisResult,
        updatedBy,
        createdBy,
        administrativeProcedureInssAnalysisBenefit,
        administrativeProcedureInssAnalysisLegalProceeding,
        administrativeProcedureInssAnalysisDocument,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetAdministrativeProcedureInssAnalysisWithRelationsQueryResult,
      AdministrativeProcedureInssAnalysisTypeormEntity,
      mappingFunction,
    );
  }
}
