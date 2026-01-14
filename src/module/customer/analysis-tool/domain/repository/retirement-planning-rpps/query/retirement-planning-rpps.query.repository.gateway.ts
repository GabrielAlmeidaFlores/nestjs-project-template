import type { NotFoundError } from '@core/error/not-found.error';
import type { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import type { GetRetirementPlanningRppsWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps/query/result/get-retirement-planning-rpps-with-relations.query.result';
import type { GetRetirementPlanningRppsQueryResult } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps/query/result/get-retirement-planning-rpps.query.resut';
import type { RetirementPlanningRppsId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps/value-object/retirement-planning-rpps-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class RetirementPlanningRppsQueryRepositoryGateway {
  public abstract findOneByRetirementPlanningIdAndOrganizationIdWithRelationsOrFail(
    id: RetirementPlanningRppsId,
    organizationId: OrganizationId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetRetirementPlanningRppsWithRelationsQueryResult>;

  public abstract findOneByRetirementPlanningIdAndOrganizationIdOrFail(
    id: RetirementPlanningRppsId,
    organizationId: OrganizationId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetRetirementPlanningRppsQueryResult>;
}
