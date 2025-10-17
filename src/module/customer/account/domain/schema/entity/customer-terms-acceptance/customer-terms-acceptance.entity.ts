import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { CustomerTermsEntity } from '@module/customer/account/domain/schema/entity/customer-terms/customer-terms.entity';
import { CustomerTermsAcceptanceEntityPropsInterface } from '@module/customer/account/domain/schema/entity/customer-terms-acceptance/customer-terms-acceptance.entity.props.interface';
import { CustomerTermsAcceptanceId } from '@module/customer/account/domain/schema/entity/customer-terms-acceptance/value-object/organization-member-id/customer-terms-acceptance-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { CustomerEntity } from '@module/customer/account/domain/schema/entity/customer/customer.entity';

export class CustomerTermsAcceptanceEntity extends BaseEntity<CustomerTermsAcceptanceId> {
  @Description('Cliente que já aceitou os termos da organização.')
  public readonly customer: CustomerEntity;

  @Description('Termos que foram aceitos pelo cliente.')
  public readonly customerTerms: CustomerTermsEntity;

  protected readonly _type = CustomerTermsAcceptanceEntity.name;

  public constructor(props: CustomerTermsAcceptanceEntityPropsInterface) {
    super(CustomerTermsAcceptanceId, props);

    this.customer = props.customer;
    this.customerTerms = props.customerTerms;
  }
}
