import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class MiniAdvisorId extends Guid {
  protected override readonly _type = MiniAdvisorId.name;
}
