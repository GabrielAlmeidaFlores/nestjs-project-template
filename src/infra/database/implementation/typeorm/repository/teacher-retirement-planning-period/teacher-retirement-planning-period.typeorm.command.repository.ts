import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { TeacherRetirementPlanningPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning-period.typeorm.entity';
import { TeacherRetirementPlanningPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/repository/teacher-retirement-planning-period/command/teacher-retirement-planning-period.command.repository.gateway';
import { TeacherRetirementPlanningPeriodEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-period/teacher-retirement-planning-period.entity';
import { TeacherRetirementPlanningPeriodId } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-period/value-object/teacher-retirement-planning-period-id.value-object';

@Injectable()
export class TeacherRetirementPlanningPeriodTypeormCommandRepository
  extends BaseTypeormCommandRepository<TeacherRetirementPlanningPeriodTypeormEntity>
  implements TeacherRetirementPlanningPeriodCommandRepositoryGateway
{
  protected readonly _type =
    TeacherRetirementPlanningPeriodTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(TeacherRetirementPlanningPeriodTypeormEntity)
    repository: Repository<TeacherRetirementPlanningPeriodTypeormEntity>,
  ) {
    super(repository);
  }

  public createTeacherRetirementPlanningPeriod(
    props: TeacherRetirementPlanningPeriodEntity,
  ): TransactionType {
    return this.create({
      id: props.id.toString(),
      startDate: props.startDate,
      endDate: props.endDate,
      positionName: props.positionName,
      careerName: props.careerName,
      serviceType: props.serviceType,
      department: props.department,
      teacherRetirementPlanning: { id: props.teacherRetirementPlanning.id.toString() },
    });
  }

  public deleteTeacherRetirementPlanningPeriod(
    id: TeacherRetirementPlanningPeriodId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
