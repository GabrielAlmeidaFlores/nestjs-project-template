import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { InsuranceQualityAnalysisDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/insurance-quality-analysis-document.typeorm.entity';
import { GetInsuranceQualityAnalysisDocumentQueryResult } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/repository/insurance-quality-analysis/query/result/get-insurance-quality-analysis-document.query.result';
import { InsuranceQualityAnalysisDocumentId } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/schema/entity/insurance-quality-analysis-document/value-object/insurance-quality-analysis-document-id/insurance-quality-analysis-document-id.value-object';

@Injectable()
export class GetInsuranceQualityAnalysisDocumentQueryResultAutoMapperProfile {
  protected readonly _type =
    GetInsuranceQualityAnalysisDocumentQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: InsuranceQualityAnalysisDocumentTypeormEntity,
    ): GetInsuranceQualityAnalysisDocumentQueryResult => {
      return GetInsuranceQualityAnalysisDocumentQueryResult.build({
        ...source,
        id: new InsuranceQualityAnalysisDocumentId(source.id),
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      InsuranceQualityAnalysisDocumentTypeormEntity,
      GetInsuranceQualityAnalysisDocumentQueryResult,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetInsuranceQualityAnalysisDocumentQueryResult,
    ): InsuranceQualityAnalysisDocumentTypeormEntity => {
      return InsuranceQualityAnalysisDocumentTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        insuranceQualityAnalysis: undefined,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetInsuranceQualityAnalysisDocumentQueryResult,
      InsuranceQualityAnalysisDocumentTypeormEntity,
      mappingFunction,
    );
  }
}
