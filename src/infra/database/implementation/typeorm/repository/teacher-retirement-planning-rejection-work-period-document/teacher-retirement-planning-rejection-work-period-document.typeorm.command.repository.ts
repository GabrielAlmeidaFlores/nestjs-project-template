import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { TeacherRetirementPlanningRejectionWorkPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning-rejection-work-period-document.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { TeacherRetirementPlanningRejectionWorkPeriodDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/repository/teacher-retirement-planning-rejection-work-period-document/command/teacher-retirement-planning-rejection-work-period-document.command.repository.gateway';
import { TeacherRetirementPlanningRejectionWorkPeriodId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-work-period/value-object/teacher-retirement-planning-rejection-work-period-id.value-object';
import { TeacherRetirementPlanningRejectionWorkPeriodDocumentEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-work-period-document/teacher-retirement-planning-rejection-work-period-document.entity';

@Injectable()
export class TeacherRetirementPlanningRejectionWorkPeriodDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<TeacherRetirementPlanningRejectionWorkPeriodDocumentTypeormEntity>
  implements
    TeacherRetirementPlanningRejectionWorkPeriodDocumentCommandRepositoryGateway
{
  protected readonly _type =
    TeacherRetirementPlanningRejectionWorkPeriodDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      TeacherRetirementPlanningRejectionWorkPeriodDocumentTypeormEntity,
    )
    repository: Repository<TeacherRetirementPlanningRejectionWorkPeriodDocumentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createTeacherRetirementPlanningRejectionWorkPeriodDocument(
    props: TeacherRetirementPlanningRejectionWorkPeriodDocumentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      TeacherRetirementPlanningRejectionWorkPeriodDocumentEntity,
      TeacherRetirementPlanningRejectionWorkPeriodDocumentTypeormEntity,
    );
    return this.create(mappedData);
  }

  public deleteAllByTeacherRetirementPlanningRejectionWorkPeriodId(
    teacherRetirementPlanningRejectionWorkPeriodId: TeacherRetirementPlanningRejectionWorkPeriodId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;
      await manager
        .getRepository(
          TeacherRetirementPlanningRejectionWorkPeriodDocumentTypeormEntity,
        )
        .softDelete({
          teacherRetirementPlanningRejectionWorkPeriod: {
            id: teacherRetirementPlanningRejectionWorkPeriodId.toString(),
          },
        });
    };
  }
}
