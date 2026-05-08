import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { RetirementPermanentDisabilityRevisionConcessionLetterBreakdownId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-concession-letter-breakdown/value-object/retirement-permanent-disability-revision-concession-letter-breakdown-id/retirement-permanent-disability-revision-concession-letter-breakdown-id.value-object';

export class GetRetirementPermanentDisabilityRevisionConcessionLetterBreakdownQueryResult extends BaseBuildableObject {
  public readonly id: RetirementPermanentDisabilityRevisionConcessionLetterBreakdownId;
  public readonly competence: string;
  public readonly amount: DecimalValue;
  public readonly reasonNotConsidered: string;
  public readonly action: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt?: Date | null;

  protected override readonly _type =
    GetRetirementPermanentDisabilityRevisionConcessionLetterBreakdownQueryResult.name;
}
