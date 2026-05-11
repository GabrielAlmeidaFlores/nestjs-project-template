import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { GetRetirementPermanentDisabilityRevisionConcessionLetterBreakdownQueryResult } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/repository/retirement-permanent-disability-revision-concession-letter-breakdown/query/result/get-retirement-permanent-disability-revision-concession-letter-breakdown.query.result';
import type { GetRetirementPermanentDisabilityRevisionDocumentQueryResult } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/repository/retirement-permanent-disability-revision-document/query/result/get-retirement-permanent-disability-revision-document.query.result';
import type { GetRetirementPermanentDisabilityRevisionInssBenefitQueryResult } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/repository/retirement-permanent-disability-revision-inss-benefit/query/result/get-retirement-permanent-disability-revision-inss-benefit.query.result';
import type { GetRetirementPermanentDisabilityRevisionLegalProceedingQueryResult } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/repository/retirement-permanent-disability-revision-legal-proceeding/query/result/get-retirement-permanent-disability-revision-legal-proceeding.query.result';
import type { GetRetirementPermanentDisabilityRevisionResultQueryResult } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/repository/retirement-permanent-disability-revision-result/query/result/get-retirement-permanent-disability-revision-result.query.result';
import type { GetRetirementPermanentDisabilityRevisionWorkPeriodsQueryResult } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/repository/retirement-permanent-disability-revision-work-periods/query/result/get-retirement-permanent-disability-revision-work-periods.query.result';
import type { RetirementPermanentDisabilityRevisionId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision/value-object/retirement-permanent-disability-revision-id.value-object';
import type { RetirementPermanentDisabilityRevisionCategoryEnum } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/enum/retirement-permanent-disability-revision-category.enum';

export class GetRetirementPermanentDisabilityRevisionWithRelationsQueryResult extends BaseBuildableObject {
  public readonly id: RetirementPermanentDisabilityRevisionId;
  public readonly analysisName: string | null;
  public readonly category: RetirementPermanentDisabilityRevisionCategoryEnum | null;
  public readonly myInssPassword: string | null;
  public readonly benefit: GetRetirementPermanentDisabilityRevisionInssBenefitQueryResult[];
  public readonly document: GetRetirementPermanentDisabilityRevisionDocumentQueryResult[];
  public readonly legalProceeding: GetRetirementPermanentDisabilityRevisionLegalProceedingQueryResult[];
  public readonly result: GetRetirementPermanentDisabilityRevisionResultQueryResult | null;
  public readonly concessionLetterBreakdown: GetRetirementPermanentDisabilityRevisionConcessionLetterBreakdownQueryResult[];
  public readonly retirementPermanentDisabilityRevisionWorkPeriods: GetRetirementPermanentDisabilityRevisionWorkPeriodsQueryResult[];

  protected override readonly _type =
    GetRetirementPermanentDisabilityRevisionWithRelationsQueryResult.name;
}
