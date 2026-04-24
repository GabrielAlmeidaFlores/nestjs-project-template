import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class TemporaryIncapacityBenefitRejectionInsuredStatusDocumentId extends Guid {
  protected override readonly _type =
    TemporaryIncapacityBenefitRejectionInsuredStatusDocumentId.name;
}
