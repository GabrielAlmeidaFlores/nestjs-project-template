import { BaseEntity } from '@core/domain/schema/entity/base/base/base.entity';

import type { AuditableBaseEntityPropsInterface } from '@core/domain/schema/entity/base/auditable-base/auditable-base.entity.props.interface';
import type { RelationModel } from '@core/domain/schema/model/relation.model';

export abstract class AuditableBaseEntity<
  T extends BaseEntity,
> extends BaseEntity {
  public readonly createdBy: RelationModel<T>;
  public readonly updatedBy: RelationModel<T>;

  protected constructor(props: AuditableBaseEntityPropsInterface<T>) {
    super(props);
    this.createdBy = props.createdBy;
    this.updatedBy = props.updatedBy;
  }
}
