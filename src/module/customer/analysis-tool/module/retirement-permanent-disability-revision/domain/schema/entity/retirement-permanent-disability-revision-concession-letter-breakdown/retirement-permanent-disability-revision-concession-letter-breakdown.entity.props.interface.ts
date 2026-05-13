import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { RetirementPermanentDisabilityRevisionId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision/value-object/retirement-permanent-disability-revision-id.value-object';
import type { RetirementPermanentDisabilityRevisionConcessionLetterBreakdownId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-concession-letter-breakdown/value-object/retirement-permanent-disability-revision-concession-letter-breakdown-id/retirement-permanent-disability-revision-concession-letter-breakdown-id.value-object';

export interface RetirementPermanentDisabilityRevisionConcessionLetterBreakdownEntityPropsInterface extends BaseEntityPropsInterface<RetirementPermanentDisabilityRevisionConcessionLetterBreakdownId> {
  competence: string;
  amount: DecimalValue;
  reasonNotConsidered: string;
  action: string;
  retirementPermanentDisabilityRevisionId: RetirementPermanentDisabilityRevisionId;
}
