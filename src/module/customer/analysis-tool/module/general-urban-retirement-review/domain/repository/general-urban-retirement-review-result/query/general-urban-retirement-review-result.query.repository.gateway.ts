import type { NotFoundError } from '@core/error/not-found.error';
import type { GetGeneralUrbanRetirementReviewResultQueryResult } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review-result/query/result/get-general-urban-retirement-review-result.query.result';
import type { GeneralUrbanRetirementReviewResultId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-result/value-object/general-urban-retirement-review-result-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class GeneralUrbanRetirementReviewResultQueryRepositoryGateway {
  public abstract findOneByGeneralUrbanRetirementReviewResultIdOrFail(
    id: GeneralUrbanRetirementReviewResultId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetGeneralUrbanRetirementReviewResultQueryResult>;
}
