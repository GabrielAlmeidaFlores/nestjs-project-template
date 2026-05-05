import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { RetirementPermanentDisabilityRevisionId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision/value-object/retirement-permanent-disability-revision-id.value-object';
import type { RetirementPermanentDisabilityRevisionLegalProceedingId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-legal-proceeding/value-object/retirement-permanent-disability-revision-legal-proceeding-id.value-object';

export interface RetirementPermanentDisabilityRevisionLegalProceedingEntityPropsInterface extends BaseEntityPropsInterface<RetirementPermanentDisabilityRevisionLegalProceedingId> {
  legalProceedingNumber: string;
  retirementPermanentDisabilityRevisionId: RetirementPermanentDisabilityRevisionId;
}
