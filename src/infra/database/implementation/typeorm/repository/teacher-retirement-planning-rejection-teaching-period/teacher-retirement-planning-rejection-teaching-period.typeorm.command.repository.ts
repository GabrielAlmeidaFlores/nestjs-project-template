import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { TeacherRetirementPlanningRejectionTeachingPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning-rejection-teaching-period.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { TeacherRetirementPlanningRejectionTeachingPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/repository/teacher-retirement-planning-rejection-teaching-period/command/teacher-retirement-planning-rejection-teaching-period.command.repository.gateway';
import { TeacherRetirementPlanningRejectionId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection/value-object/teacher-retirement-planning-rejection-id.value-object';
import { TeacherRetirementPlanningRejectionTeachingPeriodEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-teaching-period/teacher-retirement-planning-rejection-teaching-period.entity';

@Injectable()
export class TeacherRetirementPlanningRejectionTeachingPeriodTypeormCommandRepository
  extends BaseTypeormCommandRepository<TeacherRetirementPlanningRejectionTeachingPeriodTypeormEntity>
  implements
    TeacherRetirementPlanningRejectionTeachingPeriodCommandRepositoryGateway
{
  protected readonly _type =
    TeacherRetirementPlanningRejectionTeachingPeriodTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      TeacherRetirementPlanningRejectionTeachingPeriodTypeormEntity,
    )
    repository: Repository<TeacherRetirementPlanningRejectionTeachingPeriodTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createTeacherRetirementPlanningRejectionTeachingPeriod(
    props: TeacherRetirementPlanningRejectionTeachingPeriodEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      TeacherRetirementPlanningRejectionTeachingPeriodEntity,
      TeacherRetirementPlanningRejectionTeachingPeriodTypeormEntity,
    );
    return this.create(mappedData);
  }

  public deleteAllByTeacherRetirementPlanningRejectionId(
    teacherRetirementPlanningRejectionId: TeacherRetirementPlanningRejectionId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;
      await manager
        .getRepository(
          TeacherRetirementPlanningRejectionTeachingPeriodTypeormEntity,
        )
        .softDelete({
          teacherRetirementPlanningRejection: {
            id: teacherRetirementPlanningRejectionId.toString(),
          },
        });
    };
  }
}
