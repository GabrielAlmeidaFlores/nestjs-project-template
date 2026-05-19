import type { NotFoundError } from '@core/error/not-found.error';
import type { GetGeneralUrbanRetirementReviewPeriodDocumentQueryResult } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review-period-document/query/result/get-general-urban-retirement-review-period-document.query.result';
import type { GeneralUrbanRetirementReviewPeriodId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-period/value-object/general-urban-retirement-review-period-id.value-object';
import type { GeneralUrbanRetirementReviewPeriodDocumentId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-period-document/value-object/general-urban-retirement-review-period-document-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class GeneralUrbanRetirementReviewPeriodDocumentQueryRepositoryGateway {
  public abstract findOneByGeneralUrbanRetirementReviewPeriodDocumentIdOrFail(
    id: GeneralUrbanRetirementReviewPeriodDocumentId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetGeneralUrbanRetirementReviewPeriodDocumentQueryResult>;

  public abstract findByGeneralUrbanRetirementReviewPeriodId(
    periodId: GeneralUrbanRetirementReviewPeriodId,
  ): Promise<GetGeneralUrbanRetirementReviewPeriodDocumentQueryResult[]>;
}
