import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { TeacherRetirementPlanningDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning-document.typeorm.entity';
import { TeacherRetirementPlanningDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/repository/teacher-retirement-planning-document/command/teacher-retirement-planning-document.command.repository.gateway';
import { TeacherRetirementPlanningDocumentEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-document/teacher-retirement-planning-document.entity';
import { TeacherRetirementPlanningDocumentId } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-document/value-object/teacher-retirement-planning-document-id.value-object';

@Injectable()
export class TeacherRetirementPlanningDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<TeacherRetirementPlanningDocumentTypeormEntity>
  implements TeacherRetirementPlanningDocumentCommandRepositoryGateway
{
  protected readonly _type =
    TeacherRetirementPlanningDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(TeacherRetirementPlanningDocumentTypeormEntity)
    repository: Repository<TeacherRetirementPlanningDocumentTypeormEntity>,
  ) {
    super(repository);
  }

  public createTeacherRetirementPlanningDocument(
    props: TeacherRetirementPlanningDocumentEntity,
  ): TransactionType {
    return this.create({
      id: props.id.toString(),
      document: props.document,
      teacherRetirementPlanning: { id: props.teacherRetirementPlanning.id.toString() },
    });
  }

  public deleteTeacherRetirementPlanningDocument(
    id: TeacherRetirementPlanningDocumentId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
