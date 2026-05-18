import type { NotFoundError } from '@core/error/not-found.error';
import type { GetGeneralUrbanRetirementReviewSpecialPeriodQueryResult } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review-special-period/query/result/get-general-urban-retirement-review-special-period.query.result';
import type { GeneralUrbanRetirementReviewSpecialPeriodId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-special-period/value-object/general-urban-retirement-review-special-period-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class GeneralUrbanRetirementReviewSpecialPeriodQueryRepositoryGateway {
  public abstract findOneByGeneralUrbanRetirementReviewSpecialPeriodIdOrFail(
    id: GeneralUrbanRetirementReviewSpecialPeriodId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetGeneralUrbanRetirementReviewSpecialPeriodQueryResult>;
}
