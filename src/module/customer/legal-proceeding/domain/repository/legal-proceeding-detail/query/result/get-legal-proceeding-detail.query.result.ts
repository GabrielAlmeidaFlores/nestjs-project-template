import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

import type { LegalProceedingDetailId } from '@module/customer/legal-proceeding/domain/schema/entity/legal-proceeding-detail/value-object/analysis-tool-client-legal-proceeding-detail-id/legal-proceeding-detail-id.value-object';

export class GetLegalProceedingDetailQueryResult extends BaseBuildableDtoObject {
  public readonly id: LegalProceedingDetailId;
  public readonly detail: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type = GetLegalProceedingDetailQueryResult.name;
}
