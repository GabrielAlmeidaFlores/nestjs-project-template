import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { TeacherRetirementPlanningRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning-rejection.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { GetTeacherRetirementPlanningRejectionWithRelationsQueryResult } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/repository/teacher-retirement-planning-rejection/query/result/get-teacher-retirement-planning-rejection-with-relations.query.result';
import { TeacherRetirementPlanningRejectionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/repository/teacher-retirement-planning-rejection/query/teacher-retirement-planning-rejection.query.repository.gateway';
import { TeacherRetirementPlanningRejectionId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection/value-object/teacher-retirement-planning-rejection-id.value-object';
import { ConstructorType } from '@shared/system/type/constructor.type';

@Injectable()
export class TeacherRetirementPlanningRejectionTypeormQueryRepository
  extends BaseTypeormQueryRepository<TeacherRetirementPlanningRejectionTypeormEntity>
  implements TeacherRetirementPlanningRejectionQueryRepositoryGateway
{
  protected readonly _type =
    TeacherRetirementPlanningRejectionTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(TeacherRetirementPlanningRejectionTypeormEntity)
    repository: Repository<TeacherRetirementPlanningRejectionTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneByTeacherRetirementPlanningRejectionIdOrFailWithRelations(
    id: TeacherRetirementPlanningRejectionId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetTeacherRetirementPlanningRejectionWithRelationsQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: { id: id.toString() },
        relations: {
          teacherRetirementPlanningRejectionResult: true,
          teacherRetirementPlanningRejectionDocument: true,
          teacherRetirementPlanningRejectionInssBenefit: true,
          teacherRetirementPlanningRejectionTeachingPeriod: {
            teacherRetirementPlanningRejectionTeachingPeriodDocument: true,
          },
          teacherRetirementPlanningRejectionWorkPeriod: {
            teacherRetirementPlanningRejectionWorkPeriodEarningsHistory: true,
            teacherRetirementPlanningRejectionWorkPeriodDocument: true,
          },
          teacherRetirementPlanningRejectionTimeAccelerator: true,
        },
      },
      err,
    );

    return this.mapperGateway.map(
      data,
      TeacherRetirementPlanningRejectionTypeormEntity,
      GetTeacherRetirementPlanningRejectionWithRelationsQueryResult,
    );
  }
}
