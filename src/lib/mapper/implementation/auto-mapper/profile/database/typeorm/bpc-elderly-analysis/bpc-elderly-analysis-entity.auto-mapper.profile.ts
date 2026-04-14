import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { AnalysisToolRecordTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-record.typeorm.entity';
import { BpcElderlyAnalysisDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-analysis-document.typeorm.entity';
import { BpcElderlyAnalysisFamilyMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-analysis-family-member.typeorm.entity';
import { BpcElderlyAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-analysis-result.typeorm.entity';
import { BpcElderlyAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-analysis.typeorm.entity';
import { OrganizationMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-member.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import { AnalysisToolRecordEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/analysis-tool-record.entity';
import { BpcElderlyAnalysisDocumentEntity } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-document/bpc-elderly-analysis-document.entity';
import { BpcElderlyAnalysisFamilyMemberEntity } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-family-member/bpc-elderly-analysis-family-member.entity';
import { BpcElderlyAnalysisResultEntity } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-result/bpc-elderly-analysis-result.entity';
import { BpcElderlyAnalysisEntity } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis/bpc-elderly-analysis.entity';
import { BpcElderlyAnalysisId } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis/value-object/bpc-elderly-analysis-id/bpc-elderly-analysis-id.value-object';

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

      return new BpcElderlyAnalysisEntity({
        id: new BpcElderlyAnalysisId(source.id),
        bpcElderlyAnalysisResult,
        bpcElderlyAnalysisFamilyMember,
        bpcElderlyAnalysisDocument,
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

      return BpcElderlyAnalysisTypeormEntity.build({
        id: source.id.toString(),
        analysisToolRecord,
        bpcElderlyAnalysisResult,
        bpcElderlyAnalysisFamilyMember,
        bpcElderlyAnalysisDocument,
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
