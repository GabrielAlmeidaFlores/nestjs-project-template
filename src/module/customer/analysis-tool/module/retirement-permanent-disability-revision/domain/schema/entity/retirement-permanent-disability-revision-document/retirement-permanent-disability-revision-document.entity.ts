import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { RetirementPermanentDisabilityRevisionDocumentId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-document/value-object/retirement-permanent-disability-revision-document-id.value-object';

import type { RetirementPermanentDisabilityRevisionId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision/value-object/retirement-permanent-disability-revision-id.value-object';
import type { RetirementPermanentDisabilityRevisionDocumentTypeEnum } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-document/enum/retirement-permanent-disability-revision-document-type.enum';
import type { RetirementPermanentDisabilityRevisionDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-document/retirement-permanent-disability-revision-document.entity.props.interface';

export class RetirementPermanentDisabilityRevisionDocumentEntity extends BaseEntity<RetirementPermanentDisabilityRevisionDocumentId> {
  public readonly document: string;
  public readonly type: RetirementPermanentDisabilityRevisionDocumentTypeEnum;
  public readonly retirementPermanentDisabilityRevision: RetirementPermanentDisabilityRevisionId;

  protected readonly _type =
    RetirementPermanentDisabilityRevisionDocumentEntity.name;

  public constructor(
    props: RetirementPermanentDisabilityRevisionDocumentEntityPropsInterface,
  ) {
    super(RetirementPermanentDisabilityRevisionDocumentId, props);

    this.document = props.document;
    this.type = props.type;
    this.retirementPermanentDisabilityRevision =
      props.retirementPermanentDisabilityRevision;
  }
}
