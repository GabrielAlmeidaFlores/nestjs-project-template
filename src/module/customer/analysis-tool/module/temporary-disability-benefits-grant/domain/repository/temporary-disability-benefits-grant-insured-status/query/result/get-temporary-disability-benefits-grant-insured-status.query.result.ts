import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { TemporaryDisabilityBenefitsGrantId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant/value-object/temporary-disability-benefits-grant-id.value-object';
import type { TemporaryDisabilityBenefitsGrantInsuredStatusId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-insured-status/value-object/temporary-disability-benefits-grant-insured-status-id.value-object';

export class GetTemporaryDisabilityBenefitsGrantInsuredStatusQueryResult extends BaseBuildableObject {
  public readonly temporaryDisabilityBenefitsGrantInsuredStatusId: TemporaryDisabilityBenefitsGrantInsuredStatusId;
  public readonly involuntaryUnemployment: boolean;
  public readonly intentionToProveInvoluntaryUnemployment: boolean;
  public readonly ruralInsuredClient: boolean;
  public readonly ruralPeriodStartDate: Date | null;
  public readonly ruralPeriodEndDate: Date | null;
  public readonly documentsDescription: string | null;
  public readonly temporaryDisabilityBenefitsGrantId: TemporaryDisabilityBenefitsGrantId;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetTemporaryDisabilityBenefitsGrantInsuredStatusQueryResult.name;
}
