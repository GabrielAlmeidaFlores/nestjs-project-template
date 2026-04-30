import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { BpcElderlyCessationCategoryEnum } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation/enum/bpc-elderly-cessation-category.enum';
import type { BpcElderlyCessationCessationReasonEnum } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation/enum/bpc-elderly-cessation-cessation-reason.enum';
import type { BpcElderlyCessationCivilStatusEnum } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation/enum/bpc-elderly-cessation-civil-status.enum';
import type { BpcElderlyCessationEducationLevelEnum } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation/enum/bpc-elderly-cessation-education-level.enum';
import type { BpcElderlyCessationId } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation/value-object/bpc-elderly-cessation-id/bpc-elderly-cessation-id.value-object';

export class GetBpcElderlyCessationQueryResult extends BaseBuildableObject {
  public readonly id: BpcElderlyCessationId;
  public readonly analysisName: string | null;
  public readonly decisionDate: Date | null;
  public readonly previousInssBenefitNumber: string | null;
  public readonly category: BpcElderlyCessationCategoryEnum | null;
  public readonly cessationReason: BpcElderlyCessationCessationReasonEnum | null;
  public readonly cessationReasonDescription: string | null;
  public readonly isAppealDeadlineExpired: boolean | null;
  public readonly myInssPassword: string | null;
  public readonly civilStatus: BpcElderlyCessationCivilStatusEnum | null;
  public readonly educationLevel: BpcElderlyCessationEducationLevelEnum | null;
  public readonly currentAddress: string | null;
  public readonly previousAddress: string | null;
  public readonly hasAddressChangedSinceDecision: boolean | null;
  public readonly livesAlone: boolean | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type = GetBpcElderlyCessationQueryResult.name;
}
