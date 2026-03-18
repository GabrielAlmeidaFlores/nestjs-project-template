import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { GeneralUrbanRetirementAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-analysis-result.typeorm.entity';
import { GeneralUrbanRetirementAnalysisResultEntity } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-result/general-urban-retirement-analysis-result.entity';
import { GeneralUrbanRetirementAnalysisResultId } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-result/value-object/general-urban-retirement-analysis-result-id.value-object';

@Injectable()
export class GeneralUrbanRetirementAnalysisResultEntityAutoMapperProfile {
  protected readonly _type =
    GeneralUrbanRetirementAnalysisResultEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: GeneralUrbanRetirementAnalysisResultTypeormEntity,
    ): GeneralUrbanRetirementAnalysisResultEntity => {
      return new GeneralUrbanRetirementAnalysisResultEntity({
        id: new GeneralUrbanRetirementAnalysisResultId(source.id),
        generalUrbanRetirementCompleteAnalysis:
          source.generalUrbanRetirementCompleteAnalysis ?? null,
        generalUrbanRetirementCompleteAnalysisDownload:
          source.generalUrbanRetirementCompleteAnalysisDownload ?? null,
        generalUrbanRetirementSimplifiedAnalysis:
          source.generalUrbanRetirementSimplifiedAnalysis ?? null,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      GeneralUrbanRetirementAnalysisResultTypeormEntity,
      GeneralUrbanRetirementAnalysisResultEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GeneralUrbanRetirementAnalysisResultEntity,
    ): GeneralUrbanRetirementAnalysisResultTypeormEntity => {
      return GeneralUrbanRetirementAnalysisResultTypeormEntity.build({
        id: source.id.toString(),
        generalUrbanRetirementCompleteAnalysis:
          source.generalUrbanRetirementCompleteAnalysis,
        generalUrbanRetirementCompleteAnalysisDownload:
          source.generalUrbanRetirementCompleteAnalysisDownload,
        generalUrbanRetirementSimplifiedAnalysis:
          source.generalUrbanRetirementSimplifiedAnalysis,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: null,
        generalUrbanRetirementAnalysis: null,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GeneralUrbanRetirementAnalysisResultEntity,
      GeneralUrbanRetirementAnalysisResultTypeormEntity,
      mappingFunction,
    );
  }
}
