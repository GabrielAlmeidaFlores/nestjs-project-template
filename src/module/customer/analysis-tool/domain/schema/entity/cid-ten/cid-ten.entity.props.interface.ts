import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { CidTenId } from '@module/customer/analysis-tool/domain/schema/entity/cid-ten/value-object/cid-ten-id.value-object';

export interface CidTenEntityPropsInterface extends BaseEntityPropsInterface<CidTenId> {
  code: string;
  description: string;
}
