import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class PostId extends Guid {
  protected override readonly _type = PostId.name;
}
