import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { AnalysisToolRecordTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-record.typeorm.entity';
import { BpcDisabilityTerminationDisabilityAssessmentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-termination-disability-assessment.typeorm.entity';
import { BpcDisabilityTerminationDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-termination-document.typeorm.entity';
import { BpcDisabilityTerminationFamilyMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-termination-family-member.typeorm.entity';
import { BpcDisabilityTerminationInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-termination-inss-benefit.typeorm.entity';
import { BpcDisabilityTerminationLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-termination-legal-proceeding.typeorm.entity';
import { BpcDisabilityTerminationResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-termination-result.typeorm.entity';
import { BpcDisabilityTerminationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-termination.typeorm.entity';
import { OrganizationMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-member.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import { AnalysisToolRecordEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/analysis-tool-record.entity';
import { BpcDisabilityTerminationEntity } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination/bpc-disability-termination.entity';
import { BpcDisabilityTerminationId } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination/value-object/bpc-disability-termination-id/bpc-disability-termination-id.value-object';
import { BpcDisabilityTerminationDisabilityAssessmentEntity } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-disability-assessment/bpc-disability-termination-disability-assessment.entity';
import { BpcDisabilityTerminationDocumentEntity } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-document/bpc-disability-termination-document.entity';
import { BpcDisabilityTerminationFamilyMemberEntity } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-family-member/bpc-disability-termination-family-member.entity';
import { BpcDisabilityTerminationInssBenefitEntity } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-inss-benefit/bpc-disability-termination-inss-benefit.entity';
import { BpcDisabilityTerminationLegalProceedingEntity } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-legal-proceeding/bpc-disability-termination-legal-proceeding.entity';
import { BpcDisabilityTerminationResultEntity } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-result/bpc-disability-termination-result.entity';

@Injectable()
export class BpcDisabilityTerminationEntityAutoMapperProfile {
  protected readonly _type =
    BpcDisabilityTerminationEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: BpcDisabilityTerminationTypeormEntity,
    ): BpcDisabilityTerminationEntity => {
      if (!source.createdBy || !source.updatedBy) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass: BpcDisabilityTerminationEntity.name,
          sourceClass: BpcDisabilityTerminationTypeormEntity.name,
        });
      }

      const bpcDisabilityTerminationResult =
        source.bpcDisabilityTerminationResult !== undefined
          ? this.mapper.map(
              source.bpcDisabilityTerminationResult,
              BpcDisabilityTerminationResultTypeormEntity,
              BpcDisabilityTerminationResultEntity,
            )
          : null;

      const bpcDisabilityTerminationDisabilityAssessment =
        source.bpcDisabilityTerminationDisabilityAssessment !== undefined
          ? this.mapper.map(
              source.bpcDisabilityTerminationDisabilityAssessment,
              BpcDisabilityTerminationDisabilityAssessmentTypeormEntity,
              BpcDisabilityTerminationDisabilityAssessmentEntity,
            )
          : null;

      const bpcDisabilityTerminationFamilyMember =
        source.bpcDisabilityTerminationFamilyMember !== undefined
          ? this.mapper.mapArray(
              source.bpcDisabilityTerminationFamilyMember,
              BpcDisabilityTerminationFamilyMemberTypeormEntity,
              BpcDisabilityTerminationFamilyMemberEntity,
            )
          : [];

      const bpcDisabilityTerminationDocument =
        source.bpcDisabilityTerminationDocument !== undefined
          ? this.mapper.mapArray(
              source.bpcDisabilityTerminationDocument,
              BpcDisabilityTerminationDocumentTypeormEntity,
              BpcDisabilityTerminationDocumentEntity,
            )
          : [];

      const bpcDisabilityTerminationInssBenefit =
        source.bpcDisabilityTerminationInssBenefit !== undefined
          ? this.mapper.mapArray(
              source.bpcDisabilityTerminationInssBenefit,
              BpcDisabilityTerminationInssBenefitTypeormEntity,
              BpcDisabilityTerminationInssBenefitEntity,
            )
          : [];

      const bpcDisabilityTerminationLegalProceeding =
        source.bpcDisabilityTerminationLegalProceeding !== undefined
          ? this.mapper.mapArray(
              source.bpcDisabilityTerminationLegalProceeding,
              BpcDisabilityTerminationLegalProceedingTypeormEntity,
              BpcDisabilityTerminationLegalProceedingEntity,
            )
          : [];

      return new BpcDisabilityTerminationEntity({
        id: new BpcDisabilityTerminationId(source.id),
        analysisName: source.analysisName ?? null,
        category: source.category ?? null,
        disabilityType: source.disabilityType ?? null,
        disabilityDegree: source.disabilityDegree ?? null,
        benefitCessationReason: source.benefitCessationReason ?? null,
        livesAlone: source.livesAlone ?? null,
        analysisToolRecord: source.analysisToolRecord
          ? this.mapper.map(
              source.analysisToolRecord,
              AnalysisToolRecordTypeormEntity,
              AnalysisToolRecordEntity,
            )
          : null,
        bpcDisabilityTerminationResult,
        bpcDisabilityTerminationDisabilityAssessment,
        bpcDisabilityTerminationFamilyMember,
        bpcDisabilityTerminationDocument,
        bpcDisabilityTerminationInssBenefit,
        bpcDisabilityTerminationLegalProceeding,
        createdBy: new OrganizationMemberId(source.createdBy.id),
        updatedBy: new OrganizationMemberId(source.updatedBy.id),
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt ?? null,
      });
    };

    createMap(
      this.mapper,
      BpcDisabilityTerminationTypeormEntity,
      BpcDisabilityTerminationEntity,
      constructUsing(convertOrmEntityToDomainEntity),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: BpcDisabilityTerminationEntity,
    ): BpcDisabilityTerminationTypeormEntity => {
      const createdBy = {
        id: source.createdBy.toString(),
      } as OrganizationMemberTypeormEntity;

      const updatedBy = {
        id: source.updatedBy.toString(),
      } as OrganizationMemberTypeormEntity;

      const analysisToolRecord =
        source.analysisToolRecord !== null
          ? this.mapper.map(
              source.analysisToolRecord,
              AnalysisToolRecordEntity,
              AnalysisToolRecordTypeormEntity,
            )
          : undefined;

      let bpcDisabilityTerminationResult:
        | BpcDisabilityTerminationResultTypeormEntity
        | undefined;

      if (source.bpcDisabilityTerminationResult !== null) {
        bpcDisabilityTerminationResult = this.mapper.map(
          source.bpcDisabilityTerminationResult,
          BpcDisabilityTerminationResultEntity,
          BpcDisabilityTerminationResultTypeormEntity,
        );

        bpcDisabilityTerminationResult.bpcDisabilityTermination = {
          id: source.id.toString(),
        } as BpcDisabilityTerminationTypeormEntity;
      }

      let bpcDisabilityTerminationDisabilityAssessment:
        | BpcDisabilityTerminationDisabilityAssessmentTypeormEntity
        | undefined;

      if (source.bpcDisabilityTerminationDisabilityAssessment !== null) {
        bpcDisabilityTerminationDisabilityAssessment = this.mapper.map(
          source.bpcDisabilityTerminationDisabilityAssessment,
          BpcDisabilityTerminationDisabilityAssessmentEntity,
          BpcDisabilityTerminationDisabilityAssessmentTypeormEntity,
        );

        bpcDisabilityTerminationDisabilityAssessment.bpcDisabilityTermination =
          {
            id: source.id.toString(),
          } as BpcDisabilityTerminationTypeormEntity;
      }

      const bpcDisabilityTerminationFamilyMember = this.mapper.mapArray(
        source.bpcDisabilityTerminationFamilyMember,
        BpcDisabilityTerminationFamilyMemberEntity,
        BpcDisabilityTerminationFamilyMemberTypeormEntity,
      );

      const bpcDisabilityTerminationDocument = this.mapper.mapArray(
        source.bpcDisabilityTerminationDocument,
        BpcDisabilityTerminationDocumentEntity,
        BpcDisabilityTerminationDocumentTypeormEntity,
      );

      const bpcDisabilityTerminationInssBenefit = this.mapper.mapArray(
        source.bpcDisabilityTerminationInssBenefit,
        BpcDisabilityTerminationInssBenefitEntity,
        BpcDisabilityTerminationInssBenefitTypeormEntity,
      );

      const bpcDisabilityTerminationLegalProceeding = this.mapper.mapArray(
        source.bpcDisabilityTerminationLegalProceeding,
        BpcDisabilityTerminationLegalProceedingEntity,
        BpcDisabilityTerminationLegalProceedingTypeormEntity,
      );

      return BpcDisabilityTerminationTypeormEntity.build({
        id: source.id.toString(),
        analysisName: source.analysisName,
        category: source.category,
        disabilityType: source.disabilityType,
        disabilityDegree: source.disabilityDegree,
        benefitCessationReason: source.benefitCessationReason,
        livesAlone: source.livesAlone,
        analysisToolRecord,
        bpcDisabilityTerminationResult,
        bpcDisabilityTerminationDisabilityAssessment,
        bpcDisabilityTerminationFamilyMember,
        bpcDisabilityTerminationDocument,
        bpcDisabilityTerminationInssBenefit,
        bpcDisabilityTerminationLegalProceeding,
        createdBy,
        updatedBy,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      BpcDisabilityTerminationEntity,
      BpcDisabilityTerminationTypeormEntity,
      constructUsing(convertDomainEntityToOrmEntity),
    );
  }
}
