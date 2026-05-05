import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { BpcElderlyCessationLegalProceedingId } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-legal-proceeding/value-object/bpc-elderly-cessation-legal-proceeding-id/bpc-elderly-cessation-legal-proceeding-id.value-object';

export class GetBpcElderlyCessationLegalProceedingQueryResult extends BaseBuildableObject {
  public readonly id: BpcElderlyCessationLegalProceedingId;
  public readonly legalProceedingNumber: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetBpcElderlyCessationLegalProceedingQueryResult.name;
}
