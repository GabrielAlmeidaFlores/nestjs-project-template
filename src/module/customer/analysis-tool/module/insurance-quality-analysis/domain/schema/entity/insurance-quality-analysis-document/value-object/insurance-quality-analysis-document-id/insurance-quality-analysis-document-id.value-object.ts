import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class InsuranceQualityAnalysisDocumentId extends Guid {
  protected override readonly _type = InsuranceQualityAnalysisDocumentId.name;
}
