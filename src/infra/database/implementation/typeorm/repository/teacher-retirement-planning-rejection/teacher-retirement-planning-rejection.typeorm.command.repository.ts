import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { TeacherRetirementPlanningRejectionResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning-rejection-result.typeorm.entity';
import { TeacherRetirementPlanningRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning-rejection.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { TeacherRetirementPlanningRejectionCommandRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/repository/teacher-retirement-planning-rejection/command/teacher-retirement-planning-rejection.command.repository.gateway';
import { TeacherRetirementPlanningRejectionEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection/teacher-retirement-planning-rejection.entity';
import { TeacherRetirementPlanningRejectionId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection/value-object/teacher-retirement-planning-rejection-id.value-object';
import { TeacherRetirementPlanningRejectionResultId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-result/value-object/teacher-retirement-planning-rejection-result-id.value-object';

@Injectable()
export class TeacherRetirementPlanningRejectionTypeormCommandRepository
  extends BaseTypeormCommandRepository<TeacherRetirementPlanningRejectionTypeormEntity>
  implements TeacherRetirementPlanningRejectionCommandRepositoryGateway
{
  protected readonly _type =
    TeacherRetirementPlanningRejectionTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(TeacherRetirementPlanningRejectionTypeormEntity)
    repository: Repository<TeacherRetirementPlanningRejectionTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createTeacherRetirementPlanningRejection(
    props: TeacherRetirementPlanningRejectionEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      TeacherRetirementPlanningRejectionEntity,
      TeacherRetirementPlanningRejectionTypeormEntity,
    );
    return this.create(mappedData);
  }

  public updateTeacherRetirementPlanningRejection(
    id: TeacherRetirementPlanningRejectionId,
    props: TeacherRetirementPlanningRejectionEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      TeacherRetirementPlanningRejectionEntity,
      TeacherRetirementPlanningRejectionTypeormEntity,
    );
    return this.update(id.toString(), mappedData);
  }

  public updateTeacherRetirementPlanningRejectionResultId(
    id: TeacherRetirementPlanningRejectionId,
    resultId: TeacherRetirementPlanningRejectionResultId,
  ): TransactionType {
    return this.update(id.toString(), {
      teacherRetirementPlanningRejectionResult:
        TeacherRetirementPlanningRejectionResultTypeormEntity.build({
          id: resultId.toString(),
        } as TeacherRetirementPlanningRejectionResultTypeormEntity),
    });
  }
}
