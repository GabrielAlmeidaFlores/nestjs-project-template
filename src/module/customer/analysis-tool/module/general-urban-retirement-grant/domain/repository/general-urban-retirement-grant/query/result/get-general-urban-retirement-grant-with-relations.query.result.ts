import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { GeneralUrbanRetirementGrantId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant/value-object/general-urban-retirement-grant-id.value-object';
import type { GeneralUrbanRetirementGrantInssBenefitEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-inss-benefit/general-urban-retirement-grant-inss-benefit.entity';
import type { GeneralUrbanRetirementGrantLegalProceedingEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-legal-proceeding/general-urban-retirement-grant-legal-proceeding.entity';
import type { GeneralUrbanRetirementGrantPeriodEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-period/general-urban-retirement-grant-period.entity';
import type { GeneralUrbanRetirementGrantResultEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-result/general-urban-retirement-grant-result.entity';

export class GetGeneralUrbanRetirementGrantWithRelationsQueryResult extends BaseBuildableObject {
  public readonly id: GeneralUrbanRetirementGrantId;
  public readonly cnisDocument: string | null;
  public readonly analysisName: string | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  public readonly generalUrbanRetirementGrantBenefit:
    | GeneralUrbanRetirementGrantInssBenefitEntity[]
    | null;
  public readonly generalUrbanRetirementGrantResult: GeneralUrbanRetirementGrantResultEntity | null;
  public readonly generalUrbanRetirementGrantLegalProceeding:
    | GeneralUrbanRetirementGrantLegalProceedingEntity[]
    | null;
  public readonly generalUrbanRetirementGrantPeriod:
    | GeneralUrbanRetirementGrantPeriodEntity[]
    | null;

  protected override readonly _type =
    GetGeneralUrbanRetirementGrantWithRelationsQueryResult.name;
}
