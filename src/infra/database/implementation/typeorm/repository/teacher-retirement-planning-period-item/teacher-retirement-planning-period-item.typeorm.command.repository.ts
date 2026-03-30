import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { TeacherRetirementPlanningPeriodItemTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning-period-item.typeorm.entity';
import { TeacherRetirementPlanningPeriodItemCommandRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/repository/teacher-retirement-planning-period-item/command/teacher-retirement-planning-period-item.command.repository.gateway';
import { TeacherRetirementPlanningPeriodItemEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-period-item/teacher-retirement-planning-period-item.entity';
import { TeacherRetirementPlanningPeriodItemId } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-period-item/value-object/teacher-retirement-planning-period-item-id.value-object';

@Injectable()
export class TeacherRetirementPlanningPeriodItemTypeormCommandRepository
  extends BaseTypeormCommandRepository<TeacherRetirementPlanningPeriodItemTypeormEntity>
  implements TeacherRetirementPlanningPeriodItemCommandRepositoryGateway
{
  protected readonly _type =
    TeacherRetirementPlanningPeriodItemTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(TeacherRetirementPlanningPeriodItemTypeormEntity)
    repository: Repository<TeacherRetirementPlanningPeriodItemTypeormEntity>,
  ) {
    super(repository);
  }

  public createTeacherRetirementPlanningPeriodItem(
    props: TeacherRetirementPlanningPeriodItemEntity,
  ): TransactionType {
    return this.create({
      id: props.id.toString(),
      startDate: props.startDate,
      endDate: props.endDate,
      institutionName: props.institutionName,
      institutionType: props.institutionType,
      educationLevel: props.educationLevel,
      rolePerformed: props.rolePerformed,
      teacherRetirementPlanningPeriod: {
        id: props.teacherRetirementPlanningPeriod.id.toString(),
      },
    });
  }

  public deleteTeacherRetirementPlanningPeriodItem(
    id: TeacherRetirementPlanningPeriodItemId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
