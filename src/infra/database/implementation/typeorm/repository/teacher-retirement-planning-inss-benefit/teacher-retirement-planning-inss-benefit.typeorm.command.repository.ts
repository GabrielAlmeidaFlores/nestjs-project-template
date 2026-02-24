import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { TeacherRetirementPlanningInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning-inss-benefit.typeorm.entity';
import { TeacherRetirementPlanningInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/repository/teacher-retirement-planning-inss-benefit/command/teacher-retirement-planning-inss-benefit.command.repository.gateway';
import { TeacherRetirementPlanningInssBenefitEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-inss-benefit/teacher-retirement-planning-inss-benefit.entity';
import { TeacherRetirementPlanningInssBenefitId } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-inss-benefit/value-object/teacher-retirement-planning-inss-benefit-id.value-object';

@Injectable()
export class TeacherRetirementPlanningInssBenefitTypeormCommandRepository
  extends BaseTypeormCommandRepository<TeacherRetirementPlanningInssBenefitTypeormEntity>
  implements TeacherRetirementPlanningInssBenefitCommandRepositoryGateway
{
  protected readonly _type =
    TeacherRetirementPlanningInssBenefitTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(TeacherRetirementPlanningInssBenefitTypeormEntity)
    repository: Repository<TeacherRetirementPlanningInssBenefitTypeormEntity>,
  ) {
    super(repository);
  }

  public createTeacherRetirementPlanningInssBenefit(
    props: TeacherRetirementPlanningInssBenefitEntity,
  ): TransactionType {
    return this.create({
      id: props.id.toString(),
      inssBenefitNumber: props.inssBenefitNumber,
      teacherRetirementPlanning: { id: props.teacherRetirementPlanning.id.toString() },
    });
  }

  public deleteTeacherRetirementPlanningInssBenefit(
    id: TeacherRetirementPlanningInssBenefitId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
