import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class InsuranceQualityAnalysisLegalProceedingId extends Guid {
  protected override readonly _type =
    InsuranceQualityAnalysisLegalProceedingId.name;
}
