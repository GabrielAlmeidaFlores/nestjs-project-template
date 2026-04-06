import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class EmailTemplateId extends Guid {
  protected override readonly _type = EmailTemplateId.name;
}
