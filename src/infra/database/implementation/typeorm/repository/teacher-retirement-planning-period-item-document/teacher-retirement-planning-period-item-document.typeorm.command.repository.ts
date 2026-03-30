import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { TeacherRetirementPlanningPeriodItemDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning-period-item-document.typeorm.entity';
import { TeacherRetirementPlanningPeriodItemDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/repository/teacher-retirement-planning-period-item-document/command/teacher-retirement-planning-period-item-document.command.repository.gateway';
import { TeacherRetirementPlanningPeriodItemDocumentEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-period-item-document/teacher-retirement-planning-period-item-document.entity';
import { TeacherRetirementPlanningPeriodItemDocumentId } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-period-item-document/value-object/teacher-retirement-planning-period-item-document-id.value-object';

@Injectable()
export class TeacherRetirementPlanningPeriodItemDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<TeacherRetirementPlanningPeriodItemDocumentTypeormEntity>
  implements TeacherRetirementPlanningPeriodItemDocumentCommandRepositoryGateway
{
  protected readonly _type =
    TeacherRetirementPlanningPeriodItemDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(TeacherRetirementPlanningPeriodItemDocumentTypeormEntity)
    repository: Repository<TeacherRetirementPlanningPeriodItemDocumentTypeormEntity>,
  ) {
    super(repository);
  }

  public createTeacherRetirementPlanningPeriodItemDocument(
    props: TeacherRetirementPlanningPeriodItemDocumentEntity,
  ): TransactionType {
    return this.create({
      id: props.id.toString(),
      document: props.document,
      teacherRetirementPlanningPeriodItem: {
        id: props.teacherRetirementPlanningPeriodItem.id.toString(),
      },
    });
  }

  public deleteTeacherRetirementPlanningPeriodItemDocument(
    id: TeacherRetirementPlanningPeriodItemDocumentId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
