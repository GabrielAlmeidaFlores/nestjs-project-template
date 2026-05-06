import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { TeacherRetirementPlanningRejectionWorkPeriodEarningsHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning-rejection-work-period-earnings-history.typeorm.entity';
import { TeacherRetirementPlanningRejectionWorkPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning-rejection-work-period.typeorm.entity';
import { TeacherRetirementPlanningRejectionWorkPeriodEarningsHistoryCommandRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/repository/teacher-retirement-planning-rejection-work-period-earnings-history/command/teacher-retirement-planning-rejection-work-period-earnings-history.command.repository.gateway';
import { TeacherRetirementPlanningRejectionWorkPeriodEarningsHistoryEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-work-period-earnings-history/teacher-retirement-planning-rejection-work-period-earnings-history.entity';

@Injectable()
export class TeacherRetirementPlanningRejectionWorkPeriodEarningsHistoryTypeormCommandRepository
  extends BaseTypeormCommandRepository<TeacherRetirementPlanningRejectionWorkPeriodEarningsHistoryTypeormEntity>
  implements
    TeacherRetirementPlanningRejectionWorkPeriodEarningsHistoryCommandRepositoryGateway
{
  protected readonly _type =
    TeacherRetirementPlanningRejectionWorkPeriodEarningsHistoryTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      TeacherRetirementPlanningRejectionWorkPeriodEarningsHistoryTypeormEntity,
    )
    repository: Repository<TeacherRetirementPlanningRejectionWorkPeriodEarningsHistoryTypeormEntity>,
  ) {
    super(repository);
  }

  public createTeacherRetirementPlanningRejectionWorkPeriodEarningsHistory(
    props: TeacherRetirementPlanningRejectionWorkPeriodEarningsHistoryEntity,
  ): TransactionType {
    return this.create(
      TeacherRetirementPlanningRejectionWorkPeriodEarningsHistoryTypeormEntity.build(
        {
          id: props.id.toString(),
          competence: props.competence,
          remuneration: props.remuneration,
          indicators: props.indicators,
          paymentDate: props.paymentDate,
          contribution: props.contribution,
          contributionSalary: props.contributionSalary,
          competenceBelowMinimum: props.competenceBelowMinimum,
          teacherRetirementPlanningRejectionWorkPeriod:
            TeacherRetirementPlanningRejectionWorkPeriodTypeormEntity.build({
              id: props.teacherRetirementPlanningRejectionWorkPeriodId.toString(),
            } as TeacherRetirementPlanningRejectionWorkPeriodTypeormEntity),
          createdAt: props.createdAt,
          updatedAt: props.updatedAt,
          deletedAt: props.deletedAt,
        } as TeacherRetirementPlanningRejectionWorkPeriodEarningsHistoryTypeormEntity,
      ),
    );
  }
}
