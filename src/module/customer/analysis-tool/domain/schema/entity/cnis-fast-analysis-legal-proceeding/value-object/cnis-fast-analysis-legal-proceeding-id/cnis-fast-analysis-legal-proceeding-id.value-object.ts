import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class CnisFastAnalysisLegalProceedingId extends Guid {
  protected override readonly _type = CnisFastAnalysisLegalProceedingId.name;
}
