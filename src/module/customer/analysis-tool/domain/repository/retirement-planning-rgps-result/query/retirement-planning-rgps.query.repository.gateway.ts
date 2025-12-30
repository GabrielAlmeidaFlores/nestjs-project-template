import type { GetRetirementPlanningRgpsResultQueryResult } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rgps-result/query/result/get-retirement-planning-rgps-result-query.result';
import type { RetirementPlanningRgpsResultId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-result/value-object/retirement-planning-rgps-result-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';
import type { NotFoundError } from 'rxjs';

export abstract class RetirementPlanningRgpsResultQueryRepositoryGateway {
  public abstract findOneByRetirementPlanningRgpsResultIdOrFail(
    id: RetirementPlanningRgpsResultId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetRetirementPlanningRgpsResultQueryResult>;
}
