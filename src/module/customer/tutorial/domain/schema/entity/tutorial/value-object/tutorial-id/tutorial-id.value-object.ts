import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class TutorialId extends Guid {
  protected override readonly _type = TutorialId.name;
}
