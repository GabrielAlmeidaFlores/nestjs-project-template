import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { BpcDisabilityGrantResultId } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-result/value-object/bpc-disability-grant-result-id/bpc-disability-grant-result-id.value-object';

export class GetBpcDisabilityGrantResultQueryResult extends BaseBuildableObject {
  public readonly id: BpcDisabilityGrantResultId;
  public readonly completeAnalysis: string | null;
  public readonly simplifiedAnalysis: string | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetBpcDisabilityGrantResultQueryResult.name;
}
