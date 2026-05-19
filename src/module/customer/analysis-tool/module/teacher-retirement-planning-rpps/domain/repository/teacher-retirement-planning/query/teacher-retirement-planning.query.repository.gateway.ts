import type { GetTeacherRetirementPlanningRppsWithRelationsQueryResult } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/repository/teacher-retirement-planning/query/result/get-teacher-retirement-planning-with-relations.query.result';
import type { GetTeacherRetirementPlanningRppsQueryResult } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/repository/teacher-retirement-planning/query/result/get-teacher-retirement-planning.query.result';
import type { TeacherRetirementPlanningRppsId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning/value-object/teacher-retirement-planning-id.value-object';

export abstract class TeacherRetirementPlanningRppsQueryRepositoryGateway {
  public abstract findOneTeacherRetirementPlanningById(
    id: TeacherRetirementPlanningRppsId,
  ): Promise<GetTeacherRetirementPlanningRppsQueryResult | null>;

  public abstract findOneTeacherRetirementPlanningByIdWithRelations(
    id: TeacherRetirementPlanningRppsId,
  ): Promise<GetTeacherRetirementPlanningRppsWithRelationsQueryResult | null>;
}
