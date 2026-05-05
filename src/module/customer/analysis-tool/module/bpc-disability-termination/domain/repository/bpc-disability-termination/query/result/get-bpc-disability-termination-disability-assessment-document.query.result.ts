import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { BpcDisabilityTerminationDisabilityAssessmentDocumentId } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-disability-assessment-document/value-object/bpc-disability-termination-disability-assessment-document-id/bpc-disability-termination-disability-assessment-document-id.value-object';

export class GetBpcDisabilityTerminationDisabilityAssessmentDocumentQueryResult extends BaseBuildableObject {
  public readonly id: BpcDisabilityTerminationDisabilityAssessmentDocumentId;
  public readonly document: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetBpcDisabilityTerminationDisabilityAssessmentDocumentQueryResult.name;
}
