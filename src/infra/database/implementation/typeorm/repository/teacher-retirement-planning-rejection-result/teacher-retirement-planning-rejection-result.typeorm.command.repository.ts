import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { TeacherRetirementPlanningRejectionResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning-rejection-result.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { TeacherRetirementPlanningRejectionResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/repository/teacher-retirement-planning-rejection-result/command/teacher-retirement-planning-rejection-result.command.repository.gateway';
import { TeacherRetirementPlanningRejectionResultEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-result/teacher-retirement-planning-rejection-result.entity';

@Injectable()
export class TeacherRetirementPlanningRejectionResultTypeormCommandRepository
  extends BaseTypeormCommandRepository<TeacherRetirementPlanningRejectionResultTypeormEntity>
  implements TeacherRetirementPlanningRejectionResultCommandRepositoryGateway
{
  protected readonly _type =
    TeacherRetirementPlanningRejectionResultTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(TeacherRetirementPlanningRejectionResultTypeormEntity)
    repository: Repository<TeacherRetirementPlanningRejectionResultTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createTeacherRetirementPlanningRejectionResult(
    props: TeacherRetirementPlanningRejectionResultEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      TeacherRetirementPlanningRejectionResultEntity,
      TeacherRetirementPlanningRejectionResultTypeormEntity,
    );
    return this.create(mappedData);
  }

  public updateTeacherRetirementPlanningRejectionResult(
    props: TeacherRetirementPlanningRejectionResultEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      TeacherRetirementPlanningRejectionResultEntity,
      TeacherRetirementPlanningRejectionResultTypeormEntity,
    );
    return this.update(props.id.toString(), mappedData);
  }
}
