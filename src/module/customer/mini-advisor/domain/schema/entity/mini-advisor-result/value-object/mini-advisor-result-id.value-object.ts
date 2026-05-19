import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class MiniAdvisorResultId extends Guid {
  protected override readonly _type = MiniAdvisorResultId.name;
}
