import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class MaternityPayRejectionWorkPeriodDocumentId extends Guid {
  protected override readonly _type =
    MaternityPayRejectionWorkPeriodDocumentId.name;
}
