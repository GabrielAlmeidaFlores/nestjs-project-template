import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { GetBpcDisabilityTerminationDisabilityAssessmentDocumentQueryResult } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/repository/bpc-disability-termination/query/result/get-bpc-disability-termination-disability-assessment-document.query.result';
import type { BpcDisabilityTerminationDisabilityAssessmentId } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-disability-assessment/value-object/bpc-disability-termination-disability-assessment-id/bpc-disability-termination-disability-assessment-id.value-object';

export class GetBpcDisabilityTerminationDisabilityAssessmentQueryResult extends BaseBuildableObject {
  public readonly id: BpcDisabilityTerminationDisabilityAssessmentId;
  public readonly estimatedDisabilityStartDate: Date | null;
  public readonly attendsSchoolOrTechnicalCourse: boolean | null;
  public readonly performsLaborActivity: boolean | null;
  public readonly needsThirdPartyHelp: boolean | null;
  public readonly hasAccessToBasicServices: boolean | null;
  public readonly otherBarriersDescription: string | null;
  public readonly bpcDisabilityTerminationDisabilityAssessmentDocument: GetBpcDisabilityTerminationDisabilityAssessmentDocumentQueryResult[];
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetBpcDisabilityTerminationDisabilityAssessmentQueryResult.name;
}
