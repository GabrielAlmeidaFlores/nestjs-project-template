import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { TeacherRetirementPlanningLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning-legal-proceeding.typeorm.entity';
import { TeacherRetirementPlanningLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/repository/teacher-retirement-planning-legal-proceeding/command/teacher-retirement-planning-legal-proceeding.command.repository.gateway';
import { TeacherRetirementPlanningLegalProceedingEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-legal-proceeding/teacher-retirement-planning-legal-proceeding.entity';
import { TeacherRetirementPlanningLegalProceedingId } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-legal-proceeding/value-object/teacher-retirement-planning-legal-proceeding-id.value-object';

@Injectable()
export class TeacherRetirementPlanningLegalProceedingTypeormCommandRepository
  extends BaseTypeormCommandRepository<TeacherRetirementPlanningLegalProceedingTypeormEntity>
  implements TeacherRetirementPlanningLegalProceedingCommandRepositoryGateway
{
  protected readonly _type =
    TeacherRetirementPlanningLegalProceedingTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(TeacherRetirementPlanningLegalProceedingTypeormEntity)
    repository: Repository<TeacherRetirementPlanningLegalProceedingTypeormEntity>,
  ) {
    super(repository);
  }

  public createTeacherRetirementPlanningLegalProceeding(
    props: TeacherRetirementPlanningLegalProceedingEntity,
  ): TransactionType {
    return this.create({
      id: props.id.toString(),
      legalProceedingNumber: props.legalProceedingNumber,
      teacherRetirementPlanning: {
        id: props.teacherRetirementPlanning.id.toString(),
      },
    });
  }

  public deleteTeacherRetirementPlanningLegalProceeding(
    id: TeacherRetirementPlanningLegalProceedingId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
