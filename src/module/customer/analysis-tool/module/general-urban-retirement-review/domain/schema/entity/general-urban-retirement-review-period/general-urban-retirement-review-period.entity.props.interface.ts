import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { GeneralUrbanRetirementReviewEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review/general-urban-retirement-review.entity';
import type { ReasonPendencyEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-period/enum/reason-pendency.enum';
import type { GeneralUrbanRetirementReviewPeriodId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-period/value-object/general-urban-retirement-review-period-id.value-object';

export interface GeneralUrbanRetirementReviewPeriodEntityPropsInterface extends BaseEntityPropsInterface<GeneralUrbanRetirementReviewPeriodId> {
  periodName?: string | null;
  periodStart?: Date | null;
  periodEnd?: Date | null;
  category?: string | null;
  isPendency?: boolean | null;
  competenceBelowTheMinimum?: boolean | null;
  contributionAverage?: DecimalValue | null;
  typeOfContribution?: string | null;
  generalUrbanRetirementReview?: GeneralUrbanRetirementReviewEntity | null;
  status?: boolean | null;
  reasonPendency?: ReasonPendencyEnum | null;
}
