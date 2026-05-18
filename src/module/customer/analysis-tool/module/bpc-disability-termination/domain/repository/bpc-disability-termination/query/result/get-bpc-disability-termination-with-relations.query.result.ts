import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { GetBpcDisabilityTerminationDisabilityAssessmentQueryResult } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/repository/bpc-disability-termination/query/result/get-bpc-disability-termination-disability-assessment.query.result';
import type { GetBpcDisabilityTerminationDocumentQueryResult } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/repository/bpc-disability-termination/query/result/get-bpc-disability-termination-document.query.result';
import type { GetBpcDisabilityTerminationFamilyMemberQueryResult } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/repository/bpc-disability-termination/query/result/get-bpc-disability-termination-family-member.query.result';
import type { GetBpcDisabilityTerminationInssBenefitQueryResult } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/repository/bpc-disability-termination-inss-benefit/query/result/get-bpc-disability-termination-inss-benefit.query.result';
import type { GetBpcDisabilityTerminationLegalProceedingQueryResult } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/repository/bpc-disability-termination-legal-proceeding/query/result/get-bpc-disability-termination-legal-proceeding.query.result';
import type { GetBpcDisabilityTerminationResultQueryResult } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/repository/bpc-disability-termination-result/query/result/get-bpc-disability-termination-result.query.result';
import type { BpcDisabilityTerminationCategoryEnum } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination/enum/bpc-disability-termination-category.enum';
import type { BpcDisabilityTerminationDisabilityDegreeEnum } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination/enum/bpc-disability-termination-disability-degree.enum';
import type { BpcDisabilityTerminationDisabilityTypeEnum } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination/enum/bpc-disability-termination-disability-type.enum';
import type { BpcDisabilityTerminationId } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination/value-object/bpc-disability-termination-id/bpc-disability-termination-id.value-object';

export class GetBpcDisabilityTerminationWithRelationsQueryResult extends BaseBuildableObject {
  public readonly id: BpcDisabilityTerminationId;
  public readonly analysisName: string | null;
  public readonly category: BpcDisabilityTerminationCategoryEnum | null;
  public readonly disabilityType: BpcDisabilityTerminationDisabilityTypeEnum | null;
  public readonly disabilityDegree: BpcDisabilityTerminationDisabilityDegreeEnum | null;
  public readonly benefitCessationReason: string | null;
  public readonly livesAlone: boolean | null;
  public readonly bpcDisabilityTerminationResult: GetBpcDisabilityTerminationResultQueryResult | null;
  public readonly bpcDisabilityTerminationDisabilityAssessment: GetBpcDisabilityTerminationDisabilityAssessmentQueryResult | null;
  public readonly bpcDisabilityTerminationFamilyMember: GetBpcDisabilityTerminationFamilyMemberQueryResult[];
  public readonly bpcDisabilityTerminationDocument: GetBpcDisabilityTerminationDocumentQueryResult[];
  public readonly bpcDisabilityTerminationInssBenefit: GetBpcDisabilityTerminationInssBenefitQueryResult[];
  public readonly bpcDisabilityTerminationLegalProceeding: GetBpcDisabilityTerminationLegalProceedingQueryResult[];
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetBpcDisabilityTerminationWithRelationsQueryResult.name;
}
