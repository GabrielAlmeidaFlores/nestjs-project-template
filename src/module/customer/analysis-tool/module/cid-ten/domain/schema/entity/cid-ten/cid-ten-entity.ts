import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { CidTenId } from '@module/customer/analysis-tool/domain/schema/entity/cid-ten/value-object/cid-ten-id.value-object';

import type { CidTenEntityPropsInterface } from '@module/customer/analysis-tool/domain/schema/entity/cid-ten/cid-ten.entity.props.interface';

export class CidTenEntity extends BaseEntity<CidTenId> {
  public readonly code: string;
  public readonly description: string;

  protected readonly _type = CidTenEntity.name;
  public constructor(props: CidTenEntityPropsInterface) {
    super(CidTenId, props);

    this.code = props.code;
    this.description = props.description;
  }
}
