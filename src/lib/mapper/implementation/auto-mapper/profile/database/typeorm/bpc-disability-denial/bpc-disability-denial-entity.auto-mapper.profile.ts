import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { AnalysisToolRecordTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-record.typeorm.entity';
import { BpcDisabilityDenialDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-denial-document.typeorm.entity';
import { BpcDisabilityDenialFamilyMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-denial-family-member.typeorm.entity';
import { BpcDisabilityDenialInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-denial-inss-benefit.typeorm.entity';
import { BpcDisabilityDenialLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-denial-legal-proceeding.typeorm.entity';
import { BpcDisabilityDenialResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-denial-result.typeorm.entity';
import { BpcDisabilityDenialTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-denial.typeorm.entity';
import { OrganizationMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-member.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import { AnalysisToolRecordEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/analysis-tool-record.entity';
import { BpcDisabilityDenialEntity } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial/bpc-disability-denial.entity';
import { BpcDisabilityDenialId } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial/value-object/bpc-disability-denial-id/bpc-disability-denial-id.value-object';
import { BpcDisabilityDenialDocumentEntity } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-document/bpc-disability-denial-document.entity';
import { BpcDisabilityDenialFamilyMemberEntity } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-family-member/bpc-disability-denial-family-member.entity';
import { BpcDisabilityDenialInssBenefitEntity } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-inss-benefit/bpc-disability-denial-inss-benefit.entity';
import { BpcDisabilityDenialLegalProceedingEntity } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-legal-proceeding/bpc-disability-denial-legal-proceeding.entity';
import { BpcDisabilityDenialResultEntity } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-result/bpc-disability-denial-result.entity';

@Injectable()
export class BpcDisabilityDenialEntityAutoMapperProfile {
  protected readonly _type = BpcDisabilityDenialEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: BpcDisabilityDenialTypeormEntity,
    ): BpcDisabilityDenialEntity => {
      if (!source.createdBy || !source.updatedBy) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass: BpcDisabilityDenialEntity.name,
          sourceClass: BpcDisabilityDenialTypeormEntity.name,
        });
      }

      const bpcDisabilityDenialResult =
        source.bpcDisabilityDenialResult !== undefined
          ? this.mapper.map(
              source.bpcDisabilityDenialResult,
              BpcDisabilityDenialResultTypeormEntity,
              BpcDisabilityDenialResultEntity,
            )
          : null;

      const bpcDisabilityDenialFamilyMember =
        source.bpcDisabilityDenialFamilyMember !== undefined
          ? this.mapper.mapArray(
              source.bpcDisabilityDenialFamilyMember,
              BpcDisabilityDenialFamilyMemberTypeormEntity,
              BpcDisabilityDenialFamilyMemberEntity,
            )
          : [];

      const bpcDisabilityDenialDocument =
        source.bpcDisabilityDenialDocument !== undefined
          ? this.mapper.mapArray(
              source.bpcDisabilityDenialDocument,
              BpcDisabilityDenialDocumentTypeormEntity,
              BpcDisabilityDenialDocumentEntity,
            )
          : [];

      const bpcDisabilityDenialInssBenefit =
        source.bpcDisabilityDenialInssBenefit !== undefined
          ? this.mapper.mapArray(
              source.bpcDisabilityDenialInssBenefit,
              BpcDisabilityDenialInssBenefitTypeormEntity,
              BpcDisabilityDenialInssBenefitEntity,
            )
          : [];

      const bpcDisabilityDenialLegalProceeding =
        source.bpcDisabilityDenialLegalProceeding !== undefined
          ? this.mapper.mapArray(
              source.bpcDisabilityDenialLegalProceeding,
              BpcDisabilityDenialLegalProceedingTypeormEntity,
              BpcDisabilityDenialLegalProceedingEntity,
            )
          : [];

      return new BpcDisabilityDenialEntity({
        id: new BpcDisabilityDenialId(source.id),
        analysisName: source.analysisName ?? null,
        requestEntryDate: source.requestEntryDate ?? null,
        denialDate: source.denialDate ?? null,
        requestedBenefitType: source.requestedBenefitType ?? null,
        category: source.category ?? null,
        denialReason: source.denialReason ?? null,
        denialReasonDescription: source.denialReasonDescription ?? null,
        disabilityType: source.disabilityType ?? null,
        disabilityDegree: source.disabilityDegree ?? null,
        estimatedDisabilityStartDate:
          source.estimatedDisabilityStartDate ?? null,
        attendsSchoolOrTechnicalCourse:
          source.attendsSchoolOrTechnicalCourse ?? null,
        performsLaborActivity: source.performsLaborActivity ?? null,
        needsThirdPartyHelp: source.needsThirdPartyHelp ?? null,
        hasAccessToBasicServices: source.hasAccessToBasicServices ?? null,
        otherBarriersDescription: source.otherBarriersDescription ?? null,
        livesAlone: source.livesAlone ?? null,
        analysisToolRecord: source.analysisToolRecord
          ? this.mapper.map(
              source.analysisToolRecord,
              AnalysisToolRecordTypeormEntity,
              AnalysisToolRecordEntity,
            )
          : null,
        bpcDisabilityDenialResult,
        bpcDisabilityDenialFamilyMember,
        bpcDisabilityDenialDocument,
        bpcDisabilityDenialInssBenefit,
        bpcDisabilityDenialLegalProceeding,
        createdBy: new OrganizationMemberId(source.createdBy.id),
        updatedBy: new OrganizationMemberId(source.updatedBy.id),
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt ?? null,
      });
    };

    createMap(
      this.mapper,
      BpcDisabilityDenialTypeormEntity,
      BpcDisabilityDenialEntity,
      constructUsing(convertOrmEntityToDomainEntity),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: BpcDisabilityDenialEntity,
    ): BpcDisabilityDenialTypeormEntity => {
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

      let bpcDisabilityDenialResult:
        | BpcDisabilityDenialResultTypeormEntity
        | undefined;

      if (source.bpcDisabilityDenialResult !== null) {
        bpcDisabilityDenialResult = this.mapper.map(
          source.bpcDisabilityDenialResult,
          BpcDisabilityDenialResultEntity,
          BpcDisabilityDenialResultTypeormEntity,
        );

        bpcDisabilityDenialResult.bpcDisabilityDenial = {
          id: source.id.toString(),
        } as BpcDisabilityDenialTypeormEntity;
      }

      const bpcDisabilityDenialFamilyMember = this.mapper.mapArray(
        source.bpcDisabilityDenialFamilyMember,
        BpcDisabilityDenialFamilyMemberEntity,
        BpcDisabilityDenialFamilyMemberTypeormEntity,
      );

      const bpcDisabilityDenialDocument = this.mapper.mapArray(
        source.bpcDisabilityDenialDocument,
        BpcDisabilityDenialDocumentEntity,
        BpcDisabilityDenialDocumentTypeormEntity,
      );

      const bpcDisabilityDenialInssBenefit = this.mapper.mapArray(
        source.bpcDisabilityDenialInssBenefit,
        BpcDisabilityDenialInssBenefitEntity,
        BpcDisabilityDenialInssBenefitTypeormEntity,
      );

      const bpcDisabilityDenialLegalProceeding = this.mapper.mapArray(
        source.bpcDisabilityDenialLegalProceeding,
        BpcDisabilityDenialLegalProceedingEntity,
        BpcDisabilityDenialLegalProceedingTypeormEntity,
      );

      return BpcDisabilityDenialTypeormEntity.build({
        id: source.id.toString(),
        analysisName: source.analysisName,
        requestEntryDate: source.requestEntryDate,
        denialDate: source.denialDate,
        requestedBenefitType: source.requestedBenefitType,
        category: source.category,
        denialReason: source.denialReason,
        denialReasonDescription: source.denialReasonDescription,
        disabilityType: source.disabilityType,
        disabilityDegree: source.disabilityDegree,
        estimatedDisabilityStartDate: source.estimatedDisabilityStartDate,
        attendsSchoolOrTechnicalCourse: source.attendsSchoolOrTechnicalCourse,
        performsLaborActivity: source.performsLaborActivity,
        needsThirdPartyHelp: source.needsThirdPartyHelp,
        hasAccessToBasicServices: source.hasAccessToBasicServices,
        otherBarriersDescription: source.otherBarriersDescription,
        livesAlone: source.livesAlone,
        analysisToolRecord,
        bpcDisabilityDenialResult,
        bpcDisabilityDenialFamilyMember,
        bpcDisabilityDenialDocument,
        bpcDisabilityDenialInssBenefit,
        bpcDisabilityDenialLegalProceeding,
        createdBy,
        updatedBy,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      BpcDisabilityDenialEntity,
      BpcDisabilityDenialTypeormEntity,
      constructUsing(convertDomainEntityToOrmEntity),
    );
  }
}
