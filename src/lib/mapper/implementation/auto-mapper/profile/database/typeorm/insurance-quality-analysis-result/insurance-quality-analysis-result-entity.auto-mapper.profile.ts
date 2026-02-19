import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { InsuranceQualityAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/insurance-quality-analysis-result.typeorm.entity';
import { InsuranceQualityAnalysisResultEntity } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/schema/entity/insurance-quality-analysis-result/insurance-quality-analysis-result.entity';
import { InsuranceQualityAnalysisResultId } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/schema/entity/insurance-quality-analysis-result/value-object/insurance-quality-analysis-result-id/insurance-quality-analysis-result-id.value-object';

@Injectable()
export class InsuranceQualityAnalysisResultEntityAutoMapperProfile {
  protected readonly _type =
    InsuranceQualityAnalysisResultEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: InsuranceQualityAnalysisResultTypeormEntity,
    ): InsuranceQualityAnalysisResultEntity => {
      return new InsuranceQualityAnalysisResultEntity({
        id: new InsuranceQualityAnalysisResultId(source.id),
        clientName: source.clientName,
        clientFederalDocument:
          source.clientFederalDocument !== null
            ? new FederalDocument(source.clientFederalDocument)
            : null,
        clientBirthDate: source.clientBirthDate,
        insuranceQualityConclusion: source.insuranceQualityConclusion,
        gracePeriodConclusion: source.gracePeriodConclusion,
        finalRecommendation: source.finalRecommendation,
        analysisSummary: source.analysisSummary,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      InsuranceQualityAnalysisResultTypeormEntity,
      InsuranceQualityAnalysisResultEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: InsuranceQualityAnalysisResultEntity,
    ): InsuranceQualityAnalysisResultTypeormEntity => {
      return InsuranceQualityAnalysisResultTypeormEntity.build({
        id: source.id.toString(),
        clientName: source.clientName,
        clientFederalDocument: source.clientFederalDocument
          ? source.clientFederalDocument.toString()
          : null,
        clientBirthDate: source.clientBirthDate,
        insuranceQualityConclusion: source.insuranceQualityConclusion,
        gracePeriodConclusion: source.gracePeriodConclusion,
        finalRecommendation: source.finalRecommendation,
        analysisSummary: source.analysisSummary,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      InsuranceQualityAnalysisResultEntity,
      InsuranceQualityAnalysisResultTypeormEntity,
      mappingFunction,
    );
  }
}
