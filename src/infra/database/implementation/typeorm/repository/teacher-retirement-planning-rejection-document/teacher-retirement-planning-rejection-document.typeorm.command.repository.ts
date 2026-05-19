import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { TeacherRetirementPlanningRejectionDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning-rejection-document.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { TeacherRetirementPlanningRejectionDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/repository/teacher-retirement-planning-rejection-document/command/teacher-retirement-planning-rejection-document.command.repository.gateway';
import { TeacherRetirementPlanningRejectionId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection/value-object/teacher-retirement-planning-rejection-id.value-object';
import { TeacherRetirementPlanningRejectionDocumentEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-document/teacher-retirement-planning-rejection-document.entity';

@Injectable()
export class TeacherRetirementPlanningRejectionDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<TeacherRetirementPlanningRejectionDocumentTypeormEntity>
  implements TeacherRetirementPlanningRejectionDocumentCommandRepositoryGateway
{
  protected readonly _type =
    TeacherRetirementPlanningRejectionDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(TeacherRetirementPlanningRejectionDocumentTypeormEntity)
    repository: Repository<TeacherRetirementPlanningRejectionDocumentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createTeacherRetirementPlanningRejectionDocument(
    props: TeacherRetirementPlanningRejectionDocumentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      TeacherRetirementPlanningRejectionDocumentEntity,
      TeacherRetirementPlanningRejectionDocumentTypeormEntity,
    );
    return this.create(mappedData);
  }

  public deleteAllByTeacherRetirementPlanningRejectionId(
    teacherRetirementPlanningRejectionId: TeacherRetirementPlanningRejectionId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;
      await manager
        .getRepository(TeacherRetirementPlanningRejectionDocumentTypeormEntity)
        .softDelete({
          teacherRetirementPlanningRejection: {
            id: teacherRetirementPlanningRejectionId.toString(),
          },
        });
    };
  }
}
