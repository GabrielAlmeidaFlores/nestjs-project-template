import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { RetirementPermanentDisabilityRevisionConcessionLetterBreakdownId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-concession-letter-breakdown/value-object/retirement-permanent-disability-revision-concession-letter-breakdown-id/retirement-permanent-disability-revision-concession-letter-breakdown-id.value-object';

import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { RetirementPermanentDisabilityRevisionId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision/value-object/retirement-permanent-disability-revision-id.value-object';
import type { RetirementPermanentDisabilityRevisionConcessionLetterBreakdownEntityPropsInterface } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-concession-letter-breakdown/retirement-permanent-disability-revision-concession-letter-breakdown.entity.props.interface';

export class RetirementPermanentDisabilityRevisionConcessionLetterBreakdownEntity extends BaseEntity<RetirementPermanentDisabilityRevisionConcessionLetterBreakdownId> {
  public readonly competence: string;
  public readonly amount: DecimalValue;
  public readonly reasonNotConsidered: string;
  public readonly action: string;
  public readonly retirementPermanentDisabilityRevisionId: RetirementPermanentDisabilityRevisionId;

  protected readonly _type =
    RetirementPermanentDisabilityRevisionConcessionLetterBreakdownEntity.name;

  public constructor(
    props: RetirementPermanentDisabilityRevisionConcessionLetterBreakdownEntityPropsInterface,
  ) {
    super(
      RetirementPermanentDisabilityRevisionConcessionLetterBreakdownId,
      props,
    );
    this.competence = props.competence;
    this.amount = props.amount;
    this.reasonNotConsidered = props.reasonNotConsidered;
    this.action = props.action;
    this.retirementPermanentDisabilityRevisionId =
      props.retirementPermanentDisabilityRevisionId;
  }
}
