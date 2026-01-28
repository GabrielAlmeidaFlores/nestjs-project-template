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
import { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import { MedicalAndSocialReportObjectionGeneratorAnalysisEntity } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis/medical-and-social-report-objection-generator-analysis.entity';
import { MedicalAndSocialReportObjectionGeneratorAnalysisId } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis/value-object/medical-and-social-report-objection-generator-analysis-id/medical-and-social-report-objection-generator-analysis-id.value-object';
import { MedicalAndSocialReportObjectionGeneratorAnalysisBenefitEntity } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis-benefit/medical-and-social-report-objection-generator-analysis-benefit.entity';
import { MedicalAndSocialReportObjectionGeneratorAnalysisDocumentEntity } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis-document/medical-and-social-report-objection-generator-analysis-document.entity';
import { MedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingEntity } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis-legal-proceeding/medical-and-social-report-objection-generator-analysis-legal-proceeding.entity';
import { MedicalAndSocialReportObjectionGeneratorAnalysisResultEntity } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis-result/medical-and-social-report-objection-generator-analysis-result.entity';

@Injectable()
export class MedicalAndSocialReportObjectionGeneratorAnalysisEntityAutoMapperProfile {
  protected readonly _type =
    MedicalAndSocialReportObjectionGeneratorAnalysisEntityAutoMapperProfile.name;

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
    ): MedicalAndSocialReportObjectionGeneratorAnalysisEntity => {
      if (!source.createdBy || !source.updatedBy) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass:
            MedicalAndSocialReportObjectionGeneratorAnalysisEntity.name,
          sourceClass:
            MedicalAndSocialReportObjectionGeneratorAnalysisTypeormEntity.name,
        });
      }

      const medicalAndSocialReportObjectionGeneratorAnalysisResult =
        source.msReportObjectionAnalysisResult !== undefined
          ? this.mapper.map(
              source.msReportObjectionAnalysisResult,
              MedicalAndSocialReportObjectionGeneratorAnalysisResultTypeormEntity,
              MedicalAndSocialReportObjectionGeneratorAnalysisResultEntity,
            )
          : null;

      const medicalAndSocialReportObjectionGeneratorAnalysisBenefit =
        source.medicalAndSocialReportObjectionGeneratorAnalysisBenefit !==
        undefined
          ? this.mapper.mapArray(
              source.medicalAndSocialReportObjectionGeneratorAnalysisBenefit,
              MedicalAndSocialReportObjectionGeneratorAnalysisBenefitTypeormEntity,
              MedicalAndSocialReportObjectionGeneratorAnalysisBenefitEntity,
            )
          : [];

      const medicalAndSocialReportObjectionGeneratorAnalysisLegalProceeding =
        source.medicalAndSocialReportObjectionGeneratorAnalysisLegalProceeding !==
        undefined
          ? this.mapper.mapArray(
              source.medicalAndSocialReportObjectionGeneratorAnalysisLegalProceeding,
              MedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingTypeormEntity,
              MedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingEntity,
            )
          : [];

      const medicalAndSocialReportObjectionGeneratorAnalysisDocument =
        source.medicalAndSocialReportObjectionGeneratorAnalysisDocument !==
        undefined
          ? this.mapper.mapArray(
              source.medicalAndSocialReportObjectionGeneratorAnalysisDocument,
              MedicalAndSocialReportObjectionGeneratorAnalysisDocumentTypeormEntity,
              MedicalAndSocialReportObjectionGeneratorAnalysisDocumentEntity,
            )
          : [];

      return new MedicalAndSocialReportObjectionGeneratorAnalysisEntity({
        ...source,
        id: new MedicalAndSocialReportObjectionGeneratorAnalysisId(source.id),
        medicalAndSocialReportObjectionGeneratorAnalysisResult,
        medicalAndSocialReportObjectionGeneratorAnalysisBenefit,
        medicalAndSocialReportObjectionGeneratorAnalysisLegalProceeding,
        medicalAndSocialReportObjectionGeneratorAnalysisDocument,
        createdBy: new OrganizationMemberId(source.createdBy.id),
        updatedBy: new OrganizationMemberId(source.updatedBy.id),
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      MedicalAndSocialReportObjectionGeneratorAnalysisTypeormEntity,
      MedicalAndSocialReportObjectionGeneratorAnalysisEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: MedicalAndSocialReportObjectionGeneratorAnalysisEntity,
    ): MedicalAndSocialReportObjectionGeneratorAnalysisTypeormEntity => {
      const createdBy = {
        id: source.createdBy.toString(),
      } as OrganizationMemberTypeormEntity;

      const updatedBy = {
        id: source.updatedBy.toString(),
      } as OrganizationMemberTypeormEntity;

      const medicalAndSocialReportObjectionGeneratorAnalysisResult =
        source.medicalAndSocialReportObjectionGeneratorAnalysisResult !== null
          ? this.mapper.map(
              source.medicalAndSocialReportObjectionGeneratorAnalysisResult,
              MedicalAndSocialReportObjectionGeneratorAnalysisResultEntity,
              MedicalAndSocialReportObjectionGeneratorAnalysisResultTypeormEntity,
            )
          : undefined;

      const medicalAndSocialReportObjectionGeneratorAnalysisBenefit =
        this.mapper.mapArray(
          source.medicalAndSocialReportObjectionGeneratorAnalysisBenefit,
          MedicalAndSocialReportObjectionGeneratorAnalysisBenefitEntity,
          MedicalAndSocialReportObjectionGeneratorAnalysisBenefitTypeormEntity,
        );

      const medicalAndSocialReportObjectionGeneratorAnalysisLegalProceeding =
        this.mapper.mapArray(
          source.medicalAndSocialReportObjectionGeneratorAnalysisLegalProceeding,
          MedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingEntity,
          MedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingTypeormEntity,
        );

      const medicalAndSocialReportObjectionGeneratorAnalysisDocument =
        this.mapper.mapArray(
          source.medicalAndSocialReportObjectionGeneratorAnalysisDocument,
          MedicalAndSocialReportObjectionGeneratorAnalysisDocumentEntity,
          MedicalAndSocialReportObjectionGeneratorAnalysisDocumentTypeormEntity,
        );

      return MedicalAndSocialReportObjectionGeneratorAnalysisTypeormEntity.build(
        {
          ...source,
          id: source.id.toString(),
          msReportObjectionAnalysisResult:
            medicalAndSocialReportObjectionGeneratorAnalysisResult,
          medicalAndSocialReportObjectionGeneratorAnalysisBenefit,
          medicalAndSocialReportObjectionGeneratorAnalysisLegalProceeding,
          medicalAndSocialReportObjectionGeneratorAnalysisDocument,
          createdBy,
          updatedBy,
        },
      );
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      MedicalAndSocialReportObjectionGeneratorAnalysisEntity,
      MedicalAndSocialReportObjectionGeneratorAnalysisTypeormEntity,
      mappingFunction,
    );
  }
}
