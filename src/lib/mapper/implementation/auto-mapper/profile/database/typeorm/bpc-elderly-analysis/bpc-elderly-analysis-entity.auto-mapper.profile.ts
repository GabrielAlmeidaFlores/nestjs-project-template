import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { AnalysisToolRecordTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-record.typeorm.entity';
import { BpcElderlyAnalysisDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-analysis-document.typeorm.entity';
import { BpcElderlyAnalysisFamilyMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-analysis-family-member.typeorm.entity';
import { BpcElderlyAnalysisInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-analysis-inss-benefit.typeorm.entity';
import { BpcElderlyAnalysisLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-analysis-legal-proceeding.typeorm.entity';
import { BpcElderlyAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-analysis-result.typeorm.entity';
import { BpcElderlyAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-analysis.typeorm.entity';
import { OrganizationMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-member.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import { AnalysisToolRecordEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/analysis-tool-record.entity';
import { BpcElderlyAnalysisEntity } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis/bpc-elderly-analysis.entity';
import { BpcElderlyAnalysisId } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis/value-object/bpc-elderly-analysis-id/bpc-elderly-analysis-id.value-object';
import { BpcElderlyAnalysisDocumentEntity } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-document/bpc-elderly-analysis-document.entity';
import { BpcElderlyAnalysisFamilyMemberEntity } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-family-member/bpc-elderly-analysis-family-member.entity';
import { BpcElderlyAnalysisInssBenefitEntity } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-inss-benefit/bpc-elderly-analysis-inss-benefit.entity';
import { BpcElderlyAnalysisLegalProceedingEntity } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-legal-proceeding/bpc-elderly-analysis-legal-proceeding.entity';
import { BpcElderlyAnalysisResultEntity } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-result/bpc-elderly-analysis-result.entity';

@Injectable()
export class BpcElderlyAnalysisEntityAutoMapperProfile {
  protected readonly _type = BpcElderlyAnalysisEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: BpcElderlyAnalysisTypeormEntity,
    ): BpcElderlyAnalysisEntity => {
      if (!source.createdBy || !source.updatedBy) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass: BpcElderlyAnalysisEntity.name,
          sourceClass: BpcElderlyAnalysisTypeormEntity.name,
        });
      }

      const bpcElderlyAnalysisResult =
        source.bpcElderlyAnalysisResult !== undefined
          ? this.mapper.map(
              source.bpcElderlyAnalysisResult,
              BpcElderlyAnalysisResultTypeormEntity,
              BpcElderlyAnalysisResultEntity,
            )
          : null;

      const bpcElderlyAnalysisFamilyMember =
        source.bpcElderlyAnalysisFamilyMember !== undefined
          ? this.mapper.mapArray(
              source.bpcElderlyAnalysisFamilyMember,
              BpcElderlyAnalysisFamilyMemberTypeormEntity,
              BpcElderlyAnalysisFamilyMemberEntity,
            )
          : [];

      const bpcElderlyAnalysisDocument =
        source.bpcElderlyAnalysisDocument !== undefined
          ? this.mapper.mapArray(
              source.bpcElderlyAnalysisDocument,
              BpcElderlyAnalysisDocumentTypeormEntity,
              BpcElderlyAnalysisDocumentEntity,
            )
          : [];

      const bpcElderlyAnalysisInssBenefit =
        source.bpcElderlyAnalysisInssBenefit !== undefined
          ? this.mapper.mapArray(
              source.bpcElderlyAnalysisInssBenefit,
              BpcElderlyAnalysisInssBenefitTypeormEntity,
              BpcElderlyAnalysisInssBenefitEntity,
            )
          : [];

      const bpcElderlyAnalysisLegalProceeding =
        source.bpcElderlyAnalysisLegalProceeding !== undefined
          ? this.mapper.mapArray(
              source.bpcElderlyAnalysisLegalProceeding,
              BpcElderlyAnalysisLegalProceedingTypeormEntity,
              BpcElderlyAnalysisLegalProceedingEntity,
            )
          : [];

      return new BpcElderlyAnalysisEntity({
        id: new BpcElderlyAnalysisId(source.id),
        name: source.name ?? null,
        bpcElderlyAnalysisResult,
        bpcElderlyAnalysisFamilyMember,
        bpcElderlyAnalysisDocument,
        bpcElderlyAnalysisInssBenefit,
        bpcElderlyAnalysisLegalProceeding,
        createdBy: new OrganizationMemberId(source.createdBy.id),
        updatedBy: new OrganizationMemberId(source.updatedBy.id),
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt ?? null,
      });
    };

    createMap(
      this.mapper,
      BpcElderlyAnalysisTypeormEntity,
      BpcElderlyAnalysisEntity,
      constructUsing(convertOrmEntityToDomainEntity),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: BpcElderlyAnalysisEntity,
    ): BpcElderlyAnalysisTypeormEntity => {
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

      let bpcElderlyAnalysisResult:
        | BpcElderlyAnalysisResultTypeormEntity
        | undefined;

      if (source.bpcElderlyAnalysisResult !== null) {
        bpcElderlyAnalysisResult = this.mapper.map(
          source.bpcElderlyAnalysisResult,
          BpcElderlyAnalysisResultEntity,
          BpcElderlyAnalysisResultTypeormEntity,
        );

        bpcElderlyAnalysisResult.bpcElderlyAnalysis = {
          id: source.id.toString(),
        } as BpcElderlyAnalysisTypeormEntity;
      }

      const bpcElderlyAnalysisFamilyMember = this.mapper.mapArray(
        source.bpcElderlyAnalysisFamilyMember,
        BpcElderlyAnalysisFamilyMemberEntity,
        BpcElderlyAnalysisFamilyMemberTypeormEntity,
      );

      const bpcElderlyAnalysisDocument = this.mapper.mapArray(
        source.bpcElderlyAnalysisDocument,
        BpcElderlyAnalysisDocumentEntity,
        BpcElderlyAnalysisDocumentTypeormEntity,
      );

      const bpcElderlyAnalysisInssBenefit = this.mapper.mapArray(
        source.bpcElderlyAnalysisInssBenefit,
        BpcElderlyAnalysisInssBenefitEntity,
        BpcElderlyAnalysisInssBenefitTypeormEntity,
      );

      const bpcElderlyAnalysisLegalProceeding = this.mapper.mapArray(
        source.bpcElderlyAnalysisLegalProceeding,
        BpcElderlyAnalysisLegalProceedingEntity,
        BpcElderlyAnalysisLegalProceedingTypeormEntity,
      );

      return BpcElderlyAnalysisTypeormEntity.build({
        id: source.id.toString(),
        name: source.name,
        analysisToolRecord,
        bpcElderlyAnalysisResult,
        bpcElderlyAnalysisFamilyMember,
        bpcElderlyAnalysisDocument,
        bpcElderlyAnalysisInssBenefit,
        bpcElderlyAnalysisLegalProceeding,
        createdBy,
        updatedBy,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      BpcElderlyAnalysisEntity,
      BpcElderlyAnalysisTypeormEntity,
      constructUsing(convertDomainEntityToOrmEntity),
    );
  }
}
