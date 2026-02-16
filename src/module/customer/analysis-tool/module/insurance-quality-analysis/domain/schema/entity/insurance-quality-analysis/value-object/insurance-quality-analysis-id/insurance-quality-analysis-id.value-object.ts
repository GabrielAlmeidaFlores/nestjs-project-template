import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class InsuranceQualityAnalysisId extends Guid {
  protected override readonly _type = InsuranceQualityAnalysisId.name;
}
