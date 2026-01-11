import type { NotFoundError } from '@core/error/not-found.error';
import type { GetRetirementPlanningRgpsQueryResult } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rgps/query/result/get-retirement-planning-rgps-query.result';
import type { GetRetirementPlanningRgpsWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rgps/query/result/get-retirement-planning-rgps-with-relations-query.result';
import type { RetirementPlanningRgpsId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps/value-object/retirement-planning-rgps-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class RetirementPlanningRgpsQueryRepositoryGateway {
  public abstract findOneByRetirementPlanningRgpsIdOrFail(
    id: RetirementPlanningRgpsId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetRetirementPlanningRgpsQueryResult>;
  public abstract findOneByRetirementPlanningRgpsIdOrFailWithRelations(
    id: RetirementPlanningRgpsId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetRetirementPlanningRgpsWithRelationsQueryResult>;
}
