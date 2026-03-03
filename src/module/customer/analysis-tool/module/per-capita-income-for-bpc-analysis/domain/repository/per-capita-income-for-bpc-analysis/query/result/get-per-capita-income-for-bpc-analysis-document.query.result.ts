import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { PerCapitaIncomeForBpcAnalysisDocumentTypeEnum } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-document/enum/per-capita-income-for-bpc-analysis-document-type.enum';
import type { PerCapitaIncomeForBpcAnalysisDocumentId } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-document/value-object/per-capita-income-for-bpc-analysis-document-id/per-capita-income-for-bpc-analysis-document-id.value-object';

export class GetPerCapitaIncomeForBpcAnalysisDocumentQueryResult extends BaseBuildableObject {
  public readonly id: PerCapitaIncomeForBpcAnalysisDocumentId;
  public readonly document: string;
  public readonly type: PerCapitaIncomeForBpcAnalysisDocumentTypeEnum;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetPerCapitaIncomeForBpcAnalysisDocumentQueryResult.name;
}
