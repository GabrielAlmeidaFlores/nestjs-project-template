import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { RetirementPermanentDisabilityRejectionIncapacityDocumentId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-incapacity-document/value-object/retirement-permanent-disability-rejection-incapacity-document-id/retirement-permanent-disability-rejection-incapacity-document-id.value-object';

import type { RetirementPermanentDisabilityRejectionIncapacityId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-incapacity/value-object/retirement-permanent-disability-rejection-incapacity-id/retirement-permanent-disability-rejection-incapacity-id.value-object';
import type { RetirementPermanentDisabilityRejectionIncapacityDocumentTypeEnum } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-incapacity-document/enum/retirement-permanent-disability-rejection-incapacity-document-type.enum';
import type { RetirementPermanentDisabilityRejectionIncapacityDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-incapacity-document/retirement-permanent-disability-rejection-incapacity-document.entity.props.interface';

export class RetirementPermanentDisabilityRejectionIncapacityDocumentEntity extends BaseEntity<RetirementPermanentDisabilityRejectionIncapacityDocumentId> {
  public readonly document: string;
  public readonly type: RetirementPermanentDisabilityRejectionIncapacityDocumentTypeEnum;
  public readonly retirementPermanentDisabilityRejectionIncapacityId: RetirementPermanentDisabilityRejectionIncapacityId;

  protected readonly _type =
    RetirementPermanentDisabilityRejectionIncapacityDocumentEntity.name;

  public constructor(
    props: RetirementPermanentDisabilityRejectionIncapacityDocumentEntityPropsInterface,
  ) {
    super(RetirementPermanentDisabilityRejectionIncapacityDocumentId, props);
    this.document = props.document;
    this.type = props.type;
    this.retirementPermanentDisabilityRejectionIncapacityId =
      props.retirementPermanentDisabilityRejectionIncapacityId;
  }
}
