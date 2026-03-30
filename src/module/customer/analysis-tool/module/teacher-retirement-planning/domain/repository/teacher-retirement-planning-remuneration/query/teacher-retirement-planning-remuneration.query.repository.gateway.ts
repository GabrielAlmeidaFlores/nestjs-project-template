import type { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import type { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import type { ListTeacherRetirementPlanningRemunerationQueryParam } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/repository/teacher-retirement-planning-remuneration/query/param/list-teacher-retirement-planning-remuneration.query.param';
import type { GetTeacherRetirementPlanningRemunerationQueryResult } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/repository/teacher-retirement-planning-remuneration/query/result/get-teacher-retirement-planning-remuneration.query.result';
import type { TeacherRetirementPlanningId } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning/value-object/teacher-retirement-planning-id.value-object';
import type { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';

export abstract class TeacherRetirementPlanningRemunerationQueryRepositoryGateway {
  public abstract findByTeacherRetirementPlanningId(
    teacherRetirementPlanningId: TeacherRetirementPlanningId,
  ): Promise<GetTeacherRetirementPlanningRemunerationQueryResult[]>;

  public abstract listByTeacherRetirementPlanningIdAndOrganizationIdAndAuthIdentityId(
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    teacherRetirementPlanningId: TeacherRetirementPlanningId,
    listData: ListTeacherRetirementPlanningRemunerationQueryParam,
  ): Promise<
    ListDataOutputModel<GetTeacherRetirementPlanningRemunerationQueryResult>
  >;
}
