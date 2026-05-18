import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { GenderEnum } from '@core/domain/schema/enum/gender.enum';
import type { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import type { GetSurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentQueryResult } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-benefit-originator-identification-document/query/result/get-survivor-pension-analysis-benefit-originator-identification-document.query.result';
import type { SurvivorPensionAnalysisId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis/value-object/survivor-pension-analysis-id/survivor-pension-analysis-id.value-object';
import type { SurvivorPensionAnalysisBenefitOriginatorIdentificationId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-benefit-originator-identification/value-object/survivor-pension-analysis-benefit-originator-identification-id/survivor-pension-analysis-benefit-originator-identification-id.value-object';

export class GetSurvivorPensionAnalysisBenefitOriginatorIdentificationQueryResult extends BaseBuildableObject {
  public readonly id: SurvivorPensionAnalysisBenefitOriginatorIdentificationId;
  public readonly survivorPensionAnalysisId: SurvivorPensionAnalysisId;
  public readonly clientName: string | null;
  public readonly clientFederalDocument: FederalDocument | null;
  public readonly clientBirthDate: Date | null;
  public readonly clientGender: GenderEnum | null;
  public readonly deathDate: Date | null;
  public readonly federativeEntity: string | null;
  public readonly stateCode: string | null;
  public readonly beneficiaryWasRetired: boolean | null;
  public readonly documents: GetSurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentQueryResult[];
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  protected override readonly _type =
    GetSurvivorPensionAnalysisBenefitOriginatorIdentificationQueryResult.name;
}
