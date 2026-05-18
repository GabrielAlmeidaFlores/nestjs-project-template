import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class TemporaryIncapacityBenefitRejectionDocumentId extends Guid {
  protected override readonly _type =
    TemporaryIncapacityBenefitRejectionDocumentId.name;
}
