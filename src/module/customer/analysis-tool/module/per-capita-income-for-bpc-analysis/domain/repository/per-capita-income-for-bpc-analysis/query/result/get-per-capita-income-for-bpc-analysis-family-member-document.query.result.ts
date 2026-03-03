import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { PerCapitaIncomeForBpcAnalysisFamilyMemberDocumentTypeEnum } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-family-member-document/enum/per-capita-income-for-bpc-analysis-family-member-document-type.enum';
import type { PerCapitaIncomeForBpcAnalysisFamilyMemberDocumentId } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-family-member-document/value-object/per-capita-income-for-bpc-analysis-family-member-document-id/per-capita-income-for-bpc-analysis-family-member-document-id.value-object';

export class GetPerCapitaIncomeForBpcAnalysisFamilyMemberDocumentQueryResult extends BaseBuildableObject {
  public readonly id: PerCapitaIncomeForBpcAnalysisFamilyMemberDocumentId;
  public readonly document: string;
  public readonly type: PerCapitaIncomeForBpcAnalysisFamilyMemberDocumentTypeEnum;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetPerCapitaIncomeForBpcAnalysisFamilyMemberDocumentQueryResult.name;
}
