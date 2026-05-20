import type { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import type { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import type { ListDisabilityRetirementPlanningRejectionPeriodQueryParam } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/repository/disability-retirement-planning-rejection-period/query/param/list-disability-retirement-planning-rejection-period.query.param';
import type { GetDisabilityRetirementPlanningRejectionPeriodQueryResult } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/repository/disability-retirement-planning-rejection-period/query/result/get-disability-retirement-planning-rejection-period.query.result';
import type { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';

export abstract class DisabilityRetirementPlanningRejectionPeriodQueryRepositoryGateway {
  public abstract listByDisabilityRetirementPlanningRejectionId(
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    listData: ListDisabilityRetirementPlanningRejectionPeriodQueryParam,
  ): Promise<
    ListDataOutputModel<GetDisabilityRetirementPlanningRejectionPeriodQueryResult>
  >;
}
