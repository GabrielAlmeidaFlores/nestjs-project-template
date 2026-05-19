import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { AnalysisToolRecordTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-record.typeorm.entity';
import { BpcElderlyCessationDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-cessation-document.typeorm.entity';
import { BpcElderlyCessationFamilyMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-cessation-family-member.typeorm.entity';
import { BpcElderlyCessationInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-cessation-inss-benefit.typeorm.entity';
import { BpcElderlyCessationLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-cessation-legal-proceeding.typeorm.entity';
import { BpcElderlyCessationResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-cessation-result.typeorm.entity';
import { BpcElderlyCessationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-cessation.typeorm.entity';
import { OrganizationMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-member.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import { AnalysisToolRecordEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/analysis-tool-record.entity';
import { BpcElderlyCessationEntity } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation/bpc-elderly-cessation.entity';
import { BpcElderlyCessationId } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation/value-object/bpc-elderly-cessation-id/bpc-elderly-cessation-id.value-object';
import { BpcElderlyCessationDocumentEntity } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-document/bpc-elderly-cessation-document.entity';
import { BpcElderlyCessationFamilyMemberEntity } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-family-member/bpc-elderly-cessation-family-member.entity';
import { BpcElderlyCessationInssBenefitEntity } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-inss-benefit/bpc-elderly-cessation-inss-benefit.entity';
import { BpcElderlyCessationLegalProceedingEntity } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-legal-proceeding/bpc-elderly-cessation-legal-proceeding.entity';
import { BpcElderlyCessationResultEntity } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-result/bpc-elderly-cessation-result.entity';

@Injectable()
export class BpcElderlyCessationEntityAutoMapperProfile {
  protected readonly _type = BpcElderlyCessationEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: BpcElderlyCessationTypeormEntity,
    ): BpcElderlyCessationEntity => {
      if (!source.createdBy || !source.updatedBy) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass: BpcElderlyCessationEntity.name,
          sourceClass: BpcElderlyCessationTypeormEntity.name,
        });
      }

      const bpcElderlyCessationResult =
        source.bpcElderlyCessationResult !== undefined
          ? this.mapper.map(
              source.bpcElderlyCessationResult,
              BpcElderlyCessationResultTypeormEntity,
              BpcElderlyCessationResultEntity,
            )
          : null;

      const bpcElderlyCessationFamilyMember =
        source.bpcElderlyCessationFamilyMember !== undefined
          ? this.mapper.mapArray(
              source.bpcElderlyCessationFamilyMember,
              BpcElderlyCessationFamilyMemberTypeormEntity,
              BpcElderlyCessationFamilyMemberEntity,
            )
          : [];

      const bpcElderlyCessationDocument =
        source.bpcElderlyCessationDocument !== undefined
          ? this.mapper.mapArray(
              source.bpcElderlyCessationDocument,
              BpcElderlyCessationDocumentTypeormEntity,
              BpcElderlyCessationDocumentEntity,
            )
          : [];

      const bpcElderlyCessationInssBenefit =
        source.bpcElderlyCessationInssBenefit !== undefined
          ? this.mapper.mapArray(
              source.bpcElderlyCessationInssBenefit,
              BpcElderlyCessationInssBenefitTypeormEntity,
              BpcElderlyCessationInssBenefitEntity,
            )
          : [];

      const bpcElderlyCessationLegalProceeding =
        source.bpcElderlyCessationLegalProceeding !== undefined
          ? this.mapper.mapArray(
              source.bpcElderlyCessationLegalProceeding,
              BpcElderlyCessationLegalProceedingTypeormEntity,
              BpcElderlyCessationLegalProceedingEntity,
            )
          : [];

      return new BpcElderlyCessationEntity({
        id: new BpcElderlyCessationId(source.id),
        analysisName: source.analysisName ?? null,
        decisionDate: source.decisionDate ?? null,
        previousInssBenefitNumber: source.previousInssBenefitNumber ?? null,
        category: source.category ?? null,
        cessationReason: source.cessationReason ?? null,
        cessationReasonDescription: source.cessationReasonDescription ?? null,
        isAppealDeadlineExpired: source.isAppealDeadlineExpired ?? null,
        myInssPassword: source.myInssPassword ?? null,
        civilStatus: source.civilStatus ?? null,
        educationLevel: source.educationLevel ?? null,
        currentAddress: source.currentAddress ?? null,
        previousAddress: source.previousAddress ?? null,
        hasAddressChangedSinceDecision:
          source.hasAddressChangedSinceDecision ?? null,
        livesAlone: source.livesAlone ?? null,
        analysisToolRecord: source.analysisToolRecord
          ? this.mapper.map(
              source.analysisToolRecord,
              AnalysisToolRecordTypeormEntity,
              AnalysisToolRecordEntity,
            )
          : null,
        bpcElderlyCessationResult,
        bpcElderlyCessationFamilyMember,
        bpcElderlyCessationDocument,
        bpcElderlyCessationInssBenefit,
        bpcElderlyCessationLegalProceeding,
        createdBy: new OrganizationMemberId(source.createdBy.id),
        updatedBy: new OrganizationMemberId(source.updatedBy.id),
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt ?? null,
      });
    };

    createMap(
      this.mapper,
      BpcElderlyCessationTypeormEntity,
      BpcElderlyCessationEntity,
      constructUsing(convertOrmEntityToDomainEntity),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: BpcElderlyCessationEntity,
    ): BpcElderlyCessationTypeormEntity => {
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

      let bpcElderlyCessationResult:
        | BpcElderlyCessationResultTypeormEntity
        | undefined;

      if (source.bpcElderlyCessationResult !== null) {
        bpcElderlyCessationResult = this.mapper.map(
          source.bpcElderlyCessationResult,
          BpcElderlyCessationResultEntity,
          BpcElderlyCessationResultTypeormEntity,
        );

        bpcElderlyCessationResult.bpcElderlyCessation = {
          id: source.id.toString(),
        } as BpcElderlyCessationTypeormEntity;
      }

      const bpcElderlyCessationFamilyMember = this.mapper.mapArray(
        source.bpcElderlyCessationFamilyMember,
        BpcElderlyCessationFamilyMemberEntity,
        BpcElderlyCessationFamilyMemberTypeormEntity,
      );

      const bpcElderlyCessationDocument = this.mapper.mapArray(
        source.bpcElderlyCessationDocument,
        BpcElderlyCessationDocumentEntity,
        BpcElderlyCessationDocumentTypeormEntity,
      );

      const bpcElderlyCessationInssBenefit = this.mapper.mapArray(
        source.bpcElderlyCessationInssBenefit,
        BpcElderlyCessationInssBenefitEntity,
        BpcElderlyCessationInssBenefitTypeormEntity,
      );

      const bpcElderlyCessationLegalProceeding = this.mapper.mapArray(
        source.bpcElderlyCessationLegalProceeding,
        BpcElderlyCessationLegalProceedingEntity,
        BpcElderlyCessationLegalProceedingTypeormEntity,
      );

      return BpcElderlyCessationTypeormEntity.build({
        id: source.id.toString(),
        analysisName: source.analysisName,
        decisionDate: source.decisionDate,
        previousInssBenefitNumber: source.previousInssBenefitNumber,
        category: source.category,
        cessationReason: source.cessationReason,
        cessationReasonDescription: source.cessationReasonDescription,
        isAppealDeadlineExpired: source.isAppealDeadlineExpired,
        myInssPassword: source.myInssPassword,
        civilStatus: source.civilStatus,
        educationLevel: source.educationLevel,
        currentAddress: source.currentAddress,
        previousAddress: source.previousAddress,
        hasAddressChangedSinceDecision: source.hasAddressChangedSinceDecision,
        livesAlone: source.livesAlone,
        analysisToolRecord,
        bpcElderlyCessationResult,
        bpcElderlyCessationFamilyMember,
        bpcElderlyCessationDocument,
        bpcElderlyCessationInssBenefit,
        bpcElderlyCessationLegalProceeding,
        createdBy,
        updatedBy,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      BpcElderlyCessationEntity,
      BpcElderlyCessationTypeormEntity,
      constructUsing(convertDomainEntityToOrmEntity),
    );
  }
}
