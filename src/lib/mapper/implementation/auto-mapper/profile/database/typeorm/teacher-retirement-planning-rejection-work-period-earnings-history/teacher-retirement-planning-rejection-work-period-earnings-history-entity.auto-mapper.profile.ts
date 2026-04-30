import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { TeacherRetirementPlanningRejectionWorkPeriodEarningsHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning-rejection-work-period-earnings-history.typeorm.entity';
import { TeacherRetirementPlanningRejectionWorkPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning-rejection-work-period.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { TeacherRetirementPlanningRejectionWorkPeriodId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-work-period/value-object/teacher-retirement-planning-rejection-work-period-id.value-object';
import { TeacherRetirementPlanningRejectionWorkPeriodEarningsHistoryEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-work-period-earnings-history/teacher-retirement-planning-rejection-work-period-earnings-history.entity';
import { TeacherRetirementPlanningRejectionWorkPeriodEarningsHistoryId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-work-period-earnings-history/value-object/teacher-retirement-planning-rejection-work-period-earnings-history-id.value-object';

@Injectable()
export class TeacherRetirementPlanningRejectionWorkPeriodEarningsHistoryEntityAutoMapperProfile {
  protected readonly _type =
    TeacherRetirementPlanningRejectionWorkPeriodEarningsHistoryEntityAutoMapperProfile.name;

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
      TeacherRetirementPlanningRejectionWorkPeriodEarningsHistoryTypeormEntity,
      TeacherRetirementPlanningRejectionWorkPeriodEarningsHistoryEntity,
      constructUsing(
        (
          source: TeacherRetirementPlanningRejectionWorkPeriodEarningsHistoryTypeormEntity,
        ): TeacherRetirementPlanningRejectionWorkPeriodEarningsHistoryEntity => {
          if (!source.teacherRetirementPlanningRejectionWorkPeriod) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass:
                TeacherRetirementPlanningRejectionWorkPeriodEarningsHistoryEntity.name,
              sourceClass:
                TeacherRetirementPlanningRejectionWorkPeriodEarningsHistoryTypeormEntity.name,
            });
          }

          return new TeacherRetirementPlanningRejectionWorkPeriodEarningsHistoryEntity(
            {
              id: new TeacherRetirementPlanningRejectionWorkPeriodEarningsHistoryId(
                source.id,
              ),
              competence: source.competence,
              remuneration: source.remuneration,
              indicators: source.indicators,
              paymentDate: source.paymentDate,
              contribution: source.contribution,
              contributionSalary: source.contributionSalary,
              competenceBelowMinimum: source.competenceBelowMinimum,
              teacherRetirementPlanningRejectionWorkPeriodId:
                new TeacherRetirementPlanningRejectionWorkPeriodId(
                  source.teacherRetirementPlanningRejectionWorkPeriod.id,
                ),
              createdAt: source.createdAt,
              updatedAt: source.updatedAt,
              deletedAt: source.deletedAt,
            },
          );
        },
      ),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    createMap(
      this.mapper,
      TeacherRetirementPlanningRejectionWorkPeriodEarningsHistoryEntity,
      TeacherRetirementPlanningRejectionWorkPeriodEarningsHistoryTypeormEntity,
      constructUsing(
        (
          source: TeacherRetirementPlanningRejectionWorkPeriodEarningsHistoryEntity,
        ): TeacherRetirementPlanningRejectionWorkPeriodEarningsHistoryTypeormEntity =>
          TeacherRetirementPlanningRejectionWorkPeriodEarningsHistoryTypeormEntity.build(
            {
              id: source.id.toString(),
              competence: source.competence,
              remuneration: source.remuneration,
              indicators: source.indicators,
              paymentDate: source.paymentDate,
              contribution: source.contribution,
              contributionSalary: source.contributionSalary,
              competenceBelowMinimum: source.competenceBelowMinimum,
              teacherRetirementPlanningRejectionWorkPeriod:
                TeacherRetirementPlanningRejectionWorkPeriodTypeormEntity.build(
                  {
                    id: source.teacherRetirementPlanningRejectionWorkPeriodId.toString(),
                  } as TeacherRetirementPlanningRejectionWorkPeriodTypeormEntity,
                ),
              createdAt: source.createdAt,
              updatedAt: source.updatedAt,
              deletedAt: source.deletedAt,
            },
          ),
      ),
    );
  }
}
