import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class TemporaryIncapacityBenefitTerminationInsuredStatusDocumentId extends Guid {
  protected override readonly _type =
    TemporaryIncapacityBenefitTerminationInsuredStatusDocumentId.name;
}
