import type { NotFoundError } from '@core/error/not-found.error';
import type { GetGeneralUrbanRetirementReviewAnalysisResultQueryResult } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review-analysis-result/query/result/get-general-urban-retirement-review-analysis-result.query.result';
import type { GeneralUrbanRetirementReviewId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review/value-object/general-urban-retirement-review-id.value-object';
import type { GeneralUrbanRetirementReviewAnalysisResultId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-analysis-result/value-object/general-urban-retirement-review-analysis-result-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class GeneralUrbanRetirementReviewAnalysisResultQueryRepositoryGateway {
  public abstract findManyByGeneralUrbanRetirementReviewId(
    generalUrbanRetirementReviewId: GeneralUrbanRetirementReviewId,
  ): Promise<GetGeneralUrbanRetirementReviewAnalysisResultQueryResult[]>;

  public abstract findOneByGeneralUrbanRetirementReviewAnalysisResultIdOrFail(
    id: GeneralUrbanRetirementReviewAnalysisResultId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetGeneralUrbanRetirementReviewAnalysisResultQueryResult>;
}
