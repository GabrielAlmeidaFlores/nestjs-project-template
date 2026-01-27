import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { DisabilityAssessmentForBpcAnalysisDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-assessment-for-bpc-analysis-document.entity';
import type { DisabilityAssessmentForBpcAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-assessment-for-bpc-analysis-result.entity';
import type { DisabilityAssessmentForBpcAnalysisId } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis/value-object/disability-assessment-for-bpc-analysis-id/disability-assessment-for-bpc-analysis-id.value-object';

export class GetDisabilityAssessmentForBpcAnalysisQueryResult extends BaseBuildableObject {
  public readonly id: DisabilityAssessmentForBpcAnalysisId;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;
  public readonly estimatedDisabilityStartDate?: Date | null;
  public readonly attendsSchoolOrTechnicalCourse?: boolean | null;
  public readonly performsLaborActivity?: boolean | null;
  public readonly needsThirdPartyHelp?: boolean | null;
  public readonly hasAccessToBasicServices?: boolean | null;
  public readonly otherBarriersDescription?: string | null;
  public readonly disabilityAssessmentForBpcAnalysisResult: DisabilityAssessmentForBpcAnalysisResultTypeormEntity | null;
  public readonly disabilityAssessmentForBpcAnalysisDocument: DisabilityAssessmentForBpcAnalysisDocumentTypeormEntity[];
  protected override readonly _type =
    GetDisabilityAssessmentForBpcAnalysisQueryResult.name;
}
