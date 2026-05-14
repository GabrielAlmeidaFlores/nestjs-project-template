import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { TeacherRetirementPlanningResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning-result.typeorm.entity';
import { TeacherRetirementPlanningRppsResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/repository/teacher-retirement-planning-result/command/teacher-retirement-planning-result.command.repository.gateway';
import { TeacherRetirementPlanningRppsResultEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-result/teacher-retirement-planning-result.entity';

@Injectable()
export class TeacherRetirementPlanningRppsResultTypeormCommandRepository
  extends BaseTypeormCommandRepository<TeacherRetirementPlanningResultTypeormEntity>
  implements TeacherRetirementPlanningRppsResultCommandRepositoryGateway
{
  protected readonly _type =
    TeacherRetirementPlanningRppsResultTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(TeacherRetirementPlanningResultTypeormEntity)
    repository: Repository<TeacherRetirementPlanningResultTypeormEntity>,
  ) {
    super(repository);
  }

  public createTeacherRetirementPlanningResult(
    props: TeacherRetirementPlanningRppsResultEntity,
  ): TransactionType {
    return this.create({
      id: props.id.toString(),
      teacherRetirementPlanningCompleteAnalysis:
        props.teacherRetirementPlanningCompleteAnalysis,
      teacherRetirementPlanningSimplifiedAnalysis:
        props.teacherRetirementPlanningSimplifiedAnalysis,
      teacherRetirementPlanningCompleteAnalysisDownload:
        props.teacherRetirementPlanningCompleteAnalysisDownload,
    });
  }

  public updateTeacherRetirementPlanningResult(
    props: TeacherRetirementPlanningRppsResultEntity,
  ): TransactionType {
    return this.update(props.id.toString(), {
      teacherRetirementPlanningCompleteAnalysis:
        props.teacherRetirementPlanningCompleteAnalysis,
      teacherRetirementPlanningSimplifiedAnalysis:
        props.teacherRetirementPlanningSimplifiedAnalysis,
      teacherRetirementPlanningCompleteAnalysisDownload:
        props.teacherRetirementPlanningCompleteAnalysisDownload,
    });
  }
}
