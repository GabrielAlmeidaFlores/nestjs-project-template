import type { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import type { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import type { ListRetirementPlanningRgpsTimeAcceleratorQueryParam } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rgps-time-accelerator/query/param/list-retirement-planning-rgps-time-accelerator.query.param';
import type { GetRetirementPlanningRgpsTimeAcceleratorQueryResult } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rgps-time-accelerator/query/result/get-retirement-planning-rgps-time-accelerator.query.result';
import type { RetirementPlanningRgpsId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps/value-object/retirement-planning-rgps-id.value-object';
import type { RetirementPlanningRgpsTimeAcceleratorId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-time-accelerator/value-object/retirement-planning-rgps-time-accelerator-id.value-object';
import type { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class RetirementPlanningRgpsTimeAcceleratorQueryRepositoryGateway {
  public abstract findOneByRetirementPlanningRgpsTimeAcceleratorIdOrFail(
    id: RetirementPlanningRgpsTimeAcceleratorId,
    err: ConstructorType<Error>,
  ): Promise<GetRetirementPlanningRgpsTimeAcceleratorQueryResult>;

  public abstract findByRetirementPlanningRgpsId(
    retirementPlanningRgpsId: RetirementPlanningRgpsId,
  ): Promise<GetRetirementPlanningRgpsTimeAcceleratorQueryResult[]>;

  public abstract listByRetirementPlanningRgpsId(
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    listData: ListRetirementPlanningRgpsTimeAcceleratorQueryParam,
  ): Promise<
    ListDataOutputModel<GetRetirementPlanningRgpsTimeAcceleratorQueryResult>
  >;
}
