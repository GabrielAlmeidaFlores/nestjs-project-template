import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { PerCapitaIncomeForBpcAnalysisId } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis/value-object/per-capita-income-for-bpc-analysis-id/per-capita-income-for-bpc-analysis-id.value-object';
import type { PerCapitaIncomeForBpcAnalysisDocumentEntity } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-document/per-capita-income-for-bpc-analysis-document.entity';
import type { PerCapitaIncomeForBpcAnalysisFamilyMemberEntity } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-family-member/per-capita-income-for-bpc-analysis-family-member.entity';
import type { PerCapitaIncomeForBpcAnalysisResultEntity } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-result/per-capita-income-for-bpc-analysis-result.entity';
import type { PerCapitaIncomeForBpcAnalysisBenefitEntity } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-benefit/per-capita-income-for-bpc-analysis-benefit.entity';
import type { PerCapitaIncomeForBpcAnalysisLegalProceedingEntity } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-legal-proceeding/per-capita-income-for-bpc-analysis-legal-proceeding.entity';
import { GetOrganizationMemberWithCustomerRelationQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member-with-customer-relation.query.result';

// Tipo estendido do family member com documentos carregados
export type PerCapitaIncomeForBpcAnalysisFamilyMemberWithDocuments =
  PerCapitaIncomeForBpcAnalysisFamilyMemberEntity & {
    perCapitaIncomeForBpcAnalysisFamilyMemberDocument?: Array<{ document: string }>;
  };

export class GetPerCapitaIncomeForBpcAnalysisWithRelationsQueryResult extends BaseBuildableObject {
  public readonly id: PerCapitaIncomeForBpcAnalysisId;
  public readonly perCapitaIncomeForBpcAnalysisResult: PerCapitaIncomeForBpcAnalysisResultEntity | null;
  public readonly perCapitaIncomeForBpcAnalysisFamilyMember: PerCapitaIncomeForBpcAnalysisFamilyMemberWithDocuments[];
  public readonly perCapitaIncomeForBpcAnalysisDocument: PerCapitaIncomeForBpcAnalysisDocumentEntity[];
  public readonly perCapitaIncomeForBpcAnalysisBenefit?: PerCapitaIncomeForBpcAnalysisBenefitEntity[];
  public readonly perCapitaIncomeForBpcAnalysisLegalProceeding?: PerCapitaIncomeForBpcAnalysisLegalProceedingEntity[];
  public readonly createdBy: GetOrganizationMemberWithCustomerRelationQueryResult;
  public readonly updatedBy: GetOrganizationMemberWithCustomerRelationQueryResult;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetPerCapitaIncomeForBpcAnalysisWithRelationsQueryResult.name;
}
