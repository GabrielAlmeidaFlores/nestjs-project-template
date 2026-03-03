import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class SpecialActivityDocumentId extends Guid {
  protected override readonly _type = SpecialActivityDocumentId.name;

  public constructor(value?: string) {
    super(value);
  }
}
