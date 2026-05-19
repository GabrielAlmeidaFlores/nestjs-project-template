import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { TemporaryDisabilityBenefitsGrantId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant/value-object/temporary-disability-benefits-grant-id.value-object';
import type { TemporaryDisabilityBenefitsGrantSevereDiseaseEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-period/enum/temporary-disability-benefits-grant-severe-disease.enum';
import type { TemporaryDisabilityBenefitsGrantPeriodId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-period/value-object/temporary-disability-benefits-grant-period-id.value-object';

export class GetTemporaryDisabilityBenefitsGrantPeriodQueryResult extends BaseBuildableObject {
  public readonly temporaryDisabilityBenefitsGrantPeriodId: TemporaryDisabilityBenefitsGrantPeriodId;
  public readonly startDate: Date;
  public readonly cidTenId: string | null;
  public readonly description: string | null;
  public readonly jobDerivatedDisability: boolean;
  public readonly disablingConditionDescription: string | null;
  public readonly disabilityFromSevereDisease: boolean;
  public readonly severeDisease: TemporaryDisabilityBenefitsGrantSevereDiseaseEnum | null;
  public readonly diseaseStartDate: Date | null;
  public readonly needsConstantAssistanceFromAnotherPerson: boolean;
  public readonly temporaryDisabilityBenefitsGrantId: TemporaryDisabilityBenefitsGrantId;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetTemporaryDisabilityBenefitsGrantPeriodQueryResult.name;
}
