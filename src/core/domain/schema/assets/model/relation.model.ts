import type { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import type { Guid } from '@core/domain/schema/entity/assets/value-object/guid/guid.value-object';

type WithIdType = { id: BaseEntity['id'] };

type RelationType<T> =
  T extends Array<WithIdType>
    ? Array<Pick<T[number], 'id'>>
    : T extends WithIdType
      ? Pick<T, 'id'>
      : never;

export class RelationModel<T extends BaseEntity> {
  public readonly id: Guid;

  protected readonly _type = RelationModel.name;

  public constructor(props: RelationType<T>) {
    this.id = props.id;
  }
}
