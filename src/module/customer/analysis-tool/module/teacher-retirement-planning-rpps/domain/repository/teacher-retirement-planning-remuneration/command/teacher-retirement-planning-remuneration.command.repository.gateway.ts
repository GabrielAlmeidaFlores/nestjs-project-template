import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { TeacherRetirementPlanningRppsRemunerationEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-remuneration/teacher-retirement-planning-remuneration.entity';
import type { TeacherRetirementPlanningRppsRemunerationId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-remuneration/value-object/teacher-retirement-planning-remuneration-id.value-object';

export abstract class TeacherRetirementPlanningRppsRemunerationCommandRepositoryGateway {
  public abstract createTeacherRetirementPlanningRemuneration(
    props: TeacherRetirementPlanningRppsRemunerationEntity,
  ): TransactionType;

  public abstract updateTeacherRetirementPlanningRemuneration(
    id: TeacherRetirementPlanningRppsRemunerationId,
    props: TeacherRetirementPlanningRppsRemunerationEntity,
  ): TransactionType;

  public abstract deleteTeacherRetirementPlanningRemuneration(
    id: TeacherRetirementPlanningRppsRemunerationId,
  ): TransactionType;
}
