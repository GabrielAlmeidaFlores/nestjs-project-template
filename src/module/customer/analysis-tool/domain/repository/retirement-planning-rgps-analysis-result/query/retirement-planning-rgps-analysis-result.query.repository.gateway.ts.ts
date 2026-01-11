import type { GetRetirementPlanningRgpsAnalysisResultQueryResult } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rgps-analysis-result/query/result/get-retirement-planning-rgps-analysis-result.query.result';
import type { RetirementPlanningRgpsAnalysisResultId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-analysis-result/value-object/retirement-planning-rgps-analysis-result-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';
import type { NotFoundError } from 'rxjs';

export abstract class RetirementPlanningRgpsAnalysisResultQueryRepositoryGateway {
  public abstract findOneByRetirementPlanningRgpsAnalysisResultIdOrFail(
    id: RetirementPlanningRgpsAnalysisResultId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetRetirementPlanningRgpsAnalysisResultQueryResult>;
}
