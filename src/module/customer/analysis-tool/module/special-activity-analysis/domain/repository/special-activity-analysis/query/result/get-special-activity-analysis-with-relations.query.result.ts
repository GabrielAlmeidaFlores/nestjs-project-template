import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { GetSpecialActivityAnalysisDocumentQueryResult } from '@module/customer/analysis-tool/module/special-activity-analysis/domain/repository/special-activity-analysis-document/query/result/get-special-activity-analysis-document.query.result';
import type { GetSpecialActivityAnalysisInssBenefitQueryResult } from '@module/customer/analysis-tool/module/special-activity-analysis/domain/repository/special-activity-analysis-inss-benefit/query/result/get-special-activity-analysis-inss-benefit.query.result';
import type { GetSpecialActivityAnalysisLegalProceedingQueryResult } from '@module/customer/analysis-tool/module/special-activity-analysis/domain/repository/special-activity-analysis-legal-proceeding/query/result/get-special-activity-analysis-legal-proceeding.query.result';
import type { GetSpecialActivityAnalysisResultQueryResult } from '@module/customer/analysis-tool/module/special-activity-analysis/domain/repository/special-activity-analysis-result/query/result/get-special-activity-analysis-result.query.result';
import type { SpecialActivityId } from '@module/customer/analysis-tool/module/special-activity-analysis/domain/schema/entity/special-activity/value-object/special-activity-id.value-object';

export class GetSpecialActivityAnalysisWithRelationsQueryResult extends BaseBuildableObject {
  public readonly id: SpecialActivityId;
  public readonly specialActivityResult: GetSpecialActivityAnalysisResultQueryResult | null;
  public readonly specialActivityDocuments: GetSpecialActivityAnalysisDocumentQueryResult[];
  public readonly specialActivityInssBenefit: GetSpecialActivityAnalysisInssBenefitQueryResult[];
  public readonly specialActivityLegalProceeding: GetSpecialActivityAnalysisLegalProceedingQueryResult[];
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetSpecialActivityAnalysisWithRelationsQueryResult.name;
}
