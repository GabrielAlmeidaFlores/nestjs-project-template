import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { AnalysisToolRecordTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-record.typeorm.entity';
import { OrganizationMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-member.typeorm.entity';
import { PerCapitaIncomeForBpcAnalysisDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/per-capita-income-for-bpc-analysis-document.typeorm.entity';
import { PerCapitaIncomeForBpcAnalysisFamilyMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/per-capita-income-for-bpc-analysis-family-member.typeorm.entity';
import { PerCapitaIncomeForBpcAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/per-capita-income-for-bpc-analysis-result.typeorm.entity';
import { PerCapitaIncomeForBpcAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/per-capita-income-for-bpc-analysis.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import { AnalysisToolRecordEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/analysis-tool-record.entity';
import { PerCapitaIncomeForBpcAnalysisEntity } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis/per-capita-income-for-bpc-analysis.entity';
import { PerCapitaIncomeForBpcAnalysisId } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis/value-object/per-capita-income-for-bpc-analysis-id/per-capita-income-for-bpc-analysis-id.value-object';
import { PerCapitaIncomeForBpcAnalysisDocumentEntity } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-document/per-capita-income-for-bpc-analysis-document.entity';
import { PerCapitaIncomeForBpcAnalysisFamilyMemberEntity } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-family-member/per-capita-income-for-bpc-analysis-family-member.entity';
import { PerCapitaIncomeForBpcAnalysisResultEntity } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-result/per-capita-income-for-bpc-analysis-result.entity';

@Injectable()
export class PerCapitaIncomeForBpcAnalysisEntityAutoMapperProfile {
  protected readonly _type =
    PerCapitaIncomeForBpcAnalysisEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: PerCapitaIncomeForBpcAnalysisTypeormEntity,
    ): PerCapitaIncomeForBpcAnalysisEntity => {
      if (!source.createdBy || !source.updatedBy) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass: PerCapitaIncomeForBpcAnalysisEntity.name,
          sourceClass: PerCapitaIncomeForBpcAnalysisTypeormEntity.name,
        });
      }

      const perCapitaIncomeForBpcAnalysisResult =
        source.perCapitaIncomeForBpcAnalysisResult !== undefined
          ? this.mapper.map(
              source.perCapitaIncomeForBpcAnalysisResult,
              PerCapitaIncomeForBpcAnalysisResultTypeormEntity,
              PerCapitaIncomeForBpcAnalysisResultEntity,
            )
          : null;

      const perCapitaIncomeForBpcAnalysisFamilyMember =
        source.perCapitaIncomeForBpcAnalysisFamilyMember !== undefined
          ? this.mapper.mapArray(
              source.perCapitaIncomeForBpcAnalysisFamilyMember,
              PerCapitaIncomeForBpcAnalysisFamilyMemberTypeormEntity,
              PerCapitaIncomeForBpcAnalysisFamilyMemberEntity,
            )
          : [];

      const perCapitaIncomeForBpcAnalysisDocument =
        source.perCapitaIncomeForBpcAnalysisDocument !== undefined
          ? this.mapper.mapArray(
              source.perCapitaIncomeForBpcAnalysisDocument,
              PerCapitaIncomeForBpcAnalysisDocumentTypeormEntity,
              PerCapitaIncomeForBpcAnalysisDocumentEntity,
            )
          : [];

      return new PerCapitaIncomeForBpcAnalysisEntity({
        id: new PerCapitaIncomeForBpcAnalysisId(source.id),
        perCapitaIncomeForBpcAnalysisResult,
        perCapitaIncomeForBpcAnalysisFamilyMember,
        perCapitaIncomeForBpcAnalysisDocument,
        createdBy: new OrganizationMemberId(source.createdBy.id),
        updatedBy: new OrganizationMemberId(source.updatedBy.id),
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt ?? null,
      });
    };

    createMap(
      this.mapper,
      PerCapitaIncomeForBpcAnalysisTypeormEntity,
      PerCapitaIncomeForBpcAnalysisEntity,
      constructUsing(convertOrmEntityToDomainEntity),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: PerCapitaIncomeForBpcAnalysisEntity,
    ): PerCapitaIncomeForBpcAnalysisTypeormEntity => {
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

      let perCapitaIncomeForBpcAnalysisResult:
        | PerCapitaIncomeForBpcAnalysisResultTypeormEntity
        | undefined;

      if (source.perCapitaIncomeForBpcAnalysisResult !== null) {
        perCapitaIncomeForBpcAnalysisResult = this.mapper.map(
          source.perCapitaIncomeForBpcAnalysisResult,
          PerCapitaIncomeForBpcAnalysisResultEntity,
          PerCapitaIncomeForBpcAnalysisResultTypeormEntity,
        );

        // Set the back reference for bidirectional OneToOne relationship
        perCapitaIncomeForBpcAnalysisResult.perCapitaIncomeForBpcAnalysis = {
          id: source.id.toString(),
        } as PerCapitaIncomeForBpcAnalysisTypeormEntity;
      } else {
        perCapitaIncomeForBpcAnalysisResult = undefined;
      }

      const perCapitaIncomeForBpcAnalysisFamilyMember = this.mapper.mapArray(
        source.perCapitaIncomeForBpcAnalysisFamilyMember,
        PerCapitaIncomeForBpcAnalysisFamilyMemberEntity,
        PerCapitaIncomeForBpcAnalysisFamilyMemberTypeormEntity,
      );

      const perCapitaIncomeForBpcAnalysisDocument = this.mapper.mapArray(
        source.perCapitaIncomeForBpcAnalysisDocument,
        PerCapitaIncomeForBpcAnalysisDocumentEntity,
        PerCapitaIncomeForBpcAnalysisDocumentTypeormEntity,
      );

      return PerCapitaIncomeForBpcAnalysisTypeormEntity.build({
        id: source.id.toString(),
        analysisToolRecord,
        perCapitaIncomeForBpcAnalysisResult,
        perCapitaIncomeForBpcAnalysisFamilyMember,
        perCapitaIncomeForBpcAnalysisDocument,
        createdBy,
        updatedBy,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      PerCapitaIncomeForBpcAnalysisEntity,
      PerCapitaIncomeForBpcAnalysisTypeormEntity,
      mappingFunction,
    );
  }
}
