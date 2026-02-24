import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { TeacherRetirementPlanningResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning-result.typeorm.entity';
import { TeacherRetirementPlanningResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/repository/teacher-retirement-planning-result/command/teacher-retirement-planning-result.command.repository.gateway';
import { TeacherRetirementPlanningResultEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-result/teacher-retirement-planning-result.entity';

@Injectable()
export class TeacherRetirementPlanningResultTypeormCommandRepository
  extends BaseTypeormCommandRepository<TeacherRetirementPlanningResultTypeormEntity>
  implements TeacherRetirementPlanningResultCommandRepositoryGateway
{
  protected readonly _type =
    TeacherRetirementPlanningResultTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(TeacherRetirementPlanningResultTypeormEntity)
    repository: Repository<TeacherRetirementPlanningResultTypeormEntity>,
  ) {
    super(repository);
  }

  public createTeacherRetirementPlanningResult(
    props: TeacherRetirementPlanningResultEntity,
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
    props: TeacherRetirementPlanningResultEntity,
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
