import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { JudicialCaseAnalysisBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/judicial-case-analysis-benefit.typeorm.entity';
import { JudicialCaseAnalysisDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/judicial-case-analysis-document.typeorm.entity';
import { JudicialCaseAnalysisLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/judicial-case-analysis-legal-proceeding.typeorm.entity';
import { JudicialCaseAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/judicial-case-analysis-result.typeorm.entity';
import { JudicialCaseAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/judicial-case-analysis.typeorm.entity';
import { OrganizationMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-member.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { GetOrganizationMemberWithCustomerRelationQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member-with-customer-relation.query.result';
import { GetJudicialCaseAnalysisBenefitQueryResult } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/repository/judicial-case-analysis/query/result/get-judicial-case-analysis-benefit.query.result';
import { GetJudicialCaseAnalysisDocumentQueryResult } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/repository/judicial-case-analysis/query/result/get-judicial-case-analysis-document.query.result';
import { GetJudicialCaseAnalysisLegalProceedingQueryResult } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/repository/judicial-case-analysis/query/result/get-judicial-case-analysis-legal-proceeding.query.result';
import { GetJudicialCaseAnalysisWithRelationsQueryResult } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/repository/judicial-case-analysis/query/result/get-judicial-case-analysis-with-relations.query.result';
import { GetJudicialCaseAnalysisResultQueryResult } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/repository/judicial-case-analysis-result/query/result/get-judicial-case-analysis-result.query.result';
import { JudicialCaseAnalysisId } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis/value-object/judicial-case-analysis-id/judicial-case-analysis-id.value-object';

@Injectable()
export class GetJudicialCaseAnalysisWithRelationsQueryResultAutoMapperProfile {
  protected readonly _type =
    GetJudicialCaseAnalysisWithRelationsQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: JudicialCaseAnalysisTypeormEntity,
    ): GetJudicialCaseAnalysisWithRelationsQueryResult => {
      if (!source.createdBy || !source.updatedBy) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass:
            GetJudicialCaseAnalysisWithRelationsQueryResult.name,
          sourceClass: JudicialCaseAnalysisTypeormEntity.name,
        });
      }

      const judicialCaseAnalysisResult = source.judicialCaseAnalysisResult
        ? this.mapper.map(
            source.judicialCaseAnalysisResult,
            JudicialCaseAnalysisResultTypeormEntity,
            GetJudicialCaseAnalysisResultQueryResult,
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

      const judicialCaseAnalysisBenefit = this.mapper.mapArray(
        source.judicialCaseAnalysisBenefit ?? [],
        JudicialCaseAnalysisBenefitTypeormEntity,
        GetJudicialCaseAnalysisBenefitQueryResult,
      );

      const judicialCaseAnalysisLegalProceeding = this.mapper.mapArray(
        source.judicialCaseAnalysisLegalProceeding ?? [],
        JudicialCaseAnalysisLegalProceedingTypeormEntity,
        GetJudicialCaseAnalysisLegalProceedingQueryResult,
      );

      const judicialCaseAnalysisDocument = this.mapper.mapArray(
        source.judicialCaseAnalysisDocument ?? [],
        JudicialCaseAnalysisDocumentTypeormEntity,
        GetJudicialCaseAnalysisDocumentQueryResult,
      );

      return GetJudicialCaseAnalysisWithRelationsQueryResult.build({
        ...source,
        id: new JudicialCaseAnalysisId(source.id),
        judicialCaseAnalysisResult,
        createdBy,
        updatedBy,
        judicialCaseAnalysisLegalProceeding,
        judicialCaseAnalysisBenefit,
        judicialCaseAnalysisDocument,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      JudicialCaseAnalysisTypeormEntity,
      GetJudicialCaseAnalysisWithRelationsQueryResult,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetJudicialCaseAnalysisWithRelationsQueryResult,
    ): JudicialCaseAnalysisTypeormEntity => {
      const judicialCaseAnalysisResult = source.judicialCaseAnalysisResult
        ? this.mapper.map(
            source.judicialCaseAnalysisResult,
            GetJudicialCaseAnalysisResultQueryResult,
            JudicialCaseAnalysisResultTypeormEntity,
          )
        : undefined;

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

      const judicialCaseAnalysisBenefit = this.mapper.mapArray(
        source.judicialCaseAnalysisBenefit,
        GetJudicialCaseAnalysisBenefitQueryResult,
        JudicialCaseAnalysisBenefitTypeormEntity,
      );

      const judicialCaseAnalysisLegalProceeding = this.mapper.mapArray(
        source.judicialCaseAnalysisLegalProceeding,
        GetJudicialCaseAnalysisLegalProceedingQueryResult,
        JudicialCaseAnalysisLegalProceedingTypeormEntity,
      );

      const judicialCaseAnalysisDocument = this.mapper.mapArray(
        source.judicialCaseAnalysisDocument,
        GetJudicialCaseAnalysisDocumentQueryResult,
        JudicialCaseAnalysisDocumentTypeormEntity,
      );

      return JudicialCaseAnalysisTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        judicialCaseAnalysisResult,
        updatedBy,
        createdBy,
        judicialCaseAnalysisBenefit,
        judicialCaseAnalysisLegalProceeding,
        judicialCaseAnalysisDocument,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetJudicialCaseAnalysisWithRelationsQueryResult,
      JudicialCaseAnalysisTypeormEntity,
      mappingFunction,
    );
  }
}
