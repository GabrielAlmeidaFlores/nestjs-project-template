import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { OrganizationEntity } from '@module/customer/account/domain/schema/entity/organization/organization.entity';
import { OrganizationPaymentPlanEntityPropsInterface } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan/organization-payment-plan.entity.props.interface';
import { OrganizationPaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan/value-object/organization-payment-plan-id/organization-payment-plan-id.value-object';
import { PaymentPlanEntity } from '@module/customer/payment-plan/domain/schema/entity/payment-plan/payment-plan.entity';
import { PaymentPlanCycleEnum } from '@module/customer/payment-plan/domain/schema/enum/payment-plan-cycle.enum';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class OrganizationPaymentPlanEntity extends BaseEntity<OrganizationPaymentPlanId> {
  @Description('Nome do plano de pagamento')
  public readonly name: string;

  @Description('Descrição sobre o plano e seus recursos')
  public readonly description: string;

  @Description('Preço do plano de pagamento')
  public readonly price: DecimalValue;

  @Description('Quantidade maxima de membros participantes')
  public readonly maxMemberCount: number;

  @Description('Creditos mensais para organização')
  public readonly mounthlyCreditAmount: number;

  @Description('Status do plano na plataforma')
  public readonly active: boolean;

  @Description('Tipo de assinatura contratada pelo cliente')
  public readonly cycle: PaymentPlanCycleEnum;

  @Description('Organização pertencente ao plano de pagamento')
  public readonly organization: OrganizationEntity | null;

  @Description('Plano de pagamento vinculado a organização')
  public readonly paymentPlan: PaymentPlanEntity | null;

  protected readonly _type = OrganizationPaymentPlanEntity.name;

  public constructor(props: OrganizationPaymentPlanEntityPropsInterface) {
    super(OrganizationPaymentPlanId, props);

    this.name = props.name;
    this.description = props.description;
    this.price = props.price;
    this.maxMemberCount = props.maxMemberCount;
    this.mounthlyCreditAmount = props.monthlyCreditAmount;
    this.active = props.active;
    this.cycle = props.cycle;
    this.organization = props.organization ?? null;
    this.paymentPlan = props.paymentPlan ?? null;
  }
}
