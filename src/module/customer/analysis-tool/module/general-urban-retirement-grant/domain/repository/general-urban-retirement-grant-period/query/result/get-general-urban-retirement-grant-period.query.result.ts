import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { ReasonPendencyEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-period/enum/reason-pendency.enum';
import type { GeneralUrbanRetirementGrantPeriodId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-period/value-object/general-urban-retirement-grant-period-id.value-object';

export class GetGeneralUrbanRetirementGrantPeriodQueryResult extends BaseBuildableObject {
  public readonly id: GeneralUrbanRetirementGrantPeriodId;
  public readonly periodName: string | null;
  public readonly periodStart: Date | null;
  public readonly periodEnd: Date | null;
  public readonly category: string | null;
  public readonly isPendency: boolean | null;
  public readonly competenceBelowTheMinimum: boolean | null;
  public readonly contributionAverage: DecimalValue | null;
  public readonly typeOfContribution: string | null;
  public readonly status: boolean | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;
  public readonly reasonPendency: ReasonPendencyEnum | null;

  protected override readonly _type =
    GetGeneralUrbanRetirementGrantPeriodQueryResult.name;
}
