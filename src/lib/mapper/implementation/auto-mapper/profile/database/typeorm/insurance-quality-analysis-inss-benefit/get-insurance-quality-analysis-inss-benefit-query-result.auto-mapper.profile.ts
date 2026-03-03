import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { InsuranceQualityAnalysisInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/insurance-quality-analysis-inss-benefit.typeorm.entity';
import { GetInsuranceQualityAnalysisInssBenefitQueryResult } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/repository/insurance-quality-analysis-inss-benefit/query/result/get-insurance-quality-analysis-inss-benefit.query.result';

@Injectable()
export class GetInsuranceQualityAnalysisInssBenefitQueryResultAutoMapperProfile {
  protected readonly _type =
    GetInsuranceQualityAnalysisInssBenefitQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: InsuranceQualityAnalysisInssBenefitTypeormEntity,
    ): GetInsuranceQualityAnalysisInssBenefitQueryResult => {
      return GetInsuranceQualityAnalysisInssBenefitQueryResult.build({
        id: new Guid(source.id),
        inssBenefitNumber: source.inssBenefitNumber,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      InsuranceQualityAnalysisInssBenefitTypeormEntity,
      GetInsuranceQualityAnalysisInssBenefitQueryResult,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetInsuranceQualityAnalysisInssBenefitQueryResult,
    ): InsuranceQualityAnalysisInssBenefitTypeormEntity => {
      return InsuranceQualityAnalysisInssBenefitTypeormEntity.build({
        id: source.id.toString(),
        inssBenefitNumber: source.inssBenefitNumber,
        insuranceQualityAnalysis: undefined,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetInsuranceQualityAnalysisInssBenefitQueryResult,
      InsuranceQualityAnalysisInssBenefitTypeormEntity,
      mappingFunction,
    );
  }
}
