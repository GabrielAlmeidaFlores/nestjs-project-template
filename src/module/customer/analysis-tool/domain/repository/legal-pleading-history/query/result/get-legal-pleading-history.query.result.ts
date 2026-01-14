import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { LegalPleadingId } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/value-object/legal-pleading-id/legal-pleading-id.value-object';
import type { LegalPleadingHistoryTitleEnum } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading-history/enum/legal-pleading-history-title.enum';
import type { LegalPleadingHistoryId } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading-history/value-object/legal-pleading-history-id/legal-pleading-history-id.value-object';

export class GetLegalPleadingHistoryQueryResult extends BaseBuildableObject {
  public id: LegalPleadingHistoryId;
  public title: LegalPleadingHistoryTitleEnum;
  public description: string;
  public legalPleading: LegalPleadingId;
  public createdAt: Date;
  public updatedAt: Date;
  public deletedAt: Date | null;

  protected override readonly _type = GetLegalPleadingHistoryQueryResult.name;
}
