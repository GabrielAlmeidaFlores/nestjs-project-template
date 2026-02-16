import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { InsuranceQualityAnalysisDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/insurance-quality-analysis-document.typeorm.entity';
import { InsuranceQualityAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/insurance-quality-analysis.typeorm.entity';
import { InsuranceQualityAnalysisEntity } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/schema/entity/insurance-quality-analysis/insurance-quality-analysis.entity';
import { InsuranceQualityAnalysisDocumentEntity } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/schema/entity/insurance-quality-analysis-document/insurance-quality-analysis-document.entity';
import { InsuranceQualityAnalysisDocumentId } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/schema/entity/insurance-quality-analysis-document/value-object/insurance-quality-analysis-document-id/insurance-quality-analysis-document-id.value-object';

@Injectable()
export class InsuranceQualityAnalysisDocumentEntityAutoMapperProfile {
  protected readonly _type =
    InsuranceQualityAnalysisDocumentEntityAutoMapperProfile.name;

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
    ): InsuranceQualityAnalysisDocumentEntity => {
      const insuranceQualityAnalysis = this.mapper.map(
        source.insuranceQualityAnalysis,
        InsuranceQualityAnalysisTypeormEntity,
        InsuranceQualityAnalysisEntity,
      );

      return new InsuranceQualityAnalysisDocumentEntity({
        ...source,
        id: new InsuranceQualityAnalysisDocumentId(source.id),
        insuranceQualityAnalysis,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      InsuranceQualityAnalysisDocumentTypeormEntity,
      InsuranceQualityAnalysisDocumentEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: InsuranceQualityAnalysisDocumentEntity,
    ): InsuranceQualityAnalysisDocumentTypeormEntity => {
      const insuranceQualityAnalysis = this.mapper.map(
        source.insuranceQualityAnalysis,
        InsuranceQualityAnalysisEntity,
        InsuranceQualityAnalysisTypeormEntity,
      );

      return InsuranceQualityAnalysisDocumentTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        insuranceQualityAnalysis,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      InsuranceQualityAnalysisDocumentEntity,
      InsuranceQualityAnalysisDocumentTypeormEntity,
      mappingFunction,
    );
  }
}
