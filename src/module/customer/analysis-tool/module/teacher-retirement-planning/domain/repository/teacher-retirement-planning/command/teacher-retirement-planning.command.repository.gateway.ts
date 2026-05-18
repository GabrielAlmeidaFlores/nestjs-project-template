import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { TeacherRetirementPlanningEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning/teacher-retirement-planning.entity';
import type { TeacherRetirementPlanningId } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning/value-object/teacher-retirement-planning-id.value-object';

export abstract class TeacherRetirementPlanningCommandRepositoryGateway {
  public abstract createTeacherRetirementPlanning(
    props: TeacherRetirementPlanningEntity,
  ): TransactionType;

  public abstract updateTeacherRetirementPlanning(
    id: TeacherRetirementPlanningId,
    props: TeacherRetirementPlanningEntity,
  ): TransactionType;

  public abstract deleteTeacherRetirementPlanning(
    id: TeacherRetirementPlanningId,
  ): TransactionType;
}
