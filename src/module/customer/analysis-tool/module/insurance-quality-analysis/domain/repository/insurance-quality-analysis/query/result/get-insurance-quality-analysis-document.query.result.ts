import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { InsuranceQualityAnalysisDocumentTypeEnum } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/schema/entity/insurance-quality-analysis-document/enum/insurance-quality-analysis-document-type.enum';
import type { InsuranceQualityAnalysisDocumentId } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/schema/entity/insurance-quality-analysis-document/value-object/insurance-quality-analysis-document-id/insurance-quality-analysis-document-id.value-object';

export class GetInsuranceQualityAnalysisDocumentQueryResult extends BaseBuildableObject {
  public readonly id: InsuranceQualityAnalysisDocumentId;
  public readonly document: string;
  public readonly type: InsuranceQualityAnalysisDocumentTypeEnum;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetInsuranceQualityAnalysisDocumentQueryResult.name;
}
