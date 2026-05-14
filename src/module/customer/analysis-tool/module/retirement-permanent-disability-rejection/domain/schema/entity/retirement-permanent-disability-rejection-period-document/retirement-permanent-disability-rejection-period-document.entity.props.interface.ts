import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { RetirementPermanentDisabilityRejectionPeriodId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-period/value-object/retirement-permanent-disability-rejection-period-id/retirement-permanent-disability-rejection-period-id.value-object';
import type { RetirementPermanentDisabilityRejectionPeriodDocumentId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-period-document/value-object/retirement-permanent-disability-rejection-period-document-id/retirement-permanent-disability-rejection-period-document-id.value-object';

export interface RetirementPermanentDisabilityRejectionPeriodDocumentEntityPropsInterface extends BaseEntityPropsInterface<RetirementPermanentDisabilityRejectionPeriodDocumentId> {
  document: string;
  retirementPermanentDisabilityRejectionPeriodId: RetirementPermanentDisabilityRejectionPeriodId;
}
