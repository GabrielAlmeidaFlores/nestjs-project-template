import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { RetirementPermanentDisabilityRejectionDocumentId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-document/value-object/retirement-permanent-disability-rejection-document-id/retirement-permanent-disability-rejection-document-id.value-object';

import type { RetirementPermanentDisabilityRejectionId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection/value-object/retirement-permanent-disability-rejection-id/retirement-permanent-disability-rejection-id.value-object';
import type { RetirementPermanentDisabilityRejectionDocumentTypeEnum } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-document/enum/retirement-permanent-disability-rejection-document-type.enum';
import type { RetirementPermanentDisabilityRejectionDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-document/retirement-permanent-disability-rejection-document.entity.props.interface';

export class RetirementPermanentDisabilityRejectionDocumentEntity extends BaseEntity<RetirementPermanentDisabilityRejectionDocumentId> {
  public readonly document: string;
  public readonly type: RetirementPermanentDisabilityRejectionDocumentTypeEnum;
  public readonly retirementPermanentDisabilityRejectionId: RetirementPermanentDisabilityRejectionId;

  protected readonly _type =
    RetirementPermanentDisabilityRejectionDocumentEntity.name;

  public constructor(
    props: RetirementPermanentDisabilityRejectionDocumentEntityPropsInterface,
  ) {
    super(RetirementPermanentDisabilityRejectionDocumentId, props);
    this.document = props.document;
    this.type = props.type;
    this.retirementPermanentDisabilityRejectionId =
      props.retirementPermanentDisabilityRejectionId;
  }
}
