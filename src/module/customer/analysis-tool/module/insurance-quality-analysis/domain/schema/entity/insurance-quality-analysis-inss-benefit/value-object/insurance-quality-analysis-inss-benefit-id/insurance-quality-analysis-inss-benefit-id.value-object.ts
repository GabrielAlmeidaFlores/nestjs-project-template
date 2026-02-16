import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class InsuranceQualityAnalysisInssBenefitId extends Guid {
  protected override readonly _type =
    InsuranceQualityAnalysisInssBenefitId.name;
}
