import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class SurvivorPensionAnalysisDeceasedBenefitDependentsDocumentId extends Guid {
  protected override readonly _type =
    SurvivorPensionAnalysisDeceasedBenefitDependentsDocumentId.name;
}
