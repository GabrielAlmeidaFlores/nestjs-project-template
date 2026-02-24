import type { GetTeacherRetirementPlanningQueryResult } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/repository/teacher-retirement-planning/query/result/get-teacher-retirement-planning.query.result';
import type { GetTeacherRetirementPlanningWithRelationsQueryResult } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/repository/teacher-retirement-planning/query/result/get-teacher-retirement-planning-with-relations.query.result';
import type { TeacherRetirementPlanningId } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning/value-object/teacher-retirement-planning-id.value-object';

export abstract class TeacherRetirementPlanningQueryRepositoryGateway {
  public abstract findOneTeacherRetirementPlanningById(
    id: TeacherRetirementPlanningId,
  ): Promise<GetTeacherRetirementPlanningQueryResult | null>;

  public abstract findOneTeacherRetirementPlanningByIdWithRelations(
    id: TeacherRetirementPlanningId,
  ): Promise<GetTeacherRetirementPlanningWithRelationsQueryResult | null>;
}
