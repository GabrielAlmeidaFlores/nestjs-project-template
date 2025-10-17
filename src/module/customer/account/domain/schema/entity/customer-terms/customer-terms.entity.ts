import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { CustomerTermsId } from '@module/customer/account/domain/schema/entity/customer-terms/value-object/customer-terms-id/customer-terms-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { CustomerTermsEntityPropsInterface } from '@module/customer/account/domain/schema/entity/customer-terms/customer-terms.entity.props.interface';

export class CustomerTermsEntity extends BaseEntity<CustomerTermsId> {
  @Description('Conteúdo dos termos e condições.')
  public readonly content: string;

  @Description('Situação dos termos e condições.')
  public readonly isActive: boolean;

  protected readonly _type = CustomerTermsEntity.name;

  public constructor(props: CustomerTermsEntityPropsInterface) {
    super(CustomerTermsId, props);

    this.content = props.content;
    this.isActive = props.isActive;
  }
}
