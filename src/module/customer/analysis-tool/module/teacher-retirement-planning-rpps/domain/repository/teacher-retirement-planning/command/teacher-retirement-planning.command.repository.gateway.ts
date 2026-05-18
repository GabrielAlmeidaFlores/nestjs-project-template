import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { TeacherRetirementPlanningRppsEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning/teacher-retirement-planning.entity';
import type { TeacherRetirementPlanningRppsId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning/value-object/teacher-retirement-planning-id.value-object';

export abstract class TeacherRetirementPlanningRppsCommandRepositoryGateway {
  public abstract createTeacherRetirementPlanning(
    props: TeacherRetirementPlanningRppsEntity,
  ): TransactionType;

  public abstract updateTeacherRetirementPlanning(
    id: TeacherRetirementPlanningRppsId,
    props: TeacherRetirementPlanningRppsEntity,
  ): TransactionType;

  public abstract deleteTeacherRetirementPlanning(
    id: TeacherRetirementPlanningRppsId,
  ): TransactionType;
}
