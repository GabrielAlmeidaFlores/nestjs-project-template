import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class CnisFastAnalysisClientLegalProceedingId extends Guid {
  protected override readonly _type =
    CnisFastAnalysisClientLegalProceedingId.name;
}
