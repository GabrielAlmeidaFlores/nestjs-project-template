import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { AnalysisToolClientTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-client.typeorm.entity';
import { InsuranceQualityAnalysisInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/insurance-quality-analysis-inss-benefit.typeorm.entity';
import { InsuranceQualityAnalysisLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/insurance-quality-analysis-legal-proceeding.typeorm.entity';
import { InsuranceQualityAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/insurance-quality-analysis-result.typeorm.entity';
import { InsuranceQualityAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/insurance-quality-analysis.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { GetAnalysisToolClientWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/result/get-analysis-tool-client-with-relations.query.result';
import { GetInsuranceQualityAnalysisWithRelationsQueryResult } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/repository/insurance-quality-analysis/query/result/get-insurance-quality-analysis-with-relations.query.result';
import { GetInsuranceQualityAnalysisInssBenefitQueryResult } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/repository/insurance-quality-analysis-inss-benefit/query/result/get-insurance-quality-analysis-inss-benefit.query.result';
import { GetInsuranceQualityAnalysisLegalProceedingQueryResult } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/repository/insurance-quality-analysis-legal-proceeding/query/result/get-insurance-quality-analysis-legal-proceeding.query.result';
import { GetInsuranceQualityAnalysisResultQueryResult } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/repository/insurance-quality-analysis-result/query/result/get-insurance-quality-analysis-result.query.result';
import { InsuranceQualityAnalysisId } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/schema/entity/insurance-quality-analysis/value-object/insurance-quality-analysis-id/insurance-quality-analysis-id.value-object';

@Injectable()
export class GetInsuranceQualityAnalysisWithRelationsQueryResultAutoMapperProfile {
  protected readonly _type =
    GetInsuranceQualityAnalysisWithRelationsQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: InsuranceQualityAnalysisTypeormEntity,
    ): GetInsuranceQualityAnalysisWithRelationsQueryResult => {
      if (!source.analysisToolRecord?.analysisToolClient) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass:
            GetInsuranceQualityAnalysisWithRelationsQueryResult.name,
          sourceClass: InsuranceQualityAnalysisTypeormEntity.name,
        });
      }

      const insuranceQualityAnalysisResult =
        source.insuranceQualityAnalysisResult
          ? this.mapper.map(
              source.insuranceQualityAnalysisResult,
              InsuranceQualityAnalysisResultTypeormEntity,
              GetInsuranceQualityAnalysisResultQueryResult,
            )
          : null;

      const analysisToolClient = this.mapper.map(
        source.analysisToolRecord.analysisToolClient,
        AnalysisToolClientTypeormEntity,
        GetAnalysisToolClientWithRelationsQueryResult,
      );

      const insuranceQualityAnalysisInssBenefit = (
        source.insuranceQualityAnalysisInssBenefit ?? []
      ).map((benefit) =>
        this.mapper.map(
          benefit,
          InsuranceQualityAnalysisInssBenefitTypeormEntity,
          GetInsuranceQualityAnalysisInssBenefitQueryResult,
        ),
      );

      const insuranceQualityAnalysisLegalProceeding = (
        source.insuranceQualityAnalysisLegalProceeding ?? []
      ).map((proceeding) =>
        this.mapper.map(
          proceeding,
          InsuranceQualityAnalysisLegalProceedingTypeormEntity,
          GetInsuranceQualityAnalysisLegalProceedingQueryResult,
        ),
      );

      return GetInsuranceQualityAnalysisWithRelationsQueryResult.build({
        id: new InsuranceQualityAnalysisId(source.id),
        cnisDocument: source.cnisDocument,
        ruralDocument: source.ruralDocument,
        complementaryDocument: source.complementaryDocument,
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
        analysisToolClient,
        insuranceQualityAnalysisResult,
        insuranceQualityAnalysisInssBenefit,
        insuranceQualityAnalysisLegalProceeding,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToQueryResult);

    createMap(
      this.mapper,
      InsuranceQualityAnalysisTypeormEntity,
      GetInsuranceQualityAnalysisWithRelationsQueryResult,
      mappingFunction,
    );
  }
}
