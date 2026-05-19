import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { GeneralUrbanRetirementReviewDocumentId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-document/value-object/general-urban-retirement-review-document-id/general-urban-retirement-review-document-id.value-object';

import type { GeneralUrbanRetirementReviewId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review/value-object/general-urban-retirement-review-id.value-object';
import type { GeneralUrbanRetirementReviewDocumentTypeEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-document/enum/general-urban-retirement-review-document-type.enum';
import type { GeneralUrbanRetirementReviewDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-document/general-urban-retirement-review-document.entity.props.interface';

export class GeneralUrbanRetirementReviewDocumentEntity extends BaseEntity<GeneralUrbanRetirementReviewDocumentId> {
  public readonly document: string;
  public readonly type: GeneralUrbanRetirementReviewDocumentTypeEnum;
  public readonly generalUrbanRetirementReviewId: GeneralUrbanRetirementReviewId;

  protected readonly _type = GeneralUrbanRetirementReviewDocumentEntity.name;

  public constructor(
    props: GeneralUrbanRetirementReviewDocumentEntityPropsInterface,
  ) {
    super(GeneralUrbanRetirementReviewDocumentId, props);
    this.document = props.document;
    this.type = props.type;
    this.generalUrbanRetirementReviewId = props.generalUrbanRetirementReviewId;
  }
}
