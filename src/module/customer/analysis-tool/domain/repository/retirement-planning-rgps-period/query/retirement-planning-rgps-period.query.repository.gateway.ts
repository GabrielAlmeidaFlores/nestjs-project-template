import type { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import type { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import type { ListRetirementPlanningRgpsPeriodQueryParam } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rgps-period/query/param/list-retirement-planning-rgps-period.query.param';
import type { GetRetirementPlanningRgpsPeriodQueryResult } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rgps-period/query/result/get-retirement-planning-rgps-period-query.result';
import type { RetirementPlanningRgpsPeriodId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-period/value-object/retirement-planning-rgps-period-id.value-object';
import type { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import type { NotFoundError } from 'rxjs';
import type { Constructor } from 'type-fest';

export abstract class RetirementPlanningRgpsPeriodQueryRepositoryGateway {
  public abstract listByRetirementPlanningRgpsId(
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    listData: ListRetirementPlanningRgpsPeriodQueryParam,
  ): Promise<ListDataOutputModel<GetRetirementPlanningRgpsPeriodQueryResult>>;

  public abstract findOneByRetirementPlanningRgpsPeriodIdOrFail(
    retirementPlanningRgpsPeriodId: RetirementPlanningRgpsPeriodId,
    err: Constructor<NotFoundError>,
  ): Promise<GetRetirementPlanningRgpsPeriodQueryResult>;
}
