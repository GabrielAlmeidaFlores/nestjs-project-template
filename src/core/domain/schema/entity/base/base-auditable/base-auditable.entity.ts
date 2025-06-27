import { BaseEntity } from '@core/domain/schema/entity/base/base/base.entity';

import type { BaseAuditableEntityPropsInterface } from '@core/domain/schema/entity/base/base-auditable/base-auditable.entity.props.interface';
import type { RelationModel } from '@core/domain/schema/model/relation.model';

export abstract class BaseAuditableEntity<
  T extends BaseEntity,
> extends BaseEntity {
  public readonly createdBy: RelationModel<T>;
  public readonly updatedBy: RelationModel<T>;

  protected constructor(props: BaseAuditableEntityPropsInterface<T>) {
    super(props);
    this.createdBy = props.createdBy;
    this.updatedBy = props.updatedBy;
  }
}
