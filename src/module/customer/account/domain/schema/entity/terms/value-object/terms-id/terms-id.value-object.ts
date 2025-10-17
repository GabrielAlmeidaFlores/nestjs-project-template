import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class TermsId extends Guid {
  protected override readonly _type = TermsId.name;
}
