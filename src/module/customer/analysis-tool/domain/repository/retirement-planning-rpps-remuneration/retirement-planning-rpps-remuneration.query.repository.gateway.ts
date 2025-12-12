import { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { ListRetirementPlanningRppsRemunerationQueryParam } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps-remuneration/query/param/list-retirement-planning-rpps-remuneration.query.param';
import { GetRetirementPlanningRppsRemunerationQueryResult } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps-remuneration/query/result/get-retirement-planning-rpps-remuneration.query.result';
import { RetirementPlanningRppsId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps/value-object/retirement-planning-rpps-id.value-object';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';

export abstract class RetirementPlanningRppsRemunerationQueryRepositoryGateway {
  public abstract listByOrganizationIdAndAuthIdentityId(
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    retirementPlanningRppsId: RetirementPlanningRppsId,
    listData: ListRetirementPlanningRppsRemunerationQueryParam,
  ): Promise<
    ListDataOutputModel<GetRetirementPlanningRppsRemunerationQueryResult>
  >;
}
