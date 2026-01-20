import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { MedicalAndSocialReportObjectionGeneratorAnalysisBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/medical-and-social-report-objection-generator-analysis-benefit.entity';
import { MedicalAndSocialReportObjectionGeneratorAnalysisDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/medical-and-social-report-objection-generator-analysis-document.entity';
import { MedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/medical-and-social-report-objection-generator-analysis-legal-proceeding.entity';
import { MedicalAndSocialReportObjectionGeneratorAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/medical-and-social-report-objection-generator-analysis-result.entity';
import { MedicalAndSocialReportObjectionGeneratorAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/medical-and-social-report-objection-generator-analysis.entity';
import { OrganizationMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-member.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { GetOrganizationMemberWithCustomerRelationQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member-with-customer-relation.query.result';
import { GetMedicalAndSocialReportObjectionGeneratorAnalysisBenefitQueryResult } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/repository/medical-and-social-report-objection-generator-analysis/query/result/get-medical-and-social-report-objection-generator-analysis-benefit.query.result';
import { GetMedicalAndSocialReportObjectionGeneratorAnalysisDocumentQueryResult } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/repository/medical-and-social-report-objection-generator-analysis/query/result/get-medical-and-social-report-objection-generator-analysis-document.query.result';
import { GetMedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingQueryResult } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/repository/medical-and-social-report-objection-generator-analysis/query/result/get-medical-and-social-report-objection-generator-analysis-legal-proceeding.query.result';
import { GetMedicalAndSocialReportObjectionGeneratorAnalysisWithRelationsQueryResult } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/repository/medical-and-social-report-objection-generator-analysis/query/result/get-medical-and-social-report-objection-generator-analysis-with-relations.query.result';
import { GetMedicalAndSocialReportObjectionGeneratorAnalysisResultQueryResult } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/repository/medical-and-social-report-objection-generator-analysis-result/query/result/get-medical-and-social-report-objection-generator-analysis-result.query.result';
import { MedicalAndSocialReportObjectionGeneratorAnalysisId } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis/value-object/medical-and-social-report-objection-generator-analysis-id/medical-and-social-report-objection-generator-analysis-id.value-object';

@Injectable()
export class GetMedicalAndSocialReportObjectionGeneratorAnalysisWithRelationsQueryResultAutoMapperProfile {
  protected readonly _type =
    GetMedicalAndSocialReportObjectionGeneratorAnalysisWithRelationsQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: MedicalAndSocialReportObjectionGeneratorAnalysisTypeormEntity,
    ): GetMedicalAndSocialReportObjectionGeneratorAnalysisWithRelationsQueryResult => {
      if (!source.createdBy || !source.updatedBy) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass:
            GetMedicalAndSocialReportObjectionGeneratorAnalysisWithRelationsQueryResult.name,
          sourceClass: MedicalAndSocialReportObjectionGeneratorAnalysisTypeormEntity.name,
        });
      }

      const medicalAndSocialReportObjectionGeneratorAnalysisResult = source.medicalAndSocialReportObjectionGeneratorAnalysisResult
        ? this.mapper.map(
            source.medicalAndSocialReportObjectionGeneratorAnalysisResult,
            MedicalAndSocialReportObjectionGeneratorAnalysisResultTypeormEntity,
            GetMedicalAndSocialReportObjectionGeneratorAnalysisResultQueryResult,
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

      const medicalAndSocialReportObjectionGeneratorAnalysisBenefit = this.mapper.mapArray(
        source.medicalAndSocialReportObjectionGeneratorAnalysisBenefit ?? [],
        MedicalAndSocialReportObjectionGeneratorAnalysisBenefitTypeormEntity,
        GetMedicalAndSocialReportObjectionGeneratorAnalysisBenefitQueryResult,
      );

      const medicalAndSocialReportObjectionGeneratorAnalysisLegalProceeding = this.mapper.mapArray(
        source.medicalAndSocialReportObjectionGeneratorAnalysisLegalProceeding ?? [],
        MedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingTypeormEntity,
        GetMedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingQueryResult,
      );

      const medicalAndSocialReportObjectionGeneratorAnalysisDocument = this.mapper.mapArray(
        source.medicalAndSocialReportObjectionGeneratorAnalysisDocument ?? [],
        MedicalAndSocialReportObjectionGeneratorAnalysisDocumentTypeormEntity,
        GetMedicalAndSocialReportObjectionGeneratorAnalysisDocumentQueryResult,
      );

      return GetMedicalAndSocialReportObjectionGeneratorAnalysisWithRelationsQueryResult.build({
        ...source,
        id: new MedicalAndSocialReportObjectionGeneratorAnalysisId(source.id),
        medicalAndSocialReportObjectionGeneratorAnalysisResult,
        medicalAndSocialReportObjectionGeneratorAnalysisBenefit,
        medicalAndSocialReportObjectionGeneratorAnalysisLegalProceeding,
        medicalAndSocialReportObjectionGeneratorAnalysisDocument,
        createdBy,
        updatedBy,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      MedicalAndSocialReportObjectionGeneratorAnalysisTypeormEntity,
      GetMedicalAndSocialReportObjectionGeneratorAnalysisWithRelationsQueryResult,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetMedicalAndSocialReportObjectionGeneratorAnalysisWithRelationsQueryResult,
    ): MedicalAndSocialReportObjectionGeneratorAnalysisTypeormEntity => {
      const medicalAndSocialReportObjectionGeneratorAnalysisResult = source.medicalAndSocialReportObjectionGeneratorAnalysisResult
        ? this.mapper.map(
            source.medicalAndSocialReportObjectionGeneratorAnalysisResult,
            GetMedicalAndSocialReportObjectionGeneratorAnalysisResultQueryResult,
            MedicalAndSocialReportObjectionGeneratorAnalysisResultTypeormEntity,
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

      const medicalAndSocialReportObjectionGeneratorAnalysisBenefit = this.mapper.mapArray(
        source.medicalAndSocialReportObjectionGeneratorAnalysisBenefit,
        GetMedicalAndSocialReportObjectionGeneratorAnalysisBenefitQueryResult,
        MedicalAndSocialReportObjectionGeneratorAnalysisBenefitTypeormEntity,
      );

      const medicalAndSocialReportObjectionGeneratorAnalysisLegalProceeding = this.mapper.mapArray(
        source.medicalAndSocialReportObjectionGeneratorAnalysisLegalProceeding,
        GetMedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingQueryResult,
        MedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingTypeormEntity,
      );

      const medicalAndSocialReportObjectionGeneratorAnalysisDocument = this.mapper.mapArray(
        source.medicalAndSocialReportObjectionGeneratorAnalysisDocument,
        GetMedicalAndSocialReportObjectionGeneratorAnalysisDocumentQueryResult,
        MedicalAndSocialReportObjectionGeneratorAnalysisDocumentTypeormEntity,
      );

      return MedicalAndSocialReportObjectionGeneratorAnalysisTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        medicalAndSocialReportObjectionGeneratorAnalysisResult,
        medicalAndSocialReportObjectionGeneratorAnalysisBenefit,
        medicalAndSocialReportObjectionGeneratorAnalysisLegalProceeding,
        medicalAndSocialReportObjectionGeneratorAnalysisDocument,
        updatedBy,
        createdBy,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetMedicalAndSocialReportObjectionGeneratorAnalysisWithRelationsQueryResult,
      MedicalAndSocialReportObjectionGeneratorAnalysisTypeormEntity,
      mappingFunction,
    );
  }
}

