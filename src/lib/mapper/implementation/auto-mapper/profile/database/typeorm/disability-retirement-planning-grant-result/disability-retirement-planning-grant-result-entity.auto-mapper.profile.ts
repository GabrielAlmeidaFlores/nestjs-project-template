import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DisabilityRetirementPlanningGrantResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-grant-result.typeorm.entity';
import { DisabilityRetirementPlanningGrantResultEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-result/disability-retirement-planning-grant-result.entity';
import { DisabilityRetirementPlanningGrantResultId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-result/value-object/disability-retirement-planning-grant-result-id.value-object';

@Injectable()
export class DisabilityRetirementPlanningGrantResultEntityAutoMapperProfile {
  protected readonly _type =
    DisabilityRetirementPlanningGrantResultEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    createMap(
      this.mapper,
      DisabilityRetirementPlanningGrantResultTypeormEntity,
      DisabilityRetirementPlanningGrantResultEntity,
      constructUsing(
        (
          source: DisabilityRetirementPlanningGrantResultTypeormEntity,
        ): DisabilityRetirementPlanningGrantResultEntity =>
          new DisabilityRetirementPlanningGrantResultEntity({
            id: new DisabilityRetirementPlanningGrantResultId(source.id),
            disabilityRetirementPlanningGrantCompleteAnalysis:
              source.disabilityRetirementPlanningGrantCompleteAnalysis,
            disabilityRetirementPlanningGrantSimplifiedAnalysis:
              source.disabilityRetirementPlanningGrantSimplifiedAnalysis,
            disabilityRetirementPlanningGrantFirstAnalysis:
              source.disabilityRetirementPlanningGrantFirstAnalysis,
            disabilityRetirementPlanningGrantCompleteAnalysisDownload:
              source.disabilityRetirementPlanningGrantCompleteAnalysisDownload,
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          }),
      ),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    createMap(
      this.mapper,
      DisabilityRetirementPlanningGrantResultEntity,
      DisabilityRetirementPlanningGrantResultTypeormEntity,
      constructUsing(
        (
          source: DisabilityRetirementPlanningGrantResultEntity,
        ): DisabilityRetirementPlanningGrantResultTypeormEntity =>
          DisabilityRetirementPlanningGrantResultTypeormEntity.build({
            id: source.id.toString(),
            disabilityRetirementPlanningGrantCompleteAnalysis:
              source.disabilityRetirementPlanningGrantCompleteAnalysis,
            disabilityRetirementPlanningGrantSimplifiedAnalysis:
              source.disabilityRetirementPlanningGrantSimplifiedAnalysis,
            disabilityRetirementPlanningGrantFirstAnalysis:
              source.disabilityRetirementPlanningGrantFirstAnalysis,
            disabilityRetirementPlanningGrantCompleteAnalysisDownload:
              source.disabilityRetirementPlanningGrantCompleteAnalysisDownload,
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          }),
      ),
    );
  }
}
