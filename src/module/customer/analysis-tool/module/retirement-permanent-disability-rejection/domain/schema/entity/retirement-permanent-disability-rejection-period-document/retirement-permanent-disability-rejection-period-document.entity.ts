import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { RetirementPermanentDisabilityRejectionPeriodDocumentId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-period-document/value-object/retirement-permanent-disability-rejection-period-document-id/retirement-permanent-disability-rejection-period-document-id.value-object';

import type { RetirementPermanentDisabilityRejectionPeriodId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-period/value-object/retirement-permanent-disability-rejection-period-id/retirement-permanent-disability-rejection-period-id.value-object';
import type { RetirementPermanentDisabilityRejectionPeriodDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-period-document/retirement-permanent-disability-rejection-period-document.entity.props.interface';

export class RetirementPermanentDisabilityRejectionPeriodDocumentEntity extends BaseEntity<RetirementPermanentDisabilityRejectionPeriodDocumentId> {
  public readonly document: string;
  public readonly retirementPermanentDisabilityRejectionPeriodId: RetirementPermanentDisabilityRejectionPeriodId;

  protected readonly _type =
    RetirementPermanentDisabilityRejectionPeriodDocumentEntity.name;

  public constructor(
    props: RetirementPermanentDisabilityRejectionPeriodDocumentEntityPropsInterface,
  ) {
    super(RetirementPermanentDisabilityRejectionPeriodDocumentId, props);
    this.document = props.document;
    this.retirementPermanentDisabilityRejectionPeriodId =
      props.retirementPermanentDisabilityRejectionPeriodId;
  }
}
