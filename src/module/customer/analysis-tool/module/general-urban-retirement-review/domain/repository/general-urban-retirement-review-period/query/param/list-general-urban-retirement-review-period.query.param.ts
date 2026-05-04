import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';

import type { GeneralUrbanRetirementReviewId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review/value-object/general-urban-retirement-review-id.value-object';

export class ListGeneralUrbanRetirementReviewPeriodQueryParam extends ListDataInputModel {
  public generalUrbanRetirementReview?:
    | GeneralUrbanRetirementReviewId
    | undefined;

  protected override readonly _type =
    ListGeneralUrbanRetirementReviewPeriodQueryParam.name;

  public constructor(
    props: Partial<ListGeneralUrbanRetirementReviewPeriodQueryParam> = {},
  ) {
    super(props);
    this.generalUrbanRetirementReview =
      props.generalUrbanRetirementReview ?? undefined;
  }
}
