import type { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import type { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import type { ListRetirementPlanningRppsRemunerationQueryParam } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps-remuneration/query/param/list-retirement-planning-rpps-remuneration.query.param';
import type { GetRetirementPlanningRppsRemunerationQueryResult } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps-remuneration/query/result/get-retirement-planning-rpps-remuneration.query.result';
import type { RetirementPlanningRppsId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps/value-object/retirement-planning-rpps-id.value-object';
import type { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';

export abstract class RetirementPlanningRppsRemunerationQueryRepositoryGateway {
  public abstract listByRetirementPlanningRppsIdAndOrganizationIdAndAuthIdentityId(
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    retirementPlanningRppsId: RetirementPlanningRppsId,
    listData: ListRetirementPlanningRppsRemunerationQueryParam,
  ): Promise<
    ListDataOutputModel<GetRetirementPlanningRppsRemunerationQueryResult>
  >;

  public abstract findByRetirementPlanningRppsId(
    retirementPlanningRppsId: RetirementPlanningRppsId,
  ): Promise<GetRetirementPlanningRppsRemunerationQueryResult[]>;
}
