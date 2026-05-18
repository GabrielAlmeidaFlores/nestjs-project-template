import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { TeacherRetirementPlanningRemunerationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning-remuneration.typeorm.entity';
import { TeacherRetirementPlanningRemunerationCommandRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/repository/teacher-retirement-planning-remuneration/command/teacher-retirement-planning-remuneration.command.repository.gateway';
import { TeacherRetirementPlanningRemunerationEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-remuneration/teacher-retirement-planning-remuneration.entity';
import { TeacherRetirementPlanningRemunerationId } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-remuneration/value-object/teacher-retirement-planning-remuneration-id.value-object';

@Injectable()
export class TeacherRetirementPlanningRemunerationTypeormCommandRepository
  extends BaseTypeormCommandRepository<TeacherRetirementPlanningRemunerationTypeormEntity>
  implements TeacherRetirementPlanningRemunerationCommandRepositoryGateway
{
  protected readonly _type =
    TeacherRetirementPlanningRemunerationTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(TeacherRetirementPlanningRemunerationTypeormEntity)
    repository: Repository<TeacherRetirementPlanningRemunerationTypeormEntity>,
  ) {
    super(repository);
  }

  public createTeacherRetirementPlanningRemuneration(
    props: TeacherRetirementPlanningRemunerationEntity,
  ): TransactionType {
    return this.create({
      id: props.id.toString(),
      contributionDate: props.contributionDate,
      amount: props.amount.toString(),
      teacherRetirementPlanning: {
        id: props.teacherRetirementPlanning.id.toString(),
      },
    });
  }

  public updateTeacherRetirementPlanningRemuneration(
    id: TeacherRetirementPlanningRemunerationId,
    props: TeacherRetirementPlanningRemunerationEntity,
  ): TransactionType {
    return this.update(id.toString(), {
      contributionDate: props.contributionDate,
      amount: props.amount.toString(),
      teacherRetirementPlanning: {
        id: props.teacherRetirementPlanning.id.toString(),
      },
    });
  }

  public deleteTeacherRetirementPlanningRemuneration(
    id: TeacherRetirementPlanningRemunerationId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
