import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { PerCapitaIncomeForBpcAnalysisBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/per-capita-income-for-bpc-analysis-benefit.entity';
import type { PerCapitaIncomeForBpcAnalysisDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/per-capita-income-for-bpc-analysis-document.typeorm.entity';
import type { PerCapitaIncomeForBpcAnalysisFamilyMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/per-capita-income-for-bpc-analysis-family-member.typeorm.entity';
import type { PerCapitaIncomeForBpcAnalysisLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/per-capita-income-for-bpc-analysis-legal-proceeding.entity';
import type { PerCapitaIncomeForBpcAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/per-capita-income-for-bpc-analysis-result.typeorm.entity';
import type { PerCapitaIncomeForBpcAnalysisId } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis/value-object/per-capita-income-for-bpc-analysis-id/per-capita-income-for-bpc-analysis-id.value-object';

export class GetPerCapitaIncomeForBpcAnalysisQueryResult extends BaseBuildableObject {
  public readonly id: PerCapitaIncomeForBpcAnalysisId;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;
  public readonly perCapitaIncomeForBpcAnalysisResult: PerCapitaIncomeForBpcAnalysisResultTypeormEntity | null;
  public readonly perCapitaIncomeForBpcAnalysisFamilyMember: PerCapitaIncomeForBpcAnalysisFamilyMemberTypeormEntity[];
  public readonly perCapitaIncomeForBpcAnalysisDocument: PerCapitaIncomeForBpcAnalysisDocumentTypeormEntity[];
  public readonly perCapitaIncomeForBpcAnalysisBenefit: PerCapitaIncomeForBpcAnalysisBenefitTypeormEntity[];
  public readonly perCapitaIncomeForBpcAnalysisLegalProceeding: PerCapitaIncomeForBpcAnalysisLegalProceedingTypeormEntity[];

  protected override readonly _type =
    GetPerCapitaIncomeForBpcAnalysisQueryResult.name;
}
