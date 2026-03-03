import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { InsuranceQualityAnalysisInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/insurance-quality-analysis-inss-benefit.typeorm.entity';
import { InsuranceQualityAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/insurance-quality-analysis.typeorm.entity';
import { InsuranceQualityAnalysisEntity } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/schema/entity/insurance-quality-analysis/insurance-quality-analysis.entity';
import { InsuranceQualityAnalysisInssBenefitEntity } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/schema/entity/insurance-quality-analysis-inss-benefit/insurance-quality-analysis-inss-benefit.entity';
import { InsuranceQualityAnalysisInssBenefitId } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/schema/entity/insurance-quality-analysis-inss-benefit/value-object/insurance-quality-analysis-inss-benefit-id/insurance-quality-analysis-inss-benefit-id.value-object';

@Injectable()
export class InsuranceQualityAnalysisInssBenefitEntityAutoMapperProfile {
  protected readonly _type =
    InsuranceQualityAnalysisInssBenefitEntityAutoMapperProfile.name;

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
    ): InsuranceQualityAnalysisInssBenefitEntity => {
      const insuranceQualityAnalysis = source.insuranceQualityAnalysis
        ? this.mapper.map(
            source.insuranceQualityAnalysis,
            InsuranceQualityAnalysisTypeormEntity,
            InsuranceQualityAnalysisEntity,
          )
        : ({} as InsuranceQualityAnalysisEntity);

      return new InsuranceQualityAnalysisInssBenefitEntity({
        id: new InsuranceQualityAnalysisInssBenefitId(source.id),
        inssBenefitNumber: source.inssBenefitNumber,
        insuranceQualityAnalysis,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      InsuranceQualityAnalysisInssBenefitTypeormEntity,
      InsuranceQualityAnalysisInssBenefitEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: InsuranceQualityAnalysisInssBenefitEntity,
    ): InsuranceQualityAnalysisInssBenefitTypeormEntity => {
      const insuranceQualityAnalysis = this.mapper.map(
        source.insuranceQualityAnalysis,
        InsuranceQualityAnalysisEntity,
        InsuranceQualityAnalysisTypeormEntity,
      );

      return InsuranceQualityAnalysisInssBenefitTypeormEntity.build({
        id: source.id.toString(),
        inssBenefitNumber: source.inssBenefitNumber,
        insuranceQualityAnalysis,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      InsuranceQualityAnalysisInssBenefitEntity,
      InsuranceQualityAnalysisInssBenefitTypeormEntity,
      mappingFunction,
    );
  }
}
