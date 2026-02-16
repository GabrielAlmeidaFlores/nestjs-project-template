import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { InsuranceQualityAnalysisLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/insurance-quality-analysis-legal-proceeding.typeorm.entity';
import { GetInsuranceQualityAnalysisLegalProceedingQueryResult } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/repository/insurance-quality-analysis-legal-proceeding/query/result/get-insurance-quality-analysis-legal-proceeding.query.result';

@Injectable()
export class GetInsuranceQualityAnalysisLegalProceedingQueryResultAutoMapperProfile {
  protected readonly _type =
    GetInsuranceQualityAnalysisLegalProceedingQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: InsuranceQualityAnalysisLegalProceedingTypeormEntity,
    ): GetInsuranceQualityAnalysisLegalProceedingQueryResult => {
      return GetInsuranceQualityAnalysisLegalProceedingQueryResult.build({
        id: new Guid(source.id),
        legalProceedingNumber: source.legalProceedingNumber,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      InsuranceQualityAnalysisLegalProceedingTypeormEntity,
      GetInsuranceQualityAnalysisLegalProceedingQueryResult,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetInsuranceQualityAnalysisLegalProceedingQueryResult,
    ): InsuranceQualityAnalysisLegalProceedingTypeormEntity => {
      return InsuranceQualityAnalysisLegalProceedingTypeormEntity.build({
        id: source.id.toString(),
        legalProceedingNumber: source.legalProceedingNumber,
        insuranceQualityAnalysis: undefined,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetInsuranceQualityAnalysisLegalProceedingQueryResult,
      InsuranceQualityAnalysisLegalProceedingTypeormEntity,
      mappingFunction,
    );
  }
}
