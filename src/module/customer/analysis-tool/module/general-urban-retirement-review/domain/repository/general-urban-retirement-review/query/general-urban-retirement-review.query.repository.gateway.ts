import type { NotFoundError } from '@core/error/not-found.error';
import type { GetGeneralUrbanRetirementReviewQueryResult } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review/query/result/get-general-urban-retirement-review-query.result';
import type { GetGeneralUrbanRetirementReviewWithRelationsQueryResult } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review/query/result/get-general-urban-retirement-review-with-relations.query.result';
import type { GeneralUrbanRetirementReviewId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review/value-object/general-urban-retirement-review-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class GeneralUrbanRetirementReviewQueryRepositoryGateway {
  public abstract findOneByGeneralUrbanRetirementReviewIdOrFail(
    id: GeneralUrbanRetirementReviewId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetGeneralUrbanRetirementReviewQueryResult>;

  public abstract findOneByGeneralUrbanRetirementReviewIdOrFailWithRelations(
    id: GeneralUrbanRetirementReviewId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetGeneralUrbanRetirementReviewWithRelationsQueryResult>;
}
