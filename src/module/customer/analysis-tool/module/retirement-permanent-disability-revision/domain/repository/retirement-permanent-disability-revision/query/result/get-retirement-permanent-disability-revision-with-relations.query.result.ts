import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { GetRetirementPermanentDisabilityRevisionDocumentQueryResult } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/repository/retirement-permanent-disability-revision-document/query/result/get-retirement-permanent-disability-revision-document.query.result';
import type { GetRetirementPermanentDisabilityRevisionInssBenefitQueryResult } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/repository/retirement-permanent-disability-revision-inss-benefit/query/result/get-retirement-permanent-disability-revision-inss-benefit.query.result';
import type { GetRetirementPermanentDisabilityRevisionLegalProceedingQueryResult } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/repository/retirement-permanent-disability-revision-legal-proceeding/query/result/get-retirement-permanent-disability-revision-legal-proceeding.query.result';
import type { GetRetirementPermanentDisabilityRevisionResultQueryResult } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/repository/retirement-permanent-disability-revision-result/query/result/get-retirement-permanent-disability-revision-result.query.result';
import type { RetirementPermanentDisabilityRevisionId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision/value-object/retirement-permanent-disability-revision-id.value-object';

export class GetRetirementPermanentDisabilityRevisionWithRelationsQueryResult extends BaseBuildableObject {
  public readonly id: RetirementPermanentDisabilityRevisionId;
  public readonly benefit: GetRetirementPermanentDisabilityRevisionInssBenefitQueryResult[];
  public readonly document: GetRetirementPermanentDisabilityRevisionDocumentQueryResult[];
  public readonly legalProceeding: GetRetirementPermanentDisabilityRevisionLegalProceedingQueryResult[];
  public readonly result: GetRetirementPermanentDisabilityRevisionResultQueryResult | null;

  protected override readonly _type =
    GetRetirementPermanentDisabilityRevisionWithRelationsQueryResult.name;
}
