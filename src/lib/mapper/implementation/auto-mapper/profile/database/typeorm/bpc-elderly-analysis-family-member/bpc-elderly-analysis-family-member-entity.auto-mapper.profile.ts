import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { BpcElderlyAnalysisFamilyMemberDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-analysis-family-member-document.typeorm.entity';
import { BpcElderlyAnalysisFamilyMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-analysis-family-member.typeorm.entity';
import { BpcElderlyAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-analysis.typeorm.entity';
import { BpcElderlyAnalysisFamilyMemberDocumentEntity } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-family-member-document/bpc-elderly-analysis-family-member-document.entity';
import { BpcElderlyAnalysisFamilyMemberEntity } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-family-member/bpc-elderly-analysis-family-member.entity';
import { BpcElderlyAnalysisFamilyMemberId } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-family-member/value-object/bpc-elderly-analysis-family-member-id/bpc-elderly-analysis-family-member-id.value-object';
import { BpcElderlyAnalysisEntity } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis/bpc-elderly-analysis.entity';

@Injectable()
export class BpcElderlyAnalysisFamilyMemberEntityAutoMapperProfile {
  protected readonly _type =
    BpcElderlyAnalysisFamilyMemberEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: BpcElderlyAnalysisFamilyMemberTypeormEntity,
    ): BpcElderlyAnalysisFamilyMemberEntity => {
      const bpcElderlyAnalysis = this.mapper.map(
        source.bpcElderlyAnalysis,
        BpcElderlyAnalysisTypeormEntity,
        BpcElderlyAnalysisEntity,
      );

      const bpcElderlyAnalysisFamilyMemberDocument =
        source.bpcElderlyAnalysisFamilyMemberDocument !== undefined
          ? this.mapper.mapArray(
              source.bpcElderlyAnalysisFamilyMemberDocument,
              BpcElderlyAnalysisFamilyMemberDocumentTypeormEntity,
              BpcElderlyAnalysisFamilyMemberDocumentEntity,
            )
          : [];

      return new BpcElderlyAnalysisFamilyMemberEntity({
        id: new BpcElderlyAnalysisFamilyMemberId(source.id),
        fullName: source.fullName,
        birthDate: source.birthDate,
        kinship: source.kinship,
        livesInSameResidence: source.livesInSameResidence,
        hasIncome: source.hasIncome,
        monthlyIncomeAmount:
          source.monthlyIncomeAmount !== null &&
          source.monthlyIncomeAmount !== undefined
            ? parseFloat(source.monthlyIncomeAmount)
            : null,
        incomeType: source.incomeType,
        bpcElderlyAnalysis,
        bpcElderlyAnalysisFamilyMemberDocument,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt ?? null,
      });
    };

    createMap(
      this.mapper,
      BpcElderlyAnalysisFamilyMemberTypeormEntity,
      BpcElderlyAnalysisFamilyMemberEntity,
      constructUsing(convertOrmEntityToDomainEntity),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: BpcElderlyAnalysisFamilyMemberEntity,
    ): BpcElderlyAnalysisFamilyMemberTypeormEntity => {
      const bpcElderlyAnalysis = this.mapper.map(
        source.bpcElderlyAnalysis,
        BpcElderlyAnalysisEntity,
        BpcElderlyAnalysisTypeormEntity,
      );

      const bpcElderlyAnalysisFamilyMemberDocument = this.mapper.mapArray(
        source.bpcElderlyAnalysisFamilyMemberDocument,
        BpcElderlyAnalysisFamilyMemberDocumentEntity,
        BpcElderlyAnalysisFamilyMemberDocumentTypeormEntity,
      );

      return BpcElderlyAnalysisFamilyMemberTypeormEntity.build({
        id: source.id.toString(),
        fullName: source.fullName,
        birthDate: source.birthDate,
        kinship: source.kinship,
        livesInSameResidence: source.livesInSameResidence,
        hasIncome: source.hasIncome,
        monthlyIncomeAmount: source.monthlyIncomeAmount?.toString() ?? null,
        incomeType: source.incomeType,
        bpcElderlyAnalysis,
        bpcElderlyAnalysisFamilyMemberDocument,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      BpcElderlyAnalysisFamilyMemberEntity,
      BpcElderlyAnalysisFamilyMemberTypeormEntity,
      constructUsing(convertDomainEntityToOrmEntity),
    );
  }
}
