import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { TeacherRetirementPlanningRejectionResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning-rejection-result.typeorm.entity';
import { TeacherRetirementPlanningRejectionResultEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-result/teacher-retirement-planning-rejection-result.entity';
import { TeacherRetirementPlanningRejectionResultId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-result/value-object/teacher-retirement-planning-rejection-result-id.value-object';

@Injectable()
export class TeacherRetirementPlanningRejectionResultEntityAutoMapperProfile {
  protected readonly _type =
    TeacherRetirementPlanningRejectionResultEntityAutoMapperProfile.name;

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
      TeacherRetirementPlanningRejectionResultTypeormEntity,
      TeacherRetirementPlanningRejectionResultEntity,
      constructUsing(
        (
          source: TeacherRetirementPlanningRejectionResultTypeormEntity,
        ): TeacherRetirementPlanningRejectionResultEntity =>
          new TeacherRetirementPlanningRejectionResultEntity({
            id: new TeacherRetirementPlanningRejectionResultId(source.id),
            inssDecisionAnalysis: source.inssDecisionAnalysis,
            firstAnalysis: source.firstAnalysis,
            completeAnalysis: source.completeAnalysis,
            completeAnalysisDownload: source.completeAnalysisDownload,
            simplifiedAnalysis: source.simplifiedAnalysis,
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
      TeacherRetirementPlanningRejectionResultEntity,
      TeacherRetirementPlanningRejectionResultTypeormEntity,
      constructUsing(
        (
          source: TeacherRetirementPlanningRejectionResultEntity,
        ): TeacherRetirementPlanningRejectionResultTypeormEntity =>
          TeacherRetirementPlanningRejectionResultTypeormEntity.build({
            id: source.id.toString(),
            inssDecisionAnalysis: source.inssDecisionAnalysis,
            firstAnalysis: source.firstAnalysis,
            completeAnalysis: source.completeAnalysis,
            completeAnalysisDownload: source.completeAnalysisDownload,
            simplifiedAnalysis: source.simplifiedAnalysis,
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          }),
      ),
    );
  }
}
