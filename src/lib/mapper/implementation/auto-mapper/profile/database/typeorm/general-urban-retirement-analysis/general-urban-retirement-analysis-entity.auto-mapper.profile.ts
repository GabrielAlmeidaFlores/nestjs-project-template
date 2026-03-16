import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { GeneralUrbanRetirementAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-analysis-result.typeorm.entity';
import { GeneralUrbanRetirementAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-analysis.typeorm.entity';
import { GeneralUrbanRetirementAnalysisEntity } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis/general-urban-retirement-analysis-entity';
import { GeneralUrbanRetirementAnalysisId } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis/value-object/general-urban-retirement-analysis-id.value-object';
import { GeneralUrbanRetirementAnalysisResultEntity } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-result/general-urban-retirement-analysis-result.entity';

@Injectable()
export class GeneralUrbanRetirementAnalysisEntityAutoMapperProfile {
  protected readonly _type =
    GeneralUrbanRetirementAnalysisEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: GeneralUrbanRetirementAnalysisTypeormEntity,
    ): GeneralUrbanRetirementAnalysisEntity => {
      const generalUrbanRetirementAnalysisResult =
        source.generalUrbanRetirementAnalysisResult !== undefined
          ? this.mapper.map(
              source.generalUrbanRetirementAnalysisResult,
              GeneralUrbanRetirementAnalysisResultTypeormEntity,
              GeneralUrbanRetirementAnalysisResultEntity,
            )
          : null;

      return new GeneralUrbanRetirementAnalysisEntity({
        id: new GeneralUrbanRetirementAnalysisId(source.id),
        careerStartDate: source.careerStartDate ?? null,
        publicServiceStartDate: source.publicServiceStartDate ?? null,
        generalUrbanRetirementBenefitAnalysis:
          source.generalUrbanRetirementBenefitAnalysis ?? null,
        generalUrbanRetirementAnalysisResult,
        federativeEntity: source.federativeEntity ?? null,
        state: source.state ?? null,
        municipality: source.municipality ?? null,
        name: source.name ?? null,
        benefitType: source.benefitType ?? null,
        currentPosition: source.currentPosition ?? null,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt ?? null,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      GeneralUrbanRetirementAnalysisTypeormEntity,
      GeneralUrbanRetirementAnalysisEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GeneralUrbanRetirementAnalysisEntity,
    ): GeneralUrbanRetirementAnalysisTypeormEntity => {
      const generalUrbanRetirementAnalysisResult =
        source.generalUrbanRetirementAnalysisResult !== null
          ? this.mapper.map(
              source.generalUrbanRetirementAnalysisResult,
              GeneralUrbanRetirementAnalysisResultEntity,
              GeneralUrbanRetirementAnalysisResultTypeormEntity,
            )
          : undefined;

      return GeneralUrbanRetirementAnalysisTypeormEntity.build({
        id: source.id.toString(),
        careerStartDate: source.careerStartDate ?? null,
        publicServiceStartDate: source.publicServiceStartDate ?? null,
        generalUrbanRetirementBenefitAnalysis:
          source.generalUrbanRetirementBenefitAnalysis ?? null,
        federativeEntity: source.federativeEntity ?? null,
        state: source.state ?? null,
        municipality: source.municipality ?? null,
        name: source.name ?? null,
        benefitType: source.benefitType ?? null,
        currentPosition: source.currentPosition ?? null,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt ?? null,
        generalUrbanRetirementAnalysisResult,
        analysisToolRecord: undefined,
        documents: undefined,
        remunerations: undefined,
        legalProceedings: undefined,
        periods: undefined,
        periodDocuments: undefined,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GeneralUrbanRetirementAnalysisEntity,
      GeneralUrbanRetirementAnalysisTypeormEntity,
      mappingFunction,
    );
  }
}
