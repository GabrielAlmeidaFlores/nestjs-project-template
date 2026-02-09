import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { GetPerCapitaIncomeForBpcAnalysisFamilyMemberDocumentQueryResult } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/repository/per-capita-income-for-bpc-analysis/query/result/get-per-capita-income-for-bpc-analysis-family-member-document.query.result';
import type { PerCapitaIncomeForBpcAnalysisFamilyMemberIncomeTypeEnum } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-family-member/enum/per-capita-income-for-bpc-analysis-family-member-income-type.enum';
import type { PerCapitaIncomeForBpcAnalysisFamilyMemberKinshipEnum } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-family-member/enum/per-capita-income-for-bpc-analysis-family-member-kinship.enum';
import type { PerCapitaIncomeForBpcAnalysisFamilyMemberId } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-family-member/value-object/per-capita-income-for-bpc-analysis-family-member-id/per-capita-income-for-bpc-analysis-family-member-id.value-object';

export class GetPerCapitaIncomeForBpcAnalysisFamilyMemberQueryResult extends BaseBuildableObject {
  public readonly id: PerCapitaIncomeForBpcAnalysisFamilyMemberId;
  public readonly fullName: string;
  public readonly birthDate: Date;
  public readonly kinship: PerCapitaIncomeForBpcAnalysisFamilyMemberKinshipEnum;
  public readonly livesInSameResidence: boolean;
  public readonly hasIncome: boolean;
  public readonly monthlyIncomeAmount: number | null;
  public readonly incomeType: PerCapitaIncomeForBpcAnalysisFamilyMemberIncomeTypeEnum | null;
  public readonly perCapitaIncomeForBpcAnalysisFamilyMemberDocument: GetPerCapitaIncomeForBpcAnalysisFamilyMemberDocumentQueryResult[];
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetPerCapitaIncomeForBpcAnalysisFamilyMemberQueryResult.name;
}
