import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class AccidentBenefitRejectionWorkPeriodDocumentId extends Guid {
  protected override readonly _type = AccidentBenefitRejectionWorkPeriodDocumentId.name;
}
