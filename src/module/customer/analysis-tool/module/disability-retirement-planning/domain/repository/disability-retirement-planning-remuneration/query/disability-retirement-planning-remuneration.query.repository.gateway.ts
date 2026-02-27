import type { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import type { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import type { ListDisabilityRetirementPlanningRemunerationQueryParam } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/repository/disability-retirement-planning-remuneration/query/param/list-disability-retirement-planning-remuneration.query.param';
import type { GetDisabilityRetirementPlanningRemunerationListQueryResult } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/repository/disability-retirement-planning-remuneration/query/result/get-disability-retirement-planning-remuneration-list.query.result';
import type { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';

import type { DisabilityRetirementPlanningId } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning/value-object/disability-retirement-planning-id.value-object';

export abstract class DisabilityRetirementPlanningRemunerationQueryRepositoryGateway {
  public abstract listByDisabilityRetirementPlanningIdAndOrganizationIdAndAuthIdentityId(
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    disabilityRetirementPlanningId: DisabilityRetirementPlanningId,
    listData: ListDisabilityRetirementPlanningRemunerationQueryParam,
  ): Promise<ListDataOutputModel<GetDisabilityRetirementPlanningRemunerationListQueryResult>>;

  public abstract findByDisabilityRetirementPlanningId(
    disabilityRetirementPlanningId: DisabilityRetirementPlanningId,
  ): Promise<GetDisabilityRetirementPlanningRemunerationListQueryResult[]>;
}
