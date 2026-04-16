import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { GetBpcElderlyAnalysisDocumentQueryResult } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/repository/bpc-elderly-analysis/query/result/get-bpc-elderly-analysis-document.query.result';
import type { GetBpcElderlyAnalysisFamilyMemberQueryResult } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/repository/bpc-elderly-analysis/query/result/get-bpc-elderly-analysis-family-member.query.result';
import type { GetBpcElderlyAnalysisInssBenefitQueryResult } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/repository/bpc-elderly-analysis-inss-benefit/query/result/get-bpc-elderly-analysis-inss-benefit.query.result';
import type { GetBpcElderlyAnalysisLegalProceedingQueryResult } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/repository/bpc-elderly-analysis-legal-proceeding/query/result/get-bpc-elderly-analysis-legal-proceeding.query.result';
import type { GetBpcElderlyAnalysisResultQueryResult } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/repository/bpc-elderly-analysis-result/query/result/get-bpc-elderly-analysis-result.query.result';
import type { BpcElderlyAnalysisCategoryEnum } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis/enum/bpc-elderly-analysis-category.enum';
import type { BpcElderlyAnalysisId } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis/value-object/bpc-elderly-analysis-id/bpc-elderly-analysis-id.value-object';

export class GetBpcElderlyAnalysisWithRelationsQueryResult extends BaseBuildableObject {
  public readonly id: BpcElderlyAnalysisId;
  public readonly category: BpcElderlyAnalysisCategoryEnum | null;
  public readonly bpcElderlyAnalysisResult: GetBpcElderlyAnalysisResultQueryResult | null;
  public readonly bpcElderlyAnalysisFamilyMember: GetBpcElderlyAnalysisFamilyMemberQueryResult[];
  public readonly bpcElderlyAnalysisDocument: GetBpcElderlyAnalysisDocumentQueryResult[];
  public readonly bpcElderlyAnalysisInssBenefit: GetBpcElderlyAnalysisInssBenefitQueryResult[];
  public readonly bpcElderlyAnalysisLegalProceeding: GetBpcElderlyAnalysisLegalProceedingQueryResult[];
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetBpcElderlyAnalysisWithRelationsQueryResult.name;
}
