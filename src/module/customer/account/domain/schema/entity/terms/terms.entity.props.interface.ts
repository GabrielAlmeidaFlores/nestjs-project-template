import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { TermsId } from '@module/customer/account/domain/schema/entity/terms/value-object/terms-id/terms-id.value-object';

export interface TermsEntityPropsInterface
  extends BaseEntityPropsInterface<TermsId> {
  content: string;
  isActive: boolean;
}
