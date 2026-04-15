import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { GeneralUrbanRetirementDenialResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-denial-result.typeorm.entity';
import { GeneralUrbanRetirementDenialResultEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-result/general-urban-retirement-denial-result.entity';
import { GeneralUrbanRetirementDenialResultId } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-result/value-object/general-urban-retirement-denial-result-id/general-urban-retirement-denial-result-id.value-object';

@Injectable()
export class GeneralUrbanRetirementDenialResultEntityAutoMapperProfile {
  protected readonly _type =
    GeneralUrbanRetirementDenialResultEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convert = (
      source: GeneralUrbanRetirementDenialResultTypeormEntity,
    ): GeneralUrbanRetirementDenialResultEntity => {
      return new GeneralUrbanRetirementDenialResultEntity({
        id: new GeneralUrbanRetirementDenialResultId(source.id),
        inssDecisionAnalysis: source.inssDecisionAnalysis,
        firstAnalysis: source.firstAnalysis,
        completeAnalysis: source.completeAnalysis,
        completeAnalysisDownload: source.completeAnalysisDownload,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      GeneralUrbanRetirementDenialResultTypeormEntity,
      GeneralUrbanRetirementDenialResultEntity,
      constructUsing(convert),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convert = (
      source: GeneralUrbanRetirementDenialResultEntity,
    ): GeneralUrbanRetirementDenialResultTypeormEntity => {
      return GeneralUrbanRetirementDenialResultTypeormEntity.build({
        id: source.id.toString(),
        inssDecisionAnalysis: source.inssDecisionAnalysis,
        firstAnalysis: source.firstAnalysis,
        completeAnalysis: source.completeAnalysis,
        completeAnalysisDownload: source.completeAnalysisDownload,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      GeneralUrbanRetirementDenialResultEntity,
      GeneralUrbanRetirementDenialResultTypeormEntity,
      constructUsing(convert),
    );
  }
}
