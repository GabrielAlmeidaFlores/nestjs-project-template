import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { TeacherRetirementPlanningRejectionWorkPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning-rejection-work-period.typeorm.entity';
import { TeacherRetirementPlanningRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning-rejection.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { TeacherRetirementPlanningRejectionId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection/value-object/teacher-retirement-planning-rejection-id.value-object';
import { TeacherRetirementPlanningRejectionWorkPeriodEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-work-period/teacher-retirement-planning-rejection-work-period.entity';
import { TeacherRetirementPlanningRejectionWorkPeriodId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-work-period/value-object/teacher-retirement-planning-rejection-work-period-id.value-object';

@Injectable()
export class TeacherRetirementPlanningRejectionWorkPeriodEntityAutoMapperProfile {
  protected readonly _type =
    TeacherRetirementPlanningRejectionWorkPeriodEntityAutoMapperProfile.name;

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
      TeacherRetirementPlanningRejectionWorkPeriodTypeormEntity,
      TeacherRetirementPlanningRejectionWorkPeriodEntity,
      constructUsing(
        (
          source: TeacherRetirementPlanningRejectionWorkPeriodTypeormEntity,
        ): TeacherRetirementPlanningRejectionWorkPeriodEntity => {
          if (!source.teacherRetirementPlanningRejection) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass:
                TeacherRetirementPlanningRejectionWorkPeriodEntity.name,
              sourceClass:
                TeacherRetirementPlanningRejectionWorkPeriodTypeormEntity.name,
            });
          }

          return new TeacherRetirementPlanningRejectionWorkPeriodEntity({
            id: new TeacherRetirementPlanningRejectionWorkPeriodId(source.id),
            bondOrigin: source.bondOrigin,
            startDate: source.startDate,
            endDate: source.endDate,
            category: source.category,
            activityDescription: source.activityDescription,
            competenceBelowTheMinimum: source.competenceBelowTheMinimum,
            pendencyReason: source.pendencyReason,
            periodConsideration: source.periodConsideration,
            contributionAverage: source.contributionAverage,
            status: source.status,
            gracePeriod: source.gracePeriod,
            impactMonths: source.impactMonths,
            isPendency: source.isPendency,
            wantsToComplementViaMeuINSS: source.wantsToComplementViaMeuINSS,
            hasSpecialPeriod: source.hasSpecialPeriod,
            timelineClassification: source.timelineClassification,
            teacherRetirementPlanningRejectionId:
              new TeacherRetirementPlanningRejectionId(
                source.teacherRetirementPlanningRejection.id,
              ),
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
      TeacherRetirementPlanningRejectionWorkPeriodEntity,
      TeacherRetirementPlanningRejectionWorkPeriodTypeormEntity,
      constructUsing(
        (
          source: TeacherRetirementPlanningRejectionWorkPeriodEntity,
        ): TeacherRetirementPlanningRejectionWorkPeriodTypeormEntity =>
          TeacherRetirementPlanningRejectionWorkPeriodTypeormEntity.build({
            id: source.id.toString(),
            bondOrigin: source.bondOrigin,
            startDate: source.startDate,
            endDate: source.endDate,
            category: source.category,
            activityDescription: source.activityDescription,
            competenceBelowTheMinimum: source.competenceBelowTheMinimum,
            pendencyReason: source.pendencyReason,
            periodConsideration: source.periodConsideration,
            contributionAverage: source.contributionAverage,
            status: source.status,
            gracePeriod: source.gracePeriod,
            impactMonths: source.impactMonths,
            isPendency: source.isPendency,
            wantsToComplementViaMeuINSS: source.wantsToComplementViaMeuINSS,
            hasSpecialPeriod: source.hasSpecialPeriod,
            timelineClassification: source.timelineClassification,
            teacherRetirementPlanningRejection:
              TeacherRetirementPlanningRejectionTypeormEntity.build({
                id: source.teacherRetirementPlanningRejectionId.toString(),
              } as TeacherRetirementPlanningRejectionTypeormEntity),
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          }),
      ),
    );
  }
}
