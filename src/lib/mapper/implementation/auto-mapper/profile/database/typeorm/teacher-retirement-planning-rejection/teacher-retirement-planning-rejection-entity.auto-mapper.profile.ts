import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { TeacherRetirementPlanningRejectionResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning-rejection-result.typeorm.entity';
import { TeacherRetirementPlanningRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning-rejection.typeorm.entity';
import { TeacherRetirementPlanningRejectionEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection/teacher-retirement-planning-rejection.entity';
import { TeacherRetirementPlanningRejectionId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection/value-object/teacher-retirement-planning-rejection-id.value-object';
import { TeacherRetirementPlanningRejectionResultId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-result/value-object/teacher-retirement-planning-rejection-result-id.value-object';

@Injectable()
export class TeacherRetirementPlanningRejectionEntityAutoMapperProfile {
  protected readonly _type =
    TeacherRetirementPlanningRejectionEntityAutoMapperProfile.name;

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
      TeacherRetirementPlanningRejectionTypeormEntity,
      TeacherRetirementPlanningRejectionEntity,
      constructUsing(
        (
          source: TeacherRetirementPlanningRejectionTypeormEntity,
        ): TeacherRetirementPlanningRejectionEntity => {
          const teacherRetirementPlanningRejectionResultId =
            source.teacherRetirementPlanningRejectionResult !== undefined &&
            source.teacherRetirementPlanningRejectionResult !== null
              ? new TeacherRetirementPlanningRejectionResultId(
                  source.teacherRetirementPlanningRejectionResult.id,
                )
              : null;

          return new TeacherRetirementPlanningRejectionEntity({
            id: new TeacherRetirementPlanningRejectionId(source.id),
            analysisName: source.analysisName,
            requestEntryDate: source.requestEntryDate,
            denialDate: source.denialDate,
            category: source.category,
            activityType: source.activityType,
            activityTypeDescription: source.activityTypeDescription,
            denialReason: source.denialReason,
            denialReasonDescription: source.denialReasonDescription,
            teacherRetirementPlanningRejectionResultId,
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          });
        },
      ),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    createMap(
      this.mapper,
      TeacherRetirementPlanningRejectionEntity,
      TeacherRetirementPlanningRejectionTypeormEntity,
      constructUsing(
        (
          source: TeacherRetirementPlanningRejectionEntity,
        ): TeacherRetirementPlanningRejectionTypeormEntity => {
          const teacherRetirementPlanningRejectionResult =
            source.teacherRetirementPlanningRejectionResultId !== null
              ? ({
                  id: source.teacherRetirementPlanningRejectionResultId.toString(),
                } as TeacherRetirementPlanningRejectionResultTypeormEntity)
              : null;

          return TeacherRetirementPlanningRejectionTypeormEntity.build({
            id: source.id.toString(),
            analysisName: source.analysisName,
            requestEntryDate: source.requestEntryDate,
            denialDate: source.denialDate,
            category: source.category,
            activityType: source.activityType,
            activityTypeDescription: source.activityTypeDescription,
            denialReason: source.denialReason,
            denialReasonDescription: source.denialReasonDescription,
            teacherRetirementPlanningRejectionResult,
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          });
        },
      ),
    );
  }
}
