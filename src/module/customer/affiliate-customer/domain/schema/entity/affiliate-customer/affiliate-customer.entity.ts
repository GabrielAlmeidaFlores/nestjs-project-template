import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import { AffiliateCustomerEntityPropsInterface } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer/affiliate-customer.entity.props.interface';
import { PixAddressKeyTypeEnum } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer/enum/pix-address-key-type.enum';
import { AffiliateCustomerId } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer/value-object/affiliate-customer-id/affiliate-customer-id.value-object';
import { PixAddressKey } from '@module/customer/affiliate-customer/domain/schema/value-object/pix-address-key/pix-address-key.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class AffiliateCustomerEntity extends BaseEntity<AffiliateCustomerId> {
  @Description('Identificador do customer afiliado')
  public readonly customerId: CustomerId;

  @Description('Chave Pix para recebimento de comissões')
  public readonly pixAddressKey: PixAddressKey | null;

  @Description('Tipo da chave Pix')
  public readonly pixAddressKeyType: PixAddressKeyTypeEnum | null;

  @Description('Percentual de comissão sobre pagamentos')
  public readonly paymentCommissionPercentage: number;

  @Description('Percentual de desconto no plano de pagamento')
  public readonly paymentPlanDiscountPercentage: number;

  @Description('Data de validade do desconto no plano')
  public readonly paymentPlanDiscountValidUntil: Date;

  @Description('Limite de resgates do desconto no plano')
  public readonly paymentPlanDiscountRedemptionLimit: number;

  @Description('Indica se o afiliado está ativo')
  public readonly isActive: boolean;

  protected readonly _type = AffiliateCustomerEntity.name;

  public constructor(props: AffiliateCustomerEntityPropsInterface) {
    super(AffiliateCustomerId, props);

    this.customerId = props.customerId;
    this.pixAddressKey = props.pixAddressKey ?? null;
    this.pixAddressKeyType = props.pixAddressKeyType ?? null;
    this.paymentCommissionPercentage = props.paymentCommissionPercentage;
    this.paymentPlanDiscountPercentage = props.paymentPlanDiscountPercentage;
    this.paymentPlanDiscountValidUntil = props.paymentPlanDiscountValidUntil;
    this.paymentPlanDiscountRedemptionLimit =
      props.paymentPlanDiscountRedemptionLimit;
    this.isActive = props.isActive ?? true;
  }
}
