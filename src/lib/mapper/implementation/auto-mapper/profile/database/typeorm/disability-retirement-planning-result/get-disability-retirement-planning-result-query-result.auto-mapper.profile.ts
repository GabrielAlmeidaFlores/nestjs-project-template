import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DisabilityRetirementPlanningResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-result.typeorm.entity';
import { DisabilityRetirementPlanningTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning.typeorm.entity';
import { GetDisabilityRetirementPlanningResultQueryResult } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/repository/disability-retirement-planning/query/result/get-disability-retirement-planning-with-relations.query.result';

@Injectable()
export class GetDisabilityRetirementPlanningResultQueryResultAutoMapperProfile {
  protected readonly _type =
    GetDisabilityRetirementPlanningResultQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: DisabilityRetirementPlanningResultTypeormEntity,
    ): GetDisabilityRetirementPlanningResultQueryResult => {
      return GetDisabilityRetirementPlanningResultQueryResult.build({
        id: source.id,
        disabilityRetirementPlanningCompleteAnalysis:
          source.disabilityRetirementPlanningCompleteAnalysis,
        disabilityRetirementPlanningSimplifiedAnalysis:
          source.disabilityRetirementPlanningSimplifiedAnalysis,
        disabilityRetirementPlanningCompleteAnalysisDownload:
          source.disabilityRetirementPlanningCompleteAnalysisDownload,
      });
    };

    createMap(
      this.mapper,
      DisabilityRetirementPlanningResultTypeormEntity,
      GetDisabilityRetirementPlanningResultQueryResult,
      constructUsing(convertOrmEntityToDomainEntity),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetDisabilityRetirementPlanningResultQueryResult,
    ): DisabilityRetirementPlanningResultTypeormEntity => {
      return DisabilityRetirementPlanningResultTypeormEntity.build({
        id: source.id,
        disabilityRetirementPlanning: {
          id: '',
        } as DisabilityRetirementPlanningTypeormEntity,
        disabilityRetirementPlanningCompleteAnalysis:
          source.disabilityRetirementPlanningCompleteAnalysis,
        disabilityRetirementPlanningSimplifiedAnalysis:
          source.disabilityRetirementPlanningSimplifiedAnalysis,
        disabilityRetirementPlanningCompleteAnalysisDownload:
          source.disabilityRetirementPlanningCompleteAnalysisDownload,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      });
    };

    createMap(
      this.mapper,
      GetDisabilityRetirementPlanningResultQueryResult,
      DisabilityRetirementPlanningResultTypeormEntity,
      constructUsing(convertDomainEntityToOrmEntity),
    );
  }
}
