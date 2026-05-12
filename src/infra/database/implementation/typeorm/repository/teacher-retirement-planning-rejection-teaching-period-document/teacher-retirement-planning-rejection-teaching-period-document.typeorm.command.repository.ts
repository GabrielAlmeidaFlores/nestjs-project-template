import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { TeacherRetirementPlanningRejectionTeachingPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning-rejection-teaching-period-document.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { TeacherRetirementPlanningRejectionTeachingPeriodDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/repository/teacher-retirement-planning-rejection-teaching-period-document/command/teacher-retirement-planning-rejection-teaching-period-document.command.repository.gateway';
import { TeacherRetirementPlanningRejectionTeachingPeriodId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-teaching-period/value-object/teacher-retirement-planning-rejection-teaching-period-id.value-object';
import { TeacherRetirementPlanningRejectionTeachingPeriodDocumentEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-teaching-period-document/teacher-retirement-planning-rejection-teaching-period-document.entity';

@Injectable()
export class TeacherRetirementPlanningRejectionTeachingPeriodDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<TeacherRetirementPlanningRejectionTeachingPeriodDocumentTypeormEntity>
  implements
    TeacherRetirementPlanningRejectionTeachingPeriodDocumentCommandRepositoryGateway
{
  protected readonly _type =
    TeacherRetirementPlanningRejectionTeachingPeriodDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      TeacherRetirementPlanningRejectionTeachingPeriodDocumentTypeormEntity,
    )
    repository: Repository<TeacherRetirementPlanningRejectionTeachingPeriodDocumentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createTeacherRetirementPlanningRejectionTeachingPeriodDocument(
    props: TeacherRetirementPlanningRejectionTeachingPeriodDocumentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      TeacherRetirementPlanningRejectionTeachingPeriodDocumentEntity,
      TeacherRetirementPlanningRejectionTeachingPeriodDocumentTypeormEntity,
    );
    return this.create(mappedData);
  }

  public deleteAllByTeacherRetirementPlanningRejectionTeachingPeriodId(
    teacherRetirementPlanningRejectionTeachingPeriodId: TeacherRetirementPlanningRejectionTeachingPeriodId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;
      await manager
        .getRepository(
          TeacherRetirementPlanningRejectionTeachingPeriodDocumentTypeormEntity,
        )
        .softDelete({
          teacherRetirementPlanningRejectionTeachingPeriod: {
            id: teacherRetirementPlanningRejectionTeachingPeriodId.toString(),
          },
        });
    };
  }
}
