import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { TeacherRetirementPlanningRejectionWorkPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning-rejection-work-period.typeorm.entity';
import { TeacherRetirementPlanningRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning-rejection.typeorm.entity';
import { TeacherRetirementPlanningRejectionWorkPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/repository/teacher-retirement-planning-rejection-work-period/command/teacher-retirement-planning-rejection-work-period.command.repository.gateway';
import { TeacherRetirementPlanningRejectionWorkPeriodEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-work-period/teacher-retirement-planning-rejection-work-period.entity';
import { TeacherRetirementPlanningRejectionWorkPeriodId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-work-period/value-object/teacher-retirement-planning-rejection-work-period-id.value-object';

@Injectable()
export class TeacherRetirementPlanningRejectionWorkPeriodTypeormCommandRepository
  extends BaseTypeormCommandRepository<TeacherRetirementPlanningRejectionWorkPeriodTypeormEntity>
  implements
    TeacherRetirementPlanningRejectionWorkPeriodCommandRepositoryGateway
{
  protected readonly _type =
    TeacherRetirementPlanningRejectionWorkPeriodTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(TeacherRetirementPlanningRejectionWorkPeriodTypeormEntity)
    repository: Repository<TeacherRetirementPlanningRejectionWorkPeriodTypeormEntity>,
  ) {
    super(repository);
  }

  public createTeacherRetirementPlanningRejectionWorkPeriod(
    props: TeacherRetirementPlanningRejectionWorkPeriodEntity,
  ): TransactionType {
    const mappedData = this.mapToTypeormEntity(props);
    return this.create(mappedData);
  }

  public updateTeacherRetirementPlanningRejectionWorkPeriod(
    id: TeacherRetirementPlanningRejectionWorkPeriodId,
    props: TeacherRetirementPlanningRejectionWorkPeriodEntity,
  ): TransactionType {
    const mappedData = this.mapToTypeormEntity(props);
    return this.update(id.toString(), mappedData);
  }

  public deleteTeacherRetirementPlanningRejectionWorkPeriod(
    id: TeacherRetirementPlanningRejectionWorkPeriodId,
  ): TransactionType {
    return this.delete(id.toString());
  }

  private mapToTypeormEntity(
    props: TeacherRetirementPlanningRejectionWorkPeriodEntity,
  ): TeacherRetirementPlanningRejectionWorkPeriodTypeormEntity {
    return TeacherRetirementPlanningRejectionWorkPeriodTypeormEntity.build({
      id: props.id.toString(),
      bondOrigin: props.bondOrigin,
      startDate: props.startDate,
      endDate: props.endDate,
      category: props.category,
      activityDescription: props.activityDescription,
      competenceBelowTheMinimum: props.competenceBelowTheMinimum,
      pendencyReason: props.pendencyReason,
      periodConsideration: props.periodConsideration,
      contributionAverage: props.contributionAverage,
      status: props.status,
      gracePeriod: props.gracePeriod,
      impactMonths: props.impactMonths,
      isPendency: props.isPendency,
      wantsToComplementViaMeuINSS: props.wantsToComplementViaMeuINSS,
      hasSpecialPeriod: props.hasSpecialPeriod,
      timelineClassification: props.timelineClassification,
      teacherRetirementPlanningRejection:
        TeacherRetirementPlanningRejectionTypeormEntity.build({
          id: props.teacherRetirementPlanningRejectionId.toString(),
        } as TeacherRetirementPlanningRejectionTypeormEntity),
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
      deletedAt: props.deletedAt,
    } as TeacherRetirementPlanningRejectionWorkPeriodTypeormEntity);
  }
}
