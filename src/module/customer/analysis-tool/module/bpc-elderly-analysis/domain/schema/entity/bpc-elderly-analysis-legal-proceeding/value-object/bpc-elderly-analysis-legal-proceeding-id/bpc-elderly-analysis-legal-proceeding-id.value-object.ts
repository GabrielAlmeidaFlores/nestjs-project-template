import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class BpcElderlyAnalysisLegalProceedingId extends Guid {
  protected override readonly _type = BpcElderlyAnalysisLegalProceedingId.name;
}
