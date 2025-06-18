import type { BaseEntity } from '@core/domain/schema/entity/base/base/base.entity';
import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base/base.entity.props.interface';
import type { RelationModel } from '@core/domain/schema/model/relation.model';

export interface AuditableBaseEntityPropsInterface<T extends BaseEntity>
  extends BaseEntityPropsInterface {
  createdBy: RelationModel<T>;
  updatedBy: RelationModel<T>;
}
