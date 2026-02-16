import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { InsuranceQualityAnalysisLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/insurance-quality-analysis-legal-proceeding.typeorm.entity';
import { InsuranceQualityAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/insurance-quality-analysis.typeorm.entity';
import { InsuranceQualityAnalysisEntity } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/schema/entity/insurance-quality-analysis/insurance-quality-analysis.entity';
import { InsuranceQualityAnalysisLegalProceedingEntity } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/schema/entity/insurance-quality-analysis-legal-proceeding/insurance-quality-analysis-legal-proceeding.entity';
import { InsuranceQualityAnalysisLegalProceedingId } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/schema/entity/insurance-quality-analysis-legal-proceeding/value-object/insurance-quality-analysis-legal-proceeding-id/insurance-quality-analysis-legal-proceeding-id.value-object';

@Injectable()
export class InsuranceQualityAnalysisLegalProceedingEntityAutoMapperProfile {
  protected readonly _type =
    InsuranceQualityAnalysisLegalProceedingEntityAutoMapperProfile.name;

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
    ): InsuranceQualityAnalysisLegalProceedingEntity => {
      const insuranceQualityAnalysis = source.insuranceQualityAnalysis
        ? this.mapper.map(
            source.insuranceQualityAnalysis,
            InsuranceQualityAnalysisTypeormEntity,
            InsuranceQualityAnalysisEntity,
          )
        : ({} as InsuranceQualityAnalysisEntity);

      return new InsuranceQualityAnalysisLegalProceedingEntity({
        id: new InsuranceQualityAnalysisLegalProceedingId(source.id),
        legalProceedingNumber: source.legalProceedingNumber,
        insuranceQualityAnalysis,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      InsuranceQualityAnalysisLegalProceedingTypeormEntity,
      InsuranceQualityAnalysisLegalProceedingEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: InsuranceQualityAnalysisLegalProceedingEntity,
    ): InsuranceQualityAnalysisLegalProceedingTypeormEntity => {
      const insuranceQualityAnalysis = this.mapper.map(
        source.insuranceQualityAnalysis,
        InsuranceQualityAnalysisEntity,
        InsuranceQualityAnalysisTypeormEntity,
      );

      return InsuranceQualityAnalysisLegalProceedingTypeormEntity.build({
        id: source.id.toString(),
        legalProceedingNumber: source.legalProceedingNumber,
        insuranceQualityAnalysis,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      InsuranceQualityAnalysisLegalProceedingEntity,
      InsuranceQualityAnalysisLegalProceedingTypeormEntity,
      mappingFunction,
    );
  }
}
