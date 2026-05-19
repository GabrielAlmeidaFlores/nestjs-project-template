import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { TemporaryDisabilityBenefitsGrantCategoryEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant/enum/temporary-disability-benefits-grant-category.enum';
import type { TemporaryDisabilityBenefitsGrantId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant/value-object/temporary-disability-benefits-grant-id.value-object';
import type { TemporaryDisabilityBenefitsGrantWorkPeriodsPendencyReasonEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-work-periods/enum/temporary-disability-benefits-grant-work-periods-pendency-reason.enum';
import type { TemporaryDisabilityBenefitsGrantWorkPeriodsPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-work-periods/enum/temporary-disability-benefits-grant-work-periods-period-consideration.enum';
import type { TemporaryDisabilityBenefitsGrantWorkPeriodsId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-work-periods/value-object/temporary-disability-benefits-grant-work-periods-id.value-object';

export class GetTemporaryDisabilityBenefitsGrantWorkPeriodsQueryResult extends BaseBuildableObject {
  public readonly temporaryDisabilityBenefitsGrantWorkPeriodsId: TemporaryDisabilityBenefitsGrantWorkPeriodsId;
  public readonly bondOrigin: string;
  public readonly startDate: Date;
  public readonly endDate: Date | null;
  public readonly category: TemporaryDisabilityBenefitsGrantCategoryEnum;
  public readonly competenceBelowTheMinimum: boolean;
  public readonly pendencyReason: TemporaryDisabilityBenefitsGrantWorkPeriodsPendencyReasonEnum | null;
  public readonly periodConsideration: TemporaryDisabilityBenefitsGrantWorkPeriodsPeriodConsiderationEnum | null;
  public readonly contributionAverage: DecimalValue | null;
  public readonly status: boolean;
  public readonly gracePeriod: number;
  public readonly temporaryDisabilityBenefitsGrantId: TemporaryDisabilityBenefitsGrantId;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetTemporaryDisabilityBenefitsGrantWorkPeriodsQueryResult.name;
}
