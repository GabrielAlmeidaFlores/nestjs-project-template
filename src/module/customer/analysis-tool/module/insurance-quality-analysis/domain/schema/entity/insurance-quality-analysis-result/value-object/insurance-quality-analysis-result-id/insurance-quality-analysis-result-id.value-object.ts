import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class InsuranceQualityAnalysisResultId extends Guid {
  protected override readonly _type = InsuranceQualityAnalysisResultId.name;
}
