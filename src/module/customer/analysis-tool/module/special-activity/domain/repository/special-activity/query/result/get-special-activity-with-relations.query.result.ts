import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { SpecialActivityId } from '@module/customer/analysis-tool/domain/schema/entity/special-activity/value-object/special-activity-id.value-object';
import type { GetSpecialActivityDocumentQueryResult } from '@module/customer/analysis-tool/module/special-activity/domain/repository/special-activity-document/query/result/get-special-activity-document.query.result';
import type { GetSpecialActivityInssBenefitQueryResult } from '@module/customer/analysis-tool/module/special-activity/domain/repository/special-activity-inss-benefit/query/result/get-special-activity-inss-benefit.query.result';
import type { GetSpecialActivityLegalProceedingQueryResult } from '@module/customer/analysis-tool/module/special-activity/domain/repository/special-activity-legal-proceeding/query/result/get-special-activity-legal-proceeding.query.result';
import type { GetSpecialActivityResultQueryResult } from '@module/customer/analysis-tool/module/special-activity/domain/repository/special-activity-result/query/result/get-special-activity-result.query.result';

export class GetSpecialActivityWithRelationsQueryResult extends BaseBuildableObject {
  public readonly id: SpecialActivityId;
  public readonly specialActivityResult: GetSpecialActivityResultQueryResult | null;
  public readonly specialActivityDocuments: GetSpecialActivityDocumentQueryResult[];
  public readonly specialActivityInssBenefit: GetSpecialActivityInssBenefitQueryResult[];
  public readonly specialActivityLegalProceeding: GetSpecialActivityLegalProceedingQueryResult[];
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetSpecialActivityWithRelationsQueryResult.name;
}
