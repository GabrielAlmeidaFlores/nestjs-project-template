import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DisabilityRetirementPlanningRejectionResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-rejection-result.typeorm.entity';
import { DisabilityRetirementPlanningRejectionResultEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-result/disability-retirement-planning-rejection-result.entity';
import { DisabilityRetirementPlanningRejectionResultId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-result/value-object/disability-retirement-planning-rejection-result-id/disability-retirement-planning-rejection-result-id.value-object';

@Injectable()
export class DisabilityRetirementPlanningRejectionResultEntityAutoMapperProfile {
  protected readonly _type =
    DisabilityRetirementPlanningRejectionResultEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convert = (
      source: DisabilityRetirementPlanningRejectionResultTypeormEntity,
    ): DisabilityRetirementPlanningRejectionResultEntity => {
      return new DisabilityRetirementPlanningRejectionResultEntity({
        id: new DisabilityRetirementPlanningRejectionResultId(source.id),
        inssDecisionAnalysis: source.inssDecisionAnalysis,
        firstAnalysis: source.firstAnalysis,
        completeAnalysis: source.completeAnalysis,
        completeAnalysisDownload: source.completeAnalysisDownload,
        simplifiedAnalysis: source.simplifiedAnalysis,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      DisabilityRetirementPlanningRejectionResultTypeormEntity,
      DisabilityRetirementPlanningRejectionResultEntity,
      constructUsing(convert),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convert = (
      source: DisabilityRetirementPlanningRejectionResultEntity,
    ): DisabilityRetirementPlanningRejectionResultTypeormEntity => {
      return DisabilityRetirementPlanningRejectionResultTypeormEntity.build({
        id: source.id.toString(),
        inssDecisionAnalysis: source.inssDecisionAnalysis,
        firstAnalysis: source.firstAnalysis,
        completeAnalysis: source.completeAnalysis,
        completeAnalysisDownload: source.completeAnalysisDownload,
        simplifiedAnalysis: source.simplifiedAnalysis,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      DisabilityRetirementPlanningRejectionResultEntity,
      DisabilityRetirementPlanningRejectionResultTypeormEntity,
      constructUsing(convert),
    );
  }
}
