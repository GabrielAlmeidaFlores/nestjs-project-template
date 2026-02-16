import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { InsuranceQualityAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/insurance-quality-analysis-result.typeorm.entity';
import { InsuranceQualityAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/insurance-quality-analysis.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { InsuranceQualityAnalysisEntity } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/schema/entity/insurance-quality-analysis/insurance-quality-analysis.entity';
import { InsuranceQualityAnalysisId } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/schema/entity/insurance-quality-analysis/value-object/insurance-quality-analysis-id/insurance-quality-analysis-id.value-object';
import { InsuranceQualityAnalysisResultEntity } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/schema/entity/insurance-quality-analysis-result/insurance-quality-analysis-result.entity';

@Injectable()
export class InsuranceQualityAnalysisEntityAutoMapperProfile {
  protected readonly _type =
    InsuranceQualityAnalysisEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: InsuranceQualityAnalysisTypeormEntity,
    ): InsuranceQualityAnalysisEntity => {
      if (!source.analysisToolRecord?.analysisToolClient) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass: InsuranceQualityAnalysisEntity.name,
          sourceClass: InsuranceQualityAnalysisTypeormEntity.name,
        });
      }

      const insuranceQualityAnalysisResult = this.mapper.map(
        source.insuranceQualityAnalysisResult,
        InsuranceQualityAnalysisResultTypeormEntity,
        InsuranceQualityAnalysisResultEntity,
      );

      return new InsuranceQualityAnalysisEntity({
        id: new InsuranceQualityAnalysisId(source.id),
        analysisToolClientId: new AnalysisToolClientId(
          source.analysisToolRecord.analysisToolClient.id,
        ),
        analysisBenefitNumber: source.analysisBenefitNumber,
        analysisBenefitType: source.analysisBenefitType,
        analysisBenefitConcessionDate: source.analysisBenefitConcessionDate,
        analysisBenefitCessationDate: source.analysisBenefitCessationDate,
        analysisHasPreviousBenefit: source.analysisHasPreviousBenefit,
        analysisPreviousBenefitDetails: source.analysisPreviousBenefitDetails,
        analysisContributionSituation: source.analysisContributionSituation,
        analysisHasRuralActivity: source.analysisHasRuralActivity,
        analysisRuralActivityDetails: source.analysisRuralActivityDetails,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
        insuranceQualityAnalysisResult,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      InsuranceQualityAnalysisTypeormEntity,
      InsuranceQualityAnalysisEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: InsuranceQualityAnalysisEntity,
    ): InsuranceQualityAnalysisTypeormEntity => {
      const insuranceQualityAnalysisResult = this.mapper.map(
        source.insuranceQualityAnalysisResult,
        InsuranceQualityAnalysisResultEntity,
        InsuranceQualityAnalysisResultTypeormEntity,
      );

      return InsuranceQualityAnalysisTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        insuranceQualityAnalysisResult,
        insuranceQualityAnalysisInssBenefit: undefined,
        insuranceQualityAnalysisLegalProceeding: undefined,
        insuranceQualityAnalysisDocument: undefined,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      InsuranceQualityAnalysisEntity,
      InsuranceQualityAnalysisTypeormEntity,
      mappingFunction,
    );
  }
}
