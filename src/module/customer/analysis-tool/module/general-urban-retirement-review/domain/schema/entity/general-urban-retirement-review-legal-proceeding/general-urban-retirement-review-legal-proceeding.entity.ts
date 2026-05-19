import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { GeneralUrbanRetirementReviewEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review/general-urban-retirement-review.entity';
import { GeneralUrbanRetirementReviewLegalProceedingEntityPropsInterface } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-legal-proceeding/general-urban-retirement-review-legal-proceeding.entity.props.interface';
import { GeneralUrbanRetirementReviewLegalProceedingId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-legal-proceeding/value-object/general-urban-retirement-review-legal-proceeding-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class GeneralUrbanRetirementReviewLegalProceedingEntity extends BaseEntity<GeneralUrbanRetirementReviewLegalProceedingId> {
  @Description(
    'Número do processo judicial relacionado à concessão de aposentadoria urbana.',
  )
  public readonly legalProceedingNumber: string;

  @Description(
    'Concessão de aposentadoria urbana associada ao processo judicial.',
  )
  public readonly generalUrbanRetirementReview: GeneralUrbanRetirementReviewEntity;

  protected readonly _type =
    GeneralUrbanRetirementReviewLegalProceedingEntity.name;

  public constructor(
    props: GeneralUrbanRetirementReviewLegalProceedingEntityPropsInterface,
  ) {
    super(GeneralUrbanRetirementReviewLegalProceedingId, props);

    this.legalProceedingNumber = props.legalProceedingNumber;
    this.generalUrbanRetirementReview = props.generalUrbanRetirementReview;
  }
}
