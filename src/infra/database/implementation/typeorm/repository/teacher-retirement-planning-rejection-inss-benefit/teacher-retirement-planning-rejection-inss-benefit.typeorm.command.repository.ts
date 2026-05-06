import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { TeacherRetirementPlanningRejectionInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning-rejection-inss-benefit.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { TeacherRetirementPlanningRejectionInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/repository/teacher-retirement-planning-rejection-inss-benefit/command/teacher-retirement-planning-rejection-inss-benefit.command.repository.gateway';
import { TeacherRetirementPlanningRejectionId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection/value-object/teacher-retirement-planning-rejection-id.value-object';
import { TeacherRetirementPlanningRejectionInssBenefitEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-inss-benefit/teacher-retirement-planning-rejection-inss-benefit.entity';

@Injectable()
export class TeacherRetirementPlanningRejectionInssBenefitTypeormCommandRepository
  extends BaseTypeormCommandRepository<TeacherRetirementPlanningRejectionInssBenefitTypeormEntity>
  implements
    TeacherRetirementPlanningRejectionInssBenefitCommandRepositoryGateway
{
  protected readonly _type =
    TeacherRetirementPlanningRejectionInssBenefitTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      TeacherRetirementPlanningRejectionInssBenefitTypeormEntity,
    )
    repository: Repository<TeacherRetirementPlanningRejectionInssBenefitTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createTeacherRetirementPlanningRejectionInssBenefit(
    props: TeacherRetirementPlanningRejectionInssBenefitEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      TeacherRetirementPlanningRejectionInssBenefitEntity,
      TeacherRetirementPlanningRejectionInssBenefitTypeormEntity,
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
          TeacherRetirementPlanningRejectionInssBenefitTypeormEntity,
        )
        .softDelete({
          teacherRetirementPlanningRejection: {
            id: teacherRetirementPlanningRejectionId.toString(),
          },
        });
    };
  }
}
