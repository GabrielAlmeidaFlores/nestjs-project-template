import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { TeacherRetirementPlanningTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning.typeorm.entity';
import { TeacherRetirementPlanningCommandRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/repository/teacher-retirement-planning/command/teacher-retirement-planning.command.repository.gateway';
import { TeacherRetirementPlanningEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning/teacher-retirement-planning.entity';
import { TeacherRetirementPlanningId } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning/value-object/teacher-retirement-planning-id.value-object';

@Injectable()
export class TeacherRetirementPlanningTypeormCommandRepository
  extends BaseTypeormCommandRepository<TeacherRetirementPlanningTypeormEntity>
  implements TeacherRetirementPlanningCommandRepositoryGateway
{
  protected readonly _type =
    TeacherRetirementPlanningTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(TeacherRetirementPlanningTypeormEntity)
    repository: Repository<TeacherRetirementPlanningTypeormEntity>,
  ) {
    super(repository);
  }

  public createTeacherRetirementPlanning(
    props: TeacherRetirementPlanningEntity,
  ): TransactionType {
    return this.create({
      id: props.id.toString(),
      federativeEntity: props.federativeEntity,
      state: props.state,
      municipality: props.municipality,
      analysisName: props.analysisName,
      currentPosition: props.currentPosition,
      activityType: props.activityType,
      publicServiceStartDate: props.publicServiceStartDate,
      careerStartDate: props.careerStartDate,
      administrativeProcessAnalysis: props.administrativeProcessAnalysis,
      ...(props.teacherRetirementPlanningResult !== null && {
        teacherRetirementPlanningResult: {
          id: props.teacherRetirementPlanningResult.id.toString(),
        },
      }),
    });
  }

  public updateTeacherRetirementPlanning(
    id: TeacherRetirementPlanningId,
    props: TeacherRetirementPlanningEntity,
  ): TransactionType {
    return this.update(id.toString(), {
      federativeEntity: props.federativeEntity,
      state: props.state,
      municipality: props.municipality,
      analysisName: props.analysisName,
      currentPosition: props.currentPosition,
      activityType: props.activityType,
      publicServiceStartDate: props.publicServiceStartDate,
      careerStartDate: props.careerStartDate,
      administrativeProcessAnalysis: props.administrativeProcessAnalysis,
      ...(props.teacherRetirementPlanningResult !== null && {
        teacherRetirementPlanningResult: {
          id: props.teacherRetirementPlanningResult.id.toString(),
        },
      }),
    });
  }

  public deleteTeacherRetirementPlanning(
    id: TeacherRetirementPlanningId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
