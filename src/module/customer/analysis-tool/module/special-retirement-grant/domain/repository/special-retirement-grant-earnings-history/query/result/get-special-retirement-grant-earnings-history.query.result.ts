import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { SpecialRetirementGrantEarningsHistoryId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-earnings-history/value-object/special-retirement-grant-earnings-history-id/special-retirement-grant-earnings-history-id.value-object';

export class GetSpecialRetirementGrantEarningsHistoryQueryResult extends BaseBuildableObject {
  public readonly id: SpecialRetirementGrantEarningsHistoryId;
  public readonly competence: Date | null;
  public readonly remuneration: string | null;
  public readonly indicators: string | null;
  public readonly paymentDate: Date | null;
  public readonly competenceBelowTheMinimum: boolean | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetSpecialRetirementGrantEarningsHistoryQueryResult.name;
}
