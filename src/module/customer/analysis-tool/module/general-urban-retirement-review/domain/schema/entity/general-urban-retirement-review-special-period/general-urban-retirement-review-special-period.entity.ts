import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { GeneralUrbanRetirementReviewSpecialPeriodEntityPropsInterface } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-special-period/general-urban-retirement-review-special-period.entity.props.interface';
import { GeneralUrbanRetirementReviewSpecialPeriodId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-special-period/value-object/general-urban-retirement-review-special-period-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { GeneralUrbanRetirementReviewEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review/general-urban-retirement-review.entity';

export class GeneralUrbanRetirementReviewSpecialPeriodEntity extends BaseEntity<GeneralUrbanRetirementReviewSpecialPeriodId> {
  @Description('Resposta da análise do período especial.')
  public readonly response: string;

  @Description(
    'Concessão de aposentadoria urbana associada ao período especial.',
  )
  public readonly generalUrbanRetirementReview: GeneralUrbanRetirementReviewEntity | null;

  protected readonly _type =
    GeneralUrbanRetirementReviewSpecialPeriodEntity.name;

  public constructor(
    props: GeneralUrbanRetirementReviewSpecialPeriodEntityPropsInterface,
  ) {
    super(GeneralUrbanRetirementReviewSpecialPeriodId, props);
    this.response = props.response;
    this.generalUrbanRetirementReview =
      props.generalUrbanRetirementReview ?? null;
  }
}
