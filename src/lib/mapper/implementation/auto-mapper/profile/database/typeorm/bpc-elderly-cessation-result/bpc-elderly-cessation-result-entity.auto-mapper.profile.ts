import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { BpcElderlyCessationResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-cessation-result.typeorm.entity';
import { BpcElderlyCessationResultEntity } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-result/bpc-elderly-cessation-result.entity';
import { BpcElderlyCessationResultId } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-result/value-object/bpc-elderly-cessation-result-id/bpc-elderly-cessation-result-id.value-object';

@Injectable()
export class BpcElderlyCessationResultEntityAutoMapperProfile {
  protected readonly _type =
    BpcElderlyCessationResultEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: BpcElderlyCessationResultTypeormEntity,
    ): BpcElderlyCessationResultEntity => {
      return new BpcElderlyCessationResultEntity({
        id: new BpcElderlyCessationResultId(source.id),
        inssDecisionAnalysis: source.inssDecisionAnalysis,
        firstAnalysis: source.firstAnalysis,
        completeAnalysis: source.completeAnalysis,
        completeAnalysisDownload: source.completeAnalysisDownload,
        simplifiedAnalysis: source.simplifiedAnalysis,
        applicableRules: source.applicableRules,
        benefitSummaries: source.benefitSummaries,
        analysisDetailedText: source.analysisDetailedText,
        diagnosis: source.diagnosis,
        totalHouseholdIncome:
          source.totalHouseholdIncome !== null
            ? Number(source.totalHouseholdIncome)
            : null,
        perCapitaIncome:
          source.perCapitaIncome !== null
            ? Number(source.perCapitaIncome)
            : null,
        legalRequirementsMet: source.legalRequirementsMet,
        perCapitaIncomeBelowQuarterMinimumWage:
          source.perCapitaIncomeBelowQuarterMinimumWage,
        ageEqualOrAbove65Years: source.ageEqualOrAbove65Years,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt ?? null,
      });
    };

    createMap(
      this.mapper,
      BpcElderlyCessationResultTypeormEntity,
      BpcElderlyCessationResultEntity,
      constructUsing(convertOrmEntityToDomainEntity),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: BpcElderlyCessationResultEntity,
    ): BpcElderlyCessationResultTypeormEntity => {
      return BpcElderlyCessationResultTypeormEntity.build({
        id: source.id.toString(),
        inssDecisionAnalysis: source.inssDecisionAnalysis,
        firstAnalysis: source.firstAnalysis,
        completeAnalysis: source.completeAnalysis,
        completeAnalysisDownload: source.completeAnalysisDownload,
        simplifiedAnalysis: source.simplifiedAnalysis,
        applicableRules: source.applicableRules,
        benefitSummaries: source.benefitSummaries,
        analysisDetailedText: source.analysisDetailedText,
        diagnosis: source.diagnosis,
        totalHouseholdIncome: source.totalHouseholdIncome,
        perCapitaIncome: source.perCapitaIncome,
        legalRequirementsMet: source.legalRequirementsMet,
        perCapitaIncomeBelowQuarterMinimumWage:
          source.perCapitaIncomeBelowQuarterMinimumWage,
        ageEqualOrAbove65Years: source.ageEqualOrAbove65Years,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      BpcElderlyCessationResultEntity,
      BpcElderlyCessationResultTypeormEntity,
      constructUsing(convertDomainEntityToOrmEntity),
    );
  }
}
