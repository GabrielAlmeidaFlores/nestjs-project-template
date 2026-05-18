import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { GeneralUrbanRetirementReviewEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review/general-urban-retirement-review.entity';
import { GeneralUrbanRetirementReviewInssBenefitEntityPropsInterface } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-inss-benefit/general-urban-retirement-review-inss-benefit.entity.props.interface';
import { GeneralUrbanRetirementReviewInssBenefitId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-inss-benefit/value-object/general-urban-retirement-review-inss-benefit-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class GeneralUrbanRetirementReviewInssBenefitEntity extends BaseEntity<GeneralUrbanRetirementReviewInssBenefitId> {
  @Description(
    'Número do benefício INSS associado à concessão de aposentadoria urbana.',
  )
  public readonly inssBenefitNumber: string;

  @Description('Concessão de aposentadoria urbana associada ao benefício INSS.')
  public readonly generalUrbanRetirementReview: GeneralUrbanRetirementReviewEntity;

  protected readonly _type = GeneralUrbanRetirementReviewInssBenefitEntity.name;

  public constructor(
    props: GeneralUrbanRetirementReviewInssBenefitEntityPropsInterface,
  ) {
    super(GeneralUrbanRetirementReviewInssBenefitId, props);

    this.inssBenefitNumber = props.inssBenefitNumber;
    this.generalUrbanRetirementReview = props.generalUrbanRetirementReview;
  }
}
