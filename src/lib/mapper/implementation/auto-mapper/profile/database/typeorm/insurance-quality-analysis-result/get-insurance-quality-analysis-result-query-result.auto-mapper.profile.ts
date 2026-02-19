import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { InsuranceQualityAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/insurance-quality-analysis-result.typeorm.entity';
import { GetInsuranceQualityAnalysisResultQueryResult } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/repository/insurance-quality-analysis-result/query/result/get-insurance-quality-analysis-result.query.result';
import { InsuranceQualityAnalysisResultId } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/schema/entity/insurance-quality-analysis-result/value-object/insurance-quality-analysis-result-id/insurance-quality-analysis-result-id.value-object';

@Injectable()
export class GetInsuranceQualityAnalysisResultQueryResultAutoMapperProfile {
  protected readonly _type =
    GetInsuranceQualityAnalysisResultQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: InsuranceQualityAnalysisResultTypeormEntity,
    ): GetInsuranceQualityAnalysisResultQueryResult => {
      return GetInsuranceQualityAnalysisResultQueryResult.build({
        id: new InsuranceQualityAnalysisResultId(source.id),
        insuranceQualityConclusion: source.insuranceQualityConclusion,
        gracePeriodConclusion: source.gracePeriodConclusion,
        finalRecommendation: source.finalRecommendation,
        analysisSummary: source.analysisSummary,
        clientName: source.clientName,
        clientFederalDocument:
          source.clientFederalDocument !== null
            ? new FederalDocument(source.clientFederalDocument)
            : null,
        clientBirthDate: source.clientBirthDate,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToQueryResult);

    createMap(
      this.mapper,
      InsuranceQualityAnalysisResultTypeormEntity,
      GetInsuranceQualityAnalysisResultQueryResult,
      mappingFunction,
    );
  }
}
