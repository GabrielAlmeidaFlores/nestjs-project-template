import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { TeacherRetirementPlanningRemunerationEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-remuneration/teacher-retirement-planning-remuneration.entity';
import type { TeacherRetirementPlanningRemunerationId } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-remuneration/value-object/teacher-retirement-planning-remuneration-id.value-object';

export abstract class TeacherRetirementPlanningRemunerationCommandRepositoryGateway {
  public abstract createTeacherRetirementPlanningRemuneration(
    props: TeacherRetirementPlanningRemunerationEntity,
  ): TransactionType;

  public abstract updateTeacherRetirementPlanningRemuneration(
    id: TeacherRetirementPlanningRemunerationId,
    props: TeacherRetirementPlanningRemunerationEntity,
  ): TransactionType;

  public abstract deleteTeacherRetirementPlanningRemuneration(
    id: TeacherRetirementPlanningRemunerationId,
  ): TransactionType;
}
